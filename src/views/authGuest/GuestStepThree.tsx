import { Button, Input } from '@/components/ui'
import { GuestFormProps } from './interfaces/GuestProps.interface'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const GuestStepThree = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props

    const [formData, setFormData] = useState({
        ...formValueStep,
        passWord: ''
    })

    const validationSchema = Yup.object().shape({
        passWord: Yup.string()
            .required('Insira sua senha')
            .min(8, 'A senha deve ter pelo menos 8 caracteres'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('passWord')], 'As senhas não coincidem')
            .required('Confirme sua senha')
    })

    const handleSubmit = (
        values: { passWord: string; confirmPassword: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        const { passWord, confirmPassword } = values


        if (passWord === confirmPassword) {
            const updatedFormData = {
                ...formData,
                passWord
            }
            console.log('Three--Four ', updatedFormData)
            handleStep?.('four', updatedFormData)
        } else {
            console.log('As senhas não coincidem. Por favor, tente novamente.')
        }

        setSubmitting(false)
    }

    return (
        <div className="flex flex-col">
            <h1 className="text-lg lg:text-3xl mb-2">Digite uma senha</h1>
            <p className="mb-2">
                Essa senha servirá para futuros logins na plataforma
            </p>

            <Formik
                initialValues={{
                    passWord: '',
                    confirmPassword: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className="mb-2">
                        <Field
                            className="shadow-lg"
                            type="password"
                            name="passWord"
                            placeholder="Senha"
                            as={Input}
                        />
                        <ErrorMessage
                            name="passWord"
                            component="div"
                            className="text-red-500"
                        />
                    </div>

                    <div className="mb-2">
                        <Field
                            className="shadow-lg"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirme a senha"
                            as={Input}
                        />
                        <ErrorMessage
                            name="confirmPassword"
                            component="div"
                            className="text-red-500"
                        />
                    </div>

                    <Button variant="solid" type="submit" className="w-full">
                        Próximo
                    </Button>
                </Form>
            </Formik>
        </div>
    )
}

export default GuestStepThree
