import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { useTranslation } from 'react-i18next'
import { CreateEventParticipantDto } from '@/client/api-back'
import { eventParticipantApi } from '@/client/api'

function useEventParticipantHook() {
    const navigate = useNavigate()
    const query = useQuery()

    const { t } = useTranslation()

    const createEventParticipant = async (
        values: CreateEventParticipantDto,
        eventTicketGuestId: string
    ) => {
        try {
            const request: CreateEventParticipantDto = {
                userId: values.userId || '',
                status: 'ENABLE',
            }

            const { data, status, statusText } =
                await eventParticipantApi.eventParticipanteControllerCreate(
                    eventTicketGuestId,
                    request
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

    return { createEventParticipant }
}

export default useEventParticipantHook
