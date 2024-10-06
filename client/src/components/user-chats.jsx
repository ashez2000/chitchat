import { useEffect, useState } from 'react'

import * as api from '../api/mod'
import UserCard from './user-card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import Loader from '@/pages/loader'

const LIMIT = 12

export default function UserChats() {
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(true)
      api.user.search(searchTerm, page, LIMIT).then(setUsers).catch(console.error)
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, page])

  return (
    <div className="my-3">
      <div>
        <Input
          className="mb-3"
          type="search"
          placeholder="search users ..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 gap-5 mb-3">
          {users.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </div>
      )}

      <hr className="mb-3" />

      <div className="flex justify-between">
        {page !== 1 && (
          <Button size="sm" variant="secondary" onClick={() => setPage((p) => p - 1)}>
            prev
          </Button>
        )}

        {users.length !== 0 && users.length == LIMIT && (
          <Button size="sm" variant="secondary" onClick={() => setPage((p) => p + 1)}>
            next
          </Button>
        )}
      </div>
    </div>
  )
}
