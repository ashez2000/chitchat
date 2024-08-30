import { useState } from 'react'
import { socket } from '../socket'
import * as api from '../api/mod'
import { Input } from './ui/input'
import { Button } from './ui/button'

export default function MessageForm({ userId, chatId }) {
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const message = await api.chat.createMessage(content, userId)
      console.log(message)
      socket.emit('chat_message', chatId, message)
    } catch (err) {
      console.log(err)
      alert('Could not send message')
    } finally {
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-3">
        <Input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">Send</Button>
      </div>
    </form>
  )
}
