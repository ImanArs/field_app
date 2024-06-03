import { Button } from 'antd'
import cls from './styles.module.scss'
import { ProfileForm } from '../../components/ProfileForm'

export const ProfilePage = () => {
  return (
    <main>
      <div className={cls.head}>
        <h1>Личный кабинет</h1>
        <Button type='default'>Выход</Button>
      </div>
      <ProfileForm />
    </main>
  )
}
