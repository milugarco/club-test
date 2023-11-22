import { Button, Card } from '@/components/ui'
import Table from '@/components/ui/Table'
import { Link } from 'react-router-dom'

const { Tr, Th, Td, THead, TBody } = Table

const TableParticipants = () => {
    return (
        <div className="flex flex-col xl:flex-row gap-4">
            <Card className=" xl:w-2/3 border-none">
                <div>
                    <div className="flex justify-between ">
                        <h1 className="text-2xl ">Participantes</h1>
                        <Link to="/dashboard/event/guests">
                            <Button className="mb-3">Ver todos</Button>
                        </Link>
                    </div>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Nome</Th>
                                <Th>Tipo ingresso</Th>
                                <Th>Confirmado</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            <Tr>
                                <Td>João</Td>
                                <Td>Prata </Td>
                                <Td>Confirmado</Td>
                            </Tr>
                            <Tr>
                                <Td>Guilhermino</Td>
                                <Td>Bronze</Td>
                                <Td>Não confirmado</Td>
                            </Tr>
                            <Tr>
                                <Td>Guilhermino</Td>
                                <Td>Ouro</Td>
                                <Td>Confirmado</Td>
                            </Tr>
                        </TBody>
                    </Table>
                </div>
            </Card>
            <Card className="xl:w-1/3 border-none">
                <div>
                    <div className="flex justify-between ">
                        <h1 className="text-2xl ">Ingressos</h1>
                        <Link to="/dashboard/event/ticket">
                            <Button className="mb-3 mt-2">Ver todos</Button>
                        </Link>
                    </div>
                    <Table>
                        <THead>
                            <Tr>
                                <Th>Tipo ingresso</Th>
                                <Th>Vendidos</Th>
                            </Tr>
                        </THead>
                        <TBody>
                            <Tr>
                                <Td>Prata</Td>
                                <Td>20</Td>
                            </Tr>
                            <Tr>
                                <Td>Ouro</Td>
                                <Td>30</Td>
                            </Tr>
                            <Tr>
                                <Td>Bronze</Td>
                                <Td>40</Td>
                            </Tr>
                        </TBody>
                    </Table>
                </div>
            </Card>
        </div>
    )
}

export default TableParticipants
