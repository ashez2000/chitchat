import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/user'
import { signout } from '../services/auth'

export default function Header({ username }) {
  const { setUser } = useUser()
  const navigate = useNavigate()

  const handleSignout = async () => {
    setUser(null)
    await signout()
  }

  return (
    <header className="my-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex gap-3">
          <span>Signed in as @{username}</span>
        </div>
        <button className="btn btn-sm btn-secondary" onClick={handleSignout}>
          Signout
        </button>
      </div>
      <div className="d-flex gap-3 align-items-center">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => navigate('/')}
        >
          Chats
        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => navigate('/search-users')}
        >
          Add Friends
        </button>
      </div>
    </header>
  )
}
