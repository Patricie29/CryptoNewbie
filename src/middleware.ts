// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { rateLimiter } from '@/libraries/rate-limiter'

// This function can be marked `async` if using `await` inside
export const middleware = async (req: NextRequest) => {

    const ip = req.ip ?? '127.0.0.1'  //this is our ip - local host


    try {
        const { success } = await rateLimiter.limit(ip)

        if (!success) {
            return new NextResponse('You are writing messages too fast.')
        }

        return NextResponse.next()

    } catch (error) {
        return new NextResponse(
            'Sorry, something went wrong processing your message. Please try again later.'
        )
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/api/message/:path*',
}