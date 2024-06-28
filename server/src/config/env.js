import 'dotenv'

// loads environment variable
// throws on undefined
const load = (name) => {
  let value = process.env[name]
  if (value == undefined) {
    throw new Error(`env: ${name} undefined`)
  }
  return value
}

export const PORT = load('PORT')
export const NODE_ENV = load('NODE_ENV')
export const DATABASE_URL = load('DATABASE_URL')
export const JWT_SECRET = load('JWT_SECRET')
