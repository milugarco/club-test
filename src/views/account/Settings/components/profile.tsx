import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { Field, Form, Formik } from 'formik'
import { Card, InputGroup, Select } from '@/components/ui'
import { useState } from 'react'
import { SingleValue } from 'react-select'
import '@/assets/styles/components/modal.css'
import Addon from '@/components/ui/InputGroup/Addon'
import AvatarImageBusiness from '@/views/MyBusiness/models/AvatarBusiness'
import FlashMessage from '@/components/ui/FlashMessage/FlashMessage'
import { PasswordInput } from '@/components/shared'
import * as Yup from 'yup'
import store from '@/store'
import { decodeJWT } from '@/utils/jwt/DecodeJwt'
import useUserHook from '@/utils/hooks/useUsersHook'
import { UpdateUserDto } from '@/client/api-back'
import { useTranslation } from 'react-i18next'



const validationSchema = Yup.object().shape({
    password: Yup.string().when('showPasswordFields' as const, {
        is: true,
        then: Yup.string().required('Insira sua senha atual'),
        otherwise: Yup.string(),
    }),

    newPassword: Yup.string().when('showPasswordFields' as const, {
        is: true,
        then: Yup.string()
            .required('Insira sua nova senha')
            .min(8, 'A senha deve ter no mínimo 8 caracteres')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@,$!%*?&#+_-])[A-Za-z\d@,$!%*?&#+_-]/,
                'A senha deve conter letra minúscula, letra maiúscula, um número e caractere especial'
            ),
        otherwise: Yup.string(),
    }),
    confirmNewPassword: Yup.string().when(
        'showPasswordFields' as const,
        (showPasswordFields, schema) => {
            return showPasswordFields
                ? schema
                      .required('Confirme sua nova senha')
                      .oneOf(
                          [Yup.ref('newPassword')],
                          'Suas senhas não coincidem'
                      )
                : schema
        }
    ),
})

