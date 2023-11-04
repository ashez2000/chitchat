import { useState } from 'react'

import { signin, signup } from '../services/auth'
import useUser from '../hooks/user'

export default function AuthForm({ isSignup }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setUser } = useUser()

  const handleSubmit = e => {
    e.preventDefault()
    const data = { name, username, password }

    if (isSignup) {
      signup(data).then(setUser).catch(console.error)
    } else {
      signin(data).then(setUser).catch(console.error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {isSignup && (
        <input
          className="form-control mb-3"
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      )}

      <input
        className="form-control mb-3"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button className="btn btn-primary">Submit</button>
    </form>
  )
}
