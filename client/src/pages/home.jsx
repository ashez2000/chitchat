import { Link } from 'react-router-dom'
import UserChats from '../components/user-chats'
import MainLayout from '../layouts/main'

export default function HomePage() {
  return (
    <MainLayout>
      <div className="mb-3">
        <Link className="btn btn-sm btn-outline-primary" to="search-users">
          Search Users
        </Link>
      </div>
      <hr />
      <UserChats />
    </MainLayout>
  )
}
