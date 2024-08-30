import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { socket } from '../socket'
import { Button } from './ui/button'

const UserCard = ({ user }) => {
  const [isOnline, setIsOnline] = useState(user.isOnline)

  useEffect(() => {
    socket.on('online', ({ userId }) => {
      if (user.id === userId) {
        setIsOnline(1)
      }
    })

    return () => {
      socket.off('online')
    }
  }, [])

  useEffect(() => {
    socket.on('offline', ({ userId }) => {
      if (user.id === userId) {
        setIsOnline(0)
      }
    })

    return () => {
      socket.off('offline')
    }
  }, [])

  return (
    <Button variant="outline" asChild>
      <Link to={`/chats/${user.id}`}>
        {user.username}
        {isOnline !== 0 && <span className="ms-2 text-green-500">(online)</span>}
      </Link>
    </Button>
  )
}

export default UserCard
