import { Redis } from 'ioredis'
import { REDIS_URL } from './config.js'

const redis = new Redis(REDIS_URL).on('error', (e) => console.log('redis:', e))

export default redis
