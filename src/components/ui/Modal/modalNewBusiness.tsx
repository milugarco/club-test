/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Field, Form, Formik, FieldInputProps } from 'formik'
import useAuthHook from '@/utils/hooks/useAuthHook'
import MaskedInput from 'react-text-mask'
import { useState, useEffect } from 'react'
import { SignUpFormSchemaStepThree } from '@/views/auth/SignUp/models/singUp.schema'
import { SignUpFormProps } from '@/views/auth/SignUp/interfaces/singUpProps.interface'
import { validationStepThree } from '@/views/auth/SignUp//models/validation.schema'

export const NewBusinessModal = (props: SignUpFormProps) => {

    const {
        disableSubmit = false,
        className = 'w-1/2 flex flex-col justify-center items-center',
        signInUrl = '/sign-in',
        handleStep,
    } = props



    const handleDocumentChange = (value: string) => {
        setDocumentValue?.(value)
    }


    const handleBusinessChange = (value: string) => {
        setBusinessValue?.(value)
    }


    const { signUp } = useAuthHook()

    const [businessName, setBusinessValue] = useState('')
    const [documentValue, setDocumentValue] = useState('')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [message, setMessage] = useTimeOutMessage()

    const [formValues, setFormValues] = useState({
        documentValue: '',
        businessName: '',
    });

    useEffect(() => {
        setFormValues({
            ...formValues,
            documentValue,
            businessName,
        });

    }, [documentValue, businessName]);

    const onSignUp = async (
        values: SignUpFormSchemaStepThree,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const {
            documentValue,
            businessName
        } = values
        setSubmitting(true)
        const result = await signUp({
            documentValue,
            businessName,
        })

        if (result?.status === 'failed') {
            setMessage(result.message)
        }

        setSubmitting(false)
    }


    const validateInputs = async () => {
        try {
            await validationStepThree.validate({
                documentValue: documentValue,
                businessName: businessName,
            });

            handleStep?.('three')

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='flex flex-col justify-center items-center w-full h-full  px-4 gap-4'>
        <div className="mb-2">
                        <h3 className="mb-1">Cadastrar nova empresa</h3>
                        <p>Por favor, insira seus dados para se cadastrar!</p>
                </div>
        <div className={className}>
            <div className='mb-4'>
        {/* <AvatarImageBusinessModal/> */}
        </div>
            <Formik
                initialValues={formValues}
                validationSchema={validationStepThree}
                onSubmit={(values, { setSubmitting }) => {
                    if (!disableSubmit) {
                        onSignUp(values, setSubmitting)
                    } else {
                        setSubmitting(false)
                    }
                }}
            >
                {({ touched, errors, values, handleChange, isSubmitting }) => (

                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="Razão Social"

                                invalid={
                                    errors.businessName &&
                                    touched.businessName
                                }
                                errorMessage={errors.businessName}
                            >
                                <Field
                                    className="shadow-lg"
                                    type="text"
                                    autoComplete="off"
                                    name="businessName"
                                    placeholder="Insira a Razão Social"
                                    component={Input}
                                    value={values.businessName}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleBusinessChange(e.target.value);
                                        handleChange(e);
                                    }}

                                />
                            </FormItem>



                            <FormItem
                                asterisk
                                label="CNPJ / EIN"
                                invalid={errors.documentValue && touched.documentValue}
                                errorMessage={errors.documentValue}
                            >
                                <Field
                                    name="documentValue"
                                    value={values.documentValue}
                                    component={Input}
                                    render={({
                                        field
                                    }: {
                                        field: FieldInputProps<string>
                                    }) => (
                                        <MaskedInput
                                            {...field}
                                            mask={
                                                values.documentValue.length <= 10 ?
                                                    [/\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
                                                    : values.documentValue.length > 10 ?
                                                        [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
                                                        : [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]
                                            }
                                            guide={false}
                                            placeholder="CNPJ"
                                            type="text"
                                            autoComplete="off"
                                            className={`input h-11 shadow-lg ${field.value.trim() === '' && touched.documentValue
                                                ? 'border-red-500 border-2 focus:ring-transparent'
                                                : 'focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg'}`}
                                        />
                                    )}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        handleDocumentChange(e.target.value);
                                        handleChange(e);

                                    }}
                                />
                            </FormItem>
                            <Button

                                block
                                className="shadow-lg"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                onClick={() => validateInputs()}
                            >
                                {isSubmitting
                                    ? 'Cadastrando...'
                                    : 'Cadastrar'}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>

        </div>
    )
}

