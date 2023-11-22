export const base64ToBlob = (base64: string, contentType: string): Blob => {
    const splitData = base64.split(',')
    const byteCharacters = atob(splitData[1]) // Decodifique a string base64
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)

    return new Blob([byteArray], { type: contentType })
}

export const blobToFile = (blob: Blob, fileName: string) => {
    const options = { type: blob.type }
    const file = new File([blob], `${fileName}.jpg`, options)

    return file
}
