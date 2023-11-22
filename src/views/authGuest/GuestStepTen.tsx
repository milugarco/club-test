import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import { Alert, Button } from '@/components/ui';
import { GuestFormProps } from './interfaces/GuestProps.interface';
import './styles/GuestStepTen.css';
import { HiExclamation } from 'react-icons/hi';

const GuestStepTen = (props: GuestFormProps) => {
  const { disableSubmit = false, handleStep, formValueStep } = props;
  const qrText = formValueStep?.codeValidation!;//PUXAR O QRCODE AQUI
  const [qrDataURL, setQrDataURL] = useState('');

  const handleGenerateQR = () => {
    if (qrText.trim() === '') {
      alert('Por favor, insira um texto para gerar o QR code.');
      return;
    }

    try {

      setQrDataURL(qrText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownloadQR = () => {
    if (qrDataURL) {

      const byteString = atob(qrDataURL.split(',')[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);

      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      const blob = new Blob([ab], { type: 'image/png' });

      saveAs(blob, 'qrcode.png');
    }
  };

  return (
    <div className="flex justify-center items-center p-3">
      <div className="flex justify-center items-center w-96 text-center flex-col gap-10">
        <Alert
          showIcon
          className="mb-2 w-[230px]"
          customIcon={<HiExclamation />}
        >
          <p>Tire um print para caso precise do QrCode no evento</p>
        </Alert>

        <div className='relative flex flex-col justidy-center items-center'>
          <div className="container flex flex-col items-center justify-center ">
            <div className="left w-48 h-60 bg-purple-800 border-dashed border-b-[6px] border-white dark:border-gray-800 flex flex-col items-center justify-center gap-4 ">
              <QRCode value={qrText} size={128} className='p-1 bg-white'/>
              <h1 className="text-lg  mx-2 text-center text-white">
                Parabéns você está inscrito no evento!!
              </h1>
            </div>
            <div className="relative right w-48 h-24 bg-gray-300 border-dashed border-t-[6px] border-white dark:border-gray-800 flex flex-col justify-start items-center animate-ticket">
              <p className="pQrcode flex flex-col text-black">
                Código: <strong className='text-sm mx-2 text-black mt-2'>{qrText}</strong>
              </p>
              <div className="cir2 dark:bg-gray-800 bg-white"></div>
              <div className="cir4 dark:bg-gray-800 bg-white"></div>
              <div className="cir6 dark:bg-gray-800 bg-white"></div>
              <div className="cir5 dark:bg-gray-800 bg-white"></div>
            </div>
            <div className="cir1 dark:bg-gray-800 bg-white"></div>
            <div className="cir3 dark:bg-gray-800 bg-white"></div>
            <div className="cir7 dark:bg-gray-800 bg-white"></div>
            <div className="cir8 dark:bg-gray-800 bg-white"></div>
          </div>
        </div>
        <Button className="buttonQrcode mt-4" onClick={handleDownloadQR}>
          Baixar QR Code
        </Button>
      </div>
    </div>
  );
}

export default GuestStepTen;
