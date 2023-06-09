import { CardData, ResponseData, ResponseDetailChartData, ResponseDetailsData, ResponseTrendingData, TrendingData } from "@/libraries/coinTypes";
import { notFound } from "next/navigation";
import { createContext, useState, ReactNode } from "react";


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
            const res = await fetch(`/api/crypto/${page}`);
            const resData: ResponseData[] = await res.json();

            // get only data we need
            const newData = resData.map((data: ResponseData) => {
                // here we deconstruct from the recieved data what we actual want to display
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
            return newData

        } catch (error) {
            throw new Error('Something went wrong')
        } finally {
            setIsLoading(false)
        }
    }

    // getting details for eahc of our coins - we had to use different route to get information about each coin
    const getCoinsDetails = async (coinId: string) => {

        try {
            setIsLoading(true)
            const res = await fetch(`/api/crypto/info/${coinId}`);
            const resData: ResponseDetailsData = await res.json();

            setDetailCoin(resData)
            setIsLoading(false)
            return resData

        } catch (e) {
            notFound()
        } finally {
            setIsLoading(false)
        }
    }


    // getting coin chart details
    const getChartData = async (id: string) => {

        try {
            const res = await fetch(`/api/crypto/info/chart/${id}`);
            const resData = await res.json();

            const data: ResponseDetailChartData[] = resData.prices.map((oneValue: any) => ({
                x: oneValue[0], y: oneValue[1].toFixed(2)
            }))

            setChartData(data)

            return data

        } catch (e) {
            throw new Error('Something went wrong')
        }
    }

    // getting top 5 trending coins
    const getTrendingData = async () => {
        try {
            const rawResponse = await fetch(`/api/crypto/trending`);
            const resData: ResponseTrendingData = await rawResponse.json();

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
            throw new Error('Something went wrong!')
        }
    }


    return <CoinmarketContext.Provider value={{
        getCoins, coins, isLoading, setIsLoading, setCoins, detailCoin, getCoinsDetails, getChartData, chartData, trendingData, getTrendingData
    }}>
        {children}
    </CoinmarketContext.Provider>
}