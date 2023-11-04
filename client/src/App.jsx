import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import HomePage from './pages/home'
import AuthPage from './pages/auth'
import ChatsPage from './pages/chat'
import UserSearchPage from './pages/user-search'

import useUser from './hooks/user'
import { getProfile } from './services/auth'

export default function App() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
      .then(user => setUser(user))
      .catch(() => navigate('/signin'))
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<AuthPage isSignup={true} />} />
      <Route path="/signin" element={<AuthPage isSignup={false} />} />
      <Route path="/chat/:chatId" element={<ChatsPage />} />
      <Route path="/search-users" element={<UserSearchPage />} />
    </Routes>
  )
}
