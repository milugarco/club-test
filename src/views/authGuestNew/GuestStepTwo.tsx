import { Button, Card } from '@/components/ui'
import {

    GuestFormPropsNew,
} from './interfaces/GuestProps.interface'
import React, { useState } from 'react'
import FacialRecognitionMockup from './CameraValidationFacial'
import useUserHook from '@/utils/hooks/useUsersHook'
import { DoubleSidedImage } from '@/components/shared'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import useClubEventParticipantClubHook from '@/utils/hooks/useClubEventParticipantClubHook'
import { useTranslation } from 'react-i18next'

const GuestStepTwo = (props: GuestFormPropsNew) => {
    const { disableSubmit = false, handleStep, formValueStep } = props

    const [photoTaken, setPhotoTaken] = React.useState<string | null>(null)
    const [message, setMessage] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        photo: formValueStep?.photo || '',
        guest: formValueStep?.guest,
        eventParticipant: formValueStep?.newEventParticipant,
    })
    const { eventParticipantClubControllerUploadPhoto } =
        useClubEventParticipantClubHook()

    const handlePhotoTaken = (imageSrc: string | null) => {
        if (imageSrc) {
            const base64Image = imageSrc.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
            )
            setPhotoTaken(base64Image)
            setFormData((prevData) => ({
                ...prevData,
                photo: base64Image,
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
        if (formValueStep?.newEventParticipant?.id) {
            const response = await eventParticipantClubControllerUploadPhoto(
                formValueStep.newEventParticipant?.id,
                formData.photo
            )
            if (response.status === 'failed') {

                return setMessage(t('authGuest.error.message').toString())
            } else {
                handleStep?.('three', {
                    ...formValueStep,
                    photo: formData.photo,
                })
            }
        } else {
            console.log('erro passei direto')
            return setMessage(t('authGuest.error.message').toString())
        }
    }
    const {t} = useTranslation()

    return (
        <Card className="flex flex-col justify-center items-center w-full border-none">
            {!message ? (
                <>
                    <FacialRecognitionMockup
                        capturedImage={photoTaken}
                        onPhotoTaken={handlePhotoTaken}
                        onRetakePhoto={handleRetakePhoto}
                    />
                    <div className="flex justify-center items-center">
                        <Button
                            className={`w-full md:w-60 shadow-lg ${
                                disableSubmit && !photoTaken ? 'disabled' : ''
                            }`}
                            variant="solid"
                            type="submit"
                            disabled={disableSubmit || !photoTaken}
                            onClick={() => validateInputs()}
                        >
                             {t('authGuest.nextButton').toString()}
                        </Button>
                    </div>
                </>
            ) : (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Access Denied!"
                    />
                    <div className="mt-6 text-center">
                        <h3 className="mb-2">Opppps!</h3>
                        <p className="text-base">{message}</p>
                    </div>
                    <Button
                        className="w-32 mt-8 text-xl"
                        variant="solid"
                        icon={<HiOutlineChevronLeft />}
                        onClick={() =>
                            handleStep?.('one', {
                                ...formValueStep,
                            })
                        }
                    >
                        {t('authGuest.backButton').toString()}
                    </Button>
                </div>
            )}
        </Card>
    )
}

export default GuestStepTwo
