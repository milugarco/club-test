import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, Form, Formik } from 'formik'
import { Button, Card, Select } from '@/components/ui'
import { useState, useEffect } from 'react'
import '@/assets/styles/components/modal.css'
import FlashMessage from '@/components/ui/FlashMessage/FlashMessage'
import PhoneInput from 'react-phone-number-input'
import { HiOutlineChevronLeft } from 'react-icons/hi'
import { Link } from 'react-router-dom'


const FormGuest = () => {
    const [flashMessage, setFlashMessage] = useState<{
        message: string
        type: string
    } | null>(null)
    const showSuccessMessage = () => {
        setFlashMessage({
            message: 'Participante convidado com sucesso!',
            type: 'success'
        })
    }


    const closeFlashMessage = () => {
        setFlashMessage(null)
    }

    const handlePhoneChange = (e: string) => {
        setPhoneValue?.(e)
    }

    const [phoneValue, setPhoneValue] = useState('');
    const [formValues, setFormValues] = useState({
        phoneValue: '',
    });

    useEffect(() => {
        setFormValues({
            phoneValue,

        });
    }, [phoneValue]);


    return (
        <div>
            <Card className='border-none'>
                <Link to="/dashboard/event/guests">
                    <Button
                        className=" w-16 mb-4"
                        type="submit"
                        variant="twoTone"
                        icon={<HiOutlineChevronLeft />}
                        size='xs'

                    >
                        <span>Voltar</span>
                    </Button>
                </Link>
                <div className='className="border-none grid grid-cols-1 gap-4'>
                    <h1 className="text-2xl mb-4">Cadastrar participante</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            mensage: "",
                            document: "",
                            phoneValue: "",
                            email: "",
                            type: "",
                        }}
                        onSubmit={(values, actions) => {
                            
                            actions.setSubmitting(false)
                        }}
                    >
                        <Form>
                            <FormContainer>
                                <FormItem label="Nome">
                                    <Field
                                        type="text"
                                        name="nome"
                                        placeholder="Digite ou pesquise"
                                        component={Input}
                                        className="shadow-lg"
                                    />
                                </FormItem>
                                <FormItem label="Descrição do ingresso">
                                    <div>
                                        <Input placeholder="Deixe uma mensagem personalizada" textArea className='resize-none shadow-lg' />
                                    </div>
                                </FormItem>

                                <div className="flex w-full gap-2 flex-col 2xl:flex-row">
                                    <FormItem label="Selecionar documento" className='w-full'>
                                        <Select
                                            isSearchable={false}
                                            className="shadow-lg"
                                            name="type"
                                            options={[
                                                { value: 'BRL', label: 'BRL - Real brasileiro' },
                                                { value: 'USD', label: 'USD - Dólar americano' },
                                            ]}
                                            placeholder="Selecionar..."
                                        // onChange={(selectedOption) =>
                                        //     handleMoedaChange(selectedOption ? selectedOption.value : 'BRL')
                                        // }
                                        ></Select>
                                    </FormItem>
                                    <div className='flex flex-row gap-2 w-1/2'>
                                        <FormItem label="Documento" className='w-full h-20'>
                                            <Input placeholder="Documento" className='shadow-lg' />{/* {moedaSelecionada && <InputMoney moeda={moeda} />} */}

                                        </FormItem>

                                    </div>
                                </div>

                                <FormItem label="Telefone">
                                    <PhoneInput
                                        international
                                        limitMaxLength={true}
                                        defaultCountry="BR"
                                        placeholder="Digite o número de telefone"
                                        name="phoneValue"
                                        value={phoneValue}
                                        className="input h-11 focus:ring-purple-800 focus-within:ring-purple-800 focus-within:border-purple-800 focus:border-purple-800 shadow-lg"
                                        onChange={(e: string) => {
                                            handlePhoneChange(e);


                                        }}
                                    />
                                </FormItem>
                                <FormItem label="Email">
                                    <Field
                                        className="shadow-lg"
                                        type="email"
                                        autoComplete="off"
                                        name="email"
                                        placeholder="Email"
                                        component={Input}

                                    />
                                </FormItem>
                                <FormItem label="Tipo do ingresso" className='w-full'>
                                    <Select
                                        isSearchable={false}
                                        className="shadow-lg"
                                        name="nome"
                                        options={[
                                            { value: 'Platinum', label: 'Platinum' },
                                            { value: 'Gold', label: 'Gold' },
                                            { value: 'Prata', label: 'Prata' },
                                        ]}
                                        placeholder="Selecionar..."

                                    ></Select>
                                </FormItem>
                                <div className='w-full flex justify-end'>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        className="shadow-lg w-full "
                                        onClick={showSuccessMessage}
                                    >
                                        Convidar
                                    </Button>
                                    {flashMessage && (
                                        <FlashMessage
                                            message={flashMessage.message}
                                            type={flashMessage.type}
                                            onClose={closeFlashMessage}
                                        />
                                    )}
                                </div>
                            </FormContainer>
                        </Form>
                    </Formik>
                </div>
            </Card>
        </div>


    )
}

export default FormGuest;
