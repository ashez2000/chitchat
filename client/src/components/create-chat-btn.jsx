import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function CreateChatBtn({ userId }) {
  const navigate = useNavigate()

  const createChat = () => {
    api
      .post('/chat', { userId })
      .then((res) => navigate('/chat/' + res.data.chat.id))
      .catch((err) => alert('something went wrong'))
  }

  return (
    <button className="btn btn-sm btn-primary" onClick={createChat}>
      Say Hi
    </button>
  )
}
