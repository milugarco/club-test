import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { useTranslation } from 'react-i18next'
import { clubEventTicketGuestApi } from '@/client/api'

function useEventTicketGuestHook() {
    const navigate = useNavigate()
    const query = useQuery()

    const { t } = useTranslation()

    const eventTicketGuestClubControllerFindOne = async (
        eventTicketGuestId: string
    ) => {
        try {
            const { data, status, statusText } =
                await clubEventTicketGuestApi.eventTicketGuestClubControllerFindOne(
                    eventTicketGuestId
                )

            return {
                status: status,
                message: statusText,
                data: data,
            }
        } catch (error: any) {
            console.log(`Error: ${error}`)
            if (error.response && error.response.status === 401) {
                return {
                    status: 'failed',
                    message: t('signin.request.401'),
                }
            } else {
                return {
                    status: 'failed',
                    message: t('signin.request.500'),
                }
            }
        }
    }

    return { eventTicketGuestClubControllerFindOne }
}

export default useEventTicketGuestHook
