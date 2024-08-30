import { Navigate } from 'react-router-dom'
import useUser from '../hooks/user'

export default function AuthLayout(props) {
  const { user } = useUser()

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <main className="max-w-3xl min-h-[96vh] mx-auto px-3 border-x-[1px] border-zinc-300">
      {props.children}
    </main>
  )
}
