import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import {
    HiCalendar,
    HiTicket,
    HiOutlinePresentationChartLine,
    HiOutlineUserGroup,
    HiOutlineTicket
} from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui'

export type Statistic = {
    key: string
    label: string
    value: number
    text: string
    edit: any
    list: any
}

const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'tickets':
            return (
                <Avatar
                    size={55}
                    className="bg-cyan-100 text-cyan-700 dark:bg-cyan-700 dark:text-cyan-200"
                    icon={<HiOutlineTicket />}
                />
            )
        case 'confirmed':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/50 dark:text-emerald-100"
                    icon={<HiOutlinePresentationChartLine />}
                />
            )
        case 'guest':
            return (
                <Avatar
                    size={55}
                    className="bg-pink-100 text-pink-600 dark:bg-pink-800 dark:text-pink-200"
                    icon={<HiOutlineUserGroup />}
                />
            )
        default:
            return
    }
}

const StatisticCard = ({ data = {} }: { data: Partial<Statistic> }) => {
    return (
        <Card className="border-none flex justify-center flex-col h-96 w-full bg-blue-500">
            <div className="flex flex-col items-center gap-4 w-full">
                <StatisticIcon type={data.key} />

                <div className="flex flex-col items-center text-center justify-center w-full mb-2 gap-4">
                    <h1 className="font-bold text-2xl">{data.label}</h1>
                    <div>{data.list}</div>
                    <div className="w-full  ">{data.edit}</div>
                </div>
            </div>
        </Card>
    )
}

const StatisticEvent = ({
    data = [
        {
            key: 'confirmed',
            label: 'Evento',
            edit: (
                <Link
                    to="/dashboard/event/my-event"
                    className="w-full flex justify-center"
                >
                    <Button className="w-[90%] md:w-full mx-44 flex justify-center">
                        Editar Evento
                    </Button>
                </Link>
            ),
            list: (
                <ul className="flex flex-col gap-1 text-lg">
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                </ul>
            )
        },
        {
            key: 'tickets',
            label: 'Ingressos',
            edit: (
                <Link
                    to="/dashboard/event/ticket"
                    className="w-full flex justify-center"
                >
                    <Button className="w-[90%] mx-44 flex justify-center">
                        Editar ingressos
                    </Button>
                </Link>
            ),
            list: (
                <ul className="flex flex-col gap-1 text-lg">
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                </ul>
            )
        },
        {
            key: 'guest',
            label: 'Participantes',
            edit: (
                <Link
                    to="/dashboard/event/guests"
                    className="w-full flex justify-center"
                >
                    <Button className="w-[90%] mx-44 flex justify-center">
                        Convidar
                    </Button>
                </Link>
            ),
            list: (
                <ul className="flex flex-col gap-1 text-lg">
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                    <li>Faturamento:</li>
                </ul>
            )
        }
    ]
}: {
    data?: Partial<Statistic>[]
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
            {data.map((card) => (
                <StatisticCard key={card.key} data={card} />
            ))}
        </div>
    )
}

export default StatisticEvent
