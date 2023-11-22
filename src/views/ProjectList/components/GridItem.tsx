import Card from '@/components/ui/Card'
import Members from './Members'
import ProgressionBar from './ProgressionBar'
import { HiTicket } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import formatDate from '@/utils/formatDate'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import formatDateRange from '@/utils/formatDateRange'
import store from '@/store'

export type GridItemProps = {
    data: ResponseEventParticipantClubDto
}

const GridItem = ({ data }: GridItemProps) => {
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

    const statusClass = ''
    const state = store.getState()

    const { t } = useTranslation()
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
        <Link to={`/club/event/my-events/event?eventParticipantId=${data.id}`}>
            <Card
                key={eventTicketId}
                bodyClass="h-full"
                className="border-none"
            >
                <div className="flex flex-col justify-between items-center h-full">
                    <div className="flex justify-between flex-col items-center ">
                        <img
                            src={photo ? BASE_IMAGE_URL + photo : ''}
                            className=" rounded-lg mb-2"
                        />
                        <h6>{eventName}</h6>
                    </div>
                    <p className="mt-4 text-center">
                        {data?.event.startAt && data?.event.endAt
                            ? formatDateRange(
                                  new Date(data?.event?.startAt),
                                  new Date(data?.event.endAt)
                              )
                            : 'Data não definida ainda'}
                    </p>
                    <p className="mt-4 text-center">
                        {eventDescription && eventDescription?.length < 22
                            ? eventDescription
                            : `${
                                  eventDescription
                                      ? eventDescription.slice(0, 22)
                                      : ''
                              }...`}
                    </p>
                    <div className="mt-3 w-full">
                        <div className="flex flex-col items-center justify-between mt-2 w-full">
                            <div
                                className={`flex flex-col items-center text-center w-full h-20 bg-[${ticketColor}] bg-opacity-20 justify-center rounded-lg `}
                            >
                                <HiTicket
                                    size={30}
                                    className={`text-[${ticketColor}]`}
                                />
                                <p
                                    className={`text-center text-[${ticketColor}]`}
                                >
                                    {eventTicketName}
                                </p>
                            </div>

                            <div
                                className={`flex items-center rounded-full font-semibold text-xs ${statusClass}`}
                            >
                                <p
                                    className={`mt-4 text-center ${eventStatusColor} uppercase`}
                                >
                                    {eventStatus}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    )
}

export default GridItem
