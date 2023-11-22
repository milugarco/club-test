import CameraPassport from './CameraPassport'
import { useTranslation } from 'react-i18next'

const ScreenPassport = () => {
    const { t } = useTranslation()
    return (
        <div>
            <h1 className="text-lg lg:text-3xl mb-2">
            {t('authGuest.passport.paragraph1').toString()}
            </h1>
            <CameraPassport
                capturedImage={null}
                onPhotoTaken={function (imageSrc: string | null): void {
                    throw new Error('Function not implemented.')
                }}
                onRetakePhoto={function (): void {
                    throw new Error('Function not implemented.')
                }}
            />
        </div>
    )
}
export default ScreenPassport
