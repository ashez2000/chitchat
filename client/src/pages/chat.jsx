import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'

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
      <MessageForm chatId={chatId} />
    </MainLayout>
  )
}
