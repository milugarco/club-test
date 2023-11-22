import { SignUpFormStepOne } from './SignUpFormStepOne'
import { SignUpFormStepTwo } from './SignUpFormStepTwo'
import SignUpFormStepThree from './SignUpFormStepThree'
import { useState } from 'react'
import { StepsComponent } from './SignUpStepsComponent'
import { Button } from '@/components/ui'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import {
    SignUpCredentialStepOne,
    SignUpCredentialStepTree,
    SignUpCredentialStepTwo,
} from '@/@types/auth'
import { useTranslation } from 'react-i18next'
import LogoLogin from '@/components/template/LogoLogin'

const SignUp = () => {
    const [step, setStep] = useState('one')
    const [currentStep, setCurrentStep] = useState(0)

    const [formValueStep, setFormValueStep] = useState<
        | (SignUpCredentialStepOne &
              SignUpCredentialStepTwo &
              SignUpCredentialStepTree)
        | undefined
    >({
        userName: '',
        phoneValue: '',
        documentUserValue: '',
        email: '',
        password: '',
        photoFace: '',
    })

    const handleStep = (
        newStep: string,
        formValue?:
            | (SignUpCredentialStepOne &
                  SignUpCredentialStepTwo &
                  SignUpCredentialStepTree)
            | undefined
    ) => {
        setStep(newStep)

        if (newStep === 'one') {
            setCurrentStep(0)
        } else if (newStep === 'two') {
            setCurrentStep(1)
            setFormValueStep(formValue) // Use o valor anterior se formValue for undefined
        } else {
            setCurrentStep(2)
            setFormValueStep(formValue)
        }
    }

    const { t } = useTranslation()

    return (
        <>
        <div className='w-full px-4 xl:w-96 xl:px-0'>
            <LogoLogin className="visible lg:invisible mx-auto mb-12" />
            <StepsComponent currentStep={currentStep} />
            {step === 'one' ? (
                <>
                    <div className="mb-4">
                        <h3 className="mb-1">{t('register.paragraph')}</h3>
                        <p>{t('register.paragraph1')}</p>
                    </div>
                    <SignUpFormStepOne
                        formValueStep={formValueStep}
                        handleStep={handleStep}
                    />
        
                </>
            ) : step === 'two' ? (
                <>
                    <div className="mb-1">
                        <Button
                            className="w-16 mb-4"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('one')
                            }}
                        >
                            <span>{t('register.back')}</span>
                        </Button>
                    </div>
                    <div className="mb-4">
                        <h3 className="mb-1">{t('register.paragraph')}</h3>
                        <p>{t('register.paragraph1')}</p>
                    </div>
                    <SignUpFormStepTwo
                        formValueStep={formValueStep}
                        handleStep={handleStep}
                    />
                </>
            ) : (
                <>
                    <div className="mb-1">
                        <Button
                            className="w-16 mb-4"
                            type="submit"
                            variant="twoTone"
                            icon={<HiOutlineChevronLeft />}
                            size="xs"
                            onClick={() => {
                                handleStep('two')
                            }}
                        >
                            <span>{t('register.back')}</span>
                        </Button>
                    </div>
                    <div className="mb-4">
                        <h3 className="mb-1">{t('register.paragraph')}</h3>
                        <p>{t('register.paragraph2')}</p>
                    </div>
                    <SignUpFormStepThree
                        formValueStep={formValueStep}
                        handleStep={handleStep}
                        disableSubmit={false}
                    />
                </>
            )}
            </div>
        </>
    )
}

export default SignUp
