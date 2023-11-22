import {
    AuthApi,
    InitialSubscribeApi,
    Configuration,
    OTPApi,
    EventApi,
    EventTicketApi,
    EventParticipantApi,
    UsersApi,
    ClubEventTicketGuestApi,
    ClubEventParticipantClubApi,
    DocumentApi,
} from './api-back'
import apiInterceptorInstance from './interceptor'

const configuration = new Configuration({
    basePath: 'https://invicta-api.addlog.com.br',
})

const authApi = new AuthApi(configuration, undefined, apiInterceptorInstance)
const initialSubscribeApi = new InitialSubscribeApi(
    configuration,
    undefined,
    apiInterceptorInstance
)

const otpApi = new OTPApi(configuration, undefined, apiInterceptorInstance)

const usersApi = new UsersApi(configuration, undefined, apiInterceptorInstance)
const documentApi = new DocumentApi(
    configuration,
    undefined,
    apiInterceptorInstance
)

const eventApi = new EventApi(configuration, undefined, apiInterceptorInstance)
const eventTicketApi = new EventTicketApi(
    configuration,
    undefined,
    apiInterceptorInstance
)
const eventParticipantApi = new EventParticipantApi(
    configuration,
    undefined,
    apiInterceptorInstance
)
const clubEventTicketGuestApi = new ClubEventTicketGuestApi(
    configuration,
    undefined,
    apiInterceptorInstance
)
const clubEventParticipantClubApi = new ClubEventParticipantClubApi(
    configuration,
    undefined,
    apiInterceptorInstance
)

export {
    authApi,
    initialSubscribeApi,
    otpApi,
    usersApi,
    documentApi,
    eventApi,
    eventTicketApi,
    eventParticipantApi,
    clubEventParticipantClubApi,
    clubEventTicketGuestApi,
}
