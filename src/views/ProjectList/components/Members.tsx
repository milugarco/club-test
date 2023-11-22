import { EventAvatarGroup } from '@/components/shared/UsersAvatarGroup'

type MembersProps = {
    event: {
        name: string
        photo: string
        startAt: string
        description: string
    }
}

const Members = ({ event }: MembersProps) => {
    return <EventAvatarGroup users={event} />
}

export default Members
