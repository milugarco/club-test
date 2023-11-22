import { Button, Input } from '@/components/ui'
import { GuestFormProps } from './interfaces/GuestProps.interface'
import { useState } from 'react'

const GuestStepTwo = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props

    const [formData, setFormData] = useState({
        codeValidation: formValueStep?.codeValidation || ''
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const validateInputs = async () => {
        console.log(formValueStep)
        console.log('Two--Three ', { ...formData, ...formValueStep })
        handleStep?.('three', { ...formData, ...formValueStep })
    }

    return (
        <div className="flex flex-col gap-2">
            <h1 className="text-lg lg:text-3xl mb-2">Codigo de verificação</h1>
            <p className="mb-2">
                Enviamos um código de verificação para o seu email
            </p>
            <Input
                className="shadow-lg mb-2"
                placeholder="Codigo de verificação"
                name="codeValidation"
                value={formData.codeValidation}
                onChange={handleInputChange}
            ></Input>
            <Button
                variant="solid"
                type="submit"
                onClick={() => validateInputs()}
            >
                Próximo
            </Button>
        </div>
    )
}

export default GuestStepTwo
