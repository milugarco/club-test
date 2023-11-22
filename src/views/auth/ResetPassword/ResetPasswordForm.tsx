import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import { apiResetPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useLocation, useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import type { AxiosError } from 'axios'
import { LogoAuth } from '@/components/layouts/AuthLayout/Logo'
import useForgotPasswordHook from '@/utils/hooks/useForgotPasswordHook'
import { t } from 'i18next'

interface ResetPasswordFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}
type ResetPasswordFormSchema = {
    hash: string
    number: string
    password: string
    confirmPassword: string
}
type PasswordResetType = {
    number: string
    hash: string
    password: string
}

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required(t('reset.error.passwordRequired').toString())
        .min(8, t('reset.error.passwordMinLength').toString())
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&#+_-])[A-Za-z\d@,$!%*?&#+_-]/,
            t('reset.error.passwordComplexity').toString()
        ),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref('password')],
        t('reset.error.passwordMismatch').toString()
    )
})

const ResetPasswordForm = (props: ResetPasswordFormProps) => {
    const { disableSubmit = false, className, signInUrl = '/sign-in' } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const { passwordReset } = useForgotPasswordHook()
    const [errorMessage, setErrorMessage] = useTimeOutMessage()

    const location = useLocation()
    const state: any = location.state

    const hashFromNumber = state?.hashFromNumber
    const number = state?.number

    const navigate = useNavigate()

    const onResetPassword = async (
        values: ResetPasswordFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const ResetPasswordData: PasswordResetType = {
            number: number,
            hash: hashFromNumber,
            password: values.password || ''
        }

        try {
            const result = await passwordReset(ResetPasswordData)

            if (result?.status === 'success') {
                setSubmitting(false)
                setResetComplete(true)
                
            } else {
                setMessage(result.message)
              }
              setSubmitting(false)
        } catch (error) {
            //
        }
    }
    const onContinue = () => {
        navigate('/sign-in')
    }

    return (
        <div className="w-full px-4 xl:w-96 xl:px-0">
            <div className="mb-6">
                {message && (
                    <Alert showIcon className="mb-4" type="danger">
                        <>{message}</>
                    </Alert>
                )}
                {resetComplete ? (
                    <>
                        <div className="flex justify-center items-center lg:hidden mb-6">
                            <LogoAuth />
                        </div>
                        <h3 className="mb-1 text-center  lg:text-2xl">
                            {t('reset.Redefinition').toString()}
                        </h3>
                        <p className="text-center lg:text-left">
                            {t('reset.success').toString()}
                        </p>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center items-center lg:hidden mb-6">
                            <LogoAuth />
                        </div>
                        <h3 className="mb-1 text-center lg:text-left lg:text-2xl">
                            {t('reset.set').toString()}
                        </h3>
                        <p className="text-center lg:text-left">
                            {t('reset.different').toString()}
                        </p>
                    </>
                )}
            </div>

            <Formik
                initialValues={{
                    number: number,
                    hash: hashFromNumber,
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onResetPassword(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer className="">
                            {!resetComplete ? (
                                <>
                                    
                                    <FormItem
                                        label={t(
                                            'reset.newPassword'
                                        ).toString()}
                                        invalid={
                                            errors.password && touched.password
                                        }
                                        errorMessage={
                                            errors.password && touched.password
                                                ? errors.password
                                                : ''
                                        }
                                    >
                                        <Field
                                            className="mb-4"
                                            autoComplete="off"
                                            name="password"
                                            placeholder={t(
                                                'reset.newPassword'
                                            ).toString()}
                                            component={PasswordInput}
                                        />
                                    </FormItem>

                                    <FormItem
                                        label={t('reset.confirm').toString()}
                                        invalid={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                        }
                                        errorMessage={
                                            errors.confirmPassword &&
                                            touched.confirmPassword
                                                ? errors.confirmPassword
                                                : ''
                                        }
                                    >
                                        <Field
                                            autoComplete="off"
                                            name="confirmPassword"
                                            placeholder={t(
                                                'reset.confirm'
                                            ).toString()}
                                            component={PasswordInput}
                                        />
                                    </FormItem>
                                    <Button
                                        block
                                        loading={isSubmitting}
                                        variant="solid"
                                        type="submit"
                                    >
                                        {isSubmitting
                                            ? t(
                                                  'reset.buttonLoading'
                                              ).toString()
                                            : t('reset.buttonReset').toString()}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    block
                                    variant="solid"
                                    type="button"
                                    onClick={onContinue}
                                >
                                    {t('reset.continue').toString()}
                                </Button>
                            )}

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

export default ResetPasswordForm
