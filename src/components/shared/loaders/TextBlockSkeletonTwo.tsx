import { Card } from '@/components/ui'
import Skeleton from '@/components/ui/Skeleton'
import type { SkeletonProps } from '@/components/ui/Skeleton'

interface TextBlockSkeletonProps extends SkeletonProps {
    rowCount?: number
    lastChildWidth?: string | number
    height?: string | number
    titleWidth?: string | number
    title?: boolean
}

const TextBlockSkeletonTwo = (props: TextBlockSkeletonProps) => {


    return (
        <div className="flex flex-col md:flex-row w-full gap-4">
            
                <Card className="border-none col-span-1 h-[100%] flex justify-center items-center">
                    <div className="h-full flex flex-col items-center justify-center gap-4 px-4">
                        <div className='w-72 h-[500px] rounded-xl border-outline border-2 border-gray-600 flex flex-col justify-start items-center'>
                            <Skeleton height={10} className='mb-12 w-1/2 mt-4' />
                            <Skeleton height={30} className='w-2/3' />
                            <Skeleton className='w-40 h-40 mt-4 mb-4' />
                            <Skeleton height={10} className='w-2/3 mb-8' />
                        </div>
                    </div>
                </Card>
                <Card className="border-none col-span-2 mt-4 lg:mt-0 lg:ml-4 w-full">
                <div className="flex flex-col w-full gap-4">
            <Skeleton className='h-40 sm:h-60 md:h-72 w-full'  />
            
                <div className="flex flex-col gap-4 w-full justify-center items-center mt-4">
                    <Skeleton height={10} width="20%"/>
                    <Skeleton height={20} width="60%"/>
                    <Skeleton height={8} className='mt-4' />
                    <Skeleton height={8} />
                    <Skeleton height={8} className='mt-4'/>
                </div>
            
        </div>
                </Card>
            
        </div>
    )
}

export default TextBlockSkeletonTwo
