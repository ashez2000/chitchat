export function envLoader(name) {
  const value = import.meta.env[name]
  if (!value) throw new Error(`(env) ${name} undefined`)
  return value
}
