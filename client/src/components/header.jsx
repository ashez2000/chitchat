import { Link } from 'react-router-dom'
import useUser from '../hooks/user'
import { signout } from '../services/auth'

export default function Header() {
  const { user, setUser } = useUser()

  const handleSignout = async () => {
    setUser(null)
    await signout()
  }

  return (
    <header className="d-flex justify-content-between align-items-center my-3">
      <div className="d-flex gap-3">
        <Link to="/">SimpleChat</Link>
        <span>Signed in as {user && `@${user.username}`}</span>
      </div>
      {user && (
        <button className="btn btn-sm btn-secondary" onClick={handleSignout}>
          Signout
        </button>
      )}
    </header>
  )
}
