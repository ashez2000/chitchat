import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { signinSchema, signupSchema } from '../schemas/auth'
import { signin, signup } from '../services/auth'
import useUser from '../hooks/user'

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

  const onSubmit = data => {
    if (isSignup) {
      signup(data).then(setUser).catch(console.error)
    } else {
      signin(data).then(setUser).catch(console.error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSignup && (
        <FormInput
          label="Name"
          type="text"
          register={register('name')}
          error={errors.name}
        />
      )}

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
