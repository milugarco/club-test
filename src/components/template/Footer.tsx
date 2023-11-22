import classNames from 'classnames'
import Container from '@/components/shared/Container'
import { APP_NAME } from '@/constants/app.constant'
import { PAGE_CONTAINER_GUTTER_X } from '@/constants/theme.constant'
import { useTranslation } from 'react-i18next'

export type FooterPageContainerType = 'gutterless' | 'contained'

type FooterProps = {
    pageContainerType: FooterPageContainerType
}

const FooterContent = () => {

    const { t } = useTranslation()

    return (
        <div className="flex items-center justify-center text-center gap-1 mt-4 flex-col sm:flex-row w-full">
            <span>
                Copyright &copy; {`${new Date().getFullYear()}`}{' '}
                <span className="font-semibold">{`${APP_NAME}`}</span>{t('footer.copyright')}
            </span>
            {/* <div className="">
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Term & Conditions
                </a>
                <span className="mx-2 text-muted"> | </span>
                <a
                    className="text-gray"
                    href="/#"
                    onClick={(e) => e.preventDefault()}
                >
                    Privacy & Policy
                </a>
            </div> */}
        </div>
    )
}

export default function Footer({
    pageContainerType = 'contained'
}: FooterProps) {
    return (
        <footer
            className={classNames(
                `footer flex flex-auto items-center h-16 ${PAGE_CONTAINER_GUTTER_X}`
            )}
        >
            {pageContainerType === 'contained' ? (
                <Container>
                    <FooterContent />
                </Container>
            ) : (
                <FooterContent />
            )}
        </footer>
    )
}
