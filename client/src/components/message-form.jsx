import { useState } from 'react'
import toast from 'react-hot-toast'
import { SendHorizonal } from 'lucide-react'

import { socket } from '../socket'
import * as api from '../api/mod'

import { Input } from './ui/input'
import { Button } from './ui/button'
import Spinner from './spinner'

export default function MessageForm({ userId, chatId }) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()

    try {
      const message = await api.chat.createMessage(content, userId)
      socket.emit('chat_message', chatId, message)
      socket.emit('notify', userId, message)
    } catch (err) {
      toast.error('Could not send message')
    } finally {
      setContent('')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3 mb-3">
        <Input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <Button disabled={loading || content == ''} type="submit">
          Send {loading ? <Spinner /> : <SendHorizonal className="w-4 ms-2" />}
        </Button>
      </div>
    </form>
  )
}
