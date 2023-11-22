import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { useTranslation } from 'react-i18next'
import { usersApi } from '@/client/api'
import { ResponseUserDto, UpdateUserDto } from '@/client/api-back'
import { base64ToBlob, blobToFile } from '../base64ToBlob'
import { useEffect } from 'react'
import store, { setUser, useAppDispatch } from '@/store'
import { decodeJWT } from '../jwt/DecodeJwt'

function useUserHook() {
    const navigate = useNavigate()
    const query = useQuery()
    const dispatch = useAppDispatch()

    const { t } = useTranslation()

    const state = store.getState()

    const getUsers = async () => {
        try {
            const { data, status, statusText } =
                await usersApi.userControllerFindAll()

            return {
                data,
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

    const userControllerUpdate = async (
        userId: string,
        values: UpdateUserDto
    ) => {
        const requestUpdate: UpdateUserDto = {
            name: values.name,
            password: values.password,
            status: 'ENABLE',
        }

        try {
            const data = await usersApi.userControllerUpdate(
                userId,
                requestUpdate
            )

            const { userName, email, avatar } = state.auth.user

            dispatch(
                setUser({
                    avatar: avatar,
                    userName:
                        data.data.name !== userName ? data.data.name : userName,
                    authority: ['USER'],
                    email: email,
                })
            )

            return data
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

    const userControllerFindByEmail = async (email: string) => {
        const userEmail: string = email
        try {
            const data = await usersApi.userControllerFindByEmail(userEmail)

            return data.data
        } catch (error: any) {
            console.log(`Error: ${error}`)
        }
    }

    const userControllerUploadPhoto = async (userId: string, photo: string) => {
        try {
            const blob = base64ToBlob(photo, 'image/jpeg')
            const file = blobToFile(blob)

            const data = await usersApi.userControllerUploadPhoto(userId, file)
            console.log(typeof data.data.photo)
            dispatch(
                setUser({
                    avatar: data.data.photo?.toString(),
                    userName: data.data.name,
                    authority: ['USER'],
                    email: data.data.email,
                })
            )

            return data
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
        getUsers,
        userControllerUploadPhoto,
        userControllerUpdate,
        userControllerFindByEmail,
    }
}

export default useUserHook
