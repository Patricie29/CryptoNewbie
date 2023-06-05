import { cn, currencyFormat } from '@/libraries/utilities'
import { FC } from 'react'

interface PriceProps {
    currentPrice: number
    priceChange: number
}

const Price: FC<PriceProps> = ({ currentPrice, priceChange }) => {

    return <div className='flex flex-col'>
        <div> {currencyFormat(currentPrice)}</div>
    </div>
}

export default Price