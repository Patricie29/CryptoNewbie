import { cn } from '@/libraries/utilities'
import { FC } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PriceChange1hProps {
    priceChange1h: number;
}

const PriceChange1h: FC<PriceChange1hProps> = ({ priceChange1h }) => {

    return <div className={cn('flex', {
        'dark:text-red-500 text-red-700': priceChange1h < 0,
        'dark:text-green-400 text-green-700': priceChange1h > 0
    })}>

        {priceChange1h < 0 ? <TrendingDown className='h-4 w-4' /> : <TrendingUp className='h-4 w-4' />}

        <span className='pl-4'>
            {priceChange1h.toFixed(2)}%
        </span>
    </div>;
};

export default PriceChange1h;
