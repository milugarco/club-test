import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import useAuth from '@/utils/hooks/useAuthHook'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { HiOutlineCog, HiOutlineLogout } from 'react-icons/hi'
import type { CommonProps } from '@/@types/common'
import { ModeSwitcher } from './ThemeConfigurator/ModeSwitcher'
import store from '@/store'
import { decodeJWT } from '@/utils/jwt/DecodeJwt'
import { useEffect, useState } from 'react'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import { photoDefault } from '@/utils/photoDefault'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = [
    {
        label: 'Configurações do Perfil',
        path: '/profile/settings/my-profile',
        icon: <HiOutlineCog />,
    },
]

const _UserDropdown = ({ className }: CommonProps) => {
    const { signOut } = useAuth()

    const [user, setUser] = useState({
        name: '',
        email: '',
        photo: '',
    })

    useEffect(() => {
        const state = store.getState()
        const { userName, email, avatar } = state.auth.user
        if (userName && email && avatar) {
            setUser({ name: userName, email: email, photo: avatar })
        }
    }, [])
    const userName = user.name.split(' ')
    const shortName = userName.length >= 2 ? `${userName[0]} ${userName[userName.length - 1]}` : user.name
    const UserAvatar = (
        <div className={classNames(className, 'flex items-center gap-2')}>
            <Avatar
                size={32}
                shape="circle"
                className="w-6 h-6 rounded-full"
                icon={
                    <img
                        src={
                            user.photo
                                ? BASE_IMAGE_URL + user.photo
                                : photoDefault
                        }
                        className=" w-8 h-8 rounded-full object-cover"
                    />
                }
            />
            <h6 className="text-sm md:block hidden">{shortName}</h6>
        </div>
    )

    return (
        <div>
            <Dropdown
                menuStyle={{ minWidth: 240 }}
                renderTitle={UserAvatar}
                placement="bottom-end"
            >
                <Dropdown.Item variant="header">
                    <div className=" flex items-center gap-2">
                        <Avatar
                            shape="circle"
                            icon={
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={
                                        user.photo
                                            ? BASE_IMAGE_URL + user.photo
                                            : photoDefault
                                    }
                                />
                            }
                        />
                        <div>
                            <div className="font-bold text-gray-900 dark:text-gray-100">
                                {user.name}
                            </div>
                            <div className="text-xs">{user.email}</div>
                        </div>
                    </div>
                </Dropdown.Item>

                <Dropdown.Item variant="divider" />
                {dropdownItemList.map((item) => (
                    <Dropdown.Item
                        key={item.label}
                        eventKey={item.label}
                        className="mb-1 px-0"
                    >
                        <Link
                            className="flex h-full w-full px-2"
                            to={item.path}
                        >
                            <span className="flex gap-2 items-center w-full">
                                <span className="text-xl opacity-50">
                                    {item.icon}
                                </span>
                                <span>{item.label}</span>
                            </span>
                        </Link>
                    </Dropdown.Item>
                ))}
                <Dropdown.Item variant="divider" />
                <div className="ml-2 md:hidden">
                    <ModeSwitcher />
                </div>
                <Dropdown.Item variant="divider" className="md:hidden" />
                <Dropdown.Item
                    eventKey="Sign Out"
                    className="gap-2"
                    onClick={signOut}
                >
                    <span className="text-xl opacity-50">
                        <HiOutlineLogout className="text-red-600" />
                    </span>
                    <span className="text-red-600">Sair</span>
                </Dropdown.Item>
            </Dropdown>
        </div>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
