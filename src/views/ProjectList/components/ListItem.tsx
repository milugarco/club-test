import Card from '@/components/ui/Card'
import ItemDropdown from './ItemDropdown'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiOutlineClipboardCheck, HiTicket } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import { useEffect, useState } from 'react'
import formatDate from '@/utils/formatDate'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import { useTabs } from '@/components/ui/Tabs/context'
import { useTranslation } from 'react-i18next'
import store from '@/store'

type ListItemProps = {
    data: ResponseEventParticipantClubDto
    cardBorder?: boolean
}

const ListItem = ({ data, cardBorder }: ListItemProps) => {
    const eventTicketId = data.id
    const eventTicketStatus = data.eventTicket.status
    const eventName = data.event.name
    const eventDescription = data.event.description
    const ticketColor = data.eventTicket.color
    const eventTicketName = data.eventTicket.name
    const photo = data.event.photo
    const startDate = formatDate(data.event.startAt)
    const [eventStatus, setEventStatus] = useState('')
    const [eventStatusColor, setEventStatusColor] = useState('')

    const { t } = useTranslation()
    const state = store.getState()
    useEffect(() => {
        if (eventTicketStatus === 'DISABLE') {
            setEventStatus(t('home.disable').toString())
            setEventStatusColor('text-red-500')
        } else if (eventTicketStatus === 'ENABLE') {
            setEventStatus(t('home.enable').toString())
            setEventStatusColor('text-green-500')
        }
    }, [state.locale.currentLang])

    return (
        <div className="mb-4">
            <Link
                to={`/club/event/my-events/event?eventParticipantId=${data.id}`}
            >
                <Card
                    key={eventTicketId}
                    bordered={cardBorder}
                    className="border-none"
                >
                    <div className="grid gap-x-4 grid-cols-12 justify-between items-center">
                        <div className="my-1 sm:my-0 col-span-12 md:col-span-3 lg:col-span-4 flex items-center lg:justify-start justify-between ">
                            <div className="flex md:flex-col md:gap-0 lg:flex-row items-center w-full gap-8 lg:gap-12">
                                <img
                                    src={photo ? BASE_IMAGE_URL + photo : ''}
                                    className="w-12 sm:w-20 rounded-lg"
                                />
                                <div className="flex md:flex-col flex-row justify-between w-full items-center text-center gap-2">
                                    <h6 className="text-center sm:text-lg text-sm font-bold">
                                        {eventName}
                                    </h6>
                                    <div className="flex flex-col sm:flex-row sm:gap-4 md:flex-col justify-center">
                                        <span className="sm:text-sm text-[11px]">
                                            {startDate}
                                        </span>
                                        <p
                                            className={`text-center ${eventStatusColor} uppercase sm:text-sm text-[11px]`}
                                        >
                                            {eventStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-1 text-center sm:my-0 md:col-span-6 lg:col-span-5 hidden justify-center md:items-center md:flex">
                            <p className="text-center">{eventDescription}</p>
                        </div>
                        <div className="hidden col-span-3 md:flex items-center justify-end pr-8">
                            <p className={`text-center text-[${ticketColor}]`}>
                                {eventTicketName}
                            </p>
                            <HiTicket
                                size={30}
                                className={` text-[${ticketColor}]`}
                            />
                        </div>
                    </div>
                </Card>
            </Link>
        </div>
    )
}

export default ListItem
