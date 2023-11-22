import { useRef, useState, useEffect, useCallback } from 'react'

import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'
import Webcam from 'react-webcam'
import { useTranslation } from 'react-i18next'

interface CameraPassportType {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function CameraPassport({
    onPhotoTaken,
    onRetakePhoto,
    capturedImage
}: CameraPassportType) {
    const webcamRef = useRef<Webcam | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user') // Adicione o estado facingMode
    const [hasUserMedia, setHasUserMedia] = useState(false)
    const [showAlertGuest, setShowAlertGuest] = useState(true)
    const [larguraTela, setLarguraTela] = useState(window.innerWidth) 

    const { t } = useTranslation()
    useEffect(() => {
        const handleResize = () => {
            setLarguraTela(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const capture = useCallback(() => {
        if (webcamRef.current) {
            let width = 200; 
            let height = 500; 
    
            
    

            const imageSrc = webcamRef.current.getScreenshot();
    
            setImg(imageSrc);
            setShowCapturedImage(true);
            onPhotoTaken(imageSrc);
        }
    }, [ onPhotoTaken]);

    const retakePhoto = () => {
        setImg(null)
        setShowCapturedImage(false)
        onRetakePhoto()
    }

    const toggleCamera = () => {
        setFacingMode(facingMode === 'user' ? 'environment' : 'user')
    }

    const videoConstraints = {
        facingMode: facingMode,
        height: 600,
        width: 500,
    }

    useEffect(() => {

        const checkHasUserMedia = setTimeout(() => {
            setHasUserMedia(!!webcamRef.current)

            if (
                webcamRef.current &&
                webcamRef.current.stream &&
                webcamRef.current.stream.active
            ) {
                setShowAlertGuest(false)
            }
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
                    <p>{t('authGuest.camStep.loading').toString()}</p>
                    <Spinner />
                </div>
            ) : (
                <div className="FacialRecognitionMockup flex flex-col justify-center items-center gap-4">
                    <h1 className="text-sm lg:text-3xl text-center">
                    {t('authGuest.passport.paragraph1').toString()}
                    </h1>
                    {img === null ? (
                        <>
                            <div className="webcam-overlay relative flex flex-col justify-center items-center rounded-lg">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg"
                                    mirrored={false}
                                    screenshotQuality={0.7}
                                    height={600}
                                    width={500}
                                    videoConstraints={videoConstraints}
                                />

                                <button
                                    className="absolute flex justify-center items-center right-4 bottom-4 rounded-full sm:w-10 sm:h-10 w-8 h-8"
                                    onClick={toggleCamera}
                                >
                                    <HiOutlineRefresh
                                        className=" text-white"
                                        size={20}
                                    />
                                </button>
                                <button
                                    className="mb-4 absolute bottom-1  w-12 h-12 rounded-full bg-red-500"
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
                                <Button className="w-full md:w-60" onClick={retakePhoto}>
                                {t('authGuest.camStep.tryAgainButton').toString()}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CameraPassport
