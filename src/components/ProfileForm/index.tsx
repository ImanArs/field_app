import {Button, Input} from 'antd';
import cls from './styles.module.scss'
import { useState } from 'react';

export const ProfileForm = () => {
  const [user, setUser] = useState({
    name: 'Initial Name',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    fieldsCount: '',
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
    console.log(user);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
 };

  return (
    <form className={cls.form} onSubmit={handleSubmit}>
      <div className={cls.left}>
        <div className={cls.avatar}>
          <div className={cls.image}>
            <span className={cls.name_abb}>UK</span>
            <img src="" alt="" />
          </div>
          <div className={cls.actionBtns}>
            <Button>Загрузить фото</Button>
            <Button>Удалить фото</Button>
          </div>
        </div>
        <label htmlFor="">
          Имя
          <Input type="text" placeholder="Name" name="name" onChange={handleChange} />
        </label>
        <label htmlFor="">
          Фамилия
          <Input type="text" placeholder="Surname" name="surname" onChange={handleChange} />
        </label>
        <label htmlFor="">
          Отчество
          <Input type="text" placeholder="Patronymic" name="patronymic" onChange={handleChange} />
        </label>
      </div>
      <div className={cls.right}>
        <label htmlFor="">
          E-mail
          <Input type="text" placeholder="Email" name="email" onChange={handleChange} />
        </label>
        <label htmlFor="">
          Телефон
          <Input type="text" placeholder="Phone" name="phone" onChange={handleChange} />
        </label>  
        <label htmlFor="">
          количество полей
          <Input type="text" placeholder="Fields Count" name="fieldsCount" onChange={handleChange} />
        </label>  
        <Button type="primary" htmlType="submit">Сохранить изменения</Button>
      </div>
    </form>
  )
}