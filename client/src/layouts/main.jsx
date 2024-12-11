import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

import Header from '../components/header'
import { useEffect } from 'react'
import { socket } from '../socket'
import toast from 'react-hot-toast'

export default function MainLayout(props) {
  const { user } = useUser()

  useEffect(() => {
    socket.connect()
    socket.emit('join_notify', { userId: user.id })
    socket.on(`notify`, (username, message) => {
      toast(`${username}: ${message.content}`)
    })
  }, [])

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <main className="max-w-2xl mx-auto px-3">
      <Header username={user.username} />
      <hr />
      {props.children}
    </main>
  )
}
