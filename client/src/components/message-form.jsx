import { useState } from 'react'
import api from '../api'
import { socket } from '../socket'

export default function MessageForm({ chatId }) {
  const [content, setContent] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(`/chat/${chatId}/message`, { content })
      console.log(res.data)
      socket.emit('chat_message', chatId, res.data)
    } catch (err) {
      alert('Could not send message')
    } finally {
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input className="btn btn-primary" type="submit" value="send" />
      </div>
    </form>
  )
}
