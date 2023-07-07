'use client'

import { CoinmarketContext } from '@/context/cryptoCtx'
import { Loader2 } from 'lucide-react'
import { FC, useContext, useState } from 'react'

interface ErrorProps {
    setError: React.Dispatch<React.SetStateAction<boolean>>

}

const Error: FC<ErrorProps> = ({ setError }) => {
    const { getCoins } = useContext(CoinmarketContext)
    const [btnIsLoading, setBtnIsLoading] = useState<boolean>(false)

    const reset = async () => {
        try {
            setBtnIsLoading(true)
            await getCoins(1)
            setError(false)
        } catch (e) {
            setError(true)
            setBtnIsLoading(false)
        }

    }

    return <>
        <div className="max-w-sm p-6 my-5 border rounded-lg shadow bg-gray-800 border-gray-700 ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Sorry for the inconvenience, there has been an error!</h5>
            <p className="mb-3 font-normal text-gray-400">Please give it another try!</p>
            <button onClick={reset} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none ">
                {btnIsLoading ? <Loader2 className='h-4 w-4 animate-spin mx-3' /> : 'Retry'}
            </button>

        </div>
    </>
}

export default Error