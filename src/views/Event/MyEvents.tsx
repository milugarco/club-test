import { Button, Card, DatePicker, InputGroup, Select } from '@/components/ui'

import '@/assets/styles/components/modal.css'
import { ListEvents } from '../MyBusiness/models/ListEvents'

const MyEvents = () => {
    return (
        <div>
            <Card className="border-none">
                <ListEvents />
            </Card>
        </div>
    )
}

export default MyEvents
