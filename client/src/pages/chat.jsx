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
  const { user } = useUser()

  useEffect(() => {
    api.chat
      .getMessages(userId)
      .then((messages) => {
        setMessages(messages)
        console.log(messages)
      })
      .catch((err) => {
        alert('Error fetching messages')
      })
  }, [])

  //   useEffect(() => {
  // socket.emit('join_chat', { chatId })
  // }, [])

  // useEffect(() => {
  // socket.on('chat_message', (data) => {
  // setMessages([data.message, ...messages])
  // })

  // return () => {
  // socket.off('chat_message')
  // }
  // }, [messages])

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <MainLayout>
      <div className="d-flex flex-column-reverse border p-3 mb-3">
        {messages.map((m) => (
          <div key={m.id}>
            <p className={user.id === m.user_id ? 'float-end' : ''}>
              <span className="border px-2 py-1">{m.content}</span>
            </p>
          </div>
        ))}
      </div>
      <MessageForm userId={userId} />
    </MainLayout>
  )
}
