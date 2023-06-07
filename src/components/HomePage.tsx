import { FC } from 'react'
import Trending from './Trending'
import CardList from './CardList/CardList'


interface HomeProps {

}

const HomePage: FC<HomeProps> = ({ }) => {
    return <>
        {/* <!--Main--> */}
        <div className="container pt-14 md:pt-20 sm:pl-8 mx-auto flex flex-wrap lg:flex-nowrap flex-col md:flex-row items-center justify-between text-slate-900 dark:text-zinc-300">
            {/* <!--Left side--> */}
            <div className="flex flex-col w-full xl:w-3/5 gap-2 sm:pl-10 md:pl-0 justify-center lg:items-start overflow-y-hidden">
                <h1 className="my-4 text-3xl md:text-4xl opacity-75 font-bold leading-tight text-center sm:text-left gap-6">
                    <span className="bg-clip-text text-4xl md:text-5xl text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-slate-800">
                        The World of Cryptocurrency
                    </span>
                    <br /> <span className='text-3xl md:text-4xl opacity-75 font-bold leading-tight text-center sm:text-left'>for Newbies</span>
                </h1>
                <p className="leading-normal my-10 text-base md:text-xl mb-8 text-center sm:text-left">
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
