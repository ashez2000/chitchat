import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

import Header from '../components/header'
import { useEffect } from 'react'
import { socket } from '../socket'

export default function MainLayout(props) {
  const { user } = useUser()

  useEffect(() => {
    socket.connect()

    return () => {
      socket.disconnect()
    }
  }, [])

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <main className="container">
      <Header username={user.username} />
      <hr />
      {props.children}
    </main>
  )
}
