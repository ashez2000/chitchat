import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { socket } from '../socket'

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
    <div className="" key={user.id}>
      - <Link to={`/chats/${user.id}`}>{user.username}</Link>
      {isOnline !== 0 && <span className="ms-2 text-success">(online)</span>}
    </div>
  )
}

export default UserCard
