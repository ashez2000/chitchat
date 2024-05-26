import { Link } from 'react-router-dom'

import * as api from '../api/mod'
import { useEffect, useState } from 'react'

export default function UserChats() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(
      () => api.user.search(searchTerm).then(setUsers).catch(console.error),
      300
    )

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return (
    <div className="d-flex flex-column gap-3">
      <div>
        <input
          className="form-control"
          type="search"
          placeholder="search users ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {users.map((u) => (
        <div className="" key={u.id}>
          - <Link to={`/chats/${u.id}`}>{u.username}</Link>
        </div>
      ))}
    </div>
  )
}
