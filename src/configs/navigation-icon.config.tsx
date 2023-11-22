import {
    HiOutlineColorSwatch,
    HiOutlineHome,
    HiOutlineOfficeBuilding,
    HiOutlineUser,
    HiOutlineBriefcase,
    HiOutlineSparkles,
    HiOutlinePencil,
    HiOutlineCog,
    HiOutlineCalendar,
    HiOutlineTicket,
    HiOutlineClipboardList,
    HiOutlineBookOpen,
    HiOutlineCurrencyDollar,
    HiOutlineQrcode,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    profile: <HiOutlineUser />,
    business: <HiOutlineOfficeBuilding />,
    dashboardBusiness: <HiOutlineBriefcase/>,
    newEvent: <HiOutlineSparkles/>,
    eventManagement: <HiOutlinePencil />,
    groupSingleMenu: <HiOutlineUser />,
    groupCollapseMenu: <HiOutlineColorSwatch />,
    config: <HiOutlineCog/>,
    calendar: <HiOutlineCalendar/>,
    ticket: <HiOutlineTicket/>,
    clipboardEvents: <HiOutlineClipboardList/>,
    courses:<HiOutlineBookOpen />,
    financial:<HiOutlineCurrencyDollar />,
    credential: <HiOutlineQrcode/>
}

export default navigationIcon
