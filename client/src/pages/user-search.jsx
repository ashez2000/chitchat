import { useState } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../layouts/main'
import CreateChatBtn from '../components/create-chat-btn'

import api from '../api'

export default function UserSearchPage() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])

  const handleSearch = () => {
    api
      .get('/users?search=' + search)
      .then((res) => {
        setResult(res.data.users)
      })
      .catch((err) => alert('something went wrong'))
  }

  return (
    <MainLayout>
      <Link to="/" className="btn btn-sm btn-secondary mb-3">
        Back
      </Link>
      <input
        className="form-control mb-3"
        type="text"
        placeholder="search users"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="btn btn-sm btn-secondary" onClick={handleSearch}>
        Search
      </button>
      <hr />
      <div className="d-flex flex-column gap-3">
        {result.map((r) => (
          <div key={r.id} className="card p-2 d-flex">
            <p>
              {r.name}@{r.username}
            </p>
            <CreateChatBtn userId={r.id} />
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
