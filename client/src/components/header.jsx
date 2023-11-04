import useUser from '../hooks/user'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Header() {
  const { user, setUser } = useUser()

  const signout = async () => {
    setUser(null)
    await api.put('/auth/signout')
  }

  return (
    <header className="d-flex justify-content-between align-items-center my-3">
      <div className="d-flex gap-3">
        <Link to="/">SimpleChat</Link>
        <span>Signed in as {user && `@${user.username}`}</span>
      </div>
      {user && (
        <button className="btn btn-sm btn-secondary" onClick={signout}>
          Signout
        </button>
      )}
    </header>
  )
}
