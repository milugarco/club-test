import {
    GuestCredentialStepSeven,
    GuestCredentialStepSix,
    GuestCredentialStepOne,
    GuestCredentialStepEight,
    GuestCredentialStepFive,
    GuestCredentialStepFour,
    GuestCredentialStepTwo,
    GuestCredentialStepThree,
    GuestCredentialStepNine,
    GuestCredentialStepTen
} from '@/@types/auth'
import { CommonProps } from '@/@types/common'

export interface GuestFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
    formValueStep?: GuestCredentialStepOne &
        GuestCredentialStepTwo &
        GuestCredentialStepThree &
        GuestCredentialStepFour &
        GuestCredentialStepFive &
        GuestCredentialStepSix &
        GuestCredentialStepSeven &
        GuestCredentialStepEight &
        GuestCredentialStepNine &
        GuestCredentialStepTen

    handleStep?: (
        newStep: string,
        formValues?: GuestCredentialStepOne &
            GuestCredentialStepTwo &
            GuestCredentialStepThree &
            GuestCredentialStepFour &
            GuestCredentialStepFive &
            GuestCredentialStepSix &
            GuestCredentialStepSeven &
            GuestCredentialStepEight  &
            GuestCredentialStepNine &
            GuestCredentialStepTen
    ) => void
}
