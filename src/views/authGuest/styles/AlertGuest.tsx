import Alert from '@/components/ui/Alert'
import { HiExclamation } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'


const AlertGuest = () => {
    const { t } = useTranslation()
    return (
        <div>

            <Alert showIcon className="mb-2" type="danger" customIcon={<HiExclamation />}>
                {t('register.step2.alert')}

            </Alert>

        </div>
    )
}

export default AlertGuest