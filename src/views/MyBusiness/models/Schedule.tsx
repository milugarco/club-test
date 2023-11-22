import AdaptableCard from '@/components/shared/AdaptableCard'
import Card from '@/components/ui/Card'
import Calendar from './Calendar'



const Schedule = () => {
    return (
        <div>
            <Card className='border-none'>
        <Calendar/>           
        </Card>
        </div>
    )
}

export default Schedule
