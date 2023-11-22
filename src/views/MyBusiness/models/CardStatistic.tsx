import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import {
    HiTicket,
    HiCheckCircle,
    HiCalendar,
} from 'react-icons/hi'

export type Statistic = {
    key: string
    label: string
    value: number
}



const StatisticIcon = ({ type }: { type?: string }) => {
    switch (type) {
        case 'tickets':
            return (
                <Avatar
                    size={55}
                    className="bg-red-100 text-red-600 dark:bg-red-500/50 dark:text-red-100"
                    icon={<HiTicket />}
                />
            )
        case 'confirmed':
            return (
                <Avatar
                    size={55}
                    className="bg-emerald-100 text-emerald-600 dark:bg-emerald-500/50 dark:text-emerald-100"
                    icon={<HiCheckCircle />}
                />
            )
        case 'calendar':
            return (
                <Avatar
                    size={55}
                    className="bg-amber-100 text-amber-600 dark:bg-amber-500/50 dark:text-amber-100"
                    icon={<HiCalendar />}
                />
            )
        default:
            return <div></div>
    }
}

const StatisticCard = ({ data = {} }: { data: Partial<Statistic> }) => {
    return (
        <Card className='border-none flex items-center justify-center'>
            <div className="flex flex-col sm:flex-row xl:flex-col 2xl:flex-row items-center gap-4 justify-between">
                <StatisticIcon type={data.key} />
                <div>
                    <div className="flex gap-1.5 flex-col items-center text-center mb-2">
                        <h3 className="font-bold leading-none">{data.value}</h3>
                        <p className="font-semibold">{data.label}</p>
                    </div>

                </div>
            </div>
        </Card>
    )
}

const Statistic = ({ data = [{
    key: 'tickets',
    label: 'Ingressos Vendidos',
    value: 120,

},
{
    key: 'confirmed',
    label: 'Presenças Confirmadas',
    value: 80,

},
{
    key: 'calendar',
    label: 'Eventos Realizados',
    value: 45,

},] }: { data?: Partial<Statistic>[] }) => {
    return (
        <div className="grid grid-cols-3 md:grid-cols-1 xl:grid-cols-3 gap-4">
            {data.map((card) => (
                <StatisticCard key={card.key} data={card} />
            ))}
        </div>
    )
}

export default Statistic
