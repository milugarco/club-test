import React, { useState } from 'react'
import GuestStepOne from './GuestStepOne'
import GuestStepFour from './GuestStepFour'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '@/components/ui'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import {
    GuestCredentialStepOne,
    GuestCredentialStepTwo,
    GuestCredentialStepThree,
    GuestCredentialStepFour,
    GuestCredentialStepFive,
    GuestCredentialStepSix,
    GuestCredentialStepSeven,
    GuestCredentialStepEight,
    GuestCredentialStepNine,
} from '@/@types/auth'
import GuestStepTwo from './GuestStepTwo'
import GuestStepThree from './GuestStepThree'
import GuestStepFive from './GuestStepFive'
import GuestStepSix from './GuestStepSix'
import GuestStepSeven from './GuestStepSeven'
import GuestStepEight from './GuestStepEight'
import GuestStepNine from './GuestStepNine'
import GuestStepTen from './GuestStepTen'

interface FormValueStep
    extends GuestCredentialStepOne,
        GuestCredentialStepTwo,
        GuestCredentialStepThree,
        GuestCredentialStepFour,
        GuestCredentialStepFive,
        GuestCredentialStepSix,
        GuestCredentialStepSeven,
        GuestCredentialStepEight,
        GuestCredentialStepNine {}

const RegisterGuest = () => {
    const [step, setStep] = useState('one')

    const [formValueStep, setFormValueStep] = useState<
        FormValueStep | undefined
    >({
        userName: '',
        phoneValue: '',
        email: '',
        cpf: '',
        agreeToTerms: false,
        photo: '',
        questOne: '',
        questTwo: '',
        socialMidia: [{ name: '', user: '' }],
        profilePhoto: '',
        documentType: '',
        documentNumber: '',
        photoDocumentOne: '',
        photoDocumentTwo: '',
        codeValidation: '',
        passWord: '',
        signTerms: false,
    })



    const handleStep = (
        newStep: string,
        formValue?: FormValueStep | undefined
    ) => {
        setStep(newStep)

        if (newStep === 'one') {
            setFormValueStep(formValue)
        } else if (newStep === 'two') {
            setFormValueStep(formValue)
        } else if (newStep === 'three') {
            setFormValueStep(formValue)
        } else if (newStep === 'four') {
            setFormValueStep(formValue)
        } else if (newStep === 'five') {
            setFormValueStep(formValue)
        } else if (newStep === 'six') {
            setFormValueStep(formValue)
        } else if (newStep === 'seven') {
            setFormValueStep(formValue)
        } else if (newStep === 'eight') {
            setFormValueStep(formValue)
        } else if (newStep === 'nine') {
            setFormValueStep(formValue)
        } else {
            setFormValueStep(formValue)
        }
    }

    const { t } = useTranslation()

    return (
        <>
            {step === 'one' ? (
                <>
                    <Card className="border-none">
                        <GuestStepOne
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'two' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('one')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepTwo
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'three' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('two')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepThree
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'four' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('three')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepFour
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'five' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('four')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepFive
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'six' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('five')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepSix
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'seven' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('four')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepSeven
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'eight' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('seven')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepEight
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'nine' ? (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('eight')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepNine
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ): (
                <>
                    <Card className="border-none">
                        <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('nine')
                            }}
                        >
                            <span>Voltar</span>
                        </Button>
                        <GuestStepTen
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            )}
        </>
    )
}

export default RegisterGuest
