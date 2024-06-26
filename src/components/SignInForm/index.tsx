import {Button, Input} from 'antd';
import cls from './styles.module.scss'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SignInForm = () => {
  const navigate = useNavigate()
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
      const response = await axios.post('http://167.99.145.49:8001/api/v1/users/sign_in/', fields,  {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data_access = response.data.access_token;
      const data_refresh = response.data.refresh_token;
      localStorage.setItem('accessToken', data_access);
      localStorage.setItem('refreshToken', data_refresh);
      localStorage.setItem('user_id', response.data.user_id);
      navigate('/')
      console.log(response)
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
        <Button type="primary" onClick={submitData}>Войти</Button>
      </div>
        
    </form>
  )
}
