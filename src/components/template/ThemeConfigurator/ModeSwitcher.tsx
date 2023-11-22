
import { ReactNode, useCallback } from 'react'
import useDarkMode from '@/utils/hooks/useDarkmode'
import Switcher from '@/components/ui/Switcher'
import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

const ModeSwitcher = () => {
    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = useCallback(
        (checked: boolean) => {
            setIsDark(checked ? 'dark' : 'light')
        },
        [setIsDark]
    )

    const withIcon = (component: ReactNode) => {
        return <div className="text-lg">{component}</div>
    }

    return (
        <div>
            <Switcher
                defaultChecked={isDark}
                onChange={(checked) => onSwitchChange(checked)}
            />
        </div>
    )
}

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const LogoHeader = (props: LogoProps) => {
    const {
        type = 'full',
        className,
        imgClass,
        style,
        logoWidth = '80px'
    } = props

    const [isDark] = useDarkMode() 

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth }
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${
                    isDark ? 'dark' : 'light'
                }-${type}.png`} 
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

const LogoSideNav = (props: LogoProps) => {
    const [isDark] = useDarkMode() 
    const {
        type = 'streamline',
        className,
        imgClass,
        style = {
            backgroundPositionX: 'center'
        },
        logoWidth = '20%'
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth }
            }}
        >
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${
                    isDark ? 'dark' : 'light'
                }-${type}.png`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export { ModeSwitcher, LogoHeader, LogoSideNav }

