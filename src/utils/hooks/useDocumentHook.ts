import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { useTranslation } from 'react-i18next'
import { CreateDocumentClubDTO, CreateDocumentDto } from '@/client/api-back'
import { documentApi } from '@/client/api'
import { base64ToBlob, blobToFile } from '../base64ToBlob'

function useDocumentHook() {
    const navigate = useNavigate()
    const query = useQuery()

    const { t } = useTranslation()

    const documentControllerCreate = async (
        userId: string,
        values: CreateDocumentDto
    ) => {
        try {
            const { data, status, statusText } =
                await documentApi.documentControllerCreate(userId, values)

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

    const documentControllerCreateClub = async (
        userId: string,
        values: CreateDocumentClubDTO
    ) => {
        try {
            const { data, status, statusText } =
                await documentApi.documentControllerCreateClub(userId, values)

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

    const documentControllerUploadPhoto = async (
        documentId: string,
        base64: string
    ) => {
        try {
            const blob = base64ToBlob(base64, 'image/jpeg')
            const file = blobToFile(blob)

            const { data, status, statusText } =
                await documentApi.documentControllerUploadPhoto(
                    documentId,
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

    const documentControllerUploadPhotoBack = async (
        documentId: string,
        base64: string
    ) => {
        try {
            const blob = base64ToBlob(base64, 'image/jpeg')
            const file = blobToFile(blob)

            const { data, status, statusText } =
                await documentApi.documentControllerUploadPhotoBack(
                    documentId,
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

    return {
        documentControllerCreate,
        documentControllerCreateClub,
        documentControllerUploadPhoto,
        documentControllerUploadPhotoBack,
    }
}

export default useDocumentHook
