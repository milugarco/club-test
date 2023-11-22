import { Avatar, Button, Input, Upload } from '@/components/ui'
import {
    GuestFormProps,
    GuestFormPropsNew,
} from './interfaces/GuestProps.interface'
import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
    HiOutlineChevronLeft,
    HiOutlineCloudUpload,
    HiTrash,
} from 'react-icons/hi'
import { FcImageFile } from 'react-icons/fc'
import { ModalPerfil } from '@/components/ui/Modal/Modal'
import useUserHook from '@/utils/hooks/useUsersHook'
import { DoubleSidedImage } from '@/components/shared'
import { useTranslation } from 'react-i18next'

const GuestStepThree = (props: GuestFormPropsNew) => {
    const { disableSubmit = false, handleStep, formValueStep } = props
    const [isPhotoUploaded, setIsPhotoUploaded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [avatarImg, setAvatarImg] = useState<string | null>(null)

    const [formData, setFormData] = useState({
        profilePhoto: formValueStep?.profilePhoto || '',
    })

    const { userControllerUploadPhoto } = useUserHook()

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
                        profilePhoto: base64String,
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
                    valid = t('authGuest.error.valid').toString()
                }

                if (f.size >= maxFileSize) {
                    valid = t('authGuest.error.valid1').toString()
                }
            }
        }

        return valid
    }

    const handleNextClick = async () => {
        if (isPhotoUploaded) {
            const userId = formValueStep?.newEventParticipant?.user?.id
            if (userId) {
                const response = await userControllerUploadPhoto(
                    userId,
                    formData.profilePhoto
                )

                if (response.status === 200) {
                    handleStep?.('four', {
                        ...formValueStep,
                        profilePhoto: formData.profilePhoto,
                    })
                } else {
                    return setMessage(
                        t('authGuest.error.message').toString()
                    )
                }
            }
        } else {
            // Se nenhuma foto foi carregada, abra o modal de confirmação
            setIsModalOpen(true)
            setFormData({
                ...formData,
                profilePhoto: '',
            })
        }
    }

    const handleConfirm = () => {
        console.log({ ...formValueStep, profilePhoto: formData.profilePhoto })
        handleStep?.('four', {
            ...formValueStep,
            profilePhoto: formData.profilePhoto,
        })
        setIsModalOpen(false)
    }

    const handleCloseModal = () => {
        // Feche o modal sem continuar
        setIsModalOpen(false)
    }

    const handleDeletePhoto = () => {
        // Exclua a foto definindo o avatarImg como nulo
        setAvatarImg(null)
        setIsPhotoUploaded(false)
    }

    const { t } = useTranslation()

    return (
        <>
            {!message ? (
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-lg  lg:text-3xl mb-2">
                        {t("authGuest.uploadProfilePhotoStep.title").toString()}
                    </h1>
                    <p className="mb-5">
                        {t("authGuest.uploadProfilePhotoStep.paragraph").toString()}
                    </p>
                    <div className="mb-4"></div>
                    <div>
                        {avatarImg && avatarImg.trim() !== '' ? (
                            <div>
                                <Upload
                                    draggable
                                    className="bg-gray-100 dark:bg-gray-900 z-31 h-[50vh] sm:w-[500px] mb-4"
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
                                            {t("authGuest.uploadProfilePhotoStep.paragraph1").toString()}
                                        </p>
                                        <Button
                                            variant="solid"
                                            icon={<HiOutlineCloudUpload />}
                                        >
                                            {t("authGuest.uploadProfilePhotoStep.uploadButton").toString()}
                                        </Button>
                                    </div>
                                </Upload>
                                <div className="flex w-full items-center flex-col justify-center gap-4">
                                    <Button
                                        variant="solid"
                                        className="bg-red-500 hover:bg-red-400 active:bg-red-600 w-full md:w-60"
                                        icon={<HiTrash />}
                                        onClick={handleDeletePhoto}
                                    >
                                        {t("authGuest.uploadProfilePhotoStep.deleteButton").toString()}
                                    </Button>
                                    <Button
                                        variant="solid"
                                        className="w-full md:w-60"
                                        onClick={handleNextClick}
                                    >
                                        {t("authGuest.nextButton").toString()}
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <Upload
                                    draggable
                                    className="bg-gray-100 dark:bg-gray-900 z-31 w-full h-[50vh] sm:w-[500px] mb-4"
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
                                            {t("authGuest.uploadProfilePhotoStep.paragraph1").toString()}
                                        </p>
                                        <Button
                                            variant="solid"
                                            icon={<HiOutlineCloudUpload />}
                                        >
                                            {t("authGuest.uploadProfilePhotoStep.uploadButton").toString()}
                                        </Button>
                                    </div>
                                </Upload>
                                <div className="flex w-full items-center justify-center gap-4">
                                    <Button
                                        variant="twoTone"
                                        className="w-full md:w-60"
                                        onClick={handleNextClick}
                                    >
                                        {t("authGuest.uploadProfilePhotoStep.skipButton").toString()}
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
            ) : (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="Access Denied!"
                    />
                    <div className="mt-6 text-center">
                        <h3 className="mb-2">Opppps!</h3>
                        <p className="text-base">{message}</p>
                    </div>
                    <Button
                        className="w-32 mt-8 text-xl"
                        variant="solid"
                        icon={<HiOutlineChevronLeft />}
                        onClick={() =>
                            handleStep?.('one', {
                                ...formValueStep,
                            })
                        }
                    >
                        Voltar
                    </Button>
                </div>
            )}
        </>
    )
}

export default GuestStepThree
