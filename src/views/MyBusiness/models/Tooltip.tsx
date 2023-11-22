import Tooltip from '@/components/ui/Tooltip'

const TooltipData = () => {
    return (
        <div>
            <Tooltip
                title={
                    <div>
                        {' '}
                        <strong className="text-purple-800">Evento das férias</strong>
                    </div>
                }
            >
                <span className="cursor-pointer">Hover me</span>
            </Tooltip>
        </div>
    )
}

export default TooltipData
