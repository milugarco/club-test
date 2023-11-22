/* eslint-disable @typescript-eslint/no-unused-vars */
import { FormContainer } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import { Form, Formik } from 'formik'
import Alert from '@/components/ui/Alert'
import useAuthHook from '@/utils/hooks/useAuthHook'
import { useState, useEffect } from 'react'
import { SignUpFormSchemaStepThree } from './models/singUp.schema'
import { SignUpFormProps } from './interfaces/singUpProps.interface'
import { validationStepThree } from './models/validation.schema'
import { SignUpCredential } from '@/@types/auth'
import { useTranslation } from 'react-i18next'
import FacialRecognitionMockup from './CameraValidationFacial'
import { base64ToBlob, blobToFile } from '@/utils/base64ToBlob'
import YourComponent from './test'
import Apptst from './test'
import FacialRecognitionMockupFace from './test'

const SignUpFormStepThree = (props: SignUpFormProps) => {
    const {
        disableSubmit = false,
        className,
        signInUrl = '/sign-in',
        handleStep,
        formValueStep
    } = props

    const handleDocumentChange = (value: string) => {
        setDocumentValue?.(value)
    }

    const handleBusinessChange = (value: string) => {
        setBusinessValue?.(value)
    }

    const { signUp } = useAuthHook()

    const { t } = useTranslation()

    const [businessName, setBusinessValue] = useState('')
    const [documentValue, setDocumentValue] = useState('')
    const [photoFace, setPhotoFace] = useState(null)

    const [message, setMessage] = useTimeOutMessage()

    const [formValues, setFormValues] = useState({
        documentValue: '',
        businessName: '',
        photoFace: null
    })
    const [capturedImage, setCapturedImage] = useState(null)

    const handlePhotoTaken = (image: any) => {
        //const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '')
        setPhotoFace(image.replace(/^data:image\/[a-z]+;base64,/, ''))
    }

    const handleRetakePhoto = () => {
        // Manipule a retomada da foto aqui
        setPhotoFace(null)
    }

    useEffect(() => {
        setFormValues({
            ...formValues,
            photoFace
        })
    }, [photoFace])

    const onSignUp = async (
        values: SignUpFormSchemaStepThree,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        // Converter a base64 em Blob

        const blob = base64ToBlob(photoFace, 'image/jpeg')
        const file = blobToFile(blob)
        
        const signUpData: SignUpCredential = {
            phoneValue: formValueStep ? formValueStep.phoneValue : '',
            userName: formValueStep ? formValueStep.userName : '',
            email: formValueStep ? formValueStep.email : '',
            password: formValueStep ? formValueStep.password : '',
            documentUserValue: formValueStep
                ? formValueStep.documentUserValue
                : '',
            photoFace: file
        }

        setSubmitting(true)

        const result = await signUp(signUpData)

        if (result?.status === 'failed') {
            setMessage(result.message)

        } else {

        }

        setSubmitting(false)
    }

    const validateInputs = async () => {
        await validationStepThree.validate({
            documentValue: documentValue,
            businessName: businessName
        })
    }

    return (
        <div className={className}>
            {message && (
                <Alert showIcon className="mb-4" type="warning">
                    <>{message}</>
                </Alert>
            )}

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
                    <Form autoComplete="off">
                        <FormContainer className="flex flex-col justify-center items-center">
                                <FacialRecognitionMockupFace
                                    capturedImage={photoFace}
                                    onPhotoTaken={handlePhotoTaken}
                                    onRetakePhoto={handleRetakePhoto}
                                />
                            <Button
                                block
                                className="shadow-lg"
                                loading={isSubmitting}
                                variant="solid"
                                type="submit"
                                disabled={!photoFace} // Habilita o botão apenas se uma imagem foi capturada
                                onClick={() => validateInputs()}
                            >
                                {isSubmitting
                                    ? t('register.business.join')
                                    : t('register.join1')}
                            </Button>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
export default SignUpFormStepThree
