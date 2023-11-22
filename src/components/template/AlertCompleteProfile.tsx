import Alert from '@/components/ui/Alert'
import { HiExclamation } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const AlertProfile = () => {
    return (
        <div>

            <Alert showIcon className="mb-4" type="danger" customIcon={<HiExclamation />}>
                Preencha as informações do perfil.
                <Link
                                to="/profile/settings/my-profile"
                                className="underline hover:decoration-dashed ml-1"
                            >
                                Clique aqui
                            </Link>{' '}
            </Alert>

        </div>
    )
}

export default AlertProfile