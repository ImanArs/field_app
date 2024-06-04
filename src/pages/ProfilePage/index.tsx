import { Button } from 'antd'
import cls from './styles.module.scss'
import { ProfileForm } from '../../components/ProfileForm'
import { useNavigate } from 'react-router-dom'

export const ProfilePage = () => {
  const navigate = useNavigate()
  const onDelete = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user_id')
    // for navigate to login page
    navigate('/login')
  }
  return (
    <main>
      <div className={cls.head}>
        <h1>Личный кабинет</h1>
        <Button type='default' onClick={onDelete}>Выход</Button>
      </div>
      <ProfileForm />
    </main>
  )
}
