import LogoCard from '@/components/template/LogoCard'
import { HiOutlineShare, HiOutlineTicket } from 'react-icons/hi'
import { cardConfig } from '@/components/ui/cardShare/CardConfig'

const CardGuest = () => {
    const {
        eventName,
        ticketType,
        guestName,
        backgroundImageUrl,
        ticketColor
    } = cardConfig 

    return (
        <div className="flex w-[100%] h-[100%] items-center justify-center relative">
            <HiOutlineShare className="absolute top-2 right-2 text-2xl" />
            <div
                className={`w-72 rounded-xl p-2 shadow-lg bg-gradient-to-br from-[#fff] to-[#fff]/20 relative flex justify-center h-72`}
            >
                <img
                    src={backgroundImageUrl}
                    className="w-full h-full absolute bottom-0 z-0 opacity-20 rounded-xl"
                    alt=""
                />
                <div className="flex items-center flex-col gap-1 z-10 justify-center">
                    <h3 className="text-lg">{eventName}</h3>
                    <div className="uppercase flex items-center gap-1">
                        <h1 className="text-xl">{ticketType}</h1>
                        <HiOutlineTicket className="text-lg text-white" />
                        <h1 className="text-xl">card</h1>
                    </div>
                    <img
                        src="https://yt3.googleusercontent.com/UdsvNKY4aCTxnnvodjS2dO-7OOX8MxTRXB8vYeE6Sv_4sCsle6ZAkuezCzui8ZXXc8KRNrAY=s900-c-k-c0x00ffffff-no-rj"
                        className="w-32 rounded-lg"
                        alt=""
                    />
                    <h2 className="text-lg">{guestName}</h2>
                    <div className="w-full flex justify-center">
                        <LogoCard logoWidth={'25%'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardGuest
