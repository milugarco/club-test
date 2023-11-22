import { useState, useEffect } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import Spinner from '@/components/ui/Spinner'
import { useTranslation } from 'react-i18next'
import {
    getList,
    useAppDispatch,
    useAppSelector,
    setSearch,
    toggleSort // Adicione esta importação
} from '../store'
import useEventParticipanteHook from '@/utils/hooks/useClubEventParticipantClubHook'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import { DoubleSidedImage } from '@/components/shared'

const ProjectListContent = () => {
    const [ticketList, setTicketList] = useState<
        ResponseEventParticipantClubDto[]
    >([])
    const { t } = useTranslation()

    const { eventParticipantClubControllerFindAll } = useEventParticipanteHook()

    const dispatch = useAppDispatch()

    const view = useAppSelector((state) => state.projectList.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.projectList.data.query
    )

    useEffect(() => {
        dispatch(getList({ sort, search }))
    }, [dispatch, sort, search])

    // Classifique os projetos de A a Z com base no nome
    const sortedProjects = [...ticketList].sort((a, b) => {
        const nameA = a.event.name ? a.event.name.toLowerCase() : ''
        const nameB = b.event.name ? b.event.name.toLowerCase() : ''

        if (sort === 'asc') {
            return nameA.localeCompare(nameB)
        } else {
            return nameB.localeCompare(nameA)
        }
    })

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await eventParticipantClubControllerFindAll()

                if (response?.data) {
                    setTicketList(response.data)
                }
            } catch (error) {}
        }

        fetchTickets()
    }, [])

    const mapStatus = (status: string) => {
        if (status.toLowerCase() === 'disable') {
            return t('home.disable').toString().toLowerCase()
        } else if (status.toLowerCase() === 'enable') {
            return t('home.enable').toString().toLowerCase()
        } else {
            return status
        }
    }

    const filteredProjects = sortedProjects.filter((event) => {
        const eventName = event.event.name ? event.event.name.toLowerCase() : ''
        const eventTicketName = event.eventTicket.name
            ? event.eventTicket.name.toLowerCase()
            : ''
        const eventTicketStatus = event.eventTicket.status
            ? mapStatus(event.eventTicket.status)
            : ''
        const eventDescription = event.event.description
            ? event.event.description.toLowerCase()
            : ''

        const lowerCaseSearch = search.toLowerCase()

        return (
            eventName.includes(lowerCaseSearch) ||
            eventTicketName.includes(lowerCaseSearch) ||
            eventTicketStatus.includes(lowerCaseSearch) ||
            eventDescription.includes(lowerCaseSearch)
        )
    })

    // ...

    console.log(filteredProjects)
    return (
        <div>
            {filteredProjects.length > 0 ? (
                <div
                    className={classNames({
                        'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4':
                            view === 'grid',
                        'grid grid-cols-1 gap-4': view !== 'grid'
                    })}
                >
                    {filteredProjects.map((event) =>
                        view === 'grid' ? (
                            <GridItem key={event.id} data={event} />
                        ) : (
                            <ListItem key={event.id} data={event} />
                        )
                    )}
                </div>
            ) : (
                <>
                    <div className="w-[100%] flex flex-col items-center mt-36 gap-8">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Access Denied!"
                        />
                        <p>{t('home.noTicketFound').toString()}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProjectListContent
