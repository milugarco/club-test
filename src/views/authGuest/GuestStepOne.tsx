import React, { useState, useEffect } from 'react'
import { Field, FieldInputProps, Form, Formik } from 'formik'
import PhoneInput from 'react-phone-number-input'
import {
    FormItem,
    FormContainer,
    Input,
    Button,
    Checkbox
} from '@/components/ui/'
import { GuestFormProps } from './interfaces/GuestProps.interface'
import AlertGuest from './styles/AlertGuest'
import MaskedInput from 'react-text-mask'
import { validationGuestStepOne } from './models/validation.schema'

export type GuestFormSchemaStepOne = {
    userName: string
    cpf: string
    email: string
    phoneValue: string
    agreeToTerms: boolean
}

const GuestStepOne = (props: GuestFormProps) => {
    const {
        disableSubmit = false,
        className,
        handleStep,
        formValueStep
    } = props

    const [isButtonDisabled, setIsButtonDisabled] = useState(true)

    const [formData, setFormData] = useState({
        email: formValueStep?.email || '',
        userName: formValueStep?.userName || '',
        phoneValue: formValueStep?.phoneValue || '',
        cpf: formValueStep?.cpf || '',
        agreeToTerms: false
    })

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value
        }))
    }

    const updateFormData = (newData: Partial<typeof formData>) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData
        }))
    }

    useEffect(() => {
        const newUserInput = {
            userName: formData.userName,
            cpf: formData.cpf,
            email: formData.email,
            phoneValue: formData.phoneValue,
            agreeToTerms: formData.agreeToTerms

        }
        setFormData((prevData) => ({
            ...prevData,
            userName: formValueStep?.userName || newUserInput.userName,
            cpf: formValueStep?.cpf || newUserInput.cpf,
            email: formValueStep?.email || newUserInput.email,
            phoneValue: formValueStep?.phoneValue || newUserInput.phoneValue

        }))
    }, [formValueStep])

    const handleCheckboxChange = () => {
        const newAgreeToTerms = !formData.agreeToTerms
        setFormData((prevData) => ({
            ...prevData,
            agreeToTerms: newAgreeToTerms
        }))
        setIsButtonDisabled(!newAgreeToTerms) 
    }

    const validateInputs = async () => {
        await validationGuestStepOne.validate(formData)
        const dataForStepTwo = {
            ...formData
        }
        handleStep?.('two', dataForStepTwo)
    }

    return (
        <div className={className}>
            <h1 className="text-lg lg:text-3xl mb-2">Preencha seus dados</h1>
            <Formik
                initialValues={formData}
                validationSchema={validationGuestStepOne}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {

                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, values, handleChange, isSubmitting }) => (
                    <Form autoComplete="off">
                        <FormContainer>
                            <FormItem
                                asterisk
                                label={'Nome completo'}
                                invalid={errors.userName && touched.userName}
                                errorMessage={'Insira o nome completo'}
                            >
                                <Field
                                    className="shadow-lg"
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder={'Nome completo'}
                                    component={Input}
                                    value={formData.userName}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        const inputValue = e.target.value;
                                        const formattedValue = inputValue
                                          .toLowerCase() 
                                          .split(' ') 
                                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) 
                                          .join(' '); 
                                    
                                        handleFieldChange('userName', formattedValue);
                                        handleChange(e);
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label="CPF"
                                invalid={errors.cpf && touched.cpf}
                                errorMessage={'Insira um CPF válido'}
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
                                    placeholder="CPF"
                                    type="text"
                                    autoComplete="off"
                                    className={`input h-11 shadow-lg ${
                                        formData.cpf.trim() === '' &&
                                        touched.cpf
                                            ? 'border-red-500 border-2 focus:ring-transparent'
                                            : 'focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg'
                                    }`}
                                    value={formData.cpf}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange('cpf', e.target.value)
                                    }}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label={'Email'}
                                invalid={errors.email && touched.email}
                                errorMessage={'Insira um email válido'}
                            >
                                <Field
                                    className="shadow-lg"
                                    type="text"
                                    autoComplete="off"
                                    name="email"
                                    placeholder={'Email'}
                                    component={Input}
                                    value={formData.email}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange(
                                            'email',
                                            e.target.value
                                        )
                                        handleChange(e)
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label={'Telefone'}
                                invalid={
                                    errors.phoneValue && touched.phoneValue
                                }
                                errorMessage={'Confira seus dados'}
                            >
                                <PhoneInput
                                    international
                                    autoComplete="off"
                                    limitMaxLength={true}
                                    defaultCountry="BR"
                                    placeholder={'Telefone'}
                                    name="phoneValue"
                                    value={formData.phoneValue}
                                    className="input h-11 focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg bg-white dark:bg-transparent"
                                    onChange={(e: string) => {
                                        handleFieldChange('phoneValue', e)
                                    }}
                                />
                            </FormItem>
                            <Checkbox
                                className="mb-4"
                                checked={formData.agreeToTerms}
                                name="agreeToTerms"
                                onChange={handleCheckboxChange}
                            >
                                Adequada a LGPD, confirma o seu consentimento de
                                acordo com o Artigo 7, inciso I, da Lei
                                13.709/2018 para tratamento dos seus dados com
                                segurança e privacidade na confirmação do
                                cadastro.
                            </Checkbox>
                            {!formData.agreeToTerms && <AlertGuest />}

                            <Button
                                block
                                className="shadow-lg mt-4"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                disabled={isButtonDisabled}
                                onClick={() => {
                                    if (formData.agreeToTerms) {
                                        validateInputs()
                                        updateFormData(formData)
                                    } else {
                                        
                                    }
                                }}
                            >
                                {isSubmitting ? 'Próximo' : 'Próximo'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default GuestStepOne
