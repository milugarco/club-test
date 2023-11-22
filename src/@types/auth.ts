import {
    DocumentResponse,
    EventParticipantClubGuestResponse,
    EventParticipantResponse,
    ResponseEventTicketGuestClubDto
} from '@/client/api-back'

export type SignInCredential = {
    userName: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = SignInResponse

export type GuestCredentialStepOne = {
    phoneValue?: string
    userName?: string
    cpf?: string
    email?: string
    agreeToTerms?: boolean
}

export type GuestCredentialStepTwo = {
    codeValidation?: string
}

export type GuestCredentialStepThree = {
    passWord?: string
}
export type GuestCredentialStepFour = {
    photo?: string
}
export type GuestCredentialStepFive = {
    questOne?: string
    questTwo?: string
    socialMidia?: [{ name: string; user: string }]
}
export type GuestCredentialStepSix = {
    profilePhoto?: string
}
export type GuestCredentialStepSeven = {
    documentType?: string
    documentNumber?: string
}
export type GuestCredentialStepEight = {
    photoDocumentOne?: string
    photoDocumentTwo?: string
}
export type GuestCredentialStepNine = {
    signTerms?: boolean
}
export type GuestCredentialStepTen = {
    qrCode?: string
    ValueGuestStep?: any
}

export type GuestCredentialStepOneNew = {
    agreeInvite?: boolean
    guest?: ResponseEventTicketGuestClubDto
    newEventParticipant?: EventParticipantClubGuestResponse
    participantId?: string
}
export type GuestCredentialStepTwoNew = {
    photo?: string
}
export type GuestCredentialStepThreeNew = {
    profilePhoto?: string
}
export type GuestCredentialStepFourNew = {
    documentType?: string
    documentNumber?: string
    documentUser?: DocumentResponse
}
export type GuestCredentialStepFiveNew = {
    photoDocumentOne?: string
    photoDocumentTwo?: string
}
export type GuestCredentialStepSixNew = {
    signTerms?: boolean
}

export type GuestCredentialSimple = GuestCredentialStepOne &
    GuestCredentialStepFour &
    GuestCredentialStepSeven

export type SignUpCredentialStepOne = {
    phoneValue?: string
    dateOfBirth?: string
    userName?: string
    documentUserValue?: string
}

export type SignUpCredentialStepTwo = {
    email?: string
    password?: string
    agreeToTerms?: boolean
}

export type SignUpCredentialStepTree = {
    photoFace: any
}

export type SignUpCredential = SignUpCredentialStepOne &
    SignUpCredentialStepTwo &
    SignUpCredentialStepTree

export type ForgotPassword = {
    email: string
}

export type codeValidation = {
    number: string
    hash: string
}

export type ResetPassword = {
    number: string
    hash: string
    password: string
}

export type ResetPasswordCredential = ForgotPassword &
    codeValidation &
    ResetPassword
