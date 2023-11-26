import { signout } from '../services/auth'

export default function Header({ username }) {
  const handleSignout = async () => {
    await signout()
  }

  return (
    <header className="d-flex justify-content-between align-items-center my-3">
      <div className="d-flex gap-3">
        <span>Signed in as @{username}</span>
      </div>
      <button className="btn btn-sm btn-secondary" onClick={handleSignout}>
        Signout
      </button>
    </header>
  )
}
