import { SignInForm } from '../../components/SignInForm'
import SignUpForm from '../../components/signUp'
import cls from './styles.module.scss'

const LoginPage = () => {
  return (
    <main className={cls.login}>
      <h1>Начать работу</h1>
      <div className={cls.login_wrapper}>
      <SignInForm />
      <SignUpForm />
      </div>
    </main>
  )
}

export default LoginPage