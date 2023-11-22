import { Button } from '@/components/ui'
import './styleClub.css'
import { useState } from 'react'
import saveAs from 'file-saver'
import QRCode from 'qrcode.react'


const Ticket = () => {
    const [qrDataURL, setQrDataURL] = useState('')
    const qrText = '1234556'
    const handleDownloadQR = () => {
        if (qrDataURL) {
            // Converte o data URL em Blob
            const byteString = atob(qrDataURL.split(',')[1])
            const ab = new ArrayBuffer(byteString.length)
            const ia = new Uint8Array(ab)

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i)
            }

            const blob = new Blob([ab], { type: 'image/png' })

            saveAs(blob, 'qrcode.png')
        }
    }
    return (
        <div className="relative flex flex-col justify-center items-center">
            <div className="container flex flex-col items-center justify-center ">
                <div className="relative left w-48 h-60 bg-purple-800 border-dashed border-b-[6px] border-white dark:border-gray-800 flex flex-col items-center justify-center gap-4 ">
                    <QRCode
                        value={qrText}
                        size={128}
                        className="p-1 bg-white"
                    />
                    <h1 className="text-lg  mx-2 text-center text-white">
                        Seu QrCode de acesso ao evento!!
                    </h1>
                </div>
                <div className="relative right w-48 h-24 bg-[#6597C2] after:bg-[#6597C2] border-dashed border-t-[6px] border-white dark:border-gray-800 flex flex-col justify-start text-center items-center animate-ticket">
                    <p className="pQrcode flex flex-col text-white">
                        Código:{' '}
                        <strong className="text-sm mx-2 text-white mt-2">
                            {qrText}
                        </strong>
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
            <Button className="buttonQrcode mt-12" onClick={handleDownloadQR}>
                Baixar QR Code
            </Button>
        </div>
    )
}
export default Ticket
