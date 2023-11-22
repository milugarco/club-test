import { useRef, useEffect, useState, useCallback } from 'react'
import Webcam from 'react-webcam'
import AlertGuestCam from '@/views/authGuest/styles/AlertGuestCam'
import { Button, Progress, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'
import { drawConnectors } from '@mediapipe/drawing_utils'
import * as cam from '@mediapipe/camera_utils'
import * as FaceMesh from '@mediapipe/face_mesh'

interface FacialRecognitionMockupProps {
    onPhotoTaken: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function FacialRecognitionMockupFace({
    onPhotoTaken,
    onRetakePhoto,
    capturedImage,
}: FacialRecognitionMockupProps) {
    const webcamRef = useRef<Webcam | null>(null)
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const redDivRef = useRef<HTMLDivElement | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)
    let camera: cam.Camera | null = null

    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const [hasUserMedia, setHasUserMedia] = useState(false)
    const [showAlertGuest, setShowAlertGuest] = useState(true)
    const [larguraTela, setLarguraTela] = useState(window.innerWidth)
    const [faceDetected, setFaceDetected] = useState<boolean>(false)
    const [captureTimer, setCaptureTimer] = useState<number | null>(null)
    const [isFaceNearCenter, setIsFaceNearCenter] = useState(false)
    const [progress, setProgress] = useState(0)

    const CENTER_THRESHOLD = 0.03 // Define a margem de tolerância para o centro do rosto
    const CANVAS_CENTER_X = 0.5 // Define a coordenada X do centro da câmera (0.5 = centro da tela)
    const CANVAS_CENTER_Y = 0.5 // Define a coordenada Y do centro da câmera (0.5 = centro da tela)

    useEffect(() => {
        if (webcamRef.current && redDivRef.current) {
          console.log(FaceMesh)
            const createFaceMesh = (): any => {
                return new FaceMesh.FaceMesh({
                    locateFile: (file: string) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
                    },
                })
            }
            const faceMesh: FaceMesh.FaceMesh = createFaceMesh()

            faceMesh.setOptions({
                maxNumFaces: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5,
            })

            faceMesh.onResults((results) => {
                const videoWidth = webcamRef.current?.video!.videoWidth
                const videoHeight = webcamRef.current?.video!.videoHeight

                if (videoWidth && videoHeight) {
                    const canvasElement = canvasRef.current!
                    const canvasCtx = canvasElement.getContext('2d')

                    if (canvasCtx) {
                        canvasCtx.clearRect(
                            0,
                            0,
                            canvasElement.width,
                            canvasElement.height
                        )
                        canvasCtx.drawImage(
                            results.image,
                            0,
                            0,
                            canvasElement.width,
                            canvasElement.height
                        )

                        if (results.multiFaceLandmarks) {
                            let isNearCenter = false

                            for (const landmarks of results.multiFaceLandmarks) {
                                // drawConnectors(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
                                //     color: "#eae8fd",
                                //     lineWidth: 1,
                                // });

                                // Verifica se pelo menos um dos pontos de referência do rosto está próximo ao centro
                                for (const point of landmarks) {
                                    const { x } = point
                                    const { y } = point

                                    if (
                                        Math.abs(x - CANVAS_CENTER_X) <
                                            CENTER_THRESHOLD &&
                                        Math.abs(y - CANVAS_CENTER_Y) <
                                            CENTER_THRESHOLD
                                    ) {
                                        isNearCenter = true

                                        break
                                    }
                                }
                            }

                            setFaceDetected(isNearCenter)
                            setIsFaceNearCenter(isNearCenter)
                        } else {
                            setFaceDetected(false)
                        }
                    }
                }
            })

            if (webcamRef.current) {
                camera = new cam.Camera(webcamRef.current.video!, {
                    onFrame: async () => {
                        const videoWidth = webcamRef.current?.video!.videoWidth
                        const videoHeight =
                            webcamRef.current?.video!.videoHeight

                        canvasRef.current!.width = videoWidth || 0
                        canvasRef.current!.height = videoHeight || 0

                        await faceMesh.send({
                            image: webcamRef.current!.video!,
                        })
                    },
                    width: 640,
                    height: 480,
                })
                camera.start()
            }

            return () => {
                if (camera) {
                    camera.stop()
                }
            }
        }
    }, [webcamRef.current, redDivRef.current])

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

            setImg(webcamRef.current.getScreenshot())
            setShowCapturedImage(true)
            onPhotoTaken(webcamRef.current.getScreenshot())
        }
    }, [onPhotoTaken])

    const retakePhoto = () => {
        setImg(null)
        setShowCapturedImage(false)
        setIsFaceNearCenter(false)
        setProgress(0)
        setFaceDetected(false)
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

    useEffect(() => {
        let captureTimeout: NodeJS.Timeout | null = null

        // Função para capturar a foto
        const capturePhoto = () => {
            if (webcamRef.current) {
                const screenshot = webcamRef.current.getScreenshot()
                setImg(screenshot)
                setShowCapturedImage(true)
                onPhotoTaken(screenshot)
                setFaceDetected(false)
            }
        }

        // Lógica para aguardar 4 segundos e então chamar a captura se faceDetected ainda for verdadeiro
        if (faceDetected) {
            captureTimeout = setTimeout(() => {
                capturePhoto()
            }, 4000)
        }

        return () => {
            // Limpar o timeout se o componente for desmontado ou faceDetected se tornar falso
            if (captureTimeout) {
                clearTimeout(captureTimeout)
            }
        }
    }, [faceDetected, onPhotoTaken, webcamRef, setShowCapturedImage, setImg])

    useEffect(() => {
        let progressInterval: NodeJS.Timeout | null = null

        if (isFaceNearCenter) {
            // Se o rosto estiver próximo ao centro, aumenta o progresso de 0 a 100 em 4 segundos
            setProgress(0)
            progressInterval = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + 100 / 18 // Aumenta 2.5 a cada 100 ms para alcançar 100 em 4 segundos
                    if (newProgress >= 100) {
                        clearInterval(progressInterval!)
                    }
                    return newProgress
                })
            }, 100)
        } else {
            // Se o rosto não estiver próximo ao centro, zera o progresso
            setProgress(0)
            clearInterval(progressInterval!)
        }

        return () => {
            // Limpa o intervalo quando o componente é desmontado
            clearInterval(progressInterval!)
        }
    }, [isFaceNearCenter])

    return (
        <div className="w-full ">
            {
                <>
                    <h1>MAICOLA</h1>
                    <div className="FacialRecognitionMockup flex flex-col justify-center items-center  gap-4">
                        {showAlertGuest ? <AlertGuestCam /> : null}
                        {img === null ? (
                            <>
                                <div className="webcam-overlay mb-4 relative flex justify-center ">
                                    <div className="absolute top-0 z-50 w-full">
                                        <Progress
                                            className="rounded-none"
                                            percent={progress}
                                            color="green-600"
                                            showInfo={false}
                                        />
                                    </div>

                                    <Webcam
                                        ref={webcamRef}
                                        audio={false}
                                        screenshotFormat="image/jpeg"
                                        className="rounded-lg invisible"
                                        mirrored={true}
                                        screenshotQuality={0.7}
                                        height={350}
                                        width={500}
                                        videoConstraints={videoConstraints}
                                    />
                                    {isFaceNearCenter ? (
                                        <img
                                            src="/img/mockupPerfil2.png"
                                            alt="Imagem Overlay"
                                            className="z-20 absolute h-full bg-contain rounded-lg"
                                        />
                                    ) : (
                                        <img
                                            src="/img/mockupPerfil.png"
                                            alt="Imagem Overlay"
                                            className="z-20 absolute h-full bg-contain rounded-lg"
                                        />
                                    )}

                                    <img
                                        src="/img/logo/logo-dark-full.png"
                                        alt="Imagem Overlay"
                                        className="z-20 absolute h-1/9 w-1/5 bottom-2 left-2 bg-contain rounded-lg"
                                    />
                                    <div
                                        ref={redDivRef}
                                        className="z-20 absolute h-60 bg-contain rounded-lg w-60 mt-12"
                                    ></div>
                                    <canvas
                                        ref={canvasRef}
                                        className="face_canvas scale-x-[-1]"
                                        style={{
                                            zIndex: 10,
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            width: '100%',
                                            height: '100%',
                                        }}
                                    ></canvas>
                                    {showAlertGuest ? (
                                        <div className="absolute h-full w-full bg-contain bg-black rounded-lg z-30 flex flex-col justify-center items-center">
                                            <Spinner
                                                className="mb-4 "
                                                size="40px"
                                            />
                                            <div className="loading-screen center flex flex-row justify-center items-center mb-4">
                                                <p>
                                                    {/* Substitua pela tradução apropriada */}
                                                    Loading...
                                                </p>
                                            </div>
                                        </div>
                                    ) : null}

                                    <button
                                        className="z-20 absolute bottom-0 right-0 flex justify-center items-center rounded-full w-20 h-20"
                                        onClick={toggleCamera}
                                    >
                                        <HiOutlineRefresh
                                            className="absolute center text-white"
                                            size={40}
                                        />
                                    </button>
                                    {/* <button
                                    className="z-20 mb-4 absolute bottom-1 w-12 h-12 rounded-full bg-red-500"
                                    onClick={capture}
                                ></button> */}
                                </div>
                            </>
                        ) : (
                            <div className="xl:w-96 w-full flex flex-col justify-center">
                                <div className="w-full flex justify-center items-center mb-4">
                                    <img
                                        src={img}
                                        alt="screenshot"
                                        className="z-20 rounded-lg "
                                    />
                                    {/* w-max-[500px] h-max-[350px] */}
                                </div>

                                <div className="flex justify-center items-center w-full">
                                    <Button
                                        className="mb-4"
                                        block
                                        onClick={retakePhoto}
                                    >
                                        {/* Substitua pela tradução apropriada */}
                                        Retake Photo
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            }
            <h1>teste1</h1>
        </div>
    )
}

export default FacialRecognitionMockupFace
