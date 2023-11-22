import { Button } from '@/components/ui'
import PhotoCnh from './CameraCnh'
import { useState } from 'react'
import PdfCnh from './UploadCnh'
import { useTranslation } from 'react-i18next'

const Cnh = () => {
    const [showPhotoCnh, setShowPhotoCnh] = useState(false)
    const [showUploadCnh, setShowUploadCnh] = useState(false)

    const handlePhotoClick = () => {
        setShowPhotoCnh(true)
    }
    const handleUploadClick = () => {
        setShowUploadCnh(true)
    }
    const {t} = useTranslation()
    return (
        <div className="flex flex-col">
            <h1 className="text-lg lg:text-3xl mb-2">{t('authGuest.cnh.paragraph1').toString()}</h1>
            {showPhotoCnh ? (
                <PhotoCnh
                    capturedImage={null}
                    onPhotoTaken={function (imageSrc: string | null): void {
                        throw new Error('Function not implemented.')
                    }}
                    onRetakePhoto={function (): void {
                        throw new Error('Function not implemented.')
                    }}
                />
            ) : showUploadCnh ? (
                <PdfCnh />
            ) : (
                <div className="flex gap-2 justify-center">
                    <Button onClick={handlePhotoClick}>{t('authGuest.cnh.takePhotoButton').toString()}</Button>
                    <Button onClick={handleUploadClick}>{t('authGuest.cnh.uploadButton').toString()}</Button>
                </div>
            )}
        </div>
    )
}

export default Cnh
