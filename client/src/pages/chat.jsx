import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'

import * as api from '../api/mod'
import { socket } from '../socket'

import MainLayout from '../layouts/main'
import useUser from '../hooks/user'

import MessageForm from '../components/message-form'

export default function ChatsPage() {
  const { userId } = useParams()
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState('')
  const { user } = useUser()

  useEffect(() => {
    api.chat
      .getMessages(userId)
      .then((data) => {
        console.log(data)
        setMessages(data.messages)
        setChatId(data.chatId)
        socket.emit('join_chat', { chatId: data.chatId })
      })
      .catch((err) => {
        alert('Error fetching messages')
      })
  }, [])

  useEffect(() => {
    socket.on('chat_message', (message) => {
      console.log(message)
      setMessages([message, ...messages])
    })

    return () => {
      socket.off('chat_message')
    }
  }, [messages])

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <MainLayout>
      <div className="d-flex flex-column-reverse border p-3 mb-3">
        {messages.map((m) => (
          <div key={m.id}>
            <p className={user.id === m.userId ? 'float-end' : ''}>
              <span className="border px-2 py-1">{m.content}</span>
            </p>
          </div>
        ))}
      </div>
      <MessageForm userId={userId} chatId={chatId} />
    </MainLayout>
  )
}
