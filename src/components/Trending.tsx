'use client'
import { FC, useContext, useEffect } from 'react'
import Image from 'next/image'
import { CoinmarketContext } from '@/context/cryptoCtx'

interface TrendingProps {

}

const Trending: FC<TrendingProps> = ({ }) => {


    const { trendingData, getTrendingData } = useContext(CoinmarketContext)

    useEffect(() => {
        getTrendingData()
    }, [])



    return <>
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mb-10">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white mb-4 border-b-4 border-b-blue-600">Trending Cryptocurrency</h5>
            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

                    {trendingData.map((oneData, index) => (

                        <li className="py-2 sm:py-2" key={index}>
                            <div className="flex items-center justify-between space-x-4">
                                <div className='flex flex-row gap-3'>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        #{index + 1}
                                    </p>
                                    <Image className="w-6 h-6 rounded-full" width={10} height={10} src={oneData.large} alt={`${oneData.name} picture`} />
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                        {oneData.name}
                                    </p>
                                    <p className="text-xs flex justify-center items-center text-gray-500 truncate dark:text-gray-400">
                                        ({oneData.slug})
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                        Rank #{oneData.market_cap_rank}
                                    </p>
                                </div>
                            </div>
                        </li>

                    ))}

                </ul>
            </div>
        </div>
    </>
}

export default Trending
