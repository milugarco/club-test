import { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import AlertGuestCam from './styles/AlertGuestCam';
import { Button, Spinner } from '@/components/ui';
import { HiOutlineRefresh } from 'react-icons/hi';

interface FacialRecognitionMockupProps {
  onPhotoTaken: (imageSrc: string | null) => void;
  onRetakePhoto: () => void;
  capturedImage: string | null;
}

function FacialRecognitionMockup({
  onPhotoTaken,
  onRetakePhoto,
  capturedImage,
}: FacialRecognitionMockupProps) {
  const webcamRef = useRef<Webcam | null>(null);
  const [img, setImg] = useState<string | null>(capturedImage);
  const [showCapturedImage, setShowCapturedImage] = useState(!!capturedImage);
  const [loading, setLoading] = useState(true);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot({ width: 454, height: 600 });
      setImg(imageSrc);
      setShowCapturedImage(true);
      onPhotoTaken(imageSrc);
    }
  }, [onPhotoTaken]);

  const retakePhoto = () => {
    setImg(null);
    setShowCapturedImage(false);
    onRetakePhoto();
  };

  const toggleCamera = () => {
    setFacingMode(facingMode === 'user' ? 'environment' : 'user');
  };

  const videoConstraints = {
    width: 454,
    height: 600,
    facingMode: facingMode,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className='loading-screen flex flex-row justify-center items-center mb-4'>
          <p>Carregando a câmera...</p>
          <Spinner />
        </div>
      ) : (
        <div className='FacialRecognitionMockup flex flex-col justify-center items-center gap-4'>
          <AlertGuestCam />
          <h1 className='text-sm lg:text-3xl'>
            Tire uma foto para fazer seu reconhecimento facial
          </h1>
          <div></div>
          {img === null ? (
            <>
              <div className='webcam-overlay relative flex justify-center w-[250px] sm:w-[454px] sm:h-[600px]'>
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat='image/jpeg'
                  className='rounded-lg w-[250px] sm:w-[454px] sm:h-[600px]'
                  mirrored={true}
                  screenshotQuality={0.7}
                  videoConstraints={videoConstraints}
                />
                <img
                  src='/img/mockupPerfil.png'
                  alt='Imagem Overlay'
                  className='absolute h-full bg-contain opacity-30 rounded-lg'
                />
                <button onClick={toggleCamera} className='absolute bottom-0 right-0 flex justify-center items-center rounded-full w-20 h-20'> {/* Adicione o botão para alternar a câmera */}
                <HiOutlineRefresh className='absolute center text-white'size={40}/>
                </button>
              </div>
              <Button onClick={capture} className='mb-4'>
                Tirar foto
              </Button>
            </>
          ) : (
            <div>
              <img src={img} alt='screenshot' className='rounded-lg mb-4' />

              <div className='flex justify-center items-center'>
                <Button onClick={retakePhoto} className='mb-4'>
                  Tirar novamente
                </Button>
                
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default FacialRecognitionMockup;
