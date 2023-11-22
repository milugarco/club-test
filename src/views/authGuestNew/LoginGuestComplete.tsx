import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, Card } from '@/components/ui'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import {

    GuestCredentialStepFiveNew,
    GuestCredentialStepFourNew,
    GuestCredentialStepOneNew,
    GuestCredentialStepSixNew,
    GuestCredentialStepThreeNew,
    GuestCredentialStepTwoNew,
} from '@/@types/auth'
import GuestStepOne from './GuestStepOne'
import GuestStepTwo from './GuestStepTwo'
import GuestStepThree from './GuestStepThree'
import GuestStepFour from './GuestStepFour'
import GuestStepFive from './GuestStepFive'
import GuestStepSix from './GuestStepSix'
import GuestStepSeven from './GuestStepSeven'


interface FormValueStep
    extends GuestCredentialStepOneNew,
    GuestCredentialStepTwoNew,
    GuestCredentialStepThreeNew,
    GuestCredentialStepFourNew,
    GuestCredentialStepFiveNew,
GuestCredentialStepSixNew
{ }

const RegisterGuestComplete = () => {
    const [step, setStep] = useState('one')

    const [formValueStep, setFormValueStep] = useState<
        FormValueStep | undefined
    >({
        agreeInvite: false,
        photo: '',
        profilePhoto: '',
        documentType: '',
        documentNumber: '',
        photoDocumentOne: '',
        photoDocumentTwo: '',
        signTerms: false,
    })


    const handleStep = (
        newStep: string,
        formValue?: FormValueStep | undefined
    ) => {
        setStep(newStep)

        if (newStep === 'one') {
            setFormValueStep(formValue);
        }  else if (newStep === 'two') {
            setFormValueStep(formValue);
        }else if (newStep === 'three') {
            setFormValueStep(formValue);
        }
        else if (newStep === 'four') {
            setFormValueStep(formValue);
        } else if (newStep === 'five') {
            setFormValueStep(formValue);
        } else if (newStep === 'six') {
            setFormValueStep(formValue);
        } else {
            setFormValueStep(formValue);
        }
    };



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

                        <GuestStepTwo
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'three' ? (
                <>
                    <Card className="border-none">
                        {/* <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('two', formValueStep);
                            }}
                        >
                            <span>Voltar</span>
                        </Button> */}
                        <GuestStepThree
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'four' ? (
                <>
                    <Card className="border-none">
                      {/*   <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('three', formValueStep)
                            }}
                        >
                            <span>Voltar</span>
                        </Button> */}
                        <GuestStepFour
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'five' ? (
                <>
                    <Card className="border-none">
                        {/* <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('four', formValueStep)
                            }}
                        >
                            <span>Voltar</span>
                        </Button> */}
                        <GuestStepFive
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : step === 'six' ? (
                <>
                    <Card className="border-none">
                        {/* <Button
                            className="w-16 mb-4 z-52"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('five', formValueStep)
                            }}
                        >
                            <span>Voltar</span>
                        </Button> */}
                        <GuestStepSix
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            ) : (
                <>
                    <Card className="border-none">
                        <GuestStepSeven
                            formValueStep={formValueStep}
                            handleStep={handleStep}
                        />
                    </Card>
                </>
            )}
        </>
    )
}

export default RegisterGuestComplete
