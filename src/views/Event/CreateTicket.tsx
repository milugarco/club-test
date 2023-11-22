import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, Form, Formik } from 'formik'
import { Button, Card, Select } from '@/components/ui'
import { useState, useEffect } from 'react'
import '@/assets/styles/components/modal.css'
import InputColor from '@/components/ui/InputColor/inputColor'
import FlashMessage from '@/components/ui/FlashMessage/FlashMessage'
import InputMoney from '@/components/ui/InputMoney/InputMoney'
import { Link } from 'react-router-dom'
import { HiOutlineChevronLeft } from 'react-icons/hi'

const CreateTicket = () => {
    const [flashMessage, setFlashMessage] = useState<{
        message: string
        type: string
    } | null>(null)
    const showSuccessMessage = () => {
        setFlashMessage({
            message: 'Ingresso cadastrado com sucesso!',
            type: 'success'
        })
    }

    const [moeda, setMoeda] = useState<string>(''); 
    const [valor, setValor] = useState<number>(0);
    const [moedaSelecionada, setMoedaSelecionada] = useState<boolean>(false); 

    const handleMoedaChange = (selectedOption: string) => {
        setMoeda(selectedOption);
        setMoedaSelecionada(!!selectedOption); 
    };

    const closeFlashMessage = () => {
        setFlashMessage(null)
    }

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        const positiveValue = Math.max(0, parseFloat(value) || 0);

        e.target.value = positiveValue;
    };

    useEffect(() => {

        const novoValor = moeda === 'BRL' ? valor * 100 : valor / 100;
        setValor(novoValor);
    }, [moeda]);

    return (


        <div>


                    <Card className="border-none">
                        <Link to="/dashboard/event/ticket">
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
                        <h1 className="text-2xl mb-4">Novo Ingresso</h1>
                        <Formik
                            initialValues={{
                                TypeTicket: '',
                                Description: '',
                                profession: '',
                                favoriteSport: '',
                                InfosImportant: '',
                                linkVideo: '',
                                linkSocial: '',
                                limit: ''
                            }}
                            onSubmit={(values, actions) => {
                                
                                actions.setSubmitting(false)
                            }}
                        >
                            <Form>
                                <FormContainer>
                                    <FormItem label="Tipo do ingresso">
                                        <Field
                                            type="text"
                                            name="TypeTicket"
                                            placeholder="Digite ou pesquise"
                                            component={Input}
                                            className="shadow-lg"
                                        />
                                    </FormItem>
                                    <FormItem label="Descrição do ingresso">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="Description"
                                            placeholder="Digite uma mensagem especial"
                                            component={Input}
                                            className="shadow-lg"
                                        />
                                    </FormItem>
                                    <div className="flex w-full gap-2 flex-col 2xl:flex-row">
                                        <FormItem label="Selecionar Moeda" className='w-full'>
                                            <Select
                                                isSearchable={false}
                                                className="shadow-lg"
                                                name="type"
                                                options={[
                                                    { value: 'BRL', label: 'BRL - Real brasileiro' },
                                                    { value: 'USD', label: 'USD - Dólar americano' },
                                                ]}
                                                onChange={(selectedOption) =>
                                                    handleMoedaChange(selectedOption ? selectedOption.value : 'BRL')
                                                }
                                            ></Select>
                                        </FormItem>
                                        <div className='flex flex-row gap-2 w-full'>
                                        <FormItem label="Valor" className='w-1/2 h-20'>
                                            {moedaSelecionada && <InputMoney moeda={moeda} />}
                                        </FormItem>
                                        <FormItem label="Promocional" className='w-1/2'>
                                            {moedaSelecionada && <InputMoney moeda={moeda} />}
                                        </FormItem>
                                        </div>
                                    </div>
                                    <FormItem label="Status">
                                        <Select
                                            isSearchable={false}
                                            className="shadow-lg"
                                            name="type"
                                            options={[
                                                {
                                                    value: 'active',
                                                    label: 'Ativado'
                                                },
                                                {
                                                    value: 'disabled',
                                                    label: 'Desativado'
                                                }
                                            ]}
                                            placeholder="Selecione..."
                                        ></Select>
                                    </FormItem>

                                    <Form>
                                        <FormItem label="Cor ingresso">
                                            <Field
                                                component={InputColor}
                                                className="bg-red"
                                            />
                                        </FormItem>

                                        <FormItem label="Limite de convidado">
                                            <Select
                                                isSearchable={false}
                                                className="shadow-lg"
                                                name="type"
                                                options={[
                                                    { value: '1', label: '1' },
                                                    { value: '2', label: '2' },
                                                    { value: '3', label: '3' },
                                                    { value: '4', label: '4' },
                                                    { value: '5', label: '5' },
                                                ]}
                                                placeholder="Selecione..."
                                            ></Select>
                                        </FormItem>
                                        <FormItem label="Limite total">
                                            <Field
                                            className="shadow-lg"
                                                name="limit"
                                                type="number"
                                                placeholder="Limite total do ingresso"
                                                component={Input}
                                                onInput={handleInput}
                                            ></Field>
                                        </FormItem>
                                        <Button
                                            variant="solid"
                                            type="submit"
                                            className="shadow-lg"
                                            onClick={showSuccessMessage}
                                        >
                                            Criar ingresso
                                        </Button>
                                        {flashMessage && (
                                            <FlashMessage
                                                message={flashMessage.message}
                                                type={flashMessage.type}
                                                onClose={closeFlashMessage}
                                            />
                                        )}
                                    </Form>
                                </FormContainer>
                            </Form>
                        </Formik>
                    </Card>

            </div>


    )
}

export default CreateTicket;
