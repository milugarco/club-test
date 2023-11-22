import { cloneElement } from 'react'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import LogoLogin from '@/components/template/LogoLogin'
import { useTranslation } from 'react-i18next'
import LanguageSelector from '@/components/template/LanguageSelector'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    const { t } = useTranslation()
    return (
        <>
            <div className="absolute top-4 right-4 z-50">
                <LanguageSelector />
            </div>
            <div className="grid lg:grid-cols-3 h-full dark:bg-gray-800">
                <div
                    className="bg-no-repeat bg-cover py-6 px-8 flex-col justify-between pb-[40%] hidden items-center lg:flex"
                    style={{
                        backgroundImage: `url('/img/others/auth-side-bg.gif')`
                    }}
                >
                    <LogoLogin className="invisible lg:visible" />
                    <div>
                        <div className="mb-6 items-center gap-4">
                            <div className="text-white">
                                <div className="font-semibold text-5xl">
                                    {t('side.item1')}
                                </div>
                            </div>
                        </div>
                        <p className="hidden text-xl text-white opacity-80 lg:block">
                            {t('side.item2')}
                        </p>
                    </div>
                    <span className="text-white absolute bottom-4">
                        Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                        <span className="font-semibold">{`${APP_NAME}`}</span>{' '}
                    </span>
                </div>
                <div
                    className="
                    col-span-3 lg:col-span-1 flex flex-col justify-center items-center dark:bg-gray-800 w-full"
                >
                    <div className="">
                        <div className="mb-8 md:py-4">{content}</div>
                        {children
                            ? cloneElement(children as React.ReactElement, {
                                  ...rest
                              })
                            : null}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Side
