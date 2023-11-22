import { useState } from 'react'
import { LogoAuth } from '@/components/layouts/AuthLayout/Logo'
import { Card } from '@/components/ui'
import Input from '@/components/ui/Input'


const Credential = () => {
    const [code, setCode] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleKeyPress = (e: { key: string }) => {
        if (e.key === 'Enter') {

            setIsModalOpen(true)
        }
    }

    return (
        <div>
            <Card className='border-none'>
                <div className="flex flex-col items-center gap-4">
            <LogoAuth className=''/>
                <img src="/img/Credentials.gif" width="300" height="300" className='' />
                    <Input
                    className="w-full xl:w-3/6"
                        placeholder="Código da credencial"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </Card>
            {isModalOpen && (

                <div className="modal">Seu modal aqui</div>
            )}
        </div>
    )
}

export default Credential
