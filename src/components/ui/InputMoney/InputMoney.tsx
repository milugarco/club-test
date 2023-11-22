
import React, { useState } from 'react';
import {FormCustomFormatInputTwo} from '@/components/shared/FormCustomFormatInput';


interface InputMoneyProps {
    moeda: string
}

const InputMoney = ({ moeda }: InputMoneyProps) => {
    const [value, setValue] = useState<number>(0)

    const currencyCode = moeda === 'BRL' ? 'BRL' : 'USD'


    const formatCurrency = (value: number) => {
        const numericValue = value / 100 
        return numericValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: currencyCode
        })
    }

    return (
        <div>
            <FormCustomFormatInputTwo
                className="shadow-lg"
                value={value || 0}
                format={formatCurrency}
                inputMode="numeric" 
                onValueChange={(e) => setValue(e.floatValue || 0)}
            />
        </div>
    )
}

export default InputMoney
