import { FC } from 'react'
import Trending from './Trending'
import CardList from './CardList/CardList'


interface HomeProps {

}

const HomePage: FC<HomeProps> = ({ }) => {
    return <>
        {/* <!--Main--> */}
        <div className="container pt-24 md:pt-10 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between">
            {/* <!--Left Col--> */}
            <div className="flex flex-col w-full xl:w-3/5 gap-2 justify-center lg:items-start overflow-y-hidden">
                <h1 className="my-4 text-3xl md:text-4xl text-white opacity-75 font-bold leading-tight text-center md:text-left gap-6">
                    <span className="bg-clip-text text-4xl md:text-5xl text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                        The World of Cryptocurrency
                    </span>
                    <br /> <span className='text-3xl md:text-4xl text-white opacity-75 font-bold leading-tight text-center md:text-left'>for Newbies</span>
                </h1>
                <p className="leading-normal my-10 text-base md:text-2xl mb-8 text-center md:text-left">
                    Your online destination for beginner-friendly guides, hardware wallet expertise, and real-time crypto market prices.
                </p>

            </div>
            <Trending />
        </div>

        {/* Here we render our card list */}
        <CardList className='bg-zinc-500' />
    </>
}

export default HomePage
