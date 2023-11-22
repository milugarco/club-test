// import { FormItem, FormContainer } from '@/components/ui/Form'
// import Input from '@/components/ui/Input'
// import Button from '@/components/ui/Button'
// import Alert from '@/components/ui/Alert'
// import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
// import { Field, Form, Formik } from 'formik'
// import * as Yup from 'yup'
// import useAuth from '@/utils/hooks/useAuth'
// import type { CommonProps } from '@/@types/common'
// import type { SignUpFormSchema } from './SignUpFormStepOne'
// import { Select } from '@/components/ui'

// interface SignUpFormProps extends CommonProps {
//     disableSubmit?: boolean
//     signInUrl?: string
//     handleStep?: (newStep: string) => void;
// }

// const validationSchema = Yup.object().shape({
//     phoneNumber: Yup.string().required('Insira um telefone'),
//     document: Yup.string().required('Insira um documento'),
//     personName: Yup.string().required('Insira seu nome'),
//     userName: Yup.string().required('Insira seu nome'),
//     email: Yup.string()
//         .email('Email inválido')
//         .required('Insira seu email'),
//     password: Yup.string().required('Insira sua senha'),
//     confirmPassword: Yup.string().oneOf(
//         [Yup.ref('password')],
//         'As senhas não são iguais'),
//     questionOne: Yup.string().required('Insira sua resposta'),
//     questionTwo: Yup.string().required('Insira sua resposta'),
//     questionThree: Yup.string().required('Insira sua resposta')

// })

// export const SignUpFormStepThree = (props: SignUpFormProps) => {

//     const { disableSubmit = false, className = '/sign-in', handleStep } = props

//     const { signUp } = useAuth()

//     const [message, setMessage] = useTimeOutMessage()

//     const onSignUp = async (
//         values: SignUpFormSchema,
//         setSubmitting: (isSubmitting: boolean) => void
//     ) => {
//         const {questionOne, questionTwo, questionThree } = values
//         setSubmitting(true)
//         const result = await signUp({
//             questionOne, questionTwo, questionThree,
//             phoneNumber: '',
//             document: '',
//             personName: '',
//             userName: '',
//             email: '',
//             password: '',
//             userNameBusiness: ''
//         })

//         if (result?.status === 'failed') {
//             setMessage(result.message)
//         }

//         setSubmitting(false)
//     }

