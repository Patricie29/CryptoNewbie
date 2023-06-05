import Image from 'next/image'
import { FC } from 'react'
import btcImage from '../../../images/btcImg.jpeg'


const page: FC = ({ }) => {

    return <div className="container w-full md:max-w-4xl mx-auto pt-26 dark:text-[#cccbcb]">
        <div className="w-full mt-10 px-4 md:px-6 text-l leading-normal">
            {/* <!--Title--> */}
            <div>
                <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-zinc-100">What is Cryptocurrency? The  <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Digital Currency Revolution</span></h1>
                <p className="text-lg font-normal mt-3 mb-3 text-gray-500 lg:text-xl dark:text-gray-400"> In the ever-evolving landscape of digital finance, cryptocurrencies have emerged as a disruptive force, reshaping the way we perceive and transact value. We recognize the immense potential of this digital currency revolution, where technology and innovation are poised to change the world.</p>
                <Image src={btcImage} alt='photo' width={700} height={10} />

            </div>
            {/* TITLE END */}

            {/* LORE */}
            <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-green-500 first-letter:mr-1 first-letter:float-left"><span className="text-green-500">C <br />ryptocurrency </span>is such a cryptic concept, isn&apos;t it? Many people have difficulty understanding the technology that powers cryptocurrency, let alone how it works as an investment. Over the past decade, the worth of cryptocurrency has skyrocketed beyond many investor&apos;s expectations. We intend to shed light on this concept.<br /> <br />

                This beginner&apos;s guide will provide you with a solid foundation in understanding cryptocurrencies, blockchain technology, and the distinctions between various projects and blockchains. Armed with this knowledge, you&apos;ll be empowered to contemplate which specific cryptocurrency or blockchain aligns best with your interests and goals.<br /><br /></p><p className="text-lg font-normal mt-3 mb-3 text-gray-500 lg:text-xl dark:text-gray-400"> So, let&apos;s dive in and unlock the world of digital finance together!</p>
            {/* LORE END */}

            {/* SUB HEADER 1 */}
            <h5 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-zinc-100"><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"><br /> Brief Introduction: </span></h5>

            {/* P */}
            <p className="py-6">Cryptocurrency has emerged as a disruptive force in the world of finance and technology. It represents a new form of digital currency that operates independently of traditional banking systems. In this article, we will delve into the concept of cryptocurrency, its underlying technology, and its potential implications.<br /><br />
                Cryptocurrency is a digital or virtual form of currency that uses cryptography for secure financial transactions, control the creation of new units, and verify the transfer of assets. Unlike traditional fiat currencies, such as the US Dollar or Euro, cryptocurrencies are decentralized and not governed by any central authority or government.
            </p>

            {/* SUBH EADER 2 */}
            <h1 className="border-l-4 border-green-500 text-lg italic my-8 pl-8 md:pl-12">Key Characteristics that you should know about </h1>

            {/* P1 */}
            <p className="py-6"><li className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-zinc-100">Decentralization</li>Cryptocurrencies operate on decentralized networks called blockchains, which are distributed ledgers maintained by a network of participants. This means that no single entity has control over the currency or its transactions. Instead, transactions are verified and recorded by multiple participants, ensuring transparency and security. Decentralization eliminates the need for intermediaries, such as banks, and allows for direct peer-to-peer transactions.</p>

            {/* P2 */}
            <p className="py-6"><li className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-zinc-100">Cryptography</li>Cryptocurrencies rely on cryptographic techniques to secure transactions and control the creation of new units. Encryption ensures the privacy and integrity of the transactions, protecting them from unauthorized access or manipulation. Cryptography is used to secure the digital wallets that store cryptocurrencies and to verify the authenticity of transactions.</p>

            {/* P3 */}
            <p className="py-6"><li className="mb-2 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-2xl dark:text-zinc-100">Blockchain Technology</li> Cryptocurrencies are built on blockchain technology, which serves as a transparent and immutable record of all transactions. A blockchain is a digital ledger that consists of blocks of information linked together in a chain. Each block contains a list of transactions, and once a block is added to the chain, it cannot be altered. This provides a high level of security and transparency, as the entire transaction history is publicly available for anyone to view.</p>

            {/* SUB HEADER 3 */}
            <h5 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-zinc-100"><span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600"><br />Types of Cryptocurrencies</span></h5>

            {/* P4 */}
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">While Bitcoin reigns as the undisputed king of cryptocurrencies, the digital landscape is home to a vast array of other digital assets, each with its own distinctive characteristics and objectives. Let us show you a few exciting curated collection of remarkable cryptocurrencies that we firmly believe possess a solid foundation and a promising future in the ever-evolving crypto ecosystem.</p>

            {/* BTC */}
            <p className="py-6"><p className="mb-1 text-2xl font-extrabold leading-none tracking-tight text-[#f7931a] md:text-2xl lg:text-3xl dark:text-[#f7931a] border-l-4 border-transparent my-8 pl-8 md:pl-12"><span></span> Bitcoin <span className='text-sm italic'>( btc )</span></p>Sitting atop the cryptocurrency throne, Bitcoin has become synonymous with digital currency itself. Introduced in 2009 by the enigmatic Satoshi Nakamoto, Bitcoin operates on a decentralized network, providing a secure and transparent system for financial transactions. As the pioneer of cryptocurrencies, Bitcoin holds the largest market capitalization and continues to shape the evolving landscape of digital finance.</p>


            {/* ETH */}
            <p className="py-6"><p className="mb-1 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl  dark:text-[#8c64fc] border-l-4 border-transparent my-3 pl-8 md:pl-12">Ethereum <span className='text-sm italic'>( eth )</span></p>Emerging as a formidable contender to Bitcoin, Ethereum has carved its own path in the crypto realm. Beyond being a digital currency, Ethereum functions as a robust platform for creating and deploying smart contracts and decentralized applications (DApps). Its native cryptocurrency, Ether (ETH), fuels the Ethereum network, enabling developers to revolutionize various industries through innovative blockchain-based solutions.</p>

            {/* CARDANO */}
            <p className="py-6"><p className="mb-1 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-[#1F51FF] border-l-4 border-transparent my-3 pl-8 md:pl-12">Cardano <span className='text-sm italic'>( ada )</span></p> Cardano represents a blockchain platform that emphasizes scientific research and a rigorous approach to engineering. Designed to offer scalability, security, and sustainability, Cardano provides a foundation for the creation of DApps and the execution of smart contracts. Its native cryptocurrency, ADA, facilitates transactions within the Cardano ecosystem and empowers users to participate in the platform&apos;s governance system.</p>

            {/* AVAX */}
            <p className="py-6"><p className="mb-1 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl dark:text-[#E84142] border-l-4 border-transparent my-3 pl-8 md:pl-12">Avalanche <span className='text-sm italic'>( avax )</span></p> Avalanche has gained attention for its focus on high scalability and fast transaction finality. As a decentralized platform, Avalanche enables the launch of DApps and the creation of customizable blockchain networks. Its native cryptocurrency, AVAX, plays a vital role in securing the network, participating in staking, and facilitating transactions. With its efficient and high-performance infrastructure, Avalanche aims to drive widespread adoption of decentralized applications.</p>


            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400 mt-10 ">This selection of notable cryptocurrencies is just a glimpse into the vast and ever-expanding digital world. There are countless other fascinating cryptocurrencies, each with its own potential and exciting future. The crypto ecosystem is brimming with innovation, promising a multitude of opportunities for those willing to explore and embrace this new technology. <br /><br />So, buckle up and get ready to dive deeper into the realm of cryptocurrencies, where endless possibilities await!</p>



            {/* QUOTE */}
            <blockquote className="border-l-4 border-green-500 italic my-8 pl-8 md:pl-12">Cryptocurrencies have revolutionized the way we perceive and transact value. With their decentralized nature and blockchain technology, they offer a new paradigm of financial systems that are transparent, secure, and accessible to all.</blockquote>

            <p className="py-6">Example code block:</p>

        </div>

        {/* <!--Tags --> */}
        <div className="text-base md:text-sm text-gray-500 px-4 py-6">
            Tags: <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">Link</a> . <a href="#" className="text-base md:text-sm text-green-500 no-underline hover:underline">Link</a>
        </div>

    </div>

}

export default page
