import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import useUser from '../hooks/user'

export default function MainLayout(props) {
  const [loading, setLoading] = useState(true)
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/auth/profile')
      .then((res) => {
        setUser(res.data.user)
        setLoading(false)
      })
      .catch((err) => {
        navigate('/signin')
      })
  }, [])

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return <main className="container">{props.children}</main>
}
