import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import PhoneInput from 'react-phone-number-input'
import { validationSchema } from './models/validation.schema'
import { SignUpFormProps } from './interfaces/singUpProps.interface'
import {
    FormItem,
    FormContainer,
    Input,
    Button,
    DatePicker
} from '@/components/ui/'
import { useTranslation } from 'react-i18next'
import ActionLink from '@/components/shared/ActionLink'
import MaskedInput from 'react-text-mask'

export const SignUpFormStepOne = (props: SignUpFormProps) => {
    const {
        disableSubmit = false,
        className,
        signInUrl = '/sign-in',
        handleStep,
        formValueStep
    } = props

    // Inicialize os estados locais com os valores recebidos do formValueStep
    const [formData, setFormData] = useState({
        userName: formValueStep?.userName || '',
        phoneValue: formValueStep?.phoneValue || '',
        documentUserValue: formValueStep?.documentUserValue || '',
        dateOfBirth: formValueStep?.dateOfBirth,
        photoFace: ''
    })

    const handleFieldChange = (fieldName: string, value: string | Date) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]:
                value instanceof Date
                    ? value.toISOString().split('T')[0] // Pega apenas a parte da data
                    : value
        }))
    }

    const validateInputs = async () => {
        await validationSchema.validate(formData)

        // Handle step change with form data
        handleStep?.('two', formData)
    }

    useEffect(() => {
        const newUserInput = {
            userName: formData.userName,
            phoneValue: formData.phoneValue,
            documentUserValue: formData.documentUserValue,
            dateOfBirth: formData.dateOfBirth
        }
        setFormData((prevData) => ({
            ...prevData,
            userName: formValueStep?.userName || newUserInput.userName,
            dateOfBirth: formValueStep?.dateOfBirth || newUserInput.dateOfBirth,
            phoneValue: formValueStep?.phoneValue || newUserInput.phoneValue,
            documentUserValue:
                formData?.documentUserValue || newUserInput.documentUserValue
        }))
    }, [formValueStep])

    const { t } = useTranslation()
    return (
        <div className={className}>
            <Formik
                initialValues={formData}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        //onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting, handleChange }) => (
                    <Form autoComplete="off">
                        <FormContainer>
                            <FormItem
                                asterisk
                                label={t('register.name').toString()}
                                invalid={errors.userName && touched.userName}
                                errorMessage={
                                    errors.userName
                                        ? errors.userName == 'Insira seu nome'
                                            ? t(
                                                  'register.step2.error.name.void'
                                              ).toString()
                                            : t(
                                                  'register.step2.error.name.invalid'
                                              ).toString()
                                        : ''
                                }
                            >
                                <Field
                                    className="shadow-lg"
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder={t('register.name').toString()}
                                    component={Input}
                                    value={formData.userName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange(
                                            'userName',
                                            e.target.value
                                        )
                                        handleChange(e)
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label={t('register.dateBirth').toString()}
                                invalid={
                                    errors.dateOfBirth && touched.dateOfBirth
                                }
                                errorMessage={t(
                                    'register.step2.error.dateBirth'
                                ).toString()}
                            >
                                <DatePicker
                                    className="shadow-lg"
                                    type="text"
                                    name="dateOfBirth"
                                    placeholder={t(
                                        'register.dateBirth'
                                    ).toString()}
                                    value={formData.dateOfBirth}
                                    onChange={(date: Date | null) =>
                                        handleFieldChange('dateOfBirth', date)
                                    }
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label={t('register.phone').toString()}
                                invalid={
                                    errors.phoneValue && touched.phoneValue
                                }
                                errorMessage={t(
                                    'register.step2.error.phone'
                                ).toString()}
                            >
                                <PhoneInput
                                    international
                                    limitMaxLength={true}
                                    autoComplete="off"
                                    defaultCountry="BR"
                                    placeholder={t('register.phone1')}
                                    name="phoneValue"
                                    value={formData.phoneValue}
                                    className="input h-11 focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg bg-white dark:bg-transparent"
                                    onChange={(e: string) => {
                                        handleFieldChange('phoneValue', e)
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label={t('register.document').toString()}
                                invalid={
                                    errors.documentUserValue &&
                                    touched.documentUserValue
                                }
                                errorMessage={'Insira um número válido'}
                            >
                                <MaskedInput
                                    mask={[
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        '.',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        '.',
                                        /\d/,
                                        /\d/,
                                        /\d/,
                                        '-',
                                        /\d/,
                                        /\d/
                                    ]}
                                    guide={false}
                                    placeholder={t(
                                        'register.document'
                                    ).toString()}
                                    type="text"
                                    autoComplete="off"
                                    className={`input h-11 shadow-lg ${
                                        formData.documentUserValue.trim() ===
                                            '' && touched.documentUserValue
                                            ? 'border-red-500 border-2 focus:ring-transparent'
                                            : 'focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg'
                                    }`}
                                    value={formData.documentUserValue}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange(
                                            'documentUserValue',
                                            e.target.value
                                        )
                                    }}
                                />
                            </FormItem>

                            <Button
                                block
                                className="shadow-lg mt-4"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                onClick={() => validateInputs()}
                            >
                                {isSubmitting
                                    ? t('register.step1')
                                    : t('register.step')}
                            </Button>

                            <div className="mt-4 text-center flex flex-col w-[100%] gap-2">
                                <span>{t('register.join')}</span>
                                <ActionLink to={signInUrl}>
                                    <Button className="w-[100%]">
                                        {t('register.join1')}
                                    </Button>
                                </ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
