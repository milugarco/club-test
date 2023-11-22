import LogoCard from '@/components/template/LogoCard'
import {
    HiDownload,
    HiInformationCircle,
    HiOutlineShare,
    HiOutlineTicket
} from 'react-icons/hi'
import { cardConfig } from '@/components/ui/cardShare/CardConfig'
import './CardGuest.css'
import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'qrcode.react'
import { ResponseEventParticipantClubDto } from '@/client/api-back'
import { BASE_IMAGE_URL } from '@/constants/app.constant'
import formatDate from '@/utils/formatDate'
import formatDateSeparate from '@/utils/formatDateSeparate'
import Alert from '../Alert'
import Button from '../Button'
import { blobToFile } from '@/utils/base64ToBlob'
import { useTranslation } from 'react-i18next'
import { photoDefault } from '@/utils/photoDefault'

interface CardGuestProps {
    eventTicket: ResponseEventParticipantClubDto
}

const CardGuest: React.FC<CardGuestProps> = ({ eventTicket }) => {
    const [qrDataURL, setQrDataURL] = useState('')


    const { t } = useTranslation()

    const { backgroundImageUrl } = cardConfig
    const [isFlipped, setIsFlipped] = useState(false)
    const [userPhotoLoaded, setUserPhotoLoaded] = useState(false)
    const [capturingImage, setCapturingImage] = useState(false)
    const cardRef = useRef<HTMLDivElement | null>(null)
    const cardRefTwo = useRef<HTMLDivElement | null>(null)
    const formattedDateTime = eventTicket
        ? formatDateSeparate(
            eventTicket.event.startAt
                ? new Date(eventTicket.event.startAt)
                : undefined,
            eventTicket.event.endAt
                ? new Date(eventTicket.event.endAt)
                : undefined
        )
        : { date: null, time: null }
    const qrCodeValue = eventTicket.sequential || ''

    const formatQRCodeValue = (value: number) => {
        const valueString = value.toString()
        const zerosToAdd = 2 - valueString.length

        if (zerosToAdd > 0) {
            return '00'.repeat(zerosToAdd) + valueString
        } else {
            return valueString
        }
    }
    const formattedQRCodeValue = formatQRCodeValue(Number(qrCodeValue))

    const userPhoto = userPhotoLoaded
        ? BASE_IMAGE_URL + eventTicket?.user.photo
        : BASE_IMAGE_URL + photoDefault

    const handleCardFlip = () => {
        if (!capturingImage) {
            setIsFlipped(!isFlipped)
            playCardFlipSound()
        }
    }

    const playCardFlipSound = () => {
        const audioElement = new Audio('/flipcard-91468.mp3')
        audioElement.play()
    }

    const handleUserPhotoLoad = () => {
        console.log('User photo loaded')
        setUserPhotoLoaded(true)
    }

    const saveAsImage = async (isBack: boolean) => {
        if (capturingImage) {
            return
        }

        setCapturingImage(true)

        const cardToCapture = isBack ? cardRef.current : cardRefTwo.current

        if (!cardToCapture) {
            console.error('Elemento do cartão não encontrado.')
            setCapturingImage(false)
            return
        }

        if (!userPhotoLoaded) {
            // Se a imagem do usuário ainda não foi carregada, aguarde
            await new Promise((resolve) => {
                const img = new Image()
                img.src = userPhoto
                img.onload = resolve
            })
        }

        if ((isBack && !isFlipped) || (!isBack && isFlipped)) {
            handleCardFlip()
            await new Promise((resolve) => setTimeout(resolve, 100))
        }

        console.log('Antes de html2canvas')
        html2canvas(cardToCapture).then((canvas) => {
            console.log('Depois de html2canvas')
            const image = canvas.toDataURL('image/jpeg')
            console.log(image)

            const fileName = isBack
                ? `${eventTicket?.event.name}-${eventTicket?.eventTicket.name}-${formattedQRCodeValue}-QR-CODE.jpg`
                : `${eventTicket?.event.name}-${eventTicket?.eventTicket.name}-${formattedQRCodeValue}-CARD.jpg`

            const a = document.createElement('a')
            a.href = image
            a.download = fileName
            a.click()
        })

        if ((isBack && !isFlipped) || (!isBack && isFlipped)) {
            handleCardFlip()
        }

        setCapturingImage(false)
    }
    return (
        <div className="w-[100%] flex justify-center items-center">
            <div className="cardTicket-container  ">
                <div className="flex relative flex-col">
                    <div className="cardTicket-buttons flex gap-4 ">
                        <Alert type="info" className="flex w-72">
                            <p className="flex items-center justify-center gap-2">
                                <HiInformationCircle className="text-xl" />
                                {t('CardTicket.Function.Action')} *{' '}
                            </p>
                        </Alert>
                    </div>
                    <div
                        className={`cardTicket ${isFlipped ? 'flipped' : ''
                            } cursor-pointer`}
                        onClick={handleCardFlip}
                    >
                        <div className="cardTicket-front mt-2">
                            <div
                                ref={cardRefTwo}
                                className={`cardTicket-front-DIV w-72 rounded-xl p-2 shadow-lg relative flex justify-center bg-black`}
                            >
                                <img
                                    src={backgroundImageUrl}
                                    className="w-full h-full absolute bottom-0 -z-0 opacity-20 rounded-xl"
                                    alt=""
                                />
                                <div className="flex items-center flex-col gap-4 ">
                                    <h3 className="text-lg  text-white">
                                        {eventTicket?.event.name}
                                    </h3>
                                    <div className="uppercase flex items-center flex-col gap-1 w-68 justify-center">
                                        <HiOutlineTicket className="text-lg text-white" />
                                        <h1 className="ticket-name text-center  text-white">
                                            {eventTicket?.eventTicket.name}
                                        </h1>
                                    </div>

                                    <img
                                        src={userPhoto}
                                        className="w-40 h-40 rounded-lg  object-cover"
                                        alt=""
                                        onLoad={handleUserPhotoLoad}
                                    />
                                    <div className="flex items-center flex-col gap-1 w-72 justify-center h-full overflow-hidden">
                                        <h2 className={`ticket-name text-center text-lg  text-white ${eventTicket?.user.name.length > 25 ? 'long-text-animation' : ''}`}>
                                            {eventTicket?.user.name}
                                        </h2>
                                    </div>
                                    <div className="flex justify-between w-full px-8 text-white ">
                                        <div className="flex flex-col text-center ">
                                            <h4 className="uppercase text-white">
                                                {t('CardTicket.Date')}
                                            </h4>
                                            <p className="">
                                                {formattedDateTime.date}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-center">
                                            <h4 className="uppercase text-white">
                                                {t('CardTicket.Time')}
                                            </h4>
                                            <p className="">
                                                {formattedDateTime.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <LogoCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cardTicket-back mt-2">
                            <div
                                ref={cardRef}
                                className={`cardTicket w-72 rounded-xl p-2 shadow-lg  relative flex justify-center bg-black`}
                            >
                                <img
                                    src={backgroundImageUrl}
                                    className="w-full h-full absolute bottom-0 z-0 opacity-20 rounded-xl"
                                    alt=""
                                />

                                <div className=" flex items-center flex-col gap-4 z-10">
                                    <h3 className="text-lg  text-white">
                                        {eventTicket?.event.name}
                                    </h3>
                                    <div className="uppercase flex items-center flex-col gap-1 w-68 justify-center">
                                        <HiOutlineTicket className="text-lg text-white" />
                                        <h1 className="ticket-name text-center  text-white">
                                            {eventTicket?.eventTicket.name}
                                        </h1>
                                    </div>
                                    <QRCode
                                        value={eventTicket.qrCode}
                                        size={160}
                                        className="p-1 bg-white rounded-lg "
                                    />
                                    <strong className="text-sm mx-2 text-white mt-2 text-center">
                                        {formattedQRCodeValue}
                                    </strong>
                                    <div className="flex justify-between w-full px-8 text-white ">
                                        <div className="flex flex-col text-center ">
                                            <h4 className="uppercase text-white">
                                                {t('CardTicket.Date')}
                                            </h4>
                                            <p className="">
                                                {formattedDateTime.date}
                                            </p>
                                        </div>
                                        <div className="flex flex-col text-center">
                                            <h4 className="uppercase text-white">
                                                {t('CardTicket.Time')}
                                            </h4>
                                            <p className="">
                                                {formattedDateTime.time}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <LogoCard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-72 grid grid-cols-2  gap-4 mt-4"
                    style={{ maxWidth: "100%" }}>
                    <Button
                        variant="solid"
                        className="opacity-80 w-full flex items-center justify-center text-center gap-1 col-span-1"
                        onClick={() => saveAsImage(false)} // Baixar Frente
                    >
                        <p className='flex text-xs'>
                            <HiDownload className="text-2xl cursor-pointer" />
                        </p>
                        <p className="flex text-xs">
                            {t('CardTicket.Function.Download')} <br /> {t('CardTicket.Front')}
                        </p>
                    </Button>

                    <Button
                        variant="solid"
                        className="opacity-80 w-full flex items-center justify-center text-center gap-1 col-span-1"
                        onClick={() => saveAsImage(true)} // Baixar Verso
                    >
                        <p className='flex text-xs'>
                            <HiDownload className="text-2xl cursor-pointer" />
                        </p>
                        <p className="flex text-xs">
                            {t('CardTicket.Function.Download')} <br /> {t('CardTicket.Back')}
                        </p>

                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CardGuest
