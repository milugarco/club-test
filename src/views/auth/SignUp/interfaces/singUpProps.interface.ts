import {
    SignUpCredentialStepOne,
    SignUpCredentialStepTree,
    SignUpCredentialStepTwo,
} from '@/@types/auth'
import { CommonProps } from '@/@types/common'

export interface SignUpFormProps extends CommonProps {
    disableSubmit?: boolean
    signInUrl?: string
    formValueStep?: SignUpCredentialStepOne &
        SignUpCredentialStepTwo &
        SignUpCredentialStepTree

    handleStep?: (
        newStep: string,
        formValues?: SignUpCredentialStepOne &
            SignUpCredentialStepTwo &
            SignUpCredentialStepTree
    ) => void
}
