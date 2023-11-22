import { ForgotPassword, ResetPassword, codeValidation } from '@/@types/auth'
import { otpApi } from '@/client/api'
import { CreateOtpDtoTypeEnum } from '@/client/api-back'
import { setUser, signInSuccess, useAppDispatch } from '@/store'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import appConfig from '@/configs/app.config'
import { photoDefault } from '../photoDefault'
import { decodeJWT } from '../jwt/DecodeJwt'

function useForgotPasswordHook() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { t } = useTranslation()

    const forgotPassword = async (values: ForgotPassword) => {
        try {
            const { data } = await otpApi.oTPControllerCreate({
                type: CreateOtpDtoTypeEnum.Recovery,
                userEmail: values.email
            })

            console.log(data.hash)
            const { hash: hash } = data

            return {
                status: 'success',
                message: '',
                hash: hash
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                return {
                    status: 'failed',
                    message: t('signin.request.401')
                }
            } else if (error.response && error.response.status === 500) {
                return {
                    status: 'failed',
                    message: t('signin.request.500')
                }
            }
        }
    }
    const forgotVerification = async (values: codeValidation) => {
        try {
            const { data } = await otpApi.oTPControllerValidateOTP({
                number: values.number,
                hash: values.hash
            })

            // const ForgotPasswordData: ForgotPassword  = {
            //     email: values.email || ''
            // }

            const { hash: hash } = data

            // Dispare a ação para definir o token no Redux

            const redirectUrl = query.get(REDIRECT_URL_KEY)
            navigate(
                redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            )

            return {
                status: 'success',
                message: '',
                hash: hash,
                number: values.number
            }
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                return {
                    status: 'failed',
                    message: t('signin.request.401')
                }
            }
            if (error.response && error.response.status === 404) {
                return {
                    status: 'failed',
                    message: t('forgot.error.code')
                }
            } else {
                return {
                    status: 'failed',
                    message: t('signin.request.500')
                }
            }
        }
    }
    const passwordReset = async (values: ResetPassword) => {
        try {
            const { data, statusText } =
                await otpApi.oTPControllerChangePassword({
                    number: values.number,
                    hash: values.hash,
                    password: values.password
                })

            // const ForgotPasswordData: ForgotPassword  = {
            //     email: values.email || ''
            // }

            const { access_token: access_token } = data

            dispatch(signInSuccess(access_token))

            const jwt = decodeJWT(access_token) as any

            const { name, email, photo } = jwt.user

            console.log('user', jwt.user)

            dispatch(
                setUser({
                    avatar: photo ? photo : photoDefault,
                    userName: name,
                    authority: ['USER'],
                    email: email
                })
            )
            // Dispare a ação para definir o token no Redux

            const redirectUrl = query.get(REDIRECT_URL_KEY)
            navigate(
                redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
            )

            return {
                status: 'success',
                message: statusText
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                return {
                    status: 'failed',
                    message: t('reset.error.404')
                }
            } else {
                if (error.response && error.response.status === 401) {
                    return {
                        status: 'failed',
                        message: t('signin.request.401')
                    }
                }
            }
        }
    }
    return {
        forgotPassword,
        forgotVerification,
        passwordReset
    }
}
export default useForgotPasswordHook
