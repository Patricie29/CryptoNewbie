'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'
import { CardData } from '@/libraries/coinTypes'
import Price from './Price'
import Pair from './Pair'
import PriceChange from './PriceChange'
import MarketCap from './MarketCap'
import Chart from './Chart'
import PriceChange7d from './PriceChange7d'




const Card: FC<CardData> = ({ symbol, name, image, currentPrice, priceChange, marketRank, marketCap, chartData, priceChange7d, id }) => {


    const router = useRouter()

    const viewCoinDetails = (id: string) => {
        router.push(`/currencies/info?id=${id}&symbol=${symbol}&coin=${name}`)
    }


    return <tr onClick={() => viewCoinDetails(id)} className='cursor-pointer hover:bg-slate-800 transition-colors'>
        <td className="px-6 py-4 whitespace-nowrap">{marketRank}</td>
        <td className="px-6 py-4 whitespace-nowrap text-left"> <Pair name={name} image={image} symbol={symbol} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <PriceChange priceChange={priceChange} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <PriceChange7d priceChange7d={priceChange7d} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <MarketCap marketCap={marketCap} />
        </td>
        <td className="px-1 py-1 whitespace-nowrap">
            <Chart chartData={chartData} priceChange7d={priceChange7d} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
            <Price currentPrice={currentPrice} priceChange={priceChange} />
        </td>
    </tr >


}

export default Card
