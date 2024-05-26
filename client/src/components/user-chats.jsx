import { Link } from 'react-router-dom'

import * as api from '../api/mod'
import { useEffect, useState } from 'react'
import UserCard from './user-card'

const LIMIT = 5

export default function UserChats() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        api.user
          .search(searchTerm, page, LIMIT)
          .then(setUsers)
          .catch(console.error),
      300
    )

    return () => clearTimeout(timeoutId)
  }, [searchTerm, page])

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
        <UserCard key={u.id} user={u} />
      ))}

      <hr />

      <div>
        {page !== 1 && (
          <button
            className="btn btn-sm btn-secondary me-3"
            onClick={() => setPage((p) => p - 1)}
          >
            prev
          </button>
        )}

        {users.length !== 0 && users.length == LIMIT && (
          <button
            className="btn btn-sm btn-secondary me-3"
            onClick={() => setPage((p) => p + 1)}
          >
            next
          </button>
        )}
      </div>
    </div>
  )
}
