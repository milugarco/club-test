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
    GuestCredentialStepTen,
    GuestCredentialStepOneNew,
    GuestCredentialStepTwoNew,
    GuestCredentialStepThreeNew,
    GuestCredentialStepFourNew,
    GuestCredentialStepFiveNew,
    GuestCredentialStepSixNew
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


export interface GuestFormPropsNew extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
    formValueStep?: GuestCredentialStepOneNew & 
    GuestCredentialStepTwoNew &
        GuestCredentialStepThreeNew  &
        GuestCredentialStepFourNew &
        GuestCredentialStepFiveNew &
        GuestCredentialStepSixNew
    //     GuestCredentialStepSeven &
    //     GuestCredentialStepEight &
    //     GuestCredentialStepNine &
    //     GuestCredentialStepTen

    handleStep?: (
        newStep: string,
        formValues?: GuestCredentialStepOneNew & 
        GuestCredentialStepTwoNew &
        GuestCredentialStepThreeNew &
        GuestCredentialStepFourNew &
        GuestCredentialStepFiveNew &
        GuestCredentialStepSixNew
        //     GuestCredentialStepFour &
        //     GuestCredentialStepFive &
        //     GuestCredentialStepSix &
        //     GuestCredentialStepSeven &
        //     GuestCredentialStepEight  &
        //     GuestCredentialStepNine &
        //     GuestCredentialStepTen
    ) => void
}