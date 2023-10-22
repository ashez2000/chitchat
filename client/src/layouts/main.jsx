import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'
import Header from '../components/header'

export default function MainLayout(props) {
  const { user } = useUser()

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <main className="container">
      <Header />
      {props.children}
    </main>
  )
}
