import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Alert from '@/components/ui/Alert'
import PasswordInput from '@/components/shared/PasswordInput'
import { apiResetPassword } from '@/services/AuthService'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { useNavigate } from 'react-router-dom'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import type { CommonProps } from '@/@types/common'
import type { AxiosError } from 'axios'

interface PasswordFormAuthProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
}

type PasswordFormAuthSchema = {
    password: string
    confirmPassword: string
}

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .required('Insira sua nova senha')
        .min(8, 'A senha deve conter pelo menos 8 caracteres'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Suas senhas não coincidem')
        .required('Confirme sua senha')
})

const ResetPasswordForm = (props: PasswordFormAuthProps) => {
    const { disableSubmit = false, className } = props

    const [resetComplete, setResetComplete] = useState(false)

    const [message, setMessage] = useTimeOutMessage()

    const navigate = useNavigate()

    const onSubmit = async (
        values: PasswordFormAuthSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { password } = values
        setSubmitting(true)
        try {
            const resp = await apiResetPassword({ password })
            if (resp.data) {
                setSubmitting(false)
                setResetComplete(true)
            }
        } catch (errors) {
            setMessage(
                (errors as AxiosError<{ message: string }>)?.response?.data
                    ?.message || (errors as Error).toString()
            )
            setSubmitting(false)
        }
    }

    return (
        <div className={className}>
            <div className="mb-6">
                <>
                    <h3 className="mb-1 text-left lg:text-2xl">
                        Definir senha
                    </h3>
                    <p className="text-left">
                        Defina sua senha para acessar a plataforma depois
                    </p>
                </>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    {message}
                </Alert>
            )}
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSubmit(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <FormContainer>
                            <>
                                <FormItem
                                    label="Nova senha"
                                    invalid={
                                        errors.password && touched.password
                                    }
                                    errorMessage={errors.password}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="password"
                                        placeholder="Nova senha"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <FormItem
                                    label="Confirmar senha"
                                    invalid={
                                        errors.confirmPassword &&
                                        touched.confirmPassword
                                    }
                                    errorMessage={errors.confirmPassword}
                                >
                                    <Field
                                        autoComplete="off"
                                        name="confirmPassword"
                                        placeholder="Confirmar senha"
                                        component={PasswordInput}
                                    />
                                </FormItem>
                                <Button block variant="solid" type="submit">
                                    Salvar
                                </Button>
                            </>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ResetPasswordForm
