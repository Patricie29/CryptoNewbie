
// import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const id = params.id

        //this is how we connect with coin gecko API and get back the response which we parse in Card.tsx
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365&interval=monthly`, {
            method: 'GET',
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

