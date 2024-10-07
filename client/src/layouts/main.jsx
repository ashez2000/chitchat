import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

import Header from '../components/header'
import { useEffect } from 'react'
import { socket } from '../socket'

export default function MainLayout(props) {
  const { user } = useUser()

  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      socket.emit('foobar')
    })

    return () => {
      // TODO: Is this required
      socket.off('connect')
      socket.disconnect()
    }
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
