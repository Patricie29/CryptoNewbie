import { cn, currencyFormat } from '@/libraries/utilities'
import { FC } from 'react'

interface PriceProps {
    currentPrice: number
}

const Price: FC<PriceProps> = ({ currentPrice }) => {

    return <div className='flex flex-col'>
        <div> {currencyFormat(currentPrice)}</div>
    </div>
}

export default Price