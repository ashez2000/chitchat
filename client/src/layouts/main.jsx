import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

import Header from '../components/header'
import SideNav from '../components/sidenav'
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
      <Header />
      <hr />
      <div className="row gx-3">
        <div className="col-3">
          <SideNav />
        </div>
        <div className="col-9">{props.children}</div>
      </div>
    </main>
  )
}
