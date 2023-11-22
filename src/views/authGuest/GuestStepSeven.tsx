import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'
import { useState, useEffect } from 'react'
import { GuestFormProps } from './interfaces/GuestProps.interface'

export type GuestFormSchemaStepSeven = {
    documentType: string
    documentNumber: string
}

type Option = {
    value: string
    label: string
}

type FormModel = {
    documentType: string
    documentNumber: string
}

const options: Option[] = [
    { value: 'register', label: 'RG' },
    { value: 'cnh', label: 'CNH' },
    { value: 'Passport', label: 'Passaporte' }
]

const validationSchema = Yup.object({
    documentNumber: Yup.string()
        .required('Digite seu documento!')
        .test(
            'maxCharacters',
            'O documento deve ter no máximo 50 caracteres',
            (value) => value.length <= 50
        ),
    documentType: Yup.string().required('Selecione uma opção!')
})

const GuestStepSeven = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props
    const [showInput, setShowInput] = useState(false)
    const [selectedDocument, setSelectedDocument] = useState<Option | null>(
        null
    )

    const [formData, setFormData] = useState({
        documentType: formValueStep?.documentType || '',
        documentNumber: formValueStep?.documentNumber || ''
    })

    useEffect(() => {
        // Criar um novo objeto de estado para armazenar os valores do usuário
        const newUserInput = {
            documentType: formData.documentType,
            documentNumber: formData.documentNumber

            // ... outros campos ...
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
        handleStep?.('eight', { ...values, ...formValueStep })
    }

    const pronouns = {
        register: {
            label: 'rg',
            pronoun: 'o',
            example: 'ex: (12.345.678-90/SSP/UF)'
        },
        cnh: {
            label: 'cnh',
            pronoun: 'a',
            example: 'ex: (12345678900/DETRAN/UF)'
        },
        Passport: {
            label: 'Passaporte',
            pronoun: 'o',
            example: 'ex: (XX123456/DPF)'
        }
    }

    return (
        <div>
            <h1 className="text-lg lg:text-3xl mb-2">
                Selecione um tipo de documento
            </h1>
            <Formik
                enableReinitialize
                initialValues={{
                    documentType: '',
                    documentNumber: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {

                }}
            >
                {({ values, touched, errors }) => (
                    <Form autoComplete="off">
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Documento"
                                invalid={
                                    errors.documentType && touched.documentType
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
                                            placeholder="Selecione"
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                                setShowInput(!!option)
                                                setSelectedDocument(option)
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            {showInput && selectedDocument && (
                                <FormItem
                                    asterisk
                                    label={`Digite ${
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
                                                placeholder={`Informe ${
                                                    pronouns[
                                                        selectedDocument?.value as keyof typeof pronouns
                                                    ]?.pronoun
                                                } ${selectedDocument?.label}`}
                                                name={field.name}
                                                type="text"
                                                className="shadow-lg"
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
                            <FormItem>
                                <Button
                                    variant="solid"
                                    type="submit"
                                    onClick={() => validateInputs(values)}
                                >
                                    Próximo
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default GuestStepSeven
