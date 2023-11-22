import { Field, FieldArray, Form, Formik, getIn, useFormik } from 'formik'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus, HiPlus } from 'react-icons/hi'
import * as Yup from 'yup'
import type { FieldProps, FormikProps } from 'formik'
import { Select } from '@/components/ui'
import { GuestFormProps } from './interfaces/GuestProps.interface'

type Option = {
    value: string
    label: string
}

type FormModel = {
    questOne: string
    questTwo: string
    socialMidia: {
        name: string
        user: string
    }[]
}

export type GuestFormSchemaStepFive = {
    questOne: string
    questTwo: string
    socialMidia: [{ name: string; user: string }]
}

const options: Option[] = [
    { value: 'nenhuma', label: 'nenhuma' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
    { value: '11+', label: '11+' }
]
const optionsSport: Option[] = [
    {
        value: 'soccer',
        label: 'Futebol'
    },
    {
        value: 'basketball',
        label: 'Basquetebol'
    },
    {
        value: 'tennis',
        label: 'Tênis'
    },
    {
        value: 'swimming',
        label: 'Natação'
    },
    {
        value: 'golf',
        label: 'Golfe'
    },
    {
        value: 'volleyball',
        label: 'Vôlei'
    },
    {
        value: 'cricket',
        label: 'Críquete'
    },
    {
        value: 'rugby',
        label: 'Rúgbi'
    },
    {
        value: 'hockey',
        label: 'Hóquei'
    },
    {
        value: 'baseball',
        label: 'Beisebol'
    },
    {
        value: 'tableTennis',
        label: 'Tênis de Mesa'
    },
    {
        value: 'badminton',
        label: 'Badminton'
    },
    {
        value: 'athletics',
        label: 'Atletismo'
    },
    {
        value: 'boxing',
        label: 'Boxe'
    },
    {
        value: 'wrestling',
        label: 'Luta Livre'
    },
    {
        value: 'skiing',
        label: 'Esqui'
    },
    {
        value: 'snowboarding',
        label: 'Snowboard'
    },
    {
        value: 'cycling',
        label: 'Ciclismo'
    },
    {
        value: 'surfing',
        label: 'Surfe'
    },
    {
        value: 'skateboarding',
        label: 'Skate'
    },
    {
        value: 'rowing',
        label: 'Remo'
    },
    {
        value: 'gymnastics',
        label: 'Ginástica'
    },
    {
        value: 'weightlifting',
        label: 'Levantamento de Peso'
    },
    {
        value: 'Handebol',
        label: 'Handebol'
    },
    {
        value: 'Beach Tennis',
        label: 'Beach Tennis'
    },
    {
        value: 'Judô',
        label: 'Judô'
    },
    {
        value: 'Jiu Jitsu',
        label: 'Jiu Jitsu'
    },
    {
        value: 'Caça Esportiva',
        label: 'Caça Esportiva'
    },
    {
        value: 'outros',
        label: 'Outros'
    }
]
const optionsRedes: Option[] = [
    {
        value: 'Instagram',
        label: 'Instagram'
    },
    {
        value: 'Facebook',
        label: 'Facebook'
    },
    {
        value: 'TikTok',
        label: 'TikTok'
    },
    {
        value: 'Twitter (X)',
        label: 'Twitter (X)'
    },
    {
        value: 'LinkedIn',
        label: 'LinkedIn'
    },
    {
        value: 'Snapchat',
        label: 'Snapchat'
    },
    {
        value: 'Threads',
        label: 'Threads'
    },
    {
        value: 'Github',
        label: 'Github'
    }
]

const validationSchema = Yup.object({
    questOne: Yup.string().required('Selecione uma opção'),
    questTwo: Yup.string().required('Selecione uma opção'),
    socialMidia: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Selecione'),
            user: Yup.string()
                .matches(/^@.*/, 'Comece com @')
                .required('Digite seu @')
        })
    )
})
const fieldFeedback = (form: FormikProps<FormModel>, name: string) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch
    }
}

