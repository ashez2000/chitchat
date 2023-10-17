import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MainLayout from '../layouts/main'
import api from '../api'
import useUser from '../hooks/user'

export default function ChatsPage() {
  const { chatId } = useParams()
  const [messages, setMessages] = useState([])
  const { user } = useUser()

  useEffect(() => {
    api
      .get(`/chat/${chatId}`)
      .then((res) => {
        setMessages(res.data.messages)
      })
      .catch((err) => {
        alert('Error fetching messages')
      })
  }, [])

  return (
    <MainLayout>
      <h1>Chat</h1>
      <hr />
      <div className="d-flex flex-column-reverse">
        {messages.map((m) => (
          <div key={m.id}>
            <p className={user.id === m.userId ? 'float-end' : ''}>
              {m.content}
            </p>
          </div>
        ))}
      </div>
    </MainLayout>
  )
}
