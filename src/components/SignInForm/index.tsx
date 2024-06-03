import {Button, Input} from 'antd';
import cls from './styles.module.scss'
import axios from 'axios';
import { useState } from 'react';
import { useRefresh } from '../../hooks';

export const SignInForm = () => {
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const submitData = async () => {
    try {
      const response = await axios.post('http://188.166.57.73:8001/api/v1/users/sign_in/', fields,  {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response.data);
      
      const data_access = response.data.access_token;
      const data_refresh = response.data.refresh_token;
      localStorage.setItem('accessToken', data_access);
      localStorage.setItem('refreshToken', data_refresh);
      localStorage.setItem('user_id', response.data.user_id);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRefresh()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form action="" className={cls.form}>
      <h2>Войдите в аккаунт</h2>
      <Input type="email" placeholder="Email" name='email' onChange={handleInputChange} required />
      <Input type="password" placeholder="Password" name='password' onChange={handleInputChange} required />
      <div className={cls.assets_btn}>
        <Button>Забыли пароль ?</Button>
        <Button>еще не зарегестрировали аккаунт ?</Button>
      </div>
        <Button type="primary" onClick={submitData}>Войти</Button>
    </form>
  )
}
