import 'dotenv/config'

export default function envload(name) {
  const value = process.env[name] || ''
  if (value.trim() === '') {
    throw new Error(`${name} undefined`)
  }
  return value
}
