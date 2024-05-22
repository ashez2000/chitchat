import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

export default function AuthLayout(props) {
  const { user } = useUser()

  if (user) {
    return <Navigate to="/" />
  }

  return <main className="container h-full">{props.children}</main>
}
