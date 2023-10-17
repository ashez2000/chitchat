import useUser from '../hooks/user'
import api from '../api'

export default function Header() {
  const { user, setUser } = useUser()

  const signout = async () => {
    setUser(null)
    await api.put('/auth/signout')
  }

  return (
    <div>
      Signed in as {user?.name}@{user?.username}
      {user && (
        <button className="btn btn-sm btn-secondary" onClick={signout}>
          Signout
        </button>
      )}
    </div>
  )
}
