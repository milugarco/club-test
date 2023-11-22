import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import { Link } from 'react-router-dom'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'dark',
        className,
        imgClass,
        style,
        logoWidth = '7%'
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth }
            }}
        >
            <Link to="/home">
                <img
                    className={imgClass}
                    src={`${LOGO_SRC_PATH}logo-${mode}-${type}.png`}
                    alt={`${APP_NAME} logo`}
                />
            </Link>
        </div>
    )
}

export default Logo