//     return (
//         <div className={className}>
//             {message && (
//                 <Alert showIcon className="mb-4" type="danger">
//                     {message}
//                 </Alert>
//             )}
//             <Formik
//                 initialValues={{
//                     phoneNumber: '+55 99 99999-9999',
//                     document: '',
//                     personNameBusiness: '',
//                     userName: 'admin1',
//                     password: '123Qwe1',
//                     confirmPassword: '123Qwe1',
//                     email: 'test@testmail.com',
//                     questionOne: "string",
//                     questionTwo: "string",
//                     questionThree: "string",
//                     personName: '',
//                     userNameBusiness:'',
//                     handleStep:'',
//                 }}
//                 validationSchema={validationSchema}
//                 onSubmit={(values, { setSubmitting }) => {
//                     if (!disableSubmit) {
//                         onSignUp(values, setSubmitting)
//                     } else {
//                         setSubmitting(false)
//                     }
//                 }}
//             >
//                 {({ isSubmitting }) => (
//                     <Form>
//                         <FormContainer>
//                         <FormItem label="Quantas vezes você viaja a lazer por ano?">
//                                 <Select
//                                     className="shadow-lg"
//                                     options={[
//                                         { value: 'nenhuma', label: 'nenhuma' },
//                                         { value: '1', label: '1' },
//                                         { value: '2', label: '2' },
//                                         { value: '3', label: '3' },
//                                         { value: '4', label: '4' },
//                                         { value: '5', label: '5' },
//                                         { value: '6', label: '6' },
//                                         { value: '7', label: '7' },
//                                         { value: '8', label: '8' },
//                                         { value: '9', label: '9' },
//                                         { value: '10', label: '10' },
//                                         { value: '10+', label: '10+' },
//                                       ]}
//                                 >
//                                 </Select>
//                                 </FormItem>
//                             <FormItem label="Qual seu esporte favorito?">
//                                 <Select
//                                     className="shadow-lg"
//                                     options={[
//                                         { value: 'soccer', label: 'Futebol' },
//                                         { value: 'basketball', label: 'Basquetebol' },
//                                         { value: 'tennis', label: 'Tênis' },
//                                         { value: 'swimming', label: 'Natação' },
//                                         { value: 'golf', label: 'Golfe' },
//                                         { value: 'volleyball', label: 'Vôlei' },
//                                         { value: 'cricket', label: 'Críquete' },
//                                         { value: 'rugby', label: 'Rúgbi' },
//                                         { value: 'hockey', label: 'Hóquei' },
//                                         { value: 'baseball', label: 'Beisebol' },
//                                         { value: 'tableTennis', label: 'Tênis de Mesa' },
//                                         { value: 'badminton', label: 'Badminton' },
//                                         { value: 'athletics', label: 'Atletismo' },
//                                         { value: 'boxing', label: 'Boxe' },
//                                         { value: 'wrestling', label: 'Luta Livre' },
//                                         { value: 'skiing', label: 'Esqui' },
//                                         { value: 'snowboarding', label: 'Snowboard' },
//                                         { value: 'cycling', label: 'Ciclismo' },
//                                         { value: 'surfing', label: 'Surfe' },
//                                         { value: 'skateboarding', label: 'Skate' },
//                                         { value: 'rowing', label: 'Remo' },
//                                         { value: 'gymnastics', label: 'Ginástica' },
//                                         { value: 'weightlifting', label: 'Levantamento de Peso' },
//                                         { value: 'Handebol', label: 'Handebol' },
//                                         { value: 'Beach Tennis', label: 'Beach Tennis' },
//                                         { value: 'Judô', label: 'Judô' },
//                                         { value: 'Jiu Jitsu', label: 'Jiu Jitsu' },
//                                         { value: 'Caça Esportiva', label: 'Caça Esportiva' },
//                                       ]}
//                                 >
//                                 </Select>
//                                 </FormItem>
//                                 <FormItem label="Escolha uma rede social que mais utiliza:">
//                                 <Select
//                                     className="shadow-lg"
//                                     options={[
//                                         { value: 'Instagram', label: 'Instagram' },
//                                         { value: 'Facebook', label: 'Facebook' },
//                                         { value: 'Twitter', label: 'Twitter' },
//                                         { value: 'Telegram', label: 'Telegram' },
//                                         { value: 'LinkedIn', label: 'LinkedIn' },
//                                         { value: 'Pinterest', label: 'Pinterest' },
//                                         { value: 'Snapchat', label: 'Snapchat' },
//                                         { value: 'TikTok', label: 'TikTok' },
//                                         { value: 'WhatsApp', label: 'WhatsApp' },
//                                         { value: 'Reddit', label: 'Reddit' },
//                                         { value: 'Tumblr', label: 'Tumblr' },
//                                         { value: 'YouTube', label: 'YouTube' },
//                                         { value: 'Flickr', label: 'Flickr' },
//                                         { value: 'Vimeo', label: 'Vimeo' },
//                                         { value: 'WeChat', label: 'WeChat' },
//                                         { value: 'Skype', label: 'Skype' },
//                                         { value: 'Viber', label: 'Viber' },
//                                         { value: 'Line', label: 'Line' },
//                                         { value: 'VKontakte', label: 'VKontakte' },
//                                       ]}
//                                 >
//                                 </Select>
//                                 </FormItem>
//                             <FormItem
//                                 label="User da rede social:"
//                             >
//                                 <Field
//                                     className="shadow-lg"
//                                     name="numberDocument"
//                                     placeholder="@seuUsuario"
//                                     component={Input}
//                                 />
//                             </FormItem>
//                             <Button
//                                 block
//                                 className="shadow-lg mb-5"
//                                 loading={isSubmitting}
//                                 variant="solid"
//                                 type="submit"
//                                 onClick={() => handleStep?.('one')}
//                             >
//                                 {isSubmitting
//                                     ? 'Voltando...'
//                                     : 'Voltar'}
//                             </Button>
//                             <Button
//                                 block
//                                 className="shadow-lg"
//                                 loading={isSubmitting}
//                                 variant="solid"
//                                 type="submit"
//                                 onClick={() => handleStep?.('signInUrl')}
//                             >
//                                 {isSubmitting
//                                     ? 'Cadastrando...'
//                                     : 'Cadastrar'}
//                             </Button>

//                         </FormContainer>
//                     </Form>
//                 )}
//             </Formik>
//         </div>
//     )
// }
