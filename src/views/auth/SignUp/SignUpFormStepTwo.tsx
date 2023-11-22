import React, { useState, useEffect } from 'react'
import { Field, Form, Formik } from 'formik'
import { validationSchemaTwo } from './models/validation.schema'
import { SignUpFormProps } from './interfaces/singUpProps.interface'
import {
    FormItem,
    FormContainer,
    Input,
    Button,
    Checkbox,
} from '@/components/ui/'
import { useTranslation } from 'react-i18next'
import ActionLink from '@/components/shared/ActionLink'
import PasswordInput from '@/components/shared/PasswordInput'
import AlertGuest from '@/views/authGuest/styles/AlertGuest'
import useUserHook from '@/utils/hooks/useUsersHook'

export const SignUpFormStepTwo = (props: SignUpFormProps) => {
    const {
        disableSubmit = false,
        className,
        signInUrl = '/sign-in',
        handleStep,
        formValueStep,
    } = props

    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        email: formValueStep?.email || '',
        password: formValueStep?.password || '',
        confirmPassword: formValueStep?.password || '',
        agreeToTerms: false,
        photoFace: '',
    })

    const { userControllerFindByEmail } = useUserHook()

    const handleFieldChange = (fieldName: string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }))
    }

    const handleCheckboxChange = () => {
        const newAgreeToTerms = !formData.agreeToTerms
        setFormData((prevData) => ({
            ...prevData,
            agreeToTerms: newAgreeToTerms,
        }))
    }

    const validateInputs = async () => {
        const response = await userControllerFindByEmail(formData.email)
        if (response?.email) {
            setErrorMessage(t('register.step2.error.email.alreadyExist').toString())
            return
        }

        await validationSchemaTwo.validate(formData)
        setErrorMessage('')
        // Handle step change with form data
        handleStep?.('three', { ...formData, ...formValueStep })
    }

    useEffect(() => {
        // Criar um novo objeto de estado para armazenar os valores do usuário
        const newUserInput = {
            email: formData.email,
            password: formData.password,
            agreeToTerms: formData.agreeToTerms,

            // ... outros campos ...
        }

        // Atualize os estados locais com os valores de formValueStep, mantendo os valores do usuário se estiverem definidos
        setFormData((prevData) => ({
            ...prevData,
            email: formValueStep?.email || newUserInput.email,
            password: formValueStep?.password || newUserInput.password,
            // ... outros campos ...
        }))
    }, [formValueStep])

    const { t } = useTranslation()
    return (
        <div className={className}>
            <Formik
                initialValues={formData}
                validationSchema={validationSchemaTwo}
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
                                label="Email"
                                invalid={
                                    errorMessage !== '' ||
                                    (errors.email && touched.email)
                                }
                                errorMessage={
                                    errorMessage ||
                                    t('register.step2.error.email.void').toString()
                                }
                            >
                                <Field
                                    className="shadow-lg"
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="Email"
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
                                label={t('register.password').toString()}
                                invalid={errors.password && touched.password}
                                errorMessage={t(
                                    'register.step2.error.password'
                                ).toString()}
                            >
                                <p className="mb-4 text-[12px]">
                                    <span className="text-red-500">*</span>{' '}
                                    {t('register.step2.password-paragraph')}
                                </p>
                                <Field
                                    className="shadow-lg rounded-full"
                                    autoComplete="off"
                                    name="password"
                                    placeholder={t('register.password')}
                                    component={PasswordInput}
                                    value={formData.password}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange(
                                            'password',
                                            e.target.value
                                        )
                                        handleChange(e)
                                    }}
                                />
                            </FormItem>

                            <FormItem
                                asterisk
                                label={t('register.password1').toString()}
                                invalid={
                                    errors.confirmPassword &&
                                    touched.confirmPassword
                                }
                                errorMessage={t(
                                    'register.step2.error.password1'
                                ).toString()}
                            >
                                <Field
                                    className="shadow-lg rounded-full"
                                    autoComplete="off"
                                    name="confirmPassword"
                                    placeholder={t('register.password1')}
                                    component={PasswordInput}
                                    value={formData.confirmPassword}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLInputElement>
                                    ) => {
                                        handleFieldChange(
                                            'confirmPassword',
                                            e.target.value
                                        )
                                        handleChange(e)
                                    }}
                                />
                            </FormItem>
                            <Checkbox
                                className="mb-4"
                                checked={formData.agreeToTerms}
                                name="agreeToTerms"
                                onChange={handleCheckboxChange}
                            >
                                {t('register.step2.lgpd')}
                            </Checkbox>
                            {!formData.agreeToTerms && <AlertGuest />}

                            <Button
                                block
                                className="shadow-lg"
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
