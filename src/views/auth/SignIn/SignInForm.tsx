import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useAuthHook from '@/utils/hooks/useAuthHook'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import { useTranslation } from 'react-i18next'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    forgotPasswordUrl?: string
    signUpUrl?: string
}

type SignInFormSchema = {
    userName: string
    password: string
    rememberMe: boolean
}

const validationSchema = Yup.object().shape({
    userName: Yup.string().required('Insira um usuario'),
    password: Yup.string().required('Insira sua senha'),
    rememberMe: Yup.bool()
})

const SignInForm = (props: SignInFormProps) => {
    const { t } = useTranslation()
    const {
        disableSubmit = false,
        className,
        forgotPasswordUrl = '/forgot-password',
        signUpUrl = '/sign-up'
    } = props

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuthHook()

    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { userName, password } = values
        setSubmitting(true)

        const result = await signIn({ userName, password })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }

    return (
        <div className="w-full">
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <>{message}</>
                </Alert>
            )}
            <Formik
                initialValues={{
                    userName: '',
                    password: '',
                    rememberMe: true
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignIn(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label={t('signin.label.username').toString()}
                                invalid={
                                    (errors.userName &&
                                        touched.userName) as boolean
                                }
                                errorMessage={t(
                                    'signin.label.error.username'
                                ).toString()}
                            >
                                <Field
                                    className="shadow-lg"
                                    type="text"
                                    autoComplete="off"
                                    name="userName"
                                    placeholder={t('signin.label.username')}
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label={t('signin.label.password').toString()}
                                invalid={
                                    (errors.password &&
                                        touched.password) as boolean
                                }
                                errorMessage={t(
                                    'signin.label.error.password'
                                ).toString()}
                            >
                                <Field
                                    className="shadow-lg rounded-full"
                                    autoComplete="off"
                                    name="password"
                                    placeholder={t('signin.label.password')}
                                    component={PasswordInput}
                                />
                            </FormItem>
                            <div className="flex justify-between mb-6">
                                <Field
                                    className="mb-0"
                                    name="rememberMe"
                                    component={Checkbox}
                                >
                                    {t('signin.label.remember')}
                                </Field>
                                <ActionLink to={forgotPasswordUrl}>
                                    {t('signin.label.forgotpw')}
                                </ActionLink>
                            </div>
                            <Button
                                block
                                className="shadow-lg"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                            >
                                {isSubmitting
                                    ? t('signin.label.login1').toString()
                                    : t('signin.label.login').toString()}
                            </Button>
                            <div className="mt-4 text-center flex flex-col w-[100%] gap-2">
                                <span>{t('signin.label.join')} </span>
                                <ActionLink to={signUpUrl}>
                                    {' '}
                                    <Button className=" w-[100%]">
                                        {t('signin.label.register')}
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

export default SignInForm
