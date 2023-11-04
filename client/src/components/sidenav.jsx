import React from 'react'
import { Link } from 'react-router-dom'

export default function SideNav() {
  return (
    <div className="d-grid">
      <Link className="btn btn-sm btn-outline-primary" to="search-users">
        Search Users
      </Link>
    </div>
  )
}
