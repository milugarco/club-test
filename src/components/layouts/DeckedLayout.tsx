import Header from '@/components/template/Header'
import UserDropdown from '@/components/template/UserDropdown'
import HeaderLogo from '@/components/template/HeaderLogo'
import SecondaryHeader from '@/components/template/SecondaryHeader'
import MobileNav from '@/components/template/MobileNav'
import View from '@/views'
import { ModeSwitcher } from '../template/ThemeConfigurator/ModeSwitcher'
import Notification from '../template/Notification'
import LanguageSelector from '../template/LanguageSelector'

const HeaderActionsStart = () => {
    return (
        <>
            <HeaderLogo />
            <MobileNav />
        </>
    )
}

const HeaderActionsEnd = () => {
    return (
        <>
            <div className="hidden md:block mr-4">
                <ModeSwitcher />
            </div>
            <div className="block">
                <LanguageSelector />
            </div>
            <div>
                <Notification  />
            </div>
            <UserDropdown  hoverable={false} />
        </>
    )
}

const DeckedLayout = () => {
    return (
        <div className="app-layout-simple flex flex-auto flex-col min-h-screen">
            <div className="flex flex-auto min-w-0">
                <div className="flex flex-col flex-auto min-h-screen min-w-0 relative w-full">
                    <Header
                        container
                        className="shadow-xl"
                        headerStart={<HeaderActionsStart />}
                        headerEnd={<HeaderActionsEnd />}
                    />
                    <SecondaryHeader contained />

                    <View pageContainerType="contained" />
                </div>
            </div>
        </div>
    )
}

export default DeckedLayout
