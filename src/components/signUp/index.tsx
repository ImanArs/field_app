import { Button, Input } from 'antd';
import cls from './styles.module.scss'
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const navigate = useNavigate()
  const [fields, setFields] = useState({
    first_name: '',
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
      const response = await axios.post('http://188.166.57.73:8001/api/v1/users/sign_up/', fields,  {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      navigate('/')
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <form action="" className={cls.form}>
      <h2>Зарегестрируйте аккаунт</h2>
      <Input type="text" name="first_name" placeholder="Name" value={fields.first_name} onChange={handleInputChange} required />
      <Input type="text" name="email" placeholder="E-mail" value={fields.email} onChange={handleInputChange} required />
      <Input type="password" name="password" placeholder="Password" value={fields.password} onChange={handleInputChange} required />
      <div className={cls.assets_btn}>
        <Button>Очистить</Button>
        <Button type="primary" onClick={submitData}>Зарегестрироваться</Button>
      </div>
      <Link to={'/login'}>
        <Button>уже есть аккаунт ?</Button>
      </Link>
    </form>
  )
}

export default SignUpForm