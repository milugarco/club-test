import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import { Field, Form, Formik } from 'formik'
import UploadImg from '@/components/ui/UploadImage/UploadImg'
import { Button, Card, DatePicker, Select } from '@/components/ui'
import '@/assets/styles/components/modal.css'
import { RichTextEditor } from '@/components/shared'
import InputColor from '@/components/ui/InputColor/inputColor'
import { Link } from 'react-router-dom'

const CreateEvent = () => {
    return (
        <div>
            <div className="flex gap-4 justify-center flex-col md:flex-row">
                <div className="md:w-2/3 w-full gap-y-7">
                    <Card className="border-none">
                        <h1 className="text-2xl mb-4">Novo Evento</h1>
                        <Formik
                            initialValues={{
                                nameUser: 'Fabiano Fagá',
                                email: 'fabiano.faga@gmail.com',
                                profession: '',
                                favoriteSport: ''
                            }}
                            onSubmit={(values, actions) => {
                                
                                actions.setSubmitting(false)
                            }}
                        >
                            <Form>
                                <FormContainer>
                                    <FormItem label="Nome do evento:">
                                        <Field
                                            type="text"
                                            name="nameEvent"
                                            placeholder="Nome do evento"
                                            component={Input}
                                            className="shadow-lg"
                                        />
                                    </FormItem>
                                    <FormItem label="Subtitulo:">
                                        <Field
                                            type="text"
                                            autoComplete="off"
                                            name="subtitle"
                                            placeholder="Subtitulo"
                                            className="shadow-lg"
                                            component={Input}
                                        />
                                    </FormItem>
                                    <FormItem label="Tipo:">
                                        <Select
                                            className="shadow-lg"
                                            name="type"
                                            options={[
                                                {
                                                    value: 'aniversario',
                                                    label: 'Aniversário'
                                                },
                                                {
                                                    value: 'casamento',
                                                    label: 'Casamento'
                                                },
                                                {
                                                    value: 'conferencia',
                                                    label: 'Conferência'
                                                },
                                                {
                                                    value: 'reunião',
                                                    label: 'Reunião'
                                                },
                                                {
                                                    value: 'seminário',
                                                    label: 'Seminário'
                                                },
                                                {
                                                    value: 'festa',
                                                    label: 'Festa'
                                                },
                                                {
                                                    value: 'esportivo',
                                                    label: 'Evento Esportivo'
                                                },
                                                {
                                                    value: 'musical',
                                                    label: 'Evento Musical'
                                                }
                                            ]}
                                        ></Select>
                                    </FormItem>
                                    <FormItem label="Faça upload das imagens do evento:">
                                        <Field
                                            type="file"
                                            component={UploadImg}
                                            name="image"
                                        />
                                    </FormItem>
                                    <div className="flex gap-6">
                                        <FormItem label="Cor primária:">
                                            <Field component={InputColor} />
                                        </FormItem>
                                        <FormItem label="Cor secundária:">
                                            <Field component={InputColor} />
                                        </FormItem>
                                    </div>
                                    <FormItem label="Data de publicação">
                                        <Field
                                            className="shadow-lg"
                                            component={DatePicker}
                                            placeholder="Data"
                                        ></Field>
                                    </FormItem>
                                </FormContainer>
                            </Form>
                        </Formik>
                    </Card>
                </div>

                <div className="flex gap-7 w-full md:w-1/2 flex-col">
                    <Card className="border-none h-full">
                        <Formik
                            initialValues={{
                                InfosImportant: '',
                                linkVideo: '',
                                linkSocial: ''
                            }}
                            onSubmit={(values, actions) => {
                                
                                actions.setSubmitting(false)
                            }}
                        >
                            <Form>
                                <FormItem label="Data final">
                                    <Field
                                        className="shadow-lg"
                                        component={DatePicker}
                                        placeholder="Data"
                                    ></Field>
                                </FormItem>

                                <FormItem label="Descrição do evento">
                                    <RichTextEditor className="shadow-lg" />
                                </FormItem>

                                <FormItem label="Informações importantes">
                                    <Field
                                        type="text"
                                        name="InfosImportant"
                                        className="shadow-lg"
                                        placeholder="Informações importantes"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem label="Link do video">
                                    <Field
                                        type="text"
                                        className="shadow-lg"
                                        name="linkVideo"
                                        placeholder="Link"
                                        component={Input}
                                    />
                                </FormItem>
                                <FormItem label="Link de redes sociais">
                                    <Field
                                        type="text"
                                        name="linkSocial"
                                        className="shadow-lg"
                                        placeholder="Link das redes"
                                        component={Input}
                                    />
                                </FormItem>
                                <Link to="/my-event">
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        className="shadow-lg"
                                    >
                                        Criar
                                    </Button>
                                </Link>
                            </Form>
                        </Formik>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent
