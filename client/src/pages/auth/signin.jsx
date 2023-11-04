import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

import { signin } from '../../services/auth'
import useUser from '../../hooks/user'
import AuthLayout from '../../layouts/auth'

export default function SigninPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { username, password }
    signin(data).then(setUser).catch(console.error)
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <AuthLayout>
      <h1 className="fw-bold text-center mb-3">Signin</h1>

      <div className="col-5 mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary">Submit</button>
        </form>
        <hr />
        <p className="text-center">
          Dont have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
