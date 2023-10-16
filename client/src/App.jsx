import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home'
import SignupPage from './pages/signup'
import SigninPage from './pages/signin'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
    </Routes>
  )
}
