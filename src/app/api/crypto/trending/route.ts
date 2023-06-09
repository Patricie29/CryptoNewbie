export async function GET(request: Request) {
    try {
        //this is how we connect with coin gecko API and get back the response which we parse in Card.tsx
        const response = await fetch(`https://api.coingecko.com/api/v3/search/trending`,
            {
                method: "GET",
                headers: {
                    'accept': "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`FAILED ${response.status}`);
        }

        return response;
    } catch (error) {

        return new Response("Invalid request.", { status: 400 });
    }
}
