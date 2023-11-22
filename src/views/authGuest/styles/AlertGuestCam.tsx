import Alert from '@/components/ui/Alert'
import { HiExclamation } from 'react-icons/hi'

const AlertGuestCam = () => {
    return (
        <div>

            <Alert showIcon className="mb-2" type="info" customIcon={<HiExclamation />}>
                Você deve utilizar um dispositivo com câmera e permitir o uso no navegador.

            </Alert>

        </div>
    )
}

export default AlertGuestCam