import { useEffect, useState } from 'react'

import { Button, Skeleton, Spinner } from '@/components/ui'
import { GuestFormPropsNew } from './interfaces/GuestProps.interface'
import './styles/GuestStepTen.css'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import CardGuest from '../../components/ui/cardShare/CardStory'
import useClubEventParticipantClubHook from '@/utils/hooks/useClubEventParticipantClubHook'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import { DoubleSidedImage } from '@/components/shared'
import { useTranslation } from 'react-i18next'

const GuestStepSeven = (props: GuestFormPropsNew) => {
    const { handleStep } = props

    const [eventTicket, setEventTicket] =
        useState<ResponseEventParticipantClubDto | null>()

    const [message, setMessage] = useState<string | null>(null)
    const [loading, setLoading] = useState(true);
    const { eventParticipantClubControllerFindOneParticipation } =
        useClubEventParticipantClubHook()

    const { t } = useTranslation()

    const participantId = props.formValueStep?.newEventParticipant?.id
        ? props.formValueStep?.newEventParticipant?.id
        : props.formValueStep?.participantId

    useEffect(() => {
        const eventGuest = async () => {
            try {
                console.log('participantId ', participantId)
                const response =
                    await eventParticipantClubControllerFindOneParticipation(participantId)

                if (response) {
                    setEventTicket(response.data)
                } else {
                    setMessage(t('authGuest.loadingFinishStep.error.erro1').toString())
                }
            } catch (error) {
                setMessage(t('authGuest.loadingFinishStep.error.erro1').toString())
            }
            finally {
                setLoading(false)
            }
        }

        const loadingDelay = setTimeout(() => {
            eventGuest();
          }, 4000);
      
          // Clear the timeout to prevent unnecessary side effects
          return () => clearTimeout(loadingDelay);
        }, [participantId]);

    return (
        <>
            {loading ? (
        <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className='w-72 h-[500px] rounded-xl border-outline border-2 border-gray-600 flex flex-col justify-start items-center'>
                    <Skeleton height={10} className='mb-12 w-1/2 mt-4'  />
                    <Skeleton height={30} className='w-2/3'/>
                    <Skeleton className='w-40 h-40 mt-4 mb-4' />
                    <Skeleton height={10} className='w-2/3 mb-8'/>
                    <h5 className='mb-4'>{t('authGuest.loadingFinishStep.paragraph1').toString()}</h5>
                    <Spinner className='mb-4' size={30}/>
                    <h5>{t('authGuest.loadingFinishStep.paragraph2').toString()}</h5>
            </div>
        </div>
      ) : eventTicket ? (
        <CardGuest eventTicket={eventTicket} />
      ) : (
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
                            <h3 className="mb-2">Opppps!</h3>
                            <p className="text-base">
                                {t('authGuest.error.message').toString()}
                            </p>
                        </div>
                    </div>
                    <Button
                        className="w-32 mt-8 text-xl"
                        variant="solid"
                        icon={<HiOutlineChevronLeft />}
                        onClick={() => handleStep?.('one')}
                    >
                        {t('authGuest.backButton').toString()}
                    </Button>
                </div>
            )}
        </>
    )
}

export default GuestStepSeven
