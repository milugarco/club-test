const formatDate = (startAt: string | undefined) => {
    if (startAt) {
        const startDate = new Intl.DateTimeFormat('pt-BR').format(
            new Date(startAt)
        )
        return startDate
    } else {
        return 'Data não informada'
    }
}
export default formatDate


