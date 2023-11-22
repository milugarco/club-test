import { Button, Card } from '@/components/ui'
import { Link } from 'react-router-dom'
import {FilteringGuests} from '../ListTicket'
import { HiOutlineChevronLeft } from 'react-icons/hi'

const GuestsPage = () => {
    return (
        <div>
            <Card className="border-none">
            <Link to="/dashboard/event/my-events/event">
                    <Button
                        className=" w-16 mb-4"
                        type="submit"
                        variant="twoTone"
                        icon={<HiOutlineChevronLeft />}
                        size='xs'

                    >
                        <span>Voltar</span>
                    </Button>
                </Link>
                <h1 className="mb-4">Participantes</h1>
                <div>
                    
                    <Link to="/dashboard/event/guests/manage-guests">
                        <Button>Adicionar participante</Button>
                    </Link>
                    <FilteringGuests />
                </div>
            </Card>
        </div>
    )
}

export default GuestsPage
