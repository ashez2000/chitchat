import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'

import { Button } from './ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'

import { socket } from '../socket'
import { signinSchema, signupSchema } from '../schemas/auth'
import useUser from '../hooks/user'
import * as api from '../api/mod'

export default function AuthForm({ isSignup }) {
  const form = useForm({
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>This is your public display name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
