import Skeleton from '@/components/ui/Skeleton'
import type { SkeletonProps } from '@/components/ui/Skeleton'

interface TextBlockSkeletonProps extends SkeletonProps {
    rowCount?: number
    lastChildWidth?: string | number
    height?: string | number
    titleWidth?: string | number
    title?: boolean
}

const TextBlockSkeleton = (props: TextBlockSkeletonProps) => {
    

    return (
        <div className="flex flex-col md:flex-row w-full gap-4">
            <Skeleton className='h-40 sm:h-60 md:h-72 md:w-2/3 w-full'  />
            
                <div className="flex flex-col gap-4 md:w-1/3 w-full justify-center">
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} />
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={8} className='mt-4' />
                    <Skeleton height={8} />
                    <Skeleton height={8} />
                    <Skeleton height={8} className='mt-4'/>
                </div>
            
        </div>
    )
}

export default TextBlockSkeleton