const ProfileSettingsPage = () => {
    // const [showOtherInput, setShowOtherInput] = useState(false)
    const [showPasswordFields, setShowPasswordFields] = useState(false)
    const [photo, setPhoto] = useState<string | null>(null)
    const [flashMessage, setFlashMessage] = useState<{
        message: string
        type: string
    } | null>(null)

    const { userControllerUpdate, userControllerUploadPhoto } = useUserHook()

    const showSuccessMessage = () => {
        setFlashMessage({
            message: 'Configurações atualizadas com sucesso!',
            type: 'success',
        })
    }
    const closeFlashMessage = () => {
        setFlashMessage(null)
    }

    const handleShowPassword = (e: any) => {
        e.preventDefault()
        setShowPasswordFields(!showPasswordFields)
    }

    const handleAvatarChange = (file: File | null) => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64 = reader.result as string

                const base64String = base64.replace(
                    /^data:image\/[a-z]+;base64,/,
                    ''
                )
                setPhoto(base64String)
            }
            reader.readAsDataURL(file)
        } else {
            setPhoto(null)
        }
    }

    // const handleSelectChange = (
    //     selectedOption: SingleValue<{ value: string; label: string }>
    // ) => {
    //     if (selectedOption && selectedOption.value === 'outros') {
    //         setShowOtherInput(true)
    //     } else {
    //         setShowOtherInput(false)
    //     }
    // }
    const state = store.getState()
    const token = state.auth.session.token
    const jwt = decodeJWT(token) as any

    const { t } = useTranslation()

    const handleUpdateUser = async (
        values: any,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        console.log('values', values)
        const request: UpdateUserDto = {
            name: values.nameUser ? values.nameUser : null,
            password: values.newPassword ? values.newPassword : null,
            status: 'ENABLE',
        }

        setSubmitting(true)

        if (jwt) {
            const userId: string = jwt.user.id

            // Chame a função ou serviço que atualiza o usuário no backend
            if (request.name || request.password) {
                const response = await userControllerUpdate(userId, request)

                // Verifique a resposta do backend e lide com sucesso ou erro conforme necessário
                if (response.status === 200) {
                    console.log('Usuário atualizado com sucesso:', response)
                    console.log('values', values.nameUser)
                } else {
                    console.error('Erro ao atualizar usuário:', response)
                }
            }

            if (photo) {
                const response = await userControllerUploadPhoto(userId, photo)

                if (response.status === 200) {
                    console.log('Usuário atualizado com sucesso:', response)
                }
            }

            showSuccessMessage()
            window.location.reload()
        }
        setSubmitting(false)
    }

    return (
        <div>
            <Card className="border-none ">
                <div className="flex gap-12 justify-center flex-col md:flex-row ">
                    <div className="w-full md:w-1/3 gap-y-7">
                        <h1 className="text-2xl mb-4">
                            {t('profile-settings.formName')}
                        </h1>
                        <Formik
                            initialValues={{
                                nameUser: state.auth.user.userName,
                                // profession: '',
                                // favoriteSport: '',
                                password: null,
                                newPassword: null,
                                confirmNewPassword: null,
                                photoPerfil: '',
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                handleUpdateUser(values, setSubmitting)
                            }}
                        >
                            {({ touched, errors, values }) => (
                                <Form>
                                    <FormContainer>
                                        <FormItem label={''+t('profile-settings.formUpdate.userName.name')}>
                                            <Field
                                                type="text"
                                                name="nameUser"
                                                placeholder={t('profile-settings.formUpdate.userName.placeholder')}
                                                className="shadow-lg"
                                                component={Input}
                                            />
                                        </FormItem>
                                        {/* <FormItem label="Email">
                                            <Field
                                                type="email"
                                                autoComplete="off"
                                                name="email"
                                                placeholder="Email"
                                                className="shadow-lg"
                                                component={Input}
                                            />
                                        </FormItem> */}
                                        <FormItem label={''+t('profile-settings.formUpdate.uploadPhoto.label')}>
                                            {/* <Field
                                                type="file"
                                                component={AvatarImageBusiness}
                                                className="shadow-lg"
                                                value="photoPerfil"
                                                onChange={(value: any) => {
                                                    console.log(
                                                        'Novo valor selecionado:',
                                                        value
                                                    )
                                                    setFieldValue(
                                                        'photoPerfil',
                                                        value
                                                    )
                                                }}
                                            /> */}
                                            <AvatarImageBusiness
                                                onChange={handleAvatarChange}
                                            />
                                        </FormItem>
                                        <FormItem>
                                            {showPasswordFields && (
                                                <>
                                                    <FormItem label={''+t('profile-settings.formUpdate.changePassword.currentPassword.label')}>
                                                        <Field
                                                            component={
                                                                PasswordInput
                                                            }
                                                            type="password"
                                                            name="password"
                                                            placeholder={t('profile-settings.formUpdate.changePassword.currentPassword.placeholder')}
                                                            invalid={
                                                                errors.password &&
                                                                touched.password
                                                            }
                                                            errormessage={
                                                                errors.password
                                                            }
                                                        />
                                                    </FormItem>
                                                    <FormItem label={''+t('profile-settings.formUpdate.changePassword.newPassword.label')}>
                                                        <Field
                                                            component={
                                                                PasswordInput
                                                            }
                                                            type="password"
                                                            name="newPassword"
                                                            placeholder={t('profile-settings.formUpdate.changePassword.newPassword.placeholder')}
                                                            invalid={
                                                                errors.newPassword &&
                                                                touched.newPassword
                                                            }
                                                            errormessage={
                                                                errors.newPassword
                                                            }
                                                        />
                                                    </FormItem>
                                                    {values.newPassword && (
                                                        <FormItem label={''+t('profile-settings.formUpdate.changePassword.confirmPassword.label')}>
                                                            <Field
                                                                component={
                                                                    PasswordInput
                                                                }
                                                                type="password"
                                                                name="confirmNewPassword"
                                                                placeholder={t('profile-settings.formUpdate.changePassword.confirmPassword.placeholder')}
                                                                invalid={
                                                                    errors.confirmNewPassword &&
                                                                    touched.confirmNewPassword
                                                                }
                                                                errormessage={
                                                                    errors.confirmNewPassword
                                                                }
                                                            />
                                                        </FormItem>
                                                    )}
                                                </>
                                            )}
                                        </FormItem>
                                        {/* <FormItem label="Profissão">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="profession"
                                            placeholder="Profissão"
                                            className="shadow-lg"
                                            component={Input}
                                        />
                                    </FormItem> */}
                                        <Button
                                            className="shadow-lg cursor-pointer "
                                            onClick={(e) =>
                                                handleShowPassword(e)
                                            }
                                        >
                                            {showPasswordFields
                                                ? t('profile-settings.formUpdate.changePassword.functionsPassword.omit')
                                                : t('profile-settings.formUpdate.changePassword.functionsPassword.confirmPassword') }
                                        </Button>
                                    </FormContainer>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        className="shadow-lg mt-8"
                                    >
                                        {t('profile-settings.formUpdate.button')}
                                    </Button>

                                    {flashMessage && (
                                        <FlashMessage
                                            message={flashMessage.message}
                                            type={flashMessage.type}
                                            onClose={closeFlashMessage}
                                        />
                                    )}
                                </Form>
                            )}
                        </Formik>
                    </div>
                    {/* <div className="flex gap-7 flex-col">
                        <h1 className="text-2xl">Para te conhecer melhor</h1>
                        <Formik
                            initialValues={{
                                trip: '',
                                sport: '',
                                favoriteSport: ''
                            }}
                            onSubmit={(values, actions) => {
                                actions.setSubmitting(false)
                            }}
                        > */}
                    {/* <Form>
                                <FormItem label="Quantas vezes você viaja a lazer por ano?">
                                    <Select
                                        name="trip"
                                        options={[
                                            {
                                                value: 'nenhuma',
                                                label: 'nenhuma'
                                            },
                                            { value: '1', label: '1' },
                                            { value: '2', label: '2' },
                                            { value: '3', label: '3' },
                                            { value: '4', label: '4' },
                                            { value: '5', label: '5' },
                                            { value: '6', label: '6' },
                                            { value: '7', label: '7' },
                                            { value: '8', label: '8' },
                                            { value: '9', label: '9' },
                                            { value: '10', label: '10' },
                                            { value: '10+', label: '10+' }
                                        ]}
                                    ></Select>
                                </FormItem>
                                <FormItem label="Qual seu esporte favorito?">
                                    <Select
                                        name="sport"
                                        options={[
                                            {
                                                value: 'soccer',
                                                label: 'Futebol'
                                            },
                                            {
                                                value: 'basketball',
                                                label: 'Basquetebol'
                                            },
                                            { value: 'tennis', label: 'Tênis' },
                                            {
                                                value: 'swimming',
                                                label: 'Natação'
                                            },
                                            { value: 'golf', label: 'Golfe' },
                                            {
                                                value: 'volleyball',
                                                label: 'Vôlei'
                                            },
                                            {
                                                value: 'cricket',
                                                label: 'Críquete'
                                            },
                                            { value: 'rugby', label: 'Rúgbi' },
                                            {
                                                value: 'hockey',
                                                label: 'Hóquei'
                                            },
                                            {
                                                value: 'baseball',
                                                label: 'Beisebol'
                                            },
                                            {
                                                value: 'tableTennis',
                                                label: 'Tênis de Mesa'
                                            },
                                            {
                                                value: 'badminton',
                                                label: 'Badminton'
                                            },
                                            {
                                                value: 'athletics',
                                                label: 'Atletismo'
                                            },
                                            { value: 'boxing', label: 'Boxe' },
                                            {
                                                value: 'wrestling',
                                                label: 'Luta Livre'
                                            },
                                            { value: 'skiing', label: 'Esqui' },
                                            {
                                                value: 'snowboarding',
                                                label: 'Snowboard'
                                            },
                                            {
                                                value: 'cycling',
                                                label: 'Ciclismo'
                                            },
                                            {
                                                value: 'surfing',
                                                label: 'Surfe'
                                            },
                                            {
                                                value: 'skateboarding',
                                                label: 'Skate'
                                            },
                                            { value: 'rowing', label: 'Remo' },
                                            {
                                                value: 'gymnastics',
                                                label: 'Ginástica'
                                            },
                                            {
                                                value: 'weightlifting',
                                                label: 'Levantamento de Peso'
                                            },
                                            {
                                                value: 'Handebol',
                                                label: 'Handebol'
                                            },
                                            {
                                                value: 'Beach Tennis',
                                                label: 'Beach Tennis'
                                            },
                                            { value: 'Judô', label: 'Judô' },
                                            {
                                                value: 'Jiu Jitsu',
                                                label: 'Jiu Jitsu'
                                            },
                                            {
                                                value: 'Caça Esportiva',
                                                label: 'Caça Esportiva'
                                            },
                                            { value: 'outros', label: 'Outros' }
                                        ]}
                                        onChange={(selectedOption) => {
                                            handleSelectChange(selectedOption)
                                        }}
                                    ></Select>
                                </FormItem>
                                {showOtherInput && (
                                    <FormItem label="Outro esporte favorito">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="favoriteSport"
                                            placeholder="Escreva seu esporte favorito"
                                            component={Input}
                                            className="shadow-lg"
                                        />
                                    </FormItem>
                                )}
                                <FormItem label="Redes Sociais">
                                    <div className="flex flex-col sm:flex-row gap-8 sm:gap-4">
                                        <Select
                                            className=" h-6 shadow-lg w-40"
                                            options={[
                                                {
                                                    value: 'Instagram',
                                                    label: 'Instagram'
                                                },
                                                {
                                                    value: 'Facebook',
                                                    label: 'Facebook'
                                                },
                                                {
                                                    value: 'TikTok',
                                                    label: 'TikTok'
                                                },
                                                {
                                                    value: 'Twitter (X)',
                                                    label: 'Twitter (X)'
                                                },
                                                {
                                                    value: 'LinkedIn',
                                                    label: 'LinkedIn'
                                                },
                                                {
                                                    value: 'Snapchat',
                                                    label: 'Snapchat'
                                                },
                                                {
                                                    value: 'Threads',
                                                    label: 'Threads'
                                                }
                                            ]}
                                        ></Select>
                                        <InputGroup className="mb-4">
                                            <Addon className="shadow-lg">
                                                @
                                            </Addon>
                                            <Input className="shadow-lg" />
                                        </InputGroup>
                                    </div>
                                </FormItem> */}

                    {/* </Form> */}
                    {/* </Formik> */}
                </div>
            </Card>
        </div>

        // </div>
    )
}

export default ProfileSettingsPage
