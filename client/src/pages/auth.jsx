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
        <img
          className="img-thumbnail"
          src="/simplechat.png"
          alt="Simplechat Icon"
        />
        <h1>Simplechat</h1>
      </div>

      <div className="col-10 col-sm-6 mx-auto">
        <h4 className="mb-3">{isSignup ? 'Signup' : 'Signin'}</h4>

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
