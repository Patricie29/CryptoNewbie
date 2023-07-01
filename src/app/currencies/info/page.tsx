'use client'

import Detail from '@/components/CoinDetail/Detail'
import HistoryChart from '@/components/CoinDetail/HistoryChart'
import { CoinmarketContext } from '@/context/cryptoCtx'

import { useContext, useEffect, useState } from 'react'



const Page = ({ }) => {

    const { detailCoin, getCoinsDetails, getChartData } = useContext(CoinmarketContext)
    const [coinId, setCoinId] = useState<string>('')


    useEffect(() => {
        getURLData()
    }, [])


    // here we are getting ID from the url
    const getURLData = async () => {
        const queryString = window.location.search
        const urlParams = new URLSearchParams(queryString)

        const id = urlParams.get('id')

        if (id) {
            //  Fetch coin details using the ID
            getCoinsDetails(id);
            getChartData(id);
            setCoinId(id)
        }
    }

    return <>
        <section className='mt-10'>
            <Detail />
            <HistoryChart coinId={coinId} detailCoin={detailCoin} />
        </section>
    </>
}

export default Page