import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import useDarkMode from '@/utils/hooks/useDarkmode'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const LogoCard = (props: LogoProps) => {
    const {
        type = 'full',
        className,
        imgClass,
        style,
        logoWidth = '40%'
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
            {/* <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-${
                    isDark ? 'dark' : 'light'
                }-${type}.png`} // Alterado para usar o modo atual
                alt={`${APP_NAME} logo`}
            /> */}
            <img
                className={imgClass}
                src={`${LOGO_SRC_PATH}logo-dark-${type}.png`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default LogoCard
