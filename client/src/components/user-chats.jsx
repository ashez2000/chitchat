import { Link } from 'react-router-dom'
import useSwr from 'swr'

import api from '../api'

export default function UserChats() {
  const getChats = async () => (await api.get('/chat')).data.chats
  const { data, isLoading } = useSwr('/api/chats', getChats)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {data.map(c => (
        <div className="card" key={c.chatId}>
          <div className="card-body">
            <Link to={`/chat/${c.chatId}`}>
              {c.user.name} @{c.user.username}
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
