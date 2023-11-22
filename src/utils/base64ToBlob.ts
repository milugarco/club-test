export function base64ToBlob(base64: any, mimeType: string) {
    const byteCharacters = atob(base64)
    const byteNumbers = new Array(byteCharacters.length)
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
    }
    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], { type: mimeType })
}

export function blobToFile(blob) {
    const fileName = 'captured_image.jpeg' // Escolha um nome de arquivo apropriado
    const file = new File([blob], fileName, { type: 'image/jpeg' })

    return file
}
