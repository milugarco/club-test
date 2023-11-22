import Steps from '@/components/ui/Steps'
import {
    HiOutlineCamera,
    HiOutlineShieldCheck,
    HiOutlineUser
} from 'react-icons/hi'

export const StepsComponent = ({ currentStep }: { currentStep: number }) => {
    const render = () => {
        return (
            <div className="mb-4">
                <Steps current={currentStep}>
                    <Steps.Item customIcon={<HiOutlineUser />} />
                    <Steps.Item customIcon={<HiOutlineShieldCheck />} />
                    <Steps.Item customIcon={<HiOutlineCamera />} />
                    {/* <Steps.Item customIcon={<HiOutlineLogin />} /> */}
                </Steps>
            </div>
        )
    }

    return render()
}
