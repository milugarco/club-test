import { useState } from 'react'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import { HiOutlineCloudUpload, HiTrash } from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'
import { ModalPerfil } from '@/components/ui/Modal/Modal'
import { Avatar } from '@/components/ui'
import { GuestFormProps } from './interfaces/GuestProps.interface'

export type GuestFormSchemaStepSix = {
    profilePhoto: string
}

const GuestStepSix = (props: GuestFormProps) => {
    const { disableSubmit = false, handleStep, formValueStep } = props
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const [avatarImg, setAvatarImg] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        profilePhoto: formValueStep?.profilePhoto || ''
    })

    const onFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const reader = new FileReader()

            reader.onload = (e) => {
                if (e.target) {
                    let base64String = e.target.result as string
                    setAvatarImg(base64String)
                    base64String = base64String.replace(
                        /^data:image\/[a-z]+;base64,/,
                        ''
                    )
                    setIsPhotoUploaded(true)
                    setFormData({
                        ...formData,
                        profilePhoto: base64String
                    })
                }
            }

            reader.readAsDataURL(files[0])
            setAvatarImg(URL.createObjectURL(files[0]))
            setIsPhotoUploaded(true)
        }
    }

    const beforeUpload = (files: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const maxFileSize = 5000000

        if (files) {
            for (const f of files) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'Faça o upload de arquivos .jpeg ou .png'
                }

                if (f.size >= maxFileSize) {
                    valid = 'Sua imagem deve ter no máximo 5mb!'
                }
            }
        }

        return valid
    }

    const handleNextClick = async () => {
        if (isPhotoUploaded) {
          
            handleStep?.('seven', { ...formData, ...formValueStep })
        } else {
            
            setIsModalOpen(true)
            setFormData({
                ...formData,
                profilePhoto: ''
            })
        }
    }

    const handleConfirm = () => {
        
        handleStep?.('seven', { ...formData, ...formValueStep })
        setIsModalOpen(false)
    }

    const handleCloseModal = () => {
        
        setIsModalOpen(false)
    }

    const handleDeletePhoto = () => {
        
        setAvatarImg(null)
        setIsPhotoUploaded(false)
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg  lg:text-3xl mb-2">
                Faça upload de uma foto para perfil
            </h1>
            <p className="mb-5">
                Essa foto ficará disponível em sua página de apresentação no
                evento
            </p>
            <div className="mb-4"></div>
            <div>
                {avatarImg && avatarImg.trim() !== '' ? (
                    <div>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 h-[50vh] sm:w-[600px] mb-4"
                            uploadLimit={5}
                            beforeUpload={beforeUpload}
                            showList={false}
                            multiple={false}
                            onChange={onFileUpload}
                        >
                            <Avatar
                                size={'lg'}
                                className="absolute w-full h-full z-30"
                                src={avatarImg as string}
                            />
                            <div className="my-16 text-center flex flex-col gap-4 mx-4">
                                <div className="text-6xl flex justify-center">
                                    <FcImageFile />
                                </div>
                                <p className="opacity-60 dark:text-white">
                                    Suportável: jpeg ou png de no máx 5mb
                                </p>
                                <Button
                                    variant="solid"
                                    icon={<HiOutlineCloudUpload />}
                                >
                                    Upload
                                </Button>
                            </div>
                        </Upload>
                        <div className="flex w-full items-center justify-center gap-4">
                            <Button
                                variant="solid"
                                className="bg-red-500 hover:bg-red-400 active:bg-red-600"
                                icon={<HiTrash />}
                                onClick={handleDeletePhoto}
                            >
                                Excluir
                            </Button>
                            <Button
                                variant="solid"
                                className="w-40"
                                onClick={handleNextClick}
                            >
                                Próximo
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <Upload
                            draggable
                            className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[50vh] sm:w-[600px] mb-4"
                            uploadLimit={1}
                            beforeUpload={beforeUpload}
                            showList={false}
                            multiple={false}
                            onChange={onFileUpload}
                        >
                            <div className="my-16 text-center flex flex-col gap-4 mx-4">
                                <div className="text-6xl flex justify-center">
                                    <FcImageFile />
                                </div>
                                <p className="opacity-60 dark:text-white">
                                    Suportável: jpeg ou png de no máx 5mb
                                </p>
                                <Button
                                    variant="solid"
                                    icon={<HiOutlineCloudUpload />}
                                >
                                    Upload
                                </Button>
                            </div>
                        </Upload>
                        <div className="flex w-full items-center justify-end gap-4">
                            <Button
                                variant="twoTone"
                                className=""
                                onClick={handleNextClick}
                            >
                                Pular
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <ModalPerfil
                    isOpen={isModalOpen}
                    onRequestClose={handleCloseModal}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    )
}

export default GuestStepSix
