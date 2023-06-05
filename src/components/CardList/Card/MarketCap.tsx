import { currencyFormat } from '@/libraries/utilities'
import { FC } from 'react'

interface MarketCapProps {
    marketCap: number
}

const MarketCap: FC<MarketCapProps> = ({ marketCap }) => {
    return <span>
        {currencyFormat(marketCap)}
    </span>

}

export default MarketCap