import React, { useState, useEffect } from 'react'
import { GuestFormProps } from './interfaces/GuestProps.interface'
import CameraRg from './rg/CameraDoc'
import { Button, Radio } from '@/components/ui'
import CameraRgFeV from './rg/CameraVerso'
import CameraCnh from './cnh/CameraCnh'
import UploadCnh from './cnh/UploadCnh'
import CameraPassport from './passport/CameraPassport'

export type GuestFormSchemaStepEight = {
    photoDocumentOne: string
    photoDocumentTwo: string
}

const GuestStepEight = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props
    const [photoTaken, setPhotoTaken] = React.useState<string | null>(null)
    const [photoTakenTwo, setPhotoTakenTwo] = React.useState<string | null>(
        null
    ) // Adicionamos outra imagem
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
    const [formData, setFormData] = useState({
        photoDocumentOne: formValueStep?.photoDocumentOne || '',
        photoDocumentTwo: formValueStep?.photoDocumentTwo || ''
    })

    useEffect(() => {
    
        const newUserInput = {
            photoDocumentOne: formData.photoDocumentOne,
            photoDocumentTwo: formData.photoDocumentTwo

       
        }
        setFormData((prevData) => ({
            ...prevData,
            photoDocumentOne:
                formValueStep?.photoDocumentOne ||
                newUserInput.photoDocumentOne,
            photoDocumentTwo:
                formValueStep?.photoDocumentTwo || newUserInput.photoDocumentTwo
        }))
    }, [formValueStep])

    const [selectedRadio, setSelectedRadio] = useState('aberto')
    const documentSelect = formValueStep?.documentType

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
                photoDocumentOne: base64Image
            }))
        } else {
            setPhotoTaken(null)
        }
    }

    const handlePhotoTakenTwo = (imageSrcTwo: string | null) => {
        if (imageSrcTwo) {
            const base64ImageTwo = imageSrcTwo.replace(
                /^data:image\/[a-z]+;base64,/,
                ''
            )
            setPhotoTaken(base64ImageTwo)
            setPhotoTakenTwo(base64ImageTwo)
            setFormData((formData) => ({
                ...formData,
                photoDocumentTwo: base64ImageTwo
            }))
        } else {
            setPhotoTaken(null)
        }
    }

    const handleRetakePhoto = () => {
        setPhotoTaken(null)
    }

    const validateInputs = async () => {
        handleStep?.('nine', { ...formData, ...formValueStep })
    }

    const handleRadioChange = (val: string) => {
        setSelectedRadio(val)


        setPhotoTaken(null)
        setPhotoTakenTwo(null)

    }

    return (
        <div>
            {documentSelect === 'cnh' ? (
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
                                Foto da CNH aberta
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
                                Upload da CNH digital
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
                            <Button
                                block
                                className={`shadow-lg ${
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
                                Próximo
                            </Button>
                        </>
                    ) : (
                        <UploadCnh
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    )}
                </>
            ) : documentSelect === 'register' ? (
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
                                className="h-12 sm:h-16 w-full mb-4"
                            />
                            <Radio
                                defaultChecked
                                value={'aberto'}
                                className="flex flex-col text-center"
                            >
                                Foto única do RG aberto
                            </Radio>
                        </div>
                        <div className="flex flex-col">
                            <img
                                src="/img/IconRGtwo.png"
                                alt="Imagem Overlay"
                                className="h-12 sm:h-16 w-full mb-4"
                            />
                            <Radio
                                value={'frenteVerso'}
                                className="flex flex-col text-center"
                            >
                                Foto do RG frente e verso
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
                            <Button
                                block
                                className={`shadow-lg ${
                                    disableSubmit ||
                                    (selectedRadio === 'aberto'
                                        ? !photoTaken
                                        : !photoTaken && photoTakenTwo !== '')
                                        ? 'disabled'
                                        : ''
                                }`}
                                variant="solid"
                                type="submit"
                                disabled={
                                    disableSubmit ||
                                    (selectedRadio === 'aberto'
                                        ? !photoTaken
                                        : !(photoTaken && photoTakenTwo))
                                }
                                onClick={() => validateInputs()}
                            >
                                Próximo
                            </Button>
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
                            <Button
                                block
                                className={`shadow-lg ${
                                    disableSubmit ||
                                    (selectedRadio === 'aberto'
                                        ? !photoTaken
                                        : !photoTaken && photoTakenTwo !== '')
                                        ? 'disabled'
                                        : ''
                                }`}
                                variant="solid"
                                type="submit"
                                disabled={
                                    disableSubmit ||
                                    (selectedRadio === 'aberto'
                                        ? !photoTaken
                                        : !(photoTaken && photoTakenTwo))
                                }
                                onClick={() => validateInputs()}
                            >
                                Próximo
                            </Button>
                        </>
                    )}
                </>
            ) : (
                <>
                    <div className="flex flex-col sm:flex-col gap-4 sm:justify-center items-center mb-4">
                        <div className="flex flex-col items-center">
                            <img
                                src="/img/IconPASSPORTfull.png"
                                alt="Imagem Overlay"
                                className="h-24 sm:h-24 w-20 mb-4"
                            />
                            <p className="flex flex-col text-center">
                                Foto do passaporte aberto
                            </p>
                        </div>
                        <CameraPassport
                            capturedImage={photoTaken}
                            onPhotoTaken={handlePhotoTaken}
                            onRetakePhoto={handleRetakePhoto}
                        />
                        <Button
                            block
                            className={`shadow-lg ${
                                disableSubmit || !photoTaken ? 'disabled' : ''
                            }`}
                            variant="solid"
                            type="submit"
                            disabled={disableSubmit || !photoTaken}
                            onClick={() => validateInputs()}
                        >
                            Próximo
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default GuestStepEight
