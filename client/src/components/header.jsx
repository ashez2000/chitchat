import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/user'
import * as api from '../api/mod'

export default function Header({ username }) {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const handleSignout = async () => {
    setUser(null)
    await api.auth.signout()
  }

  return (
    <header className="my-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-3">
          <span>Hello, {username}</span>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={handleSignout}>
          Signout
        </button>
      </div>
    </header>
  )
}
