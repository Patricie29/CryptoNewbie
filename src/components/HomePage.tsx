import { FC } from 'react'
import Trending from './Trending'
import CardList from './CardList/CardList'


interface HomeProps {

}

const HomePage: FC<HomeProps> = ({ }) => {
    return <>
        {/* <!--Main--> */}
        <div className="container pt-14 md:pt-20 mx-auto flex flex-wrap lg:flex-nowrap flex-col md:flex-row items-center justify-between text-slate-900 dark:text-zinc-300">
            {/* <!--Left side--> */}
            <div className="flex flex-col xl:w-3/5 justify-center lg:items-start overflow-y-hidden font-unbounded pl-5 neon-writing text-[#000450] dark:text-[#fff]">
                <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl sm:pl-3 opacity-80 text-left">
                    DISCOVER <br /> LEARN <br />SECURE
                </h1>
                <br /> <span className='text-3xl opacity-75 font-bold sm:text-left'>for Newbies <span className='text-base pl-10'>Discover - Learn - Secure</span></span>

                <p className="leading-normal mt-5 md:text-xl mb-8 text-left">
                    <span>Explore beginner-friendly guides,<br /> expert hardware wallet advice, and real-time market prices.</span>
                </p>
            </div>
            <Trending />
        </div>

        {/* Here we render our card list */}
        <CardList className='bg-zinc-500' />
    </>
}

export default HomePage
