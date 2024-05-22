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
      <div className="d-flex gap-3 justify-content-center align-items-center my-5">
        <img className="img-" src="/simplechat.png" alt="Simplechat Icon" />
        <h1 className="fw-bold">ChitChat</h1>
      </div>

      <div className="col-10 col-sm-6 mx-auto">
        <h3 className="mb-3">{isSignup ? 'Sign Up' : 'Sign In'}</h3>

        <AuthForm isSignup={isSignup} />

        <hr />

        <p className="text-center">
          {isSignup ? (
            <>
              <div>Already have an account?</div>
              <div>
                <Link to="/signin">Sign In</Link>
              </div>
            </>
          ) : (
            <>
              <div>Dont have an account?</div>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
            </>
          )}
        </p>
      </div>
    </AuthLayout>
  )
}
