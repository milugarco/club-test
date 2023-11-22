import { useRef, useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import Webcam from 'react-webcam'
import AlertGuestCam from '@/views/authGuest/styles/AlertGuestCam'
import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'



interface FacialRecognitionMockupProps {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function FacialRecognitionMockup({
    onPhotoTaken,
    onRetakePhoto,
    capturedImage,
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
            let width = 350 // largura padrão da webcam
            let height = 500 // altura padrão da webcam

            // const imageSrc = webcamRef.current.getScreenshot({
            //     width: width,
            //     height: height
            // });

            setImg(webcamRef.current.getScreenshot())
            setShowCapturedImage(true)
            onPhotoTaken(webcamRef.current.getScreenshot())
        }
    }, [onPhotoTaken]);

    const { t } = useTranslation()

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
        <div className="w-full ">
            {loading ? (
                <div className="loading-screen flex flex-row justify-center items-center mb-4">
                    <p>{t('facial-cam.loading').toString()}</p>
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
                                                    {t("facial-cam.loading1")}
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
                            <div className="xl:w-96 w-full flex flex-col justify-center">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <img
                                        src={img}
                                        alt="screenshot"
                                        className="rounded-lg "
                                    />
                                    {/* w-max-[500px] h-max-[350px] */}
                                </div>

                                <div className="flex justify-center items-center w-full">
                                    <Button className="mb-4" block onClick={retakePhoto}>
                                        {t("facial-cam.again")}
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
