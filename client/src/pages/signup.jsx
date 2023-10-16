import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

import api from '../api'
import useUser from '../hooks/user'
import AuthLayout from '../layouts/auth'

export default function SignupPage() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { user, setUser } = useUser()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post('/auth/signup', {
        name,
        username,
        password,
      })
      setUser(res.data.user)
      navigate('/')
    } catch (err) {
      console.error(err)
    }
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <AuthLayout>
      <h1 className="fw-bold text-center mb-3">Signup</h1>

      <div className="col-3 mx-auto">
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
      </div>
    </AuthLayout>
  )
}
