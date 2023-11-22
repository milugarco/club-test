import store from '@/store'

const formatDateRange = (startAt: Date, endAt: Date) => {
    const state = store.getState()
    const locale = state.locale.currentLang == 'en' ? 'en' : 'pt-br'

    const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }
        return date.toLocaleDateString(locale, options)
    }

    const formattedStartAt = formatDate(new Date(startAt))
    const formattedEndAt = formatDate(new Date(endAt))

    return `De ${formattedStartAt} até ${formattedEndAt}`
}

export default formatDateRange
