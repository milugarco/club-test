import { useState } from 'react'
import SegmentItemOption from '@/components/shared/SegmentItemOption'
import Segment from '@/components/ui/Segment'

import { HiOutlineCode, HiOutlineCube, HiOutlinePencil } from 'react-icons/hi'
import ImgBusinessFormat from './ImgBusinessFormat'
import ProgressBarColors from './ProgressBarProfile'
import AvatarCards from './AvatarCards'
import { AdminsAvatarCardsViewBusinessFive, AdminsAvatarCardsViewBusinessFour, AdminsAvatarCardsViewBusinessOne, AdminsAvatarCardsViewBusinessThree, AdminsAvatarCardsViewBusinessTwo } from './AdminsAvatarCard'

const roles: {
    value: string
    label: string
    icon: JSX.Element
    admins: JSX.Element
    progressBar: JSX.Element
    disabled?: boolean
}[] = [
    { 
        value: 'Adidas', 
        label: 'Adidas', 
        icon: <ImgBusinessFormat image="https://static.vecteezy.com/system/resources/previews/010/994/276/non_2x/adidas-logo-symbol-clothes-design-icon-abstract-football-illustration-free-vector.jpg"/>,
        progressBar:<ProgressBarColors color='orange-500' percent={60}/>, 
        admins:<AvatarCards data={AdminsAvatarCardsViewBusinessOne()}/>
    },
    { value: 'Nike', label: 'Nike', icon: <ImgBusinessFormat image="https://thumbs.dreamstime.com/b/fundo-preto-vetor-do-logotipo-nike-da-marca-para-uso-impresso-de-vestu%C3%A1rio-desportivo-e-gin%C3%A1stica-183282388.jpg"/>,
    progressBar:<ProgressBarColors color='red-500' percent={30}/>, admins:<AvatarCards data={AdminsAvatarCardsViewBusinessTwo()}/> },
    { value: 'Coca Cola', label: 'Coca Cola', icon: <ImgBusinessFormat image="https://veja.abril.com.br/wp-content/uploads/2016/06/fabrica-coca-jundiai-original1.jpeg?quality=90&strip=info&w=620&h=349&crop=1"/>,
    progressBar:<ProgressBarColors color='orange-500' percent={52}/>, admins:<AvatarCards data={AdminsAvatarCardsViewBusinessThree()}/> },
    { value: 'Instagram', label: 'Instagram', icon: <ImgBusinessFormat image="https://www.meon.com.br/source/files/c/173471/Meta_Facebook-620525_1280-680-0-0.jpg"/>,
    progressBar:<ProgressBarColors color='green-500' percent={92}/>, admins:<AvatarCards data={AdminsAvatarCardsViewBusinessFour()}/> },
    { value: 'MC Donalds', label: 'MC Donalds', icon: <ImgBusinessFormat image="https://miramarshopping.com.br/wp-content/uploads/2022/08/MCDonalds-santos.jpg"/>,
    progressBar:<ProgressBarColors color='red-500' percent={12}/>, admins:<AvatarCards data={AdminsAvatarCardsViewBusinessFive()}/> },
]

const Example = () => {
    const [value, setValue] = useState<string[]>([roles[0].value])

    const handleChange = (val: string[]) => {
        console.log('val', val)
        setValue(val)
    }

    return (
        <Segment value={value} onChange={(val) => handleChange(val as string[])}>
            <div className='flex justify-center w-full items-center '>
                <div className='w-full flex flex-col justify-center items-center 2xl:w-2/3 h-full '>
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 lg:gap-y-10 gap-4 p-x-20 w-full">
                {roles.map((item) => (
                    <Segment.Item
                        key={item.value}
                        value={item.value}
                        disabled={item.disabled}
                    >
                        {({ active, onSegmentItemClick, disabled }) => {
                            return (
                                <SegmentItemOption
                                    hoverable
                                    active={active}
                                    disabled={disabled}
                                    className="bg-white dark:bg-gray-800 h-[300px] w-full flex flex-col justify-center"
                                    onSegmentItemClick={onSegmentItemClick}
                                >
                                    <div className="flex items-center justify-between flex-col w-full h-4/5 gap-4">
                                        <h4>{item.label}</h4>
                                        <span className="text-2xl">
                                            {item.icon}
                                        </span>
                                        <span className='w-full'> 
                                            {item.progressBar}
                                        </span>
                                        <span className='w-full'> 
                                            {item.admins}
                                        </span>


                                        
                                    </div>
                                </SegmentItemOption>
                            )
                        }}
                    </Segment.Item>
                ))}
            </div>
            </div>
        </div>
        
        </Segment>
        
    )
}

export default Example