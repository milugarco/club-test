const formatDateSeparate = (startAt?: Date, endAt?: Date) => {
    const formatDateString = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'short' // 'short' irá exibir as três primeiras letras do mês
        }
        return date.toLocaleDateString('pt-BR', options)
    }

    const formatTimeString = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit'
        }
        return date.toLocaleTimeString('pt-BR', options)
    }

    if (!startAt || !endAt) {
        return {
            date: '',
            time: ''
        }
    }

    const formattedStartDate = formatDateString(startAt)
    const formattedEndDate = formatDateString(endAt)

    const formattedStartTime = formatTimeString(startAt)
    const formattedEndTime = formatTimeString(endAt)

    // Verificar se as datas são iguais
    const datesAreEqual = startAt.toDateString() === endAt.toDateString()

    if (datesAreEqual) {
        // Se as datas forem iguais, mostrar apenas uma data
        return {
            date: formattedStartDate,
            time: `${formattedStartTime} à ${formattedEndTime}`
        }
    } else {
        // Se as datas forem diferentes, mostrar o intervalo de datas
        return {
            date: `${formattedStartDate} à ${formattedEndDate}`,
            time: `${formattedStartTime}`
        }
    }
}

export default formatDateSeparate
