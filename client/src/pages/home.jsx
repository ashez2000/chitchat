import UserChats from '../components/user-chats'
import MainLayout from '../layouts/main'

export default function HomePage() {
  return (
    <MainLayout>
      Homepage
      <hr />
      User Chats
      <UserChats />
    </MainLayout>
  )
}
