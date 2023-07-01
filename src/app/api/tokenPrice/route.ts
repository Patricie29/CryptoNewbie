import { NextApiRequest, NextApiResponse } from 'next';
// import Moralis from 'moralis';


// export async function GET(req: Request, { params }: { params: { addressOne: any, addressTwo: any } }) {
export async function GET(req: NextApiRequest) {

    try {

        // const { query } = req;

        // const responseOne = await Moralis.EvmApi.token.getTokenPrice({
        //     address: query.addressOne as string,
        // })

        // const responseTwo = await Moralis.EvmApi.token.getTokenPrice({
        //     address: query.addressTwo as string,
        // })

        // console.log('RESPONSE ONE', responseOne)
    } catch (error) {
        console.log(error, 'SOMETHING WENT WRONG HERE ')
    }
}
