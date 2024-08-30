import { Navigate, Link } from 'react-router-dom'

import AuthLayout from '../layouts/auth'
import AuthForm from '../components/auth-form'
import useUser from '../hooks/user'

export default function AuthPage({ isSignup }) {
  const { user } = useUser()
  if (user) {
    return <Navigate to="/" />
  }

  return (
    <AuthLayout>
      <div className="max-w-sm mx-auto space-y-5">
        <div className="flex flex-col items-center my-5">
          <div className="flex flex-col items-center gap-3">
            <img className="h-14 w-14" src="/simplechat.png" alt="chitchat icon" />
            <h1 className="text-5xl font-bold mb-2">ChitChat</h1>
          </div>
          <p className="text-xl">"Connect. Chat. Simplify."</p>
        </div>

        <div className="">
          <h3 className="text-2xl">{isSignup ? 'SignUp' : 'SignIn'}</h3>
          <div className="text-lg">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <span className="text-blue-500">
                  <Link to="/signin">SignIn</Link>
                </span>
              </>
            ) : (
              <>
                Dont have an account?{' '}
                <span className="text-blue-500">
                  <Link to="/signup">SignUp</Link>
                </span>
              </>
            )}
          </div>
        </div>

        <AuthForm isSignup={isSignup} />
      </div>
    </AuthLayout>
  )
}
