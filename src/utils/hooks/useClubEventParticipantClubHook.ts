import { useNavigate } from 'react-router'
import useQuery from './useQuery'
import {
    authApi,
    clubEventParticipantClubApi,
    eventParticipantApi,
} from '@/client/api'
import {
    CreateEventParticipantClubDto,
    EventsParticipantsClubResponse,
} from '@/client/api-back'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'react-i18next'
import { base64ToBlob, blobToFile } from '../base64ToBlob'

function useClubEventParticipantClubHook() {
    const navigate = useNavigate()
    const query = useQuery()

    const { t } = useTranslation()

    const eventParticipantClubControllerFindAll = async () => {
        try {
            const { data } =
                await clubEventParticipantClubApi.eventParticipantClubControllerFindAll()
            const response: EventsParticipantsClubResponse = data
            // Faça algo com os dados
            return response
        } catch (error: any) {
            if (error.response?.status === 409) {
                // return {
                //     status: '409',
                //     message: 'bad request',
                //     origin: 'query event participation'
                // }
            } else {
                // Lide com outros erros, se necessário
                // return {
                //     status: '500',
                //     message: 'internal server error'
                // }
            }
        }
    }

    const eventParticipantClubControllerCreate = async (
        values: CreateEventParticipantClubDto,
        eventTicketGuestId: string
    ) => {
        try {
            const request: CreateEventParticipantClubDto = {
                userId: values.userId,
                accountId: values.accountId,
                status: 'ENABLE',
            }

            const { data, status, statusText } =
                await clubEventParticipantClubApi.eventParticipantClubControllerCreate(
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

    const eventParticipantClubControllerUploadPhoto = async (
        participantId: string,
        base64: string
    ) => {
        try {
            const blob = base64ToBlob(base64, 'image/jpeg')
            const file = blobToFile(blob)

            const { data, status, statusText } =
                await clubEventParticipantClubApi.eventParticipantClubControllerUploadPhoto(
                    participantId,
                    file
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

    const eventParticipantClubControllerFindOneParticipation = async (
        id: string
    ) => {
        try {
            const { data, status, statusText } =
                await clubEventParticipantClubApi.eventParticipantClubControllerFindOneParticipation(
                    id
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

    return {
        eventParticipantClubControllerFindAll,
        eventParticipantClubControllerCreate,
        eventParticipantClubControllerUploadPhoto,
        eventParticipantClubControllerFindOneParticipation,
    }
}
export default useClubEventParticipantClubHook
