import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'
import Webcam from 'react-webcam'
import { useCallback, useEffect, useRef, useState } from 'react'

interface PhotoCnh {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function CameraCnh({ onPhotoTaken, onRetakePhoto, capturedImage }: PhotoCnh) {
    const webcamRef = useRef<Webcam | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const [hasUserMedia, setHasUserMedia] = useState(false)
    const [showAlertGuest, setShowAlertGuest] = useState(true)

    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot({
                width: 454,
                height: 600
            })
            setImg(imageSrc)
            setShowCapturedImage(true)
            onPhotoTaken(imageSrc)
        }
    }, [onPhotoTaken])

    const retakePhoto = () => {
        setImg(null)
        setShowCapturedImage(false)
        onRetakePhoto()
    }

    const toggleCamera = () => {
        setFacingMode(facingMode === 'user' ? 'environment' : 'user')
    }

    const videoConstraints = {
        width: 454,
        height: 600,
        facingMode: facingMode
    }

    useEffect(() => {
        const checkHasUserMedia = setTimeout(() => {
            setHasUserMedia(!!webcamRef.current)
            setShowAlertGuest(false)
        }, 4000)

        return () => {
            clearTimeout(checkHasUserMedia)
        }
    }, [hasUserMedia])

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <div>
            {loading ? (
                <div className="loading-screen flex flex-row justify-center items-center mb-4">
                    <p>Carregando a câmera...</p>
                    <Spinner />
                </div>
            ) : (
                <div className="FacialRecognitionMockup flex flex-col justify-center items-center gap-4">
                    <h1 className="text-sm lg:text-3xl text-center">
                        Tire uma foto da sua CNH aberta
                    </h1>
                    {img === null ? (
                        <>
                            <div className="webcam-overlay relative mb-4 flex flex-col justify-center lg:w-[600px] items-center  rounded-lg">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg  "
                                    mirrored={true}
                                    screenshotQuality={0.7}
                                    videoConstraints={videoConstraints}
                                />
                                {showAlertGuest ? (
                                    <div className="absolute h-full w-full bg-contain bg-[#1E252B] opacity-70 rounded-lg z-30 flex flex-col justify-center items-center">
                                        <img
                                            src="/img/animationPhone.gif"
                                            alt="Imagem Overlay"
                                            className="opacity-70 h-40 sm:h-1/2"
                                        />
                                    </div>
                                ) : null}
                                <button
                                    className="absolute bottom-0 right-0 flex justify-center items-center rounded-full sm:w-10 sm:h-10 w-8 h-8"
                                    onClick={toggleCamera}
                                >
                                    <HiOutlineRefresh
                                        className="absolute center text-white"
                                        size={20}
                                    />
                                </button>
                                <button
                                    className="mb-4 absolute bottom-1  w-12 h-12 rounded-full bg-white"
                                    onClick={capture}
                                ></button>
                            </div>
                        </>
                    ) : (
                        <div>
                            <img
                                src={img!}
                                alt="screenshot"
                                className="rounded-lg mb-4"
                            />
                            <div className="flex justify-center items-center">
                                <Button className="mb-4" onClick={retakePhoto}>
                                    Tirar novamente
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CameraCnh
