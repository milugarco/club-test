import { cloneElement } from 'react'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import type { ReactNode, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/template/LanguageSelector'

interface CoverProps extends CommonProps {
    content?: ReactNode
}

const Cover = ({ children, content, ...rest }: CoverProps) => {
    const { t } = useTranslation()
    return (
    <>
        <div className="absolute top-4 right-4 z-50">
                <LanguageSelector />
            </div>
        <div
            className="grid lg:grid-cols-3 h-full w-full"
            style={{
                backgroundImage: `url('/img/others/auth-cover-bg.gif')`
            }}
        >
            <div className="col-span-2  py-6 px-16 flex-col items-center justify-between hidden lg:flex relative z-1">
                <Logo mode="dark" logoWidth="20%" />
                <div>
                    <div className="font-semibold text-white text-5xl">
                        {t('side.item1')}
                    </div>
                    <p className="hidden text-xl text-white opacity-80 lg:block">
                        {t('side.item2')}
                    </p>
                </div>
                <span className="text-white">
                    Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                    <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center bg-white dark:bg-gray-800 z-1">
                <div className="">
                    <div className="mb-8">{content}</div>
                    {children
                        ? cloneElement(children as ReactElement, { ...rest })
                        : null}
                </div>
            </div>
        </div>
        </>
    )
}

export default Cover
