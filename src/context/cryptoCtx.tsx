import { CardData, ResponseData, ResponseDetailChartData, ResponseDetailsData, ResponseTrendingData, TrendingData } from "@/libraries/coinTypes";
import { notFound } from "next/navigation";
import { createContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";


export const CoinmarketContext = createContext<{
    coins: CardData[]
    setCoins: React.Dispatch<React.SetStateAction<CardData[]>>
    detailCoin: ResponseDetailsData
    isLoading: boolean
    setIsLoading: (isLoading: boolean) => void
    getCoins: (page: number) => any
    getCoinsDetails: (id: string) => any
    getChartData: (id: string) => any
    getTrendingData: () => any,
    chartData: ResponseDetailChartData[]
    trendingData: TrendingData[]
}>({
    // now we are declaring the default/fallback values - for example if we didnt provide any actual values into the context  what we are declaring below is what the context will fall back into
    coins: [],
    setCoins: () => { },
    detailCoin: {
        symbol: "",
        name: "",
        image: { large: "" },
        id: "",
        description: { en: "" },
        market_cap_rank: 0,
        market_data: {
            ath: { usd: 0 },
            current_price: { usd: 0 },
            market_cap: { usd: 0 },
            fully_diluted_valuation: { usd: 0 },
            total_volume: { usd: 0 },
            price_change_percentage_24h: 0,
            price_change_percentage_1y: 0,
            circulating_supply: 0,
            sparkline_7d: { price: [] },
        },
    },
    isLoading: false,
    setIsLoading: () => { },
    getCoins: async (page) => { },
    getCoinsDetails: async (id) => { },
    getChartData: async (id) => { },
    getTrendingData: async () => { },
    chartData: [],
    trendingData: []
})


export const CoinmarketProvider = ({ children }: { children: ReactNode }) => {
    // so here you now have to set the values and the logic you want hte function do - this is what we set up in the createContext() - here you are just saying the values and passing them to the provider as values

    const [coins, setCoins] = useState<CardData[]>([])
    const [detailCoin, setDetailCoin] = useState<ResponseDetailsData>({
        symbol: "",
        name: "",
        image: { large: "" },
        id: "",
        description: { en: "" },
        market_cap_rank: 0,
        market_data: {
            ath: { usd: 0 },
            current_price: { usd: 0 },
            market_cap: { usd: 0 },
            fully_diluted_valuation: { usd: 0 },
            total_volume: { usd: 0 },
            price_change_percentage_24h: 0,
            price_change_percentage_1y: 0,
            circulating_supply: 0,
            sparkline_7d: { price: [] },
        },
    })
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chartData, setChartData] = useState<ResponseDetailChartData[]>([])
    const [trendingData, setTrendingData] = useState<TrendingData[]>([])


    // getting all our coins to be rendered on tha main page in Card component
    const getCoins = async (page: number) => {
        try {
            setIsLoading(true)
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            })
            const resData: ResponseData[] = await res.json();

            // get only data we need
            const newData = resData.map((data: ResponseData) => {
                // here we destructure from the recieved data what we actually want to display
                const { symbol, id, name, image, current_price, market_cap, price_change_percentage_24h, market_cap_rank, sparkline_in_7d: { price }, price_change_percentage_7d_in_currency, price_change_percentage_1h_in_currency } = data;
                return {
                    symbol,
                    id,
                    name,
                    image,
                    chartData: price,
                    marketCap: market_cap,
                    currentPrice: current_price,
                    marketRank: market_cap_rank,
                    priceChange: price_change_percentage_24h,
                    priceChange7d: price_change_percentage_7d_in_currency,
                    priceChange1h: price_change_percentage_1h_in_currency
                }
            })

            setCoins((prevCoins) => [...prevCoins, ...newData])

            if (!res.ok) {
                throw new Error()
            }
            setIsLoading(false)

            return newData

        } catch (error) {
            toast.error('Something went wrong, please try again.')
        }
    }

    // getting details for each of our coins - we have to use different route to get information about each coin
    const getCoinsDetails = async (coinId: string) => {

        try {
            setIsLoading(true)
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            })
            const resData: ResponseDetailsData = await res.json();

            if (!res.ok) {
                throw new Error()
            }

            setDetailCoin(resData)
            setIsLoading(false)
            return resData

        } catch (e) {
            notFound()
        }
    }


    // getting coin chart details
    const getChartData = async (id: string) => {

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=90&interval=daily`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json'
                }
            })

            const resData = await response.json();
            console.log(resData, 'response')

            if (!response.ok) {
                throw new Error()
            }

            const data: ResponseDetailChartData[] = resData.prices.map((oneValue: any) => ({
                x: oneValue[0], y: oneValue[1].toFixed(2)
            }))


            setChartData(data)

            return data

        } catch (e) {
            toast.error('Something went wrong, please try again.')
        }
    }

    // getting top 5 trending coins
    const getTrendingData = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/search/trending', {
                headers: {
                    'accept': 'application/json'
                }
            }
            )

            if (!response.ok) {
                throw new Error();
            }
            const resData: ResponseTrendingData = await response.json();

            const data = resData.coins.map((coinData) => {
                const { item: { market_cap_rank, name, large, slug } } = coinData;
                return {
                    name,
                    market_cap_rank,
                    slug,
                    large
                };
            });
            const top5Coins = data.slice(0, 5); // Get the first 5 coins

            setTrendingData(top5Coins);
            return top5Coins;

        } catch (error) {
            toast.error('Something went wrong, please try again.')
        }
    }


    return <CoinmarketContext.Provider value={{
        getCoins, coins, isLoading, setIsLoading, setCoins, detailCoin, getCoinsDetails, getChartData, chartData, trendingData, getTrendingData
    }}>
        {children}
    </CoinmarketContext.Provider>
}