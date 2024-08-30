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
      setMessages([message, ...messages])
    })
  }, [messages])

  if (!user) {
    return <Navigate to="/signin" />
  }

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        <div className="flex flex-col my-3">
          {messages.length === 0 && <div className="text-center">Say, Hi</div>}
          {messages.map((m) => (
            <div key={m.id}>
              <p className={user.id === m.userId ? 'float-end' : ''}>
                <span className="border rounded-md px-2 py-1">{m.content}</span>
              </p>
            </div>
          ))}
        </div>

        <hr className='my-3' />

        <MessageForm userId={userId} chatId={chatId} />
      </div>
    </MainLayout>
  )
}
