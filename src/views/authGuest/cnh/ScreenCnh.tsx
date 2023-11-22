import { Button } from '@/components/ui'
import PhotoCnh from './CameraCnh'
import { useState } from 'react'
import PdfCnh from './UploadCnh'

const Cnh = () => {
    const [showPhotoCnh, setShowPhotoCnh] = useState(false)
    const [showUploadCnh, setShowUploadCnh] = useState(false)

    const handlePhotoClick = () => {
        setShowPhotoCnh(true)
    }
    const handleUploadClick = () => {
        setShowUploadCnh(true)
    }
    return (
        <div className="flex flex-col">
            <h1 className="text-lg lg:text-3xl mb-2">Envie sua CNH</h1>
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
                    <Button onClick={handlePhotoClick}>Tirar foto</Button>
                    <Button onClick={handleUploadClick}>Fazer upload</Button>
                </div>
            )}
        </div>
    )
}

export default Cnh
