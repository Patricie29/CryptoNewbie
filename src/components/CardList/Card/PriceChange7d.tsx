import { cn } from '@/libraries/utilities'
import { FC } from 'react'
import { TrendingDown, TrendingUp } from 'lucide-react';

interface PriceChange7dProps {
    priceChange7d: number;
}

const PriceChange7d: FC<PriceChange7dProps> = ({ priceChange7d }) => {

    return <div className={cn('flex', {
        'text-red-500': priceChange7d < 0,
        'text-green-400': priceChange7d > 0
    })}>

        {priceChange7d < 0 ? <TrendingDown className='h-4 w-4' /> : <TrendingUp className='h-4 w-4' />}

        <span className='pl-4'>
            {priceChange7d.toFixed(2)}%
        </span>
    </div>;
};

export default PriceChange7d;
