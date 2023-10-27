import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/home'
import SignupPage from './pages/signup'
import SigninPage from './pages/signin'
import ChatsPage from './pages/chat'
import UserSearchPage from './pages/user-search'

import useUser from './hooks/user'
import { useEffect } from 'react'
import api from './api'

export default function App() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    api
      .get('/auth/profile')
      .then((res) => {
        setUser(res.data.user)
      })
      .catch((err) => {
        navigate('/signin')
      })
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/chat/:chatId" element={<ChatsPage />} />
      <Route path="/search-users" element={<UserSearchPage />} />
    </Routes>
  )
}
