import * as api from '../api/mod'
import useUser from '../hooks/user'
import { socket } from '../socket'
import { Button } from './ui/button'

export default function Header({ username }) {
  const { user, setUser } = useUser()

  const handleSignout = async () => {
    setUser(null)
    socket.emit('offline', { userId: user.id })
    await api.auth.signout()
  }

  return (
    <header className="p-3 flex justify-between items-center">
      <div className="">Hello, {username}</div>
      <Button onClick={handleSignout}>Signout</Button>
    </header>
  )
}
