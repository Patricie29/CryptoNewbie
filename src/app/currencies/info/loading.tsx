import { FC } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const styles = {
    borderLeft: `ml-10 pl-5 w-full border-l border-gray-800`,
    title: `text-gray-400 whitespace-nowrap mr-2`,
}
interface loadingProps {

}

const loading: FC<loadingProps> = ({ }) => {
    return <>
        <main className='px-5 mt-10'>
            <div className='flex max-w-screen-2xl m-auto pt-10 justify-between sm:flex-wrap'>
                <div className='flex flex-col'>
                    <div className='flex items-center'>
                        <Skeleton className='dark:bg-slate-700 bg-slate-500' height={20} width={30} />
                        <div>
                            <div className='flex'>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={20} width={30} />
                            </div>
                        </div>
                    </div>
                </div>


                <div className='sm:pt-3 sm:pl-4'>
                    <div className='w-full flex items-start justify-between'>
                        <div>
                            <div className='flex items-start pb-1'>
                                <p className='text-zinc-400'>
                                    <Skeleton className='mb-4 dark:bg-slate-700 bg-slate-500' height={10} width={20} />
                                </p>
                            </div>
                            <div className='flex items-start'>
                                <Skeleton className='mb-4 dark:bg-slate-700 bg-slate-500' height={10} width={20} />
                                &nbsp;&nbsp;&nbsp;
                                <div className='flex items-center px-3 py-1.10 ml-3 rounded-xl'>
                                    <Skeleton className='mb-4 dark:bg-slate-700 bg-slate-500' height={10} width={20} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* market cap etc */}
                    <div className='flex justify-between p-4 mt-[4rem] border-b border-t border-gray-800'>
                        <div>
                            <div>
                                <small className={styles.title}>Market Cap</small>
                            </div>
                            <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                        </div>

                        <div className={styles.borderLeft}>
                            <div>
                                <div>
                                    <small className={styles.title}>Fully Diluted Market Cap</small>
                                </div>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />
                            </div>
                            <br />
                            <div>
                                <div>
                                    <small className={styles.title}>Price change 24h</small>
                                </div>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                            </div>
                        </div>

                        <div className={styles.borderLeft}>
                            <div>
                                <div>
                                    <small className={styles.title}>All time high</small>
                                </div>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                            </div>
                            <br />
                            <div>
                                <div>
                                    <small className={styles.title}>Price change 1y</small>
                                </div>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                            </div>
                        </div>

                        <div className={styles.borderLeft}>
                            <div>
                                <div>
                                    <small className={styles.title}>Circulating Supply</small>
                                </div>
                                <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                            </div>
                            <br />
                            <div>
                                <div>
                                    <div>
                                        <small className={styles.title}>Volume</small>
                                    </div>
                                    <Skeleton className='dark:bg-slate-700 bg-slate-500' height={10} width={20} />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main >

    </>
}
export default loading