import { useState, useEffect } from 'react'
import { Button, Card } from '@/components/ui'
import { DoubleSidedImage, TextBlockSkeleton } from '@/components/shared'
import CardGuest from '@/components/ui/cardShare/CardStory'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import useQuery from '@/utils/hooks/useQuery'
import useClubEventParticipantClubHook from '@/utils/hooks/useClubEventParticipantClubHook'
import formatDate from '@/utils/formatDate'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import formatDateRange from '@/utils/formatDateRange'
import TextBlockSkeletonTwo from '@/components/shared/loaders/TextBlockSkeletonTwo'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MyEvent = () => {
    const [eventTicket, setEventTicket] =
        useState<ResponseEventParticipantClubDto | null>()

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1424)
    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { eventParticipantClubControllerFindOneParticipation } =
        useClubEventParticipantClubHook()
    const { t } = useTranslation()
    const query = useQuery()
    useEffect(() => {
        const eventGuest = async () => {
            try {
                const eventParticipantId: string | null =
                    query.get('eventParticipantId')

                if (eventParticipantId) {
                    const response =
                        await eventParticipantClubControllerFindOneParticipation(
                            eventParticipantId
                        )

                    if (response) {
                        setIsLoading(false)
                        setEventTicket(response.data)
                    }
                } else {
                    setIsLoading(false)
                    setMessage('Link inválido')
                }
            } catch (error) {
                setMessage('Convite inválido')
            }
        }

        eventGuest()
    }, [])
    const [isEnabled, setIsEnabled] = useState(true)

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1424)
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])
    const formattedDateRange = formatDateRange(new Date(), new Date())

    return (
        <div>
            <Link to="/home">
                <Button
                    className="w-16 mb-4 text-sm md:hidden"
                    variant="plain"
                    icon={<HiOutlineChevronLeft className="text-sm" />}
                >
                    {t('dashClub.button.back')}
                </Button>
            </Link>
            {isLoading ? (
                <>
                    <div>
                        <TextBlockSkeletonTwo />
                    </div>
                </>
            ) : message ? (
                <div>
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
                            <h3 className="mb-2">{t('dashClub.opppsTitle')}</h3>
                            <p className="text-base">
                                {t('dashClub.opppsMessage')}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 grid-cols-1">
                    {eventTicket?.event.photo && (
                        <>
                            <div className="w-[100%]">
                                <Card className="border-none col-span-1 h-[100%] flex justify-center items-center">
                                    <CardGuest eventTicket={eventTicket!} />
                                </Card>
                            </div>
                            <Card className="border-none col-span-2 mt-4 lg:mt-0 lg:ml-4">
                                <div className="flex items-center justify-center gap-4 ">
                                    <div className="col-span-1 ">
                                        <Card className="border-none h-full rounded-none flex justify-center ">
                                            <div className="flex flex-col items-center -m-8">
                                                <div className=" ">
                                                    <img
                                                        src={
                                                            eventTicket?.event
                                                                .photo
                                                                ? BASE_IMAGE_URL +
                                                                  eventTicket
                                                                      ?.event
                                                                      .photo
                                                                : ''
                                                        }
                                                        className=" rounded-lg mb-2 w-[100vw] "
                                                    />
                                                </div>
                                                <div
                                                    className={`flex items-center flex-col w-[100%] mb-4 justify-center rounded-full font-semibold text-xs text-green-500`}
                                                >
                                                    {isEnabled ? (
                                                        <>
                                                            <p className="mt-4 text-center">
                                                                {t(
                                                                    'home.enable'
                                                                ).toString()}
                                                            </p>
                                                            <div className="mt-3 w-full"></div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p className="mt-4 text-center">
                                                                {t(
                                                                    'home.disable'
                                                                ).toString()}
                                                            </p>
                                                            <div className="mt-3 w-full"></div>
                                                        </>
                                                    )}
                                                    {/* <Button
                                                              className="flex items-center gap-2"
                                                              onClick={handleDownload}
                                                            >
                                                              <HiDownload className="text-lg" />
                                                              Baixar contrato
                                                            </Button> */}
                                                </div>
                                                <div>
                                                    <h2>
                                                        {eventTicket.event.name}
                                                    </h2>
                                                </div>
                                                <p className="mt-4">
                                                    {eventTicket?.event
                                                        .startAt &&
                                                    eventTicket?.event.endAt
                                                        ? formattedDateRange
                                                        : 'Data não definida ainda'}
                                                </p>
                                                <p className="mt-4 text-center">
                                                    {
                                                        eventTicket.event
                                                            .description
                                                    }
                                                </p>
                                                <div className="mt-3 w-full"></div>
                                            </div>
                                        </Card>
                                    </div>
                                    {/* <div className="destaques">
                                        <Card className="border-none col-span-2 md:col-span-4">
                                            <h1 className="text-2xl mb-4">
                                                Destaques do evento
                                            </h1>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                                                <div className="flex flex-col items-center text-center ">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Fabiano
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center text-center">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Raidan
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center text-center">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Ryan
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>

                                                <div className=" flex flex-col items-center text-center">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Maicon
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center text-center">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Lucas
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-center text-center">
                                                    <img
                                                        src="/usuario.jpg"
                                                        alt=""
                                                        className="rounded-full w-20"
                                                    />
                                                    <h1 className="md:text-2xl text-lg">
                                                        Ana
                                                    </h1>
                                                    <p className="text-sm">
                                                        Palestrante
                                                    </p>
                                                </div>
                                            </div>
                                            <div className=" flex justify-center mt-4"></div>
                                        </Card>
                                    </div> */}
                                </div>
                            </Card>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}

export default MyEvent
