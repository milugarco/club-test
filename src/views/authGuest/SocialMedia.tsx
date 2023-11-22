const theme = 'dark' 


let basePath = '../../../../public/img/iconsSocial'
if (theme === 'dark') {
    basePath += '/dark'
} else {
    basePath += '/light'
}


const socialMediaMapping = {
    Instagram: 'instagram',
    Facebook: 'facebook',
    Twitter: 'twitter',
    Youtube: 'youtube',
    Snapchat: 'snapchat',
    Tiktok: 'tiktok'
}


const redeSocial = [
    {
        nome: 'Instagram',
        icone: `${basePath}/${socialMediaMapping['Instagram']}.svg`,
        usuario: '@user'
    },
    {
        nome: 'Facebook',
        icone: `${basePath}/${socialMediaMapping['Facebook']}.svg`,
        usuario: '@user'
    },
    {
        nome: 'Twitter',
        icone: `${basePath}/${socialMediaMapping['Twitter']}.svg`,
        usuario: '@user'
    },
    {
        nome: 'Youtube',
        icone: `${basePath}/${socialMediaMapping['Youtube']}.svg`,
        usuario: '@user'
    },
    {
        nome: 'Snapchat',
        icone: `${basePath}/${socialMediaMapping['Snapchat']}.svg`,
        usuario: '@user'
    },
    {
        nome: 'Tiktok',
        icone: `${basePath}/${socialMediaMapping['Tiktok']}.svg`,
        usuario: '@user'
    }
]
export default redeSocial
