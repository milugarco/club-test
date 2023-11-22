import CameraPassport from './CameraPassport'

const ScreenPassport = () => {
    return (
        <div>
            <h1 className="text-lg lg:text-3xl mb-2">
                Tire uma foto do seu passaporte
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
