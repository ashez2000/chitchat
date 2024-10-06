export const PORT = load('PORT')
export const NODE_ENV = load('NODE_ENV')
export const MONGO_URI = load('MONGO_URI')
export const REDIS_URL = load('REDIS_URL')
export const JWT_SECRET = load('JWT_SECRET')

function load(name) {
  const value = process.env[name]
  if (value == undefined) {
    throw new Error(`${name} undefined`)
  }
  return value
}
