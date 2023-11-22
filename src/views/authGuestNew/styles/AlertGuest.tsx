import Alert from '@/components/ui/Alert'
import { HiExclamation } from 'react-icons/hi'


const AlertGuest = () => {
    return (
        <div>

            <Alert showIcon className="mb-2" type="danger" customIcon={<HiExclamation />}>
                Você deve aceitar os termos para continuar.

            </Alert>

        </div>
    )
}

export default AlertGuest