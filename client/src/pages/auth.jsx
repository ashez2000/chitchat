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
      <h1 className="fw-bold text-center mb-3">
        {isSignup ? 'Signup' : 'Signin'}
      </h1>

      <div className="col-5 mx-auto">
        <AuthForm isSignup={isSignup} />
        <hr />
        <p className="text-center">
          {isSignup ? (
            <>
              Already have an account? <Link to="/signin">Signin</Link>
            </>
          ) : (
            <>
              Dont have an account? <Link to="/signup">Signup</Link>
            </>
          )}
        </p>
      </div>
    </AuthLayout>
  )
}
