import React, { useState, useEffect } from 'react'
import './FlashMessage.css'
import { HiCheckCircle } from 'react-icons/hi'

type FlashMessageProps = {
    message: string
    type: string
    onClose: () => void
    className?: string
}

const FlashMessage: React.FC<FlashMessageProps> = ({
    message,
    type,
    onClose,
    className
}) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        
        const timer = setTimeout(() => {
            setIsVisible(false)
            onClose()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onClose])

    return isVisible ? (
        <div
            className={`flash-message ${type} ${
                type === 'success' ? 'success' : ''
            }`}
        >
            <p className="flex justify-center items-center gap-2">
                <HiCheckCircle className="text-xl" /> {message}
            </p>
        </div>
    ) : null
}

export default FlashMessage
