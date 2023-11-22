import { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'

interface CameraRg {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function CameraRg({ onPhotoTaken, onRetakePhoto, capturedImage }: CameraRg) {
    const webcamRef = useRef<Webcam | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
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




            // const imageSrc = webcamRef.current.getScreenshot({
            //     width: width,
            //     height: height
            // });
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
        setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
    }

    const videoConstraints = {
        facingMode: facingMode,
        height: 400,
        width: 800,
    }

    useEffect(() => {
        // Verifica se hasUserMedia é true após 3 segundos
        const checkHasUserMedia = setTimeout(() => {
            setHasUserMedia(!!webcamRef.current)
            // Se hasUserMedia é true, a webcam está disponível
            // Se hasUserMedia é false, a webcam não está disponível
            if (
                webcamRef.current &&
                webcamRef.current.stream &&
                webcamRef.current.stream.active
            ) {
                setShowAlertGuest(false)
            }
        }, 4000) // 3000 milissegundos = 3 segundos

        // Limpa o timer para evitar que a verificação ocorra após o componente ser desmontado
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
                    {t('authGuest.rg.paragraph').toString()}
                    </h1>
                    {img === null ? (
                        <>
                            <div className="webcam-overlay relative mb-4 flex flex-col items-center justify-center md:w-full lg:w-[900px]  rounded-lg">
                                <Webcam
                                    ref={webcamRef}
                                    audio={false}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg w-full "
                                    mirrored={false}
                                    screenshotQuality={0.7}
                                    height={400}
                                    width={800}
                                    videoConstraints={videoConstraints}
                                />
                                {showAlertGuest ? (
                                    <div className="absolute h-full w-full bg-contain bg-[#1E252B] opacity-70 rounded-lg z-30 flex flex-col justify-center items-center">
                                        <img
                                            src="/img/animationPhone.gif"
                                            alt="Imagem Overlay"
                                            className="opacity-70 sm:h-1/2"
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
                                    className="mb-4 absolute bottom-1 w-12 h-12 rounded-full bg-red-500"
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
                                <Button className="mb-4 w-full md:w-60" onClick={retakePhoto}>
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

export default CameraRg
