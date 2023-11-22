import { Button } from '@/components/ui'
import React, { useState } from 'react'
import { HiOutlineX } from 'react-icons/hi'
import { Link } from 'react-router-dom'
import { SocialIcon } from 'react-social-icons'

interface SocialMedia {
    name: string 
    url: string
}

function getInstagramLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.instagram.com/${nomeUsuario}`
}
function getTwitterLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.twitter.com/${nomeUsuario}`
}
function getLinkedInLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.linkedin.com/in/${nomeUsuario}`
}
function getSnapchatLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.snapchat.com/add/${nomeUsuario}`
}
function getWhatsAppLink(whatsappNumber: string) {
    const cleanedNumber = whatsappNumber.replace(/\D/g, '')
    return `https://wa.me/${cleanedNumber}`
}
function getGithubLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.github.com/${nomeUsuario}`
}
function getThreadsLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.threads.net/${nomeUsuario}`
}
function getFacebookLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.facebook.com/${nomeUsuario}`
}
function getTiktokLink(usuario: string) {
    const nomeUsuario = usuario.startsWith('@') ? usuario.slice(1) : usuario
    return `https://www.tiktok.com/@${nomeUsuario}`
}

const usuario = {
    nome: 'Fabiano Fagá',
    esporte: 'Caça Esportiva',
    whatsappNumber: '+554388062666'
}

const redesSociais: SocialMedia[] = [
    {
        name: 'Instagram',
        url: getInstagramLink(usuario.nome)
    },
    {
        name: 'Twitter',
        url: getTwitterLink(usuario.nome)
    },
    {
        name: 'LinkedIn',
        url: getLinkedInLink(usuario.nome)
    },
    {
        name: 'Snapchat',
        url: getSnapchatLink(usuario.nome)
    },
    {
        name: 'Facebook',
        url: getFacebookLink(usuario.nome)
    },
    {
        name: 'Tiktok',
        url: getTiktokLink(usuario.nome)
    },
    {
        name: 'Github',
        url: getGithubLink(usuario.nome)
    },
    {
        name: 'Threads',
        url: getThreadsLink(usuario.nome)
    }
]

const PageProfile = () => {
    const [sorteado, setSorteado] = useState(false)
    const [modalAberto, setModalAberto] = useState(false)

    const handleSortear = () => {
        setSorteado(true)
    }

    const abrirModal = () => {
        setModalAberto(true)
    }

    const fecharModal = () => {
        setModalAberto(false)
    }

    const Modal = (
        <div className="modal-overlay flex justify-center items-center w-full h-full fixed top-0 left-0">
            <div
                className="modal-content bg-black rounded-lg text-center absolute w-full h-full pt-32"
                style={{ position: 'relative' }}
            >
                <HiOutlineX
                    className="text-white text-2xl absolute top-1 left-2 cursor-pointer"
                    style={{ position: 'relative', zIndex: 6 }}
                    onClick={fecharModal}
                />
                <div
                    className="text-4xl font-thin text-orange-300 italic p-2 mx-3 rounded-xl"
                    style={{ position: 'relative', zIndex: 5 }}
                >
                    Parabéns, você foi premiado!
                </div>
                <img
                    src="../../../../public/Awards.png"
                    alt="Troféu"
                    className="w-60 sm:w-72 mx-auto mt-8"
                    style={{ position: 'relative', zIndex: 5 }}
                />
                <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full absolute top-0 left-0 object-cover"
                    style={{ position: 'absolute', zIndex: 0 }}
                >
                    <source
                        src="../../../../public/palco.mp4"
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    )

    return (
        <div className="flex w-full h-full justify-center items-center">
            <div className="flex flex-col lg:flex-row first-letter:gap-8 justify-center items-center">
                <img
                    src="https://media.licdn.com/dms/image/D4D03AQHfFeRDsIplJw/profile-displayphoto-shrink_800_800/0/1686883811357?e=2147483647&v=beta&t=eeSsuqpOCJVDQVBVBiRpaa0Q6ztF97jP8-vhxytZz6w"
                    className="rounded-full h-72 w-72 md:h-96 md:w-96"
                    alt=""
                />
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1>{usuario.nome}</h1>
                    <p>Gosta de {usuario.esporte}</p>
                    <Link to={getWhatsAppLink(usuario.whatsappNumber)}>
                        <button className="flex items-center gap-2 bg-white rounded-full text-green-600 border-green-600 border-4 font-bold pl-2 pr-2 pt-1 pb-1">
                            <img
                                src="../../../../public/IconWhats.svg"
                                alt=""
                            />
                            Whatsapp
                        </button>
                    </Link>
                    {sorteado ? (
                        <div></div>
                    ) : (
                        <button
                            className="bg-blue-500 text-white p-2 rounded-full mt-4"
                            onClick={abrirModal}
                        >
                            Sortear
                        </button>
                    )}
                    <h3>Mais redes:</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {redesSociais.map((redeSocial, index) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center "
                            >
                                <SocialIcon url={redeSocial.url} />
                            </div>
                        ))}
                    </div>
                </div>
                {modalAberto && Modal}
            </div>
        </div>
    )
}

export default PageProfile
