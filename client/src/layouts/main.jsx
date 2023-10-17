import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import api from '../api'
import useUser from '../hooks/user'
import Header from '../components/header'

export default function MainLayout(props) {
  const [loading, setLoading] = useState(true)
  const { user, setUser } = useUser()
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

  if (!user) {
    return <Navigate to="/signin" />
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  return (
    <main className="container">
      <Header />
      {props.children}
    </main>
  )
}
