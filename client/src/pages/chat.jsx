import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import api from '../api'
import { socket } from '../socket'

import MainLayout from '../layouts/main'
import useUser from '../hooks/user'

import MessageForm from '../components/message-form'

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

  useEffect(() => {
    socket.emit('join_chat', { chatId })
  }, [])

  socket.on('chat_message', (data) => {
    setMessages([data.message, ...messages])
  })

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <MainLayout>
      <div className="mb-3">
        <Link to="/" className="btn btn-sm btn-secondary">
          Back
        </Link>
      </div>
      <div className="d-flex flex-column-reverse border p-3 mb-3">
        {messages.map((m) => (
          <div key={m.id}>
            <p className={user.id === m.userId ? 'float-end' : ''}>
              <span className="border px-2 py-1">{m.content}</span>
            </p>
          </div>
        ))}
      </div>
      <MessageForm chatId={chatId} />
    </MainLayout>
  )
}
