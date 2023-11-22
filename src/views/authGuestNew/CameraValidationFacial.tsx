import { useRef, useState, useEffect, useCallback } from 'react'

import Webcam from 'react-webcam'
import AlertGuestCam from './styles/AlertGuestCam'
import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

interface FacialRecognitionMockupProps {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function FacialRecognitionMockup({
    onPhotoTaken,
    onRetakePhoto,
    capturedImage
}: FacialRecognitionMockupProps) {
    const webcamRef = useRef<Webcam | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)

    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const [hasUserMedia, setHasUserMedia] = useState(false)
    const [showAlertGuest, setShowAlertGuest] = useState(true)
    const [larguraTela, setLarguraTela] = useState(window.innerWidth)
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
            let width = 350; 
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
        facingMode: facingMode
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

    const {t} = useTranslation()

    return (
        <div className='w-full text-center'>
            <h1 className="text-lg lg:text-3xl mb-2">
            {t('authGuest.camStep.title').toString()}
            </h1>
            {loading ? (
                <div className="loading-screen flex flex-row justify-center items-center mb-4">
                    <p>{t('authGuest.camStep.loading').toString()}</p>
                    <Spinner />
                </div>
            ) : (
                <div className="FacialRecognitionMockup flex flex-col justify-center items-center  gap-4">
                    {showAlertGuest ? <AlertGuestCam /> : null}
                    <div></div>
                    {img === null ? (
                        <>
                                
                            <div className="webcam-overlay mb-4 relative flex justify-center ">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg"
                                    mirrored={true}
                                    screenshotQuality={0.7}
                                    height={350}
                                    width={500}
                                    videoConstraints={videoConstraints}
                                />
                                <img
                                    src="/img/mockupPerfil.png"
                                    alt="Imagem Overlay"
                                    className="absolute h-full bg-contain rounded-lg"
                                />

                                <img
                                    src="/img/logo/logo-dark-full.png"
                                    alt="Imagem Overlay"
                                    className="absolute h-1/9 w-1/5 bottom-2 left-2 bg-contain rounded-lg"
                                />
                                {showAlertGuest ? (
                                    <div className="absolute h-full w-full bg-contain bg-black rounded-lg z-30 flex flex-col justify-center items-center">
                                        <Spinner
                                            className="mb-4 "
                                            size="40px"
                                        />
                                        <div className="loading-screen center flex flex-row justify-center items-center mb-4">
                                            <p>
                                            {t('authGuest.camStep.loading1').toString()}
                                            </p>
                                        </div>
                                    </div>
                                ) : null}

                                <button
                                    className="absolute bottom-0 right-0 flex justify-center items-center rounded-full w-20 h-20"
                                    onClick={toggleCamera}
                                >
                                    <HiOutlineRefresh
                                        className="absolute center text-white"
                                        size={40}
                                    />
                                </button>
                                <button
                                    className="mb-4 absolute bottom-1 w-12 h-12 rounded-full bg-red-500"
                                    onClick={capture}
                                ></button>
                            </div>
                        </>
                    ) : (
                        <div className='xl:w-96 w-full flex flex-col justify-center items-center'>
                            <div className='w-full flex justify-center items-center mb-4'>
                            <img
                                src={img}
                                alt="screenshot"
                                className="rounded-lg "
                            />
                            
                            </div>

                            <div className="flex justify-center items-center md:w-60 w-full">
                                <Button className="mb-4" block onClick={retakePhoto}>
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

export default FacialRecognitionMockup