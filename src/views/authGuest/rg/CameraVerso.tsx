import { useRef, useState, useEffect, useCallback } from 'react'
import Webcam from 'react-webcam'
import { Button, Spinner } from '@/components/ui'
import { HiOutlineRefresh } from 'react-icons/hi'

interface CameraRg {
    onPhotoTaken: (imageSrc: string | null) => void
    onPhotoTakenTwo: (imageSrc: string | null) => void
    onRetakePhoto: () => void
    capturedImage: string | null
}

function CameraRgFeV({
    onPhotoTaken,
    onRetakePhoto,
    onPhotoTakenTwo,
    capturedImage
}: CameraRg) {
    const webcamRef = useRef<Webcam | null>(null)
    const [img, setImg] = useState<string | null>(capturedImage)
    const [imgTwo, setImgTwo] = useState<string | null>(capturedImage)
    const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage)
    const [loading, setLoading] = useState(true)
    const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user')
    const [hasUserMedia, setHasUserMedia] = useState(false)
    const [showAlertGuest, setShowAlertGuest] = useState(true)

    const [photoTwo, setPhotoTwo] = useState(false)

    const [photoOneTaken, setPhotoOneTaken] = useState(false)
    const [photoTwoTaken, setPhotoTwoTaken] = useState(false)
    const capture = useCallback(() => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot({
                width: 700,
                height: 400
            })

            setImg(imageSrc)
            setShowCapturedImage(true)
            onPhotoTaken(imageSrc)

            setPhotoOneTaken(true)
        }
    }, [onPhotoTaken])

    const captureTwo = useCallback(() => {
        if (webcamRef.current) {
            const imageSrcTwo = webcamRef.current.getScreenshot({
                width: 700,
                height: 400
            })

            setImgTwo(imageSrcTwo)
            setShowCapturedImage(true)
            onPhotoTakenTwo(imageSrcTwo)

            setPhotoTwoTaken(true)
        }
    }, [onPhotoTakenTwo])

    const retakePhoto = () => {
        setImg(null)
        setShowCapturedImage(false)
        onRetakePhoto()

        setPhotoOneTaken(false)
    }

    const retakePhotoTwo = () => {
        setImgTwo(null)
        setShowCapturedImage(false)
        onRetakePhoto()

        setPhotoTwoTaken(false)
    }

    const stepPhotoTwo = () => {
        setPhotoTwo(true)
    }
    const stepPhotoOne = () => {
        setPhotoTwo(false)
        setPhotoTwoTaken(false)
        setPhotoOneTaken(false)
        setImg(null)
        setImgTwo(null)
        onPhotoTakenTwo(null)
        onPhotoTaken(null)
    }

    const toggleCamera = () => {
        setFacingMode(facingMode === 'environment' ? 'user' : 'environment')
    }

    const videoConstraints = {
        width: 700,
        height: 400,
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
                    {photoTwo === false ? (
                        <>
                            {img === null ? (
                                <>
                                    <h1 className="text-sm lg:text-3xl text-center">
                                        1 - Tire uma foto da frente do seu RG
                                    </h1>
                                    <div className="webcam-overlay relative flex flex-col justify-center items-center mb-4  rounded-lg">
                                        <Webcam
                                            ref={webcamRef}
                                            audio={false}
                                            screenshotFormat="image/jpeg"
                                            className="rounded-lg"
                                            mirrored={true}
                                            screenshotQuality={0.7}
                                            videoConstraints={videoConstraints}
                                        />
                                        {showAlertGuest ? (
                                            <div className="absolute h-full w-full bg-contain bg-[#1E252B] opacity-70 rounded-lg z-30 flex flex-col justify-center items-center">
                                                <img
                                                    src="/img/animationPhone.gif"
                                                    alt="Imagem Overlay"
                                                    className="opacity-70 h-full sm:h-1/2"
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
                                            className="mb-4 absolute bottom-1 w-12 h-12 rounded-full bg-white"
                                            onClick={capture}
                                        ></button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <img
                                        src={img}
                                        alt="screenshot"
                                        className="rounded-lg mb-4"
                                    />
                                    <div className="flex justify-center items-center gap-4">
                                        <Button
                                            className="mb-4"
                                            onClick={retakePhoto}
                                        >
                                            Tirar novamente
                                        </Button>
                                        <Button
                                            className="mb-4"
                                            onClick={stepPhotoTwo}
                                        >
                                            Próximo
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {imgTwo === null ? (
                                <>
                                    <h1 className="text-sm lg:text-3xl text-center">
                                        2 - Tire uma foto do verso do seu RG
                                    </h1>
                                    <div className="webcam-overlay relative flex flex-col justify-center items-center mb-4 rounded-lg">
                                        <Webcam
                                            ref={webcamRef}
                                            audio={false}
                                            screenshotFormat="image/jpeg"
                                            className="rounded-lg"
                                            mirrored={true}
                                            screenshotQuality={0.7}
                                            videoConstraints={videoConstraints}
                                        />
                                        {showAlertGuest ? (
                                            <div className="absolute h-full w-full bg-contain bg-[#1E252B] opacity-70 rounded-lg z-30 flex flex-col justify-center items-center">
                                                <img
                                                    src="/img/animationPhone.gif"
                                                    alt="Imagem Overlay"
                                                    className="opacity-70 h-full sm:h-1/2"
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
                                            className="mb-4 absolute bottom-1 w-12 h-12 rounded-full bg-white"
                                            onClick={captureTwo}
                                        ></button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <img
                                        src={imgTwo}
                                        alt="screenshot"
                                        className="rounded-lg mb-4"
                                    />
                                    <div className="flex justify-center items-center gap-4">
                                        <Button
                                            className="mb-4"
                                            onClick={stepPhotoOne}
                                        >
                                            Recomeçar
                                        </Button>
                                        <Button
                                            className="mb-4"
                                            onClick={retakePhotoTwo}
                                        >
                                            Tirar novamente
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default CameraRgFeV
