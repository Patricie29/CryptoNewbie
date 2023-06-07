
// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: Request, { params }: { params: { coinId: string } }) {
    try {
        const coinId = params.coinId
        console.log(coinId, ' IDDDDDD')

        //this is how we connect with coin gecko API and get back the response which we parse in Card.tsx
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&sparkline=true`, {
            method: 'GET',
            next: { revalidate: 60 },
            headers: {
                'accept': 'application/json'
            }
        })

        if (!response.ok) {
            throw new Error(`FAILED ${response.status}`)
        }

        return response

    } catch (error) {

        return new Response('Invalid request.', { status: 400 })

    }
}

