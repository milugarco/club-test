import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from '@/components/ui/'
import { GuestFormPropsNew } from './interfaces/GuestProps.interface'
import useQuery from '@/utils/hooks/useQuery'
import useEventTicketGuestHook from '@/utils/hooks/useEventTicketGuestClubHook'
import {
    CreateEventParticipantClubDto,
    EventParticipantClubGuestResponse,
    ResponseEventTicketGuestClubDto,
} from '@/client/api-back'
import { TextBlockSkeleton } from '@/components/shared'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import formatDateRange from '@/utils/formatDateRange'
import { decodeJWT } from '@/utils/jwt/DecodeJwt'
import store from '@/store'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import useClubEventParticipantClubHook from '@/utils/hooks/useClubEventParticipantClubHook'
import { useTranslation } from 'react-i18next'


export type GuestFormSchemaStepOneNew = {
    agreeInvite: boolean
}

const GuestStepOne = (props: GuestFormPropsNew) => {
    const {
        disableSubmit = false,
        className,
        handleStep,
        formValueStep,
    } = props

    const [guest, setGuest] = useState<ResponseEventTicketGuestClubDto | null>(
        null
    )
    const [newEventParticipant, setNewEventParticipant] =
        useState<EventParticipantClubGuestResponse | null>(null)

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isParticipant, setIsParticipant] = useState(false)
    const [verifyParticipant, setVerifyParticipant] = useState(false)

    const { eventTicketGuestClubControllerFindOne } = useEventTicketGuestHook()
    const { eventParticipantClubControllerCreate } =
        useClubEventParticipantClubHook()
    const query = useQuery()
    const navigate = useNavigate()

    const eventTicketGuestId: string | null = query.get('eventTicketGuestId')

    const [participantId, setParticipantId] = useState<string | null>(null)

    useEffect(() => {
        const eventGuest = async () => {
            try {
                if (eventTicketGuestId) {
                    const response =
                        await eventTicketGuestClubControllerFindOne(
                            eventTicketGuestId
                        )

                    if (response.data) {

                        setIsLoading(false)
                        setGuest(response.data)
                    }
                } else {
                    setIsLoading(false)
                    setMessage('Link inválido')
                }
            } catch (error) {
                setIsLoading(false)
                setMessage('Convite inválido')
            }
        }
        eventGuest()
    }, [])

    const state = store.getState()
    const token = state.auth.session.token

    if (token) {
        const jwt = decodeJWT(token) as any

        const userIsParticipant = guest?.eventParticipant?.filter(
            (participant) => participant.user?.id?.includes(jwt.user?.id)
        )

        const newParticipantId = userIsParticipant
            ? userIsParticipant[0]?.id
            : ''

        if (newParticipantId && !verifyParticipant) {
            setParticipantId(newParticipantId)
            setVerifyParticipant(true)
            setIsParticipant(true)
        }
    }

    const [formData, setFormData] = useState({
        agreeInvite: true,
        guest,
        newEventParticipant,
    })

    const handleAcceptInvite = async () => {
        try {
            if (token && eventTicketGuestId) {
                const jwt = decodeJWT(token) as any
                const userId = jwt.user?.id

                const request: CreateEventParticipantClubDto = {
                    userId: userId,
                    accountId: guest?.event.accountId
                        ? guest?.event.accountId
                        : '',
                    status: 'ENABLE',
                }
                const response = await eventParticipantClubControllerCreate(
                    request,
                    eventTicketGuestId
                )
                if (response?.data) {

                    setNewEventParticipant(response.data)
                }

                if (response.status === 'failed') {
                    setIsLoading(false)
                    setMessage('Convite inválido')
                    return
                }
                setFormData({
                    agreeInvite: true,
                    guest: guest,
                    newEventParticipant: response?.data ? response?.data : null,
                })
            }
        } catch (error) {
            setIsLoading(false)
            setMessage('Convite inválido')
        }
    }

    const handleTicket = async () => {
        handleStep?.('seven', {
            ...formData,
            agreeInvite: true,
            guest: guest ? guest : undefined,
            participantId: participantId ? participantId : undefined,
            newEventParticipant: newEventParticipant
                ? newEventParticipant
                : undefined,
        })
    }

    useEffect(() => {
        const nextStep = async () => {
            if (newEventParticipant) {
                const user = newEventParticipant?.user
                const updatedDocuments = user?.documents.filter(
                    (document) => document.document.type !== 'CPF'
                );
                newEventParticipant.user.documents = updatedDocuments;
                console.log(newEventParticipant)

                if (
                    user?.userFaces?.length !== 0 &&
                    user?.photo !== null &&
                    user?.photo !== '' &&
                    user?.documents?.length !== 0 &&
                    user?.documents?.length !== undefined &&
                    user?.documents[0]?.document?.filePath !== null
                ) {
                    handleStep?.('seven', {
                        ...formData,
                        agreeInvite: true,
                        guest: guest ? guest : undefined,
                        newEventParticipant: newEventParticipant
                            ? newEventParticipant
                            : undefined,
                    })
                } else if (
                    user?.userFaces?.length !== 0 &&
                    user?.photo !== null &&
                    user?.photo !== '' &&
                    user?.documents?.length !== 0
                ) {
                    handleStep?.('five', {
                        ...formData,
                        agreeInvite: true,
                        guest: guest ? guest : undefined,
                        newEventParticipant: newEventParticipant
                            ? newEventParticipant
                            : undefined,
                    })
                } else if (
                    user?.userFaces?.length !== 0 &&
                    user?.photo !== null &&
                    user?.photo !== ''
                ) {
                    handleStep?.('four', {
                        ...formData,
                        agreeInvite: true,
                        guest: guest ? guest : undefined,
                        newEventParticipant: newEventParticipant
                            ? newEventParticipant
                            : undefined,
                    })
                } else if (user?.userFaces?.length !== 0) {
                    handleStep?.('three', {
                        ...formData,
                        agreeInvite: true,
                        guest: guest ? guest : undefined,
                        newEventParticipant: newEventParticipant
                            ? newEventParticipant
                            : undefined,
                    })
                } else {

                    handleStep?.('two', {
                        ...formData,
                        agreeInvite: true,
                        guest: guest ? guest : undefined,
                        newEventParticipant: newEventParticipant
                            ? newEventParticipant
                            : undefined,
                    })
                }
            }
        }

        nextStep()
    }, [newEventParticipant])



    const { t } = useTranslation()

    return (
        <div>
            {isLoading ? (
                <>
                    <div className={className}>
                        <h1 className="text-lg lg:text-3xl mb-4 text-center">
                            {t('authGuest.loading').toString()}
                        </h1>
                        <TextBlockSkeleton rowCount={6} />
                    </div>
                </>
            ) : message && !isParticipant ? (
                <div className={className}>
                    <h1 className="text-lg lg:text-3xl mb-4 text-center">
                        {message}
                    </h1>
                    <div className="h-full flex flex-col items-center justify-center">
                        <DoubleSidedImage
                            src="/img/others/img-2.png"
                            darkModeSrc="/img/others/img-2-dark.png"
                            alt="Access Denied!"
                        />
                        <div className="mt-6 text-center">
                            <h3 className="mb-2">Opppps!</h3>
                            <p className="text-base">
                                {t('authGuest.inviteInvalid').toString()}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={className}>
                    {guest?.event?.photo && (
                        <div className="flex flex-col gap-4">
                            <h2 className="mt-4 text-center lg:text-3xl">
                                {guest?.eventTicket.name}
                            </h2>

                            <div className="grid md:grid-cols-3 grid-cols-1">
                                <div className="col-span-2 px-2 py-2">
                                    <img
                                        src={
                                            BASE_IMAGE_URL +
                                            encodeURIComponent(
                                                guest?.event?.photo
                                            )
                                        }
                                        alt={guest?.event.name}
                                        className="h-auto w-full rounded-lg"
                                    />
                                </div>
                                <div className="col-span-1 px-2 py-2">
                                    <div className="flex flex-col justify-center items-start h-full">
                                        <h1 className="text-lg lg:text-3xl mb-4">
                                            {t('authGuest.newInvite').toString()}
                                            <b> {guest?.event.name}</b>!
                                        </h1>

                                        <p className="mt-4">
                                            {guest?.event.startAt &&
                                                guest?.event.endAt
                                                ? formatDateRange(
                                                    new Date(
                                                        guest?.event?.startAt
                                                    ),
                                                    new Date(
                                                        guest?.event.endAt
                                                    )
                                                )
                                                : t('authGuest.dateUndefined').toString()}
                                        </p>
                                        <p className="mt-4">
                                            {guest?.event.description}
                                        </p>
                                        <div className="mt-3 w-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!guest?.event?.photo && (
                        <div className="flex flex-col gap-4">
                            <div className="grid md:grid-cols-1 grid-cols-1">
                                <div className="col-span-1">
                                    <Card className="border-none px-4 h-full rounded-none md:rounded-r-lg rounded-b-lg flex justify-center">
                                        <div className="flex flex-col justify-center items-start h-full">
                                            <div>
                                                <h2 className="mb-10">
                                                    {t('authGuest.newInvite').toString()}
                                                    <b> {guest?.event.name}</b>!
                                                </h2>
                                                <h4>
                                                    {guest?.eventTicket.name}
                                                </h4>
                                            </div>

                                            <p className="mt-4 text-center">
                                                {guest?.event.startAt &&
                                                    guest?.event.endAt
                                                    ? formatDateRange(
                                                        new Date(
                                                            guest?.event?.startAt
                                                        ),
                                                        new Date(
                                                            guest?.event.endAt
                                                        )
                                                    )
                                                    : t('authGuest.dateUndefined').toString()}
                                            </p>
                                            <p className="mt-4 text-center">
                                                {guest?.event.description}
                                            </p>
                                            <div className="mt-3 w-full"></div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center">
                        {isParticipant ? (
                            <>
                                <Button
                                    className="shadow-lg mt-4 w-full md:w-60"
                                    variant="solid"
                                    type="submit"
                                    onClick={handleTicket}
                                >
                                    {t('authGuest.ticketButton').toString()}
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    className="shadow-lg mt-4 w-full md:w-60"
                                    variant="solid"
                                    type="submit"
                                    onClick={() => handleAcceptInvite()}
                                >
                                    {t('authGuest.acceptButton').toString()}
                                </Button>

                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default GuestStepOne
