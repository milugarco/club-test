import React, { useState } from 'react'
import { Button, Card } from '@/components/ui'
import FacialRecognitionMockup from './CameraValidationFacial'
import { GuestFormProps } from './interfaces/GuestProps.interface'

export type GuestFormSchemaStepFour = {
    photo: string
}
const GuestStepFour = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props

    const [photoTaken, setPhotoTaken] = React.useState<string | null>(null)

    const [formData, setFormData] = useState({
        photo: formValueStep?.photo || ''
    })

    const handlePhotoTaken = (imageSrc: string | null) => {
        if (imageSrc) {
            const base64Image = imageSrc.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
            )
            setPhotoTaken(base64Image)
            setFormData((prevData) => ({
                ...prevData,
                photo: base64Image
            }))
            formValueStep!.photo = base64Image
        } else {
            setPhotoTaken(null)
        }
    }

    const handleRetakePhoto = () => {
        setPhotoTaken(null)
    }

    const validateInputs = async () => {
        handleStep?.('five', { ...formData, ...formValueStep })
    }

    return (
        <Card className="flex flex-col justify-center items-center w-full border-none">
            <FacialRecognitionMockup
                capturedImage={photoTaken}
                onPhotoTaken={handlePhotoTaken}
                onRetakePhoto={handleRetakePhoto}
            />
            <Button
                block
                className={`shadow-lg ${
                    disableSubmit && !photoTaken ? 'disabled' : ''
                }`}
                variant="solid"
                type="submit"
                disabled={disableSubmit || !photoTaken}
                onClick={() => validateInputs()}
            >
                Próximooooo
            </Button>
        </Card>
    )
}

export default GuestStepFour
