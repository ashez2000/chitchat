import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { socket } from '../socket'

import { signinSchema, signupSchema } from '../schemas/auth'
import useUser from '../hooks/user'
import * as api from '../api/mod'

const FormInput = ({ register, error, label, ...props }) => {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <input className="form-control mb-2" {...register} {...props} />
      {error && <div className="text-danger">{error.message}</div>}
    </div>
  )
}

export default function AuthForm({ isSignup }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isSignup ? signupSchema : signinSchema),
  })

  const { setUser } = useUser()

  const errToast = (err) => toast.error(err.response.data.message)

  const onSubmit = (data) => {
    if (isSignup) {
      api.auth
        .signup(data)
        .then((user) => {
          socket.emit('online', { userId: user.id })
          setUser(user)
        })
        .catch(errToast)
    } else {
      api.auth
        .signin(data)
        .then((user) => {
          socket.emit('online', { userId: user.id })
          setUser(user)
        })
        .catch(errToast)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        label="Username"
        type="text"
        register={register('username')}
        error={errors.username}
      />

      <FormInput
        label="Password"
        type="password"
        register={register('password')}
        error={errors.password}
      />

      <button className="btn btn-primary">Submit</button>
    </form>
  )
}
