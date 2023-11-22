import { apiSignOut } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { authApi, initialSubscribeApi } from '@/client/api'
import { useTranslation } from 'react-i18next'
import { formatPhoneNumberIntl } from 'react-phone-number-input'
import { SplitPhoneNumber, splitPhoneNumber } from '../phone'
import { decodeJWT } from '../jwt/DecodeJwt'
import { photoDefault } from '../photoDefault'

function useAuthHook() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)

    const { t } = useTranslation()

    const signIn = async (values: SignInCredential) => {
        try {
            const { data } = await authApi.authControllerLogin({
                email: values.userName,
                password: values.password
            })

            const { access_token: accessToken } = data

            // Dispare a ação para definir o token no Redux
            dispatch(signInSuccess(accessToken))

            const jwt = decodeJWT(accessToken) as any

            const { name, email, photo } = jwt.user

            dispatch(
                setUser({
                    avatar: photo ? photo : photoDefault,
                    userName: name,
                    authority: ['USER'],
                    email: email
                })
            )

            const redirectUrl = query.get(REDIRECT_URL_KEY)
            navigate(
                redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            )

            return {
                status: 'success',
                message: ''
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                return {
                    status: 'failed',
                    message: t('signin.request.401')
                }
            } else if (error.response && error.response.status === 409) {
                return {
                    status: 'failed',
                    message: t('signin.request.409')
                }
            } else {
                return {
                    status: 'failed',
                    message: t('signin.request.500')
                }
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const phone: SplitPhoneNumber = splitPhoneNumber(
                formatPhoneNumberIntl(values.phoneValue || '')
            )

            const userName = values.userName || ''
            const userEmail = values.email || ''
            const password = values.password || ''
            const countryCodePhone = phone.countryCode
            const areaCodePhone = phone.areaCode
            const phoneNumber = phone.phoneNumber
            const document = values.documentUserValue || ''
            const userPhoto = values.photoFace || ''
            const dateOfBirth = values.dateOfBirth || ''

            const response =
                await initialSubscribeApi.initialSubscribeControllerCreateClub(
                    userName,
                    userEmail,
                    password,
                    countryCodePhone,
                    areaCodePhone,
                    phoneNumber,
                    dateOfBirth,
                    document,
                    userPhoto
                )

            const { data } = response

            const { access_token: accessToken } = data

            dispatch(signInSuccess(accessToken))

            const jwt = decodeJWT(accessToken) as any

            const { name, email, photo } = jwt.user

            dispatch(
                setUser({
                    avatar: photo ? photo : photoDefault,
                    userName: name,
                    authority: ['USER'],
                    email: email
                })
            )

            const redirectUrl = query.get(REDIRECT_URL_KEY)

            navigate(
                redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            )

            return {
                status: 'success',
                message: ''
            }
        } catch (errors: any) {
            return {
                status: 'failed',
                message: `Error: ${errors}`
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: []
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut
    }
}

export default useAuthHook
