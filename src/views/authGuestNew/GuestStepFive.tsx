import React, { useState, useEffect } from 'react'
import { GuestFormPropsNew } from './interfaces/GuestProps.interface'
import CameraRg from './rg/CameraDoc'
import { Button, Radio } from '@/components/ui'
import CameraRgFeV from './rg/CameraVerso'
import CameraCnh from './cnh/CameraCnh'
import UploadCnh from './cnh/UploadCnh'
import CameraPassport from './passport/CameraPassport'
import useDocumentHook from '@/utils/hooks/useDocumentHook'
import { CreateDocumentDto } from '@/client/api-back'
import { DoubleSidedImage } from '@/components/shared'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

export type GuestFormSchemaStepEight = {
    photoDocumentOne: string
    photoDocumentTwo: string
}

const GuestStepFive = (props: GuestFormPropsNew) => {
    const {
        disableSubmit = false,
        handleStep,
        formValueStep,
        className,
    } = props
    const [photoTaken, setPhotoTaken] = React.useState<string | null>(null)
    const [photoTakenTwo, setPhotoTakenTwo] = React.useState<string | null>(
        null
    )
    const [message, setMessage] = useState<string | null>(null)
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
    const [formData, setFormData] = useState({
        photoDocumentOne: formValueStep?.photoDocumentOne || '',
        photoDocumentTwo: formValueStep?.photoDocumentTwo || '',
    })
    const { t } = useTranslation()

    const { documentControllerUploadPhoto, documentControllerUploadPhotoBack } =
        useDocumentHook()

    useEffect(() => {
        setFormData(() => ({
            photoDocumentOne:
                formValueStep?.photoDocumentOne ||
                newUserInput.photoDocumentOne,
            photoDocumentTwo:
                formValueStep?.photoDocumentTwo ||
                newUserInput.photoDocumentTwo,
        }))

        const newUserInput = {
            photoDocumentOne: formData.photoDocumentOne,
            photoDocumentTwo: formData.photoDocumentTwo,

            // ... outros campos ...
        }
        setFormData((prevData) => ({
            ...prevData,
            photoDocumentOne:
                formValueStep?.photoDocumentOne ||
                newUserInput.photoDocumentOne,
            photoDocumentTwo:
                formValueStep?.photoDocumentTwo ||
                newUserInput.photoDocumentTwo,
        }))
    }, [formValueStep])

    const [selectedRadio, setSelectedRadio] = useState('aberto')
    const documentSelect = formValueStep?.documentUser?.type
        ? formValueStep?.documentUser?.type
        : formValueStep?.newEventParticipant?.user?.documents[0].document.type

    const handlePhotoTaken = (imageSrc: string | null) => {
        if (imageSrc) {
            const base64Image = imageSrc.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
            )
            setPhotoTaken(base64Image)
            setPhotoTakenTwo(null)
            setFormData((formData) => ({
                ...formData,
                photoDocumentOne: imageSrc,
            }))
        } else {
            setPhotoTaken(null)
        }
    }

    const handlePhotoTakenTwo = (imageSrcTwo: string | null) => {
        if (imageSrcTwo) {
            const base64Image = imageSrcTwo.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
            )
            setPhotoTakenTwo(base64Image)
            setFormData((formData) => ({
                ...formData,
                photoDocumentTwo: imageSrcTwo,
            }))
        } else {
            setPhotoTakenTwo(null)
        }
    }

    const handleRetakePhoto = () => {
        setPhotoTaken(null)
    }

    const validateInputs = async () => {
        const documentId = formValueStep?.documentUser?.id
            ? formValueStep?.documentUser?.id
            : formValueStep?.newEventParticipant?.user?.documents !== undefined
            ? formValueStep?.newEventParticipant?.user?.documents[0].document.id
            : ''

        const file = { photo: photoTaken, photoTwo: photoTakenTwo }

        if (documentId && file.photo) {
            console.log('mandei a primeira foto', file.photo)
            const response = await documentControllerUploadPhoto(
                documentId,
                file.photo
            )

            if (response.status === 'failed') {
                setMessage(t('authGuest.error.message1').toString())
                return
            }
        }

        if (documentId && file.photoTwo) {
            const response = await documentControllerUploadPhotoBack(
                documentId,
                file.photoTwo
            )

            if (response.status === 'failed') {
                setMessage(t('authGuest.error.message1').toString())
                return
            }
        }

        handleStep?.('seven', {
            ...formValueStep,
            photoDocumentOne: formData.photoDocumentOne,
            photoDocumentTwo: formData.photoDocumentTwo,
        })
    }

    const handleRadioChange = (val: string) => {
        setSelectedRadio(val)

        // Resete as imagens quando a seleção mudar
        setPhotoTaken(null)
        setPhotoTakenTwo(null)
        // Você também pode redefinir o formData, se necessário.
    }

    return (
        <div>
            {message ? (
                <div className={className}>
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
            ) : (
                <>
                    {documentSelect === 'CNH' ? (
                        <>
                            <Radio.Group
                                value={selectedRadio}
                                className="flex flex-row sm:flex-row gap-4 justify-center items-center mb-4"
                                onChange={handleRadioChange}
                            >
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/img/IconCNHfull.png"
                                        alt="Imagem Overlay"
                                        className="h-24 sm:h-24 w-20 mb-4"
                                    />
                                    <Radio
                                        defaultChecked
                                        value={'aberto'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.cnhPhoto'
                                        ).toString()}
                                    </Radio>
                                </div>
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/img/IconCNHtwo.png"
                                        alt="Imagem Overlay"
                                        className="h-24 sm:h-24 w-20 mb-4"
                                    />
                                    <Radio
                                        value={'pdf'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.cnhUpload'
                                        ).toString()}
                                    </Radio>
                                </div>
                            </Radio.Group>
                            {selectedRadio === 'aberto' ? (
                                <>
                                    <CameraCnh
                                        capturedImage={photoTaken}
                                        onPhotoTaken={handlePhotoTaken}
                                        onRetakePhoto={handleRetakePhoto}
                                    />
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className={`w-full md:w-60 shadow-lg${
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : isPhotoUploaded === false)
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            variant="solid"
                                            type="submit"
                                            disabled={
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : isPhotoUploaded == false)
                                            }
                                            onClick={() => validateInputs()}
                                        >
                                            {t(
                                                'authGuest.nextButton'
                                            ).toString()}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <UploadCnh
                                    formValueStep={formValueStep}
                                    handleStep={handleStep}
                                />
                            )}
                        </>
                    ) : documentSelect === 'RG' ? (
                        <>
                            <Radio.Group
                                value={selectedRadio}
                                className="flex flex-col sm:flex-row gap-4 sm:justify-center items-center mb-4"
                                onChange={handleRadioChange}
                            >
                                <div className="flex flex-col">
                                    <img
                                        src="/img/IconRGfull.png"
                                        alt="Imagem Overlay"
                                        className=" w-48 mb-4"
                                    />
                                    <Radio
                                        defaultChecked
                                        value={'aberto'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.rgPhoto1'
                                        ).toString()}
                                    </Radio>
                                </div>
                                <div className="flex flex-col">
                                    <img
                                        src="/img/IconRGtwo.png"
                                        alt="Imagem Overlay"
                                        className=" w-48 mb-4"
                                    />
                                    <Radio
                                        value={'frenteVerso'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.rgPhoto2'
                                        ).toString()}
                                    </Radio>
                                </div>
                            </Radio.Group>
                            {selectedRadio === 'aberto' ? (
                                <>
                                    <CameraRg
                                        capturedImage={photoTaken}
                                        onPhotoTaken={handlePhotoTaken}
                                        onRetakePhoto={handleRetakePhoto}
                                    />
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className={`w-full md:w-60 shadow-lg ${
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !photoTaken &&
                                                      photoTakenTwo !== '')
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            variant="solid"
                                            type="submit"
                                            disabled={
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !(
                                                          photoTaken &&
                                                          photoTakenTwo
                                                      ))
                                            }
                                            onClick={() => validateInputs()}
                                        >
                                            {t(
                                                'authGuest.nextButton'
                                            ).toString()}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <CameraRgFeV
                                        capturedImage={
                                            selectedRadio === 'aberto'
                                                ? photoTaken
                                                : photoTakenTwo
                                        }
                                        onPhotoTaken={handlePhotoTaken}
                                        onPhotoTakenTwo={handlePhotoTakenTwo}
                                        onRetakePhoto={handleRetakePhoto}
                                    />
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className={`w-full md:w-60 shadow-lg ${
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !photoTaken &&
                                                      photoTakenTwo !== '')
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            variant="solid"
                                            type="submit"
                                            disabled={
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !(
                                                          photoTaken &&
                                                          photoTakenTwo
                                                      ))
                                            }
                                            onClick={() => validateInputs()}
                                        >
                                            {t(
                                                'authGuest.nextButton'
                                            ).toString()}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    ) : documentSelect === 'PASSPORT' ? (
                        <>
                            <div className="flex flex-col sm:flex-col gap-4 sm:justify-center items-center mb-4">
                                <div className="flex flex-col items-center">
                                    <img
                                        src="/img/IconPASSPORTfull.png"
                                        alt="Imagem Overlay"
                                        className="h-24 sm:h-24 w-20 mb-4"
                                    />
                                    <p className="flex flex-col text-center">
                                        {t(
                                            'authGuest.fiveStep.passport'
                                        ).toString()}
                                    </p>
                                </div>
                                <CameraPassport
                                    capturedImage={photoTaken}
                                    onPhotoTaken={handlePhotoTaken}
                                    onRetakePhoto={handleRetakePhoto}
                                />
                                <Button
                                    className={` w-full md:w-60 shadow-lg ${
                                        disableSubmit || !photoTaken
                                            ? 'disabled'
                                            : ''
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
                        <>
                            <Radio.Group
                                value={selectedRadio}
                                className="flex flex-col sm:flex-row gap-4 sm:justify-center items-center mb-4"
                                onChange={handleRadioChange}
                            >
                                <div className="flex flex-col">
                                    <img
                                        src="/img/IconRGfull.png"
                                        alt="Imagem Overlay"
                                        className=" w-48 mb-4"
                                    />
                                    <Radio
                                        defaultChecked
                                        value={'aberto'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.rgPhoto1'
                                        ).toString()}
                                    </Radio>
                                </div>
                                <div className="flex flex-col">
                                    <img
                                        src="/img/IconRGtwo.png"
                                        alt="Imagem Overlay"
                                        className=" w-48 mb-4"
                                    />
                                    <Radio
                                        value={'frenteVerso'}
                                        className="flex flex-col text-center"
                                    >
                                        {t(
                                            'authGuest.fiveStep.rgPhoto2'
                                        ).toString()}
                                    </Radio>
                                </div>
                            </Radio.Group>
                            {selectedRadio === 'aberto' ? (
                                <>
                                    <CameraRg
                                        capturedImage={photoTaken}
                                        onPhotoTaken={handlePhotoTaken}
                                        onRetakePhoto={handleRetakePhoto}
                                    />
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className={`w-full md:w-60 shadow-lg ${
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !photoTaken &&
                                                      photoTakenTwo !== '')
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            variant="solid"
                                            type="submit"
                                            disabled={
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !(
                                                          photoTaken &&
                                                          photoTakenTwo
                                                      ))
                                            }
                                            onClick={() => validateInputs()}
                                        >
                                            {t(
                                                'authGuest.nextButton'
                                            ).toString()}
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <CameraRgFeV
                                        capturedImage={
                                            selectedRadio === 'aberto'
                                                ? photoTaken
                                                : photoTakenTwo
                                        }
                                        onPhotoTaken={handlePhotoTaken}
                                        onPhotoTakenTwo={handlePhotoTakenTwo}
                                        onRetakePhoto={handleRetakePhoto}
                                    />
                                    <div className="flex justify-center items-center">
                                        <Button
                                            className={`w-full md:w-60 shadow-lg ${
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !photoTaken &&
                                                      photoTakenTwo !== '')
                                                    ? 'disabled'
                                                    : ''
                                            }`}
                                            variant="solid"
                                            type="submit"
                                            disabled={
                                                disableSubmit ||
                                                (selectedRadio === 'aberto'
                                                    ? !photoTaken
                                                    : !(
                                                          photoTaken &&
                                                          photoTakenTwo
                                                      ))
                                            }
                                            onClick={() => validateInputs()}
                                        >
                                            {t(
                                                'authGuest.nextButton'
                                            ).toString()}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </div>
    )
}
export default GuestStepFive