const GuestStepFive = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props
    function setSubmitting(arg0: boolean) {
        throw new Error('Function not implemented.')
    }

    const [formData, setFormData] = useState({
        questOne: formValueStep?.questOne || '',
        questTwo: formValueStep?.questTwo || '',
        socialMidia: [{ name: '', user: '' }]
    })

    useEffect(() => {

        const newUserInput = {
            questOne: formData.questOne,
            questTwo: formData.questTwo,
            socialMidia: formData.socialMidia


        }
        setFormData((prevData) => ({
            ...prevData,
            questOne: formValueStep?.questOne || newUserInput.questOne,
            questTwo: formValueStep?.questTwo || newUserInput.questTwo,
            socialMidia: formValueStep?.socialMidia || newUserInput.socialMidia
        }))
    }, [formValueStep])

    const validateInputs = async (values: any) => {
        try {
            await validationSchema.validate(values, { abortEarly: false })
            handleStep?.('six', { ...values, ...formValueStep })
        } catch (validationErrors) {
            
        }
    }

    return (
        <div>
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={formData}
                onSubmit={(values) => {
                    ;('')
                }}
            >
                {({ touched, errors, values, handleChange, isSubmitting }) => {
                    const users = values.socialMidia
                    return (
                        <Form autoComplete="off">
                            <FormContainer>
                                <div>
                                    <h1 className="text-xl lg:text-3xl mb-2">
                                        Para te conhecer melhor
                                    </h1>
                                    <p className="mb-2 text-sm">
                                        Obs: suas redes sociais ficarão a mostra
                                        para todos no evento
                                    </p>
                                    <FormItem
                                        asterisk
                                        label="Quantas vezes você viaja a lazer por ano?"
                                        invalid={
                                            errors.questOne && touched.questOne
                                        }
                                        errorMessage={errors.questOne}
                                    >
                                        <Field name="questOne">
                                            {({
                                                field,
                                                form
                                            }: FieldProps<FormModel>) => (
                                                <Select
                                                    className="dark:text-white"
                                                    isSearchable={false}
                                                    placeholder={'Selecione'}
                                                    field={field}
                                                    form={form}
                                                    options={options}
                                                    value={options.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.questOne
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FormItem
                                        asterisk
                                        label="Qual seu esporte favorito?"
                                        invalid={
                                            errors.questTwo && touched.questTwo
                                        }
                                        errorMessage={errors.questTwo}
                                    >
                                        <Field name="questTwo">
                                            {({
                                                field,
                                                form
                                            }: FieldProps<FormModel>) => (
                                                <Select
                                                    className="dark:text-white"
                                                    placeholder={'Selecione'}
                                                    field={field}
                                                    form={form}
                                                    options={optionsSport}
                                                    value={optionsSport.filter(
                                                        (option) =>
                                                            option.value ===
                                                            values.questTwo
                                                    )}
                                                    onChange={(option) =>
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value
                                                        )
                                                    }
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    <FieldArray name="socialMidia">
                                        {({ form, remove, push }) => (
                                            <div className="flex flex-col">
                                                {users.map((user, index) => {
                                                    const socialFeedBack =
                                                        fieldFeedback(
                                                            form,
                                                            `socialMidia[${index}].name`
                                                        )
                                                    const userFeedBack =
                                                        fieldFeedback(
                                                            form,
                                                            `socialMidia[${index}].user`
                                                        )

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="flex flex-col sm:flex-row items-center gap-2 "
                                                        >
                                                            <FormItem
                                                                asterisk
                                                                label="Escolha uma rede social"
                                                                className="w-full sm:w-1/2"
                                                                invalid={
                                                                    socialFeedBack.invalid
                                                                }
                                                                errorMessage={
                                                                    socialFeedBack.errorMessage
                                                                }
                                                            >
                                                                <Field
                                                                    name={`socialMidia[${index}].name`}
                                                                >
                                                                    {({
                                                                        field,
                                                                        form
                                                                    }: FieldProps<FormModel>) => (
                                                                        <Select
                                                                            className="dark:text-white"
                                                                            placeholder={
                                                                                'Selecione'
                                                                            }
                                                                            field={
                                                                                field
                                                                            }
                                                                            form={
                                                                                form
                                                                            }
                                                                            options={
                                                                                optionsRedes
                                                                            }
                                                                            value={optionsRedes.filter(
                                                                                (
                                                                                    option
                                                                                ) =>
                                                                                    option.value ===
                                                                                    user.name
                                                                            )}
                                                                            onChange={(
                                                                                option
                                                                            ) =>
                                                                                form.setFieldValue(
                                                                                    field.name,
                                                                                    option?.value
                                                                                )
                                                                            }
                                                                        />
                                                                    )}
                                                                </Field>
                                                            </FormItem>
                                                            <div className="flex w-full sm:w-1/2 sm:mt-7">
                                                                <FormItem
                                                                    className="w-full"
                                                                    invalid={
                                                                        userFeedBack.invalid
                                                                    }
                                                                    errorMessage={
                                                                        userFeedBack.errorMessage
                                                                    }
                                                                >
                                                                    <Field
                                                                        name={`socialMidia[${index}].user`}
                                                                    >
                                                                        {({
                                                                            field,
                                                                            form
                                                                        }: FieldProps<FormModel>) => (
                                                                            <Input
                                                                                placeholder="@user"
                                                                                name={
                                                                                    field.name
                                                                                }
                                                                                type="text"
                                                                                className="shadow-lg w-5/6"
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    field.onChange(
                                                                                        e
                                                                                    )
                                                                                    form.setFieldTouched(
                                                                                        field.name,
                                                                                        true
                                                                                    )
                                                                                }}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </FormItem>
                                                                {index === 0 ? ( 
                                                                    <Button
                                                                        shape="circle"
                                                                        size="sm"
                                                                        className="mt-1"
                                                                        icon={
                                                                            <HiPlus />
                                                                        }
                                                                        onClick={() =>
                                                                            push(
                                                                                {
                                                                                    name: '',
                                                                                    user: ''
                                                                                }
                                                                            )
                                                                        }
                                                                    />
                                                                ) : (
                                                                   
                                                                    <Button
                                                                        shape="circle"
                                                                        size="sm"
                                                                        className="mt-1"
                                                                        icon={
                                                                            <HiMinus />
                                                                        }
                                                                        onClick={() =>
                                                                            remove(
                                                                                index
                                                                            )
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </FieldArray>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="solid"
                                            onClick={() =>
                                                validateInputs(values)
                                            }
                                        >
                                            Próximo
                                        </Button>
                                    </div>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default GuestStepFive
