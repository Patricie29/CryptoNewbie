
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(request: Request, { params }: { params: { page: number } }) {
    try {
        const page = params.page

        //this is how we connect with coin gecko API and get back the response which we parse in Card.tsx
        const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&locale=en`, {
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
        // POTREBUJEME PRIDAT ERROR NOTIFICATION NEBO ERROR PAGE
        return new Response('Invalid request.', { status: 400 })

    }
}

