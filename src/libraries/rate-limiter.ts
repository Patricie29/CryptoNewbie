import { Ratelimit } from "@upstash/ratelimit";
import { redis } from './redis'


export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(6, '5 s'),
    prefix: '@upstash/ratelimit'
})