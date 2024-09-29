import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

const Home = lazy(() => import('./pages/home'))
const Auth = lazy(() => import('./pages/auth'))
const Chat = lazy(() => import('./pages/not-found'))
const NotFound = lazy(() => import('./pages/not-found'))

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
    <Suspense fallback={<Loader />}>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth isSignup={true} />} />
        <Route path="/signin" element={<Auth isSignup={false} />} />
        <Route path="/chats/:userId" element={<Chat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
