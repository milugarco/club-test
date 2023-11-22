import Card from '@/components/ui/Card'
import ProgressBarColors from './ProgressBarProfile'

const MyBusinessOne = () => {
    const cardFooter = (
        <div>
       <ProgressBarColors />
            
        </div>
 
        

    )

    const cardHeader = (

        <h4 className="font-bold mt-3 ml-4">BRConnect</h4>

    )
    return (

        <div className="p-1 h-4">

            <div className="h-60 sm:w-70">
                <Card
                    clickable
                    className="hover:shadow-lg transition duration-150 ease-in-out"
                    header={cardHeader}
                    footer={cardFooter}
                    headerClass="p-0"
                    footerBorder={false}
                    headerBorder={false}
                >

                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden flex justify-center items-center">

                        <img className='h-20 w-20 bg-purple-50 dark:bg-white rounded-full flex justify-center items-center bg-cover bg-center' src="/img/others/E-LOGO.png" alt="card header" />

                    </div>

                </Card>
            </div>
        </div>





    )
}

const MyBusinessTwo = () => {
    const cardFooter = (

        <ProgressBarColors />

    )

    const cardHeader = (
        <h4 className="font-bold mt-3 ml-4">Invicta</h4>
    )
    return (



        <div className="p-1 h-4">

            <div className="sm:w-70">
                <Card
                    clickable
                    className="hover:shadow-lg transition duration-150 ease-in-out"
                    header={cardHeader}
                    footer={cardFooter}
                    headerClass="p-0"
                    footerBorder={false}
                    headerBorder={false}
                >


                    <div className="rounded-tl-lg rounded-tr-lg overflow-hidden flex justify-center items-center">

                        <img className='h-20 w-20 bg-purple-50 dark:bg-white rounded-full flex justify-center items-center bg-cover bg-center' src="/img/others/ICON-ROXO-GRADIENTE.png" alt="card header" />

                    </div>

                </Card>
            </div>
        </div>


    )
}

export { MyBusinessOne, MyBusinessTwo }