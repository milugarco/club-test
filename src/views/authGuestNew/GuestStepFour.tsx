import {
    GuestFormProps,
    GuestFormPropsNew
} from './interfaces/GuestProps.interface'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { useState, useEffect } from 'react'
import useDocumentHook from '@/utils/hooks/useDocumentHook'
import { CreateDocumentClubDTO } from '@/client/api-back'
import { DoubleSidedImage } from '@/components/shared'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

export type GuestFormSchemaStepSeven = {
    documentType: string
    documentNumber: string
}

type Option = {
    value: string
    label: string
}

type FormModel = {
    toUpperCase(): string | number | readonly string[] | undefined
    documentType: string
    documentNumber: string
}



const GuestStepFour = (props: GuestFormPropsNew) => {
    const {
        disableSubmit = false,
        handleStep,
        formValueStep,
        className
    } = props
    const [showInput, setShowInput] = useState(false)
    const [message, setMessage] = useState<string | null>(null)
    const [selectedDocument, setSelectedDocument] = useState<Option | null>(
        null
    )
    const { documentControllerCreateClub } = useDocumentHook()
    const [formData, setFormData] = useState({
        documentType: formValueStep?.documentType || '',
        documentNumber: formValueStep?.documentNumber || ''
    })

    const {t} = useTranslation()

    const options: Option[] = [
        { value: 'RG', label: 'RG' },
        { value: 'CNH', label: 'CNH' },
        { value: 'PASSPORT', label: t('authGuest.document.label.passport').toString()}
    ]
    
    const validationSchema = Yup.object({
        documentNumber: Yup.string()
            .required(t('authGuest.document.error.document1').toString())
            .test(
                'maxCharacters',
                t('authGuest.document.error.document2').toString(),
                (value) => value.length <= 50
            ),
        documentType: Yup.string().required(t('authGuest.document.error.document3').toString())
    })

    useEffect(() => {
        setFormData(() => ({
            documentType:
                formValueStep?.documentType || newUserInput.documentType,
            documentNumber:
                formValueStep?.documentNumber || newUserInput.documentNumber
        }))

        const newUserInput = {
            documentType: formData.documentType,
            documentNumber: formData.documentNumber
        }

        setFormData((prevData) => ({
            ...prevData,
            documentType:
                formValueStep?.documentType || newUserInput.documentType,
            documentNumber:
                formValueStep?.documentNumber || newUserInput.documentNumber
        }))
    }, [formValueStep])

    const validateInputs = async (values: any) => {
        await validationSchema.validate(values)

        const userId = formValueStep?.newEventParticipant?.user?.id
            ? formValueStep?.newEventParticipant?.user?.id
            : ''

        const request: CreateDocumentClubDTO = {
            number: values.documentNumber,
            type: values.documentType
        }

        console.log('request: ', request)

        const response = await documentControllerCreateClub(userId, request)

        if (response.status === 'failed') {
            console.log('Erro na criação do document')
            setMessage(t('authGuest.error.message').toString())
            return
        }

        await handleStep?.('five', {
            ...formValueStep,
            documentNumber: values.documentNumber,
            documentType: values.documentType,
            documentUser: response.data
        })
    }

    const pronouns = {
        RG: {
            label: 'rg',
            pronoun: t('authGuest.document.pronoun.o').toString(),
            example: 'ex: (12.345.678-90/SSP/UF)'
        },
        CNH: {
            label: 'cnh',
            pronoun: t('authGuest.document.pronoun.a').toString(),
            example: 'ex: (12345678900/DETRAN/UF)'
        },
        PASSPORT: {
            label: t('authGuest.document.label.passport').toString(),
            pronoun: t('authGuest.document.pronoun.o').toString(),
            example: 'ex: (XX123456/DPF)'
        }
    }

    

    return (
        <>
            {message ? (
                <div className={className}>
                    <h1 className="text-lg lg:text-3xl mb-4 text-center">
                        {message}
                    </h1>
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Access Denied!"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="mb-2">Opppps!</h3>
                        </div>
                    </div>
                    <Button
                        className="w-32 mt-8 text-xl"
                        variant="solid"
                        icon={<HiOutlineChevronLeft />}
                        onClick={() =>
                            handleStep?.('one', {
                                ...formValueStep
                            })
                        }
                    >
                        {t('authGuest.backButton').toString()}
                    </Button>
                </div>
            ) : (
                <div>
                    <h1 className="text-lg lg:text-3xl mb-2">
                        {t('authGuest.document.title').toString()}
                    </h1>
                    <Formik
                        enableReinitialize
                        initialValues={{
                            documentType: '',
                            documentNumber: ''
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('values', values)
                        }}
                    >
                        {({ values, touched, errors }) => (
                            <Form autoComplete="off">
                                <FormContainer>
                                    <FormItem
                                        asterisk
                                        label={t('authGuest.document.label.document').toString()}
                                        invalid={
                                            errors.documentType &&
                                            touched.documentType
                                        }
                                        errorMessage={errors.documentType}
                                    >
                                        <Field name="documentType">
                                            {({
                                                field,
                                                form
                                            }: FieldProps<FormModel>) => (
                                                <Select
                                                    className="dark:text-white"
                                                    isSearchable={false}
                                                    field={field}
                                                    form={form}
                                                    options={options}
                                                    value={options.find(
                                                        (option) =>
                                                            option.value ===
                                                            values.documentType
                                                    )}
                                                    placeholder={t('authGuest.select').toString()}
                                                    onChange={(option) => {
                                                        form.setFieldValue(
                                                            field.name,
                                                            option?.value
                                                        )
                                                        setShowInput(!!option)
                                                        setSelectedDocument(
                                                            option
                                                        )
                                                    }}
                                                />
                                            )}
                                        </Field>
                                    </FormItem>
                                    {showInput && selectedDocument && (
                                        <FormItem
                                            asterisk
                                            label={`${t('authGuest.document.write').toString()} ${
                                                pronouns[
                                                    selectedDocument?.value as keyof typeof pronouns
                                                ]?.pronoun
                                            } ${selectedDocument?.label} ${
                                                pronouns[
                                                    selectedDocument?.value as keyof typeof pronouns
                                                ]?.example
                                            }`}
                                            invalid={
                                                errors.documentNumber &&
                                                touched.documentNumber
                                            }
                                            errorMessage={errors.documentNumber}
                                        >
                                            <Field name="documentNumber">
                                                {({
                                                    field,
                                                    form
                                                }: FieldProps<FormModel>) => (
                                                    <Input
                                                        placeholder={`${t('authGuest.document.report').toString()} ${
                                                            pronouns[
                                                                selectedDocument?.value as keyof typeof pronouns
                                                            ]?.pronoun
                                                        } ${
                                                            selectedDocument?.label
                                                        }`}
                                                        name={field.name}
                                                        type="text"
                                                        className="shadow-lg"
                                                        value={field.value.toUpperCase()}
                                                        // Use o valor do campo
                                                        onChange={(e) => {
                                                            field.onChange(e)
                                                            form.setFieldTouched(
                                                                field.name,
                                                                true
                                                            )
                                                        }}
                                                    />
                                                )}
                                            </Field>
                                        </FormItem>
                                    )}
                                    <div className="flex justify-center items-center w-full">
                                        <Button
                                            className="w-full md:w-60"
                                            variant="solid"
                                            type="submit"
                                            onClick={() =>
                                                validateInputs(values)
                                            }
                                        >
                                            {t('authGuest.nextButton').toString()}
                                        </Button>
                                    </div>
                                </FormContainer>
                            </Form>
                        )}
                    </Formik>
                </div>
            )}
        </>
    )
}

export default GuestStepFour
