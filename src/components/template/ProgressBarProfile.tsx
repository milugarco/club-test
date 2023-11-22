import Progress from '@/components/ui/Progress'
import React from 'react';

import { ProgressBar } from "@/configs/theme.config";


const ProgressBarColors: React.FC<ProgressBar> = ({ color, percent }) => {
   
return (
    <div>
        <Progress color={color} percent={percent} className="dark:text-gray-400 text-white-800 text-md" />
       
    </div>
);
};

export default ProgressBarColors