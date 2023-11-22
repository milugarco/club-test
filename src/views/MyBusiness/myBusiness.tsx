import GraphDonut from './models/GraphDonuts'
import { Button } from '@/components/ui'
import { HiOutlinePencil, HiOutlinePlusCircle } from 'react-icons/hi'
import AvatarImageBusiness from './models/AvatarBusiness'
import { CalendarEvents } from './models/CalendarEvents'
import { Link } from 'react-router-dom'
import Customers from './models/Custumers'
import SplineAreaExample from './models/SplineArea'
import Statistic from './models/CardStatistic'

const MyBusiness = () => {
    return (
        <div>
            <div className="flex flex-col lg:flex-row w-full items-center gap-4 mb-4 justify-between">
                <div className="lg:w-2/6 xl:w-2/6 flex flex-col items-center gap-4">
                    <AvatarImageBusiness />
                    <h2 className="text-center  text-2xl">Nome da Empresa</h2>
                </div>
                <div className="lg:w-4/6 w-full flex flex-col justify-center items-center xl:items-end gap-4">
                    <div className="flex flex-col xl:flex-row w-full justify-center xl:justify-end gap-4">
                        <div className="">
                            {/* <Button
                                className="shadow-lg flex justify-center items-center gap-2 bg-zinc-500 hover:bg-zinc-400 dark:bg-gray-600 hover:dark:bg-gray-500"
                                type="submit"
                                block
                                // onClick={openModal}
                                variant="solid"
                            >
                                <HiOutlinePencil className="sm:text-2xl text-lg" />
                                Gerenciar
                            </Button> */}
                        </div>
                        <div>
                            <Link to="/dashboard/event/create-event">
                                <Button
                                    className="shadow-lg flex justify-center items-center gap-2"
                                    type="submit"
                                    block
                                    // onClick={openModal}
                                    variant="solid"
                                >
                                    <HiOutlinePlusCircle className="sm:text-2xl text-lg" />
                                    Novo Evento
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex justify-center w-full flex-row ">
                        <Statistic />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4">
                <div className="col-span-2 grid grid-cols-1 h-max">
                    <div className="h-max mb-4 col-span-2">
                        <SplineAreaExample />
                    </div>
                    <div className="h-full hidden 2xl:block">
                        <Customers />
                    </div>
                    <div className="h-full 2xl:hidden">
                        <GraphDonut />
                    </div>
                </div>
                <div className="2xl:col-span-1 col-span-2">
                    <div className="col-span-1">
                        <CalendarEvents />
                    </div>
                    <div className="col-span-1 hidden 2xl:block">
                        <GraphDonut />
                    </div>
                    <div className="col-span-1 2xl:hidden">
                        <Customers />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBusiness
