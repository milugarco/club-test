import { Button, Card } from '@/components/ui'
import { Link } from 'react-router-dom'
import {Filtering} from '../ListTicket'
import { HiOutlineChevronLeft } from 'react-icons/hi'

const IngressosManager = () => {
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
                <h1 className="mb-4">Ingressos</h1>
                <div>
                    <Link to="/dashboard/event/create-ticket">
                        <Button>Novo ingresso</Button>
                    </Link>
                    <Filtering />
                </div>
            </Card>
        </div>
    )
}

export default IngressosManager
