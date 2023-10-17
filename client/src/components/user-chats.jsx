import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function UserChats() {
  const [chats, setChats] = useState([])

  useEffect(() => {
    api
      .get('/chat')
      .then((res) => {
        setChats(res.data.chats)
      })
      .catch((err) => {
        alert('Error fetching user chats')
      })
  }, [])

  return (
    <div>
      {chats.map((c) => (
        <div className="px-3 py-2 border border-primary" key={c.chatId}>
          <Link to={`/chat/${c.chatId}`}>
            {c.user.name} @{c.user.username}
          </Link>
        </div>
      ))}
    </div>
  )
}
