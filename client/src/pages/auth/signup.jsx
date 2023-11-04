import { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'

import { signup } from '../../services/auth'
import useUser from '../../hooks/user'
import AuthLayout from '../../layouts/auth'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { user, setUser } = useUser()

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = { name, username, password }
    signup(data).then(setUser).catch(console.error)
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <AuthLayout>
      <h1 className="fw-bold text-center mb-3">Signup</h1>

      <div className="col-5 mx-auto">
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
          Already have an account? <Link to="/signin">Signin</Link>
        </p>
      </div>
    </AuthLayout>
  )
}
