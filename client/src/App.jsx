import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import HomePage from './pages/home'
import AuthPage from './pages/auth'
import ChatsPage from './pages/chat'
import NotFound from './pages/not-found'
import Loader from './pages/loader'

import useUser from './hooks/user'
import * as api from './api/mod'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const { setUser } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    api.auth
      .profile()
      .then((user) => setUser(user))
      .catch(() => navigate('/signin'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<AuthPage isSignup={true} />} />
        <Route path="/signin" element={<AuthPage isSignup={false} />} />
        <Route path="/chats/:userId" element={<ChatsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
