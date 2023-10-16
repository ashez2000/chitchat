import { atom, useAtom } from 'jotai'

const userAtom = atom(null)

export default function useUser() {
  const [user, setUser] = useAtom(userAtom)
  return {
    user,
    setUser,
  }
}
