import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import HomePage from './pages/home'
import SignupPage from './pages/auth/signup'
import SigninPage from './pages/auth/signin'
import ChatsPage from './pages/chat'
import UserSearchPage from './pages/user-search'

import useUser from './hooks/user'
import { getProfile } from './services/auth'

export default function App() {
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    getProfile()
      .then((user) => setUser(user))
      .catch(() => navigate('/signin'))
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
