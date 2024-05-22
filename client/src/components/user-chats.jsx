import { Link } from 'react-router-dom'
import useSwr from 'swr'

import * as api from '../api/mod'
import { useEffect, useState } from 'react'

export default function UserChats() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.user.search().then(setUsers).catch(console.error)
  }, [])

  return (
    <div className="d-flex flex-column gap-3">
      {users.map((u) => (
        <div className="">
          - <Link to={`/chats/${u.id}`}>{u.username}</Link>
        </div>
      ))}
    </div>
  )
}
