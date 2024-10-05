import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format, isToday, isYesterday } from 'date-fns'

import * as api from '../api/mod'
import { socket } from '../socket'

import MainLayout from '../layouts/main'
import useUser from '../hooks/user'

import MessageForm from '../components/message-form'
import UserCard from '@/components/user-card'

export default function ChatsPage() {
  const { userId } = useParams()
  const [messages, setMessages] = useState([])
  const [chatId, setChatId] = useState('')
  const [userData, setUserData] = useState()
  const { user } = useUser()

  useEffect(() => {
    api.chat
      .getMessages(userId)
      .then((data) => {
        setMessages(data.messages)
        setChatId(data.chatId)
        socket.emit('join_chat', { chatId: data.chatId })
      })
      .catch((err) => {
        alert('Error fetching messages')
      })
  }, [])

  useEffect(() => {
    api.user
      .findById(userId)
      .then(setUserData)
      .catch((err) => {
        alert('Error fetching user data')
      })
  }, [])

  useEffect(() => {
    socket.on('chat_message', (message) => {
      setMessages([...messages, message])
    })
  }, [messages])

  return (
    <MainLayout>
      <div className="max-w-md mx-auto">
        {/* Chat User Status */}
        {userData && (
          <div className="my-3 flex justify-center gap-4 items-center">
            <UserCard user={userData} />
            <Link to="/">&larr; back</Link>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col gap-3 my-3">
          {messages.length === 0 && <div className="text-center">Say, Hi</div>}
          {messages.map((m) => (
            // TODO: Refactor styles
            <div key={m._id}>
              <div className={user.id === m.user ? 'float-end' : 'float-start'}>
                <div className="flex flex-col border rounded-md px-2 py-1">
                  <p>{m.content}</p>
                  <div className="text-[12px] font-light text-zinc-600">
                    {formatDate(m.createdAt)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Form */}
        <hr className="my-3" />
        <MessageForm userId={userId} chatId={chatId} />
      </div>
    </MainLayout>
  )
}

function formatDate(date) {
  if (isToday(date)) return `today ${format(date, 'hh:mm a')}`
  if (isYesterday(date)) return `yesterday ${format(date, 'hh:mm a')}`
  return format(date, 'dd/MM/yyyy hh:mm a')
}
