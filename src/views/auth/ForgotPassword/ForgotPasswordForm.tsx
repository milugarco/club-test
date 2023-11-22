import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import type { AxiosError } from 'axios'
import { LogoAuth } from '@/components/layouts/AuthLayout/Logo'
import { ForgotPassword, codeValidation } from '@/@types/auth'
import useForgotPasswordHook from '@/utils/hooks/useForgotPasswordHook'
import { Result } from 'postcss'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface ForgotPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type ForgotPasswordFormSchema = {
    email: string
}

type ForgotPasswordFormSchemaValidate = {
    number: string
    hash: string
}

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [emailSent, setEmailSent] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { forgotPassword } = useForgotPasswordHook()

    const { forgotVerification } = useForgotPasswordHook()

    const [resetComplete, setResetComplete] = useState(false)

    const navigate = useNavigate()

    const { t } = useTranslation()

    const [hashFromEmail, setHashFromEmail] = useState('')

    const [hashFromNumber, setHashFromNumber] = useState('')

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Please enter your email')
    })

    const validationSchemaNumber = Yup.object().shape({
        number: Yup.string().required('Please enter your number')
    })
    const onSendMail = async (
        values: ForgotPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const ForgotPasswordData: ForgotPassword = {
            email: values.email || ''
        }
        setSubmitting(true)
        try {
            const result = await forgotPassword(ForgotPasswordData)

            if (result?.status === 'success') {
                setSubmitting(false)
                setHashFromEmail(result.hash || '')
                setEmailSent(true)
                return result.hash
            } else {
                setMessage(result.message)
                setSubmitting(false)
                return
            }
        } catch (errors) {
            setMessage(
                (errors as AxiosError<{ message: string }>)?.response?.data
                    ?.message || (errors as Error).toString()
            )
            setSubmitting(false)
        }
    }

    const onVerificateCode = async (
        values: ForgotPasswordFormSchemaValidate,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const ForgotPasswordValidate: codeValidation = {
            number: values.number,
            hash: hashFromEmail
        }

        try {
            const result = await forgotVerification(ForgotPasswordValidate)

            if (result?.status === 'success') {
                setSubmitting(false)
                setResetComplete(true)
                navigate('/reset-password', {
                    state: {
                        hashFromNumber: result.hash,
                        number: values.number
                    }
                })
            } else {
                setMessage(result.message)
                setSubmitting(false)
                return
            }
            setSubmitting(false)
        } catch (error) {
            //
        }
        /*
            if (result) {
                setHashFromNumber (result.hash || '')

                setSubmitting(false)

                // Passar os valores para o ResetPasswordForm
                navigate('/reset-password', {
                    state: {
                        hashFromNumber: result.hash,
                        number: values.number
                    }
                });
            }
        } catch (errors) {
            setMessage(
                (errors as AxiosError<{ message: string }>)?.response?.data
                    ?.message || (errors as Error).toString()
            )
            setSubmitting(false)
        } */
    }

    return (
        <div className="w-full px-4 xl:w-96 xl:px-0">
            <div className="mb-6 ">
                {message && (
                    <Alert showIcon className="mb-4" type="danger">
                        <>{message}</>
                    </Alert>
                )}
                {emailSent ? (
                    <>
                        <h3 className="mb-1">{t('forgot.paragraph2')}</h3>
                        <p className="mb-1">{t('forgot.paragraph3')}</p>
                        <Formik
                            initialValues={{
                                number: '',
                                hash: hashFromEmail
                            }}
                            validationSchema={validationSchemaNumber}
                            onSubmit={(values, { setSubmitting }) => {
                                if (!disableSubmit) {
                                    onVerificateCode(values, setSubmitting)
                                } else {
                                    setSubmitting(false)
                                }
                            }}
                        >
                            {({ touched, errors, isSubmitting }) => (
                                <Form autoComplete="off">
                                    <FormContainer>
                                        <FormItem
                                            label=""
                                            invalid={
                                                errors.number && touched.number
                                            }
                                            errorMessage={t(
                                                'forgot.error.code'
                                            ).toString()}
                                        >
                                            <Field
                                                className="shadow-lg"
                                                type="text"
                                                autoComplete="off"
                                                name="number"
                                                placeholder={t(
                                                    'forgot.paragraph2'
                                                )}
                                                component={Input}
                                            />
                                        </FormItem>

                                        <Button
                                            block
                                            className="shadow-lg"
                                            loading={isSubmitting}
                                            variant="solid"
                                            type="submit"
                                        >
                                            {t('forgot.button3')}
                                        </Button>
                                    </FormContainer>
                                </Form>
                            )}
                        </Formik>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center lg:hidden  mb-6">
                            <LogoAuth />
                        </div>
                        <h3 className="mb-1 text-center lg:text-left">
                            {t('forgot.paragraph').toString()}
                        </h3>
                        <p className="text-center lg:text-left ">
                            {t('forgot.paragraph1').toString()}
                        </p>
                    </>
                )}
            </div>

            <Formik
                initialValues={{
                    email: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSendMail(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className={emailSent ? 'hidden' : ''}>
                                <FormItem
                                    invalid={errors.email && touched.email}
                                    errorMessage={t(
                                        'forgot.error.email'
                                    ).toString()}
                                >
                                    <Field
                                        className="shadow-lg"
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}
                                    />
                                </FormItem>
                            </div>
                            <Button
                                block
                                className="shadow-lg"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {emailSent
                                    ? t('forgot.button1')
                                    : t('forgot.button')}
                            </Button>

                            <div className="mt-4 text-center">
                                <span>{t('forgot.back1').toString()}</span>
                                <ActionLink to={signInUrl}>
                                    {t('forgot.signin').toString()}
                                </ActionLink>
                            </div>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ForgotPasswordForm
