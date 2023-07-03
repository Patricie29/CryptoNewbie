'use client'

import { FC } from 'react'
import React, { useState, useEffect } from "react";
import { Input, Popover, Radio, Modal, message, RadioChangeEvent } from "antd";
import tokenList from '../../helpers/tokens/token-list.json'
import axios from "axios";
import { useSendTransaction, useWaitForTransaction, useAccount, usePrepareSendTransaction } from "wagmi";
import Image from 'next/image';
import { ArrowDown, ChevronDown, Settings } from 'lucide-react';
import Moralis from 'moralis';


interface SwapProps {

}

const Swap: FC<SwapProps> = ({ }) => {

    const [slippage, setSlippage] = useState<number>(2.5)
    // useMessage hook from antd to display our pending transaction message
    const [messageApi, contextHolder] = message.useMessage();
    // what should this be instead of any ??????????/
    const [tokenOneAmount, setTokenOneAmount] = useState<any>(null);
    const [tokenTwoAmount, setTokenTwoAmount] = useState<any>(null);
    // our token options (changing the values in the useState change the default values for the swap options)
    const [tokenOne, setTokenOne] = useState(tokenList[0]);
    const [tokenTwo, setTokenTwo] = useState(tokenList[1]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [changeToken, setChangeToken] = useState<number>(1);
    //for API calling
    const [prices, setPrices] = useState<any>(null)
    //transaction details
    const [txDetails, setTxDetails] = useState({
        to: null,
        data: null,
        value: 1,
    })


    // this is coming from wagmi
    // getting address from the connected user
    const { address, isConnected } = useAccount();
    const { data, sendTransaction } = useSendTransaction({
        account: address,
        to: String(txDetails.to),
        data: txDetails.data as unknown as `0x${string}`,
        value: BigInt(`0x${txDetails.value}`),
    });

    // with this we can display to the user the transaction is in the process
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
    })

    // what slippage the user selected
    const handleSlippageChange = (event: RadioChangeEvent) => {
        setSlippage(event.target.value)
    }

    // value that the user puts into our swap input, so the number he actually wants to swap
    const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTokenOneAmount(event.target.value)

        if (event.target.value && prices) {
            const tokenOneAmount = parseFloat(event.target.value); // Convert to a numeric type
            setTokenTwoAmount((tokenOneAmount * prices.ratio).toFixed(2))
        } else {
            setTokenTwoAmount(null);
        }
    }

    // switching tokens
    const switchTokens = () => {
        // to be able to get new prices of tokens when you switch them, you need to set them to null first and trigger our fetchPrices function again
        setPrices(null)
        setTokenOneAmount(null)
        setTokenTwoAmount(null)

        const one = tokenOne
        const two = tokenTwo
        setTokenOne(two)
        setTokenTwo(one)

        // now you have to trigger the fetch function again with the new swappped addresses
        fetchPrices(two.address, one.address)
    }

    //opening modal for token selection
    const openModal = (asset: number) => {
        setChangeToken(asset)
        setIsOpen(true)
    }

    // changing token in the modal
    const modifyToken = (index: number) => {
        // we have to do the same as when we switch tokens and then send a new request to fetchPrices with the modifies addresses
        setPrices(null)
        setTokenOneAmount(null)
        setTokenTwoAmount(null)

        if (changeToken === 1) {
            setTokenOne(tokenList[index])
            fetchPrices(tokenList[index].address, tokenTwo.address)
        } else {
            setTokenTwo(tokenList[index])
            fetchPrices(tokenTwo.address, tokenList[index].address)
        }
        setIsOpen(false)
    }


    // //fetching current prices of tokens from our API
    const fetchPrices = async (one: string, two: string) => {
        try {

            const responseOne = await Moralis.EvmApi.token.getTokenPrice({
                address: one,
            })
            const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
                address: two,
            })

            const usdPrices = {
                tokenOne: responseOne.raw.usdPrice,
                tokenTwo: responseTwo.raw.usdPrice,
                ratio: responseOne.raw.usdPrice / responseTwo.raw.usdPrice,
            }

            // const res = await axios.get(`/api/tokenPrice`, {
            //     params: { addressOne: one, addressTwo: two }
            // })

            // console.log(res, 'RESSS')

            setPrices(usdPrices)

        } catch (error) {
            console.log(error, 'FAILED')
        }
    }

    // function for swap and getting the transaction details
    const fetchDexSwap = async () => {

        const allowance = await axios.get(`https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`)

        // we have to allow the token to be swapped first if it hasnt been allowed before
        if (allowance.data.allowance === '0') {
            const approve = await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}`)
            setTxDetails(approve.data)
            console.log('not approved', approve.data)
            return
        }

        // with this api we make the actual swap
        const tx = await axios.get(
            `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${tokenOne.address}&toTokenAddress=${tokenTwo.address}&amount=${tokenOneAmount.padEnd(tokenOne.decimals + tokenOneAmount.length, '0')}&fromAddress=${address}&slippage=${slippage}`
        )

        // with this we show the user exactly how many tokens it will be swapped for, because Moralis and 1inch can have a bit different price of tokens
        let decimals = Number(`1E${tokenTwo.decimals}`)
        setTokenTwoAmount((Number(tx.data.toTokenAmount) / decimals).toFixed(2));

        setTxDetails(tx.data.tx);

    }


    useEffect(() => {
        fetchPrices(tokenList[0].address, tokenList[1].address)
    }, [])


    useEffect(() => {
        if (txDetails && isConnected) {
            sendTransaction()
        }
    }, [txDetails])


    // useEffect for displaying pending transaction message
    useEffect(() => {

        messageApi.destroy();

        if (isLoading) {
            messageApi.open({
                type: 'loading',
                content: 'Transaction is Pending...',
                duration: 0,  // with this this message will run indefinitely until we destroy it, which we are doing in another useEffect which triggers onSuccess
            })
        }
    }, [isLoading])

    // with this useEffect we change the is Pending message
    useEffect(() => {
        messageApi.destroy();
        if (isSuccess) {
            messageApi.open({
                type: 'success',
                content: 'Transaction Successful',
                duration: 1.5,
            })
        } else if (txDetails.to) {
            messageApi.open({
                type: 'error',
                content: 'Transaction Failed',
                duration: 1.50,
            })
        }

    }, [isSuccess])


    // our slippage options
    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    );



    return <div className='min-h-[100vh]'>
        <div className='mt-40 flex justify-center'>
            {contextHolder}
            {/* Modal for token selection */}
            <Modal
                open={isOpen}
                footer={null}
                onCancel={() => setIsOpen(false)}
                title="Select a token"
            >
                <div className='border-t border-[#363e54] mt-5 flex flex-col gap-2'>
                    {tokenList?.map((oneToken, index) => {
                        return (
                            <div
                                className="flex justify-start items-center pl-5 pt-2 pb-2 hover:cursor-pointer hover:bg-[#1f2639] overflow-auto"
                                key={index}
                                onClick={() => modifyToken(index)}
                            >
                                <Image src={oneToken.img} alt={oneToken.ticker} height={40} width={40} className="h-[40px] w-[40px]" />
                                <div>
                                    <div className="ml-2 text-sm font-medium">{oneToken.name}</div>
                                    <div className="ml-2 text-xs font-light text-[#51596f]">{oneToken.ticker}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Modal>

            <div className='w-[500px] min-h-[300px] bg-slate-900 border-2 border-slate-700 rounded-xl flex flex-col justify-start items-start px-8'>
                <div className='flex justify-between items-center w-[98%] py-4 text-zinc-300'>
                    <h4>Swap</h4>
                    <Popover
                        content={settings}
                        title='Settings'
                        trigger='click'
                        placement='bottomRight'
                    >
                        <Settings className='text-[#51586f] transition duration-300 hover:text-white hover:rotate-90 cursor-pointer' />
                    </Popover>
                </div>

                {/* INPUTS */}
                <div className='relative'>
                    <Input
                        placeholder="0"
                        value={tokenOneAmount}
                        onChange={changeAmount}
                        disabled={!prices}
                    />
                    <Input
                        placeholder="0"
                        value={tokenTwoAmount}
                        disabled={true} />

                    <div className="bg-[#3a4157] w-6 h-6 flex items-center justify-center rounded-md absolute top-[86px] left-[147px] sm:left-[200px] text-[#5f6783] border-[3px] border-slate-900 text-sm transition duration-300 hover:cursor-pointer hover:text-white" onClick={switchTokens}>
                        <ArrowDown />
                    </div>

                    <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-9 right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                        onClick={() => openModal(1)}>
                        <Image src={tokenOne.img} alt="assetOneLogo" height={14} width={23} className="h-[22px] ml-1" />
                        {tokenOne.ticker}
                        <ChevronDown />
                    </div>

                    <div className="absolute min-w-[20px] h-[30px] bg-[#3a4157] top-[131px] right-2 rounded-full flex justify-start items-center gap-1 font-bold text-[17px] pr-2 hover:cursor-pointer text-zinc-300"
                        onClick={() => openModal(2)}>
                        <Image src={tokenTwo.img} alt="assetOneLogo" height={14} width={23} className="h-[22px] ml-1" />
                        {tokenTwo.ticker}
                        <ChevronDown />
                    </div>

                </div>
                {/* SWAP BUTTON */}
                <button className="flex justify-center items-center bg-[#243056] w-full h-14 text-[20px] font-bold rounded-lg text-[#5981F3] transition duration-300 mb-7 mt-2 disabled:bg-[#243056] disabled:opacity-40 disabled:text-[#5982f39b] disabled:hover:cursor-not-allowed disabled:hover:bg-[#243056] hover:cursor-pointer hover:bg-[#3b4874]" disabled={!tokenOneAmount || !isConnected}
                    onClick={fetchDexSwap}>
                    Swap
                </button>

            </div>
        </div>
    </div>

}

export default Swap