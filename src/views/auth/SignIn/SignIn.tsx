import { LogoAuth } from '@/components/layouts/AuthLayout/Logo'
import SignInForm from './SignInForm'
import { useTranslation } from 'react-i18next'
import LogoLogin from '@/components/template/LogoLogin'

const SignIn = () => {
    const { t } = useTranslation()
    return (
        
            <div className="flex flex-col w-full xl:w-96 justify-center lg:px-0  px-8 items-center">
                <div className="flex justify-center items-center lg:hidden mb-6">
                    <LogoLogin className="block lg:hidden mx-auto mb-12" />
                </div>
                <div className="mb-8 z-100">
                    <h3 className="mb-1 z-100 text-center lg:text-left">
                        {t('signin.welcome')}
                    </h3>
                    <p className="text-center lg:text-left">
                        {t('signin.paragraph1')}
                    </p>
                </div>
                <div className='flex w-full'>
                <SignInForm disableSubmit={false} />
                </div>
            </div>
        
    )
}

export default SignIn
