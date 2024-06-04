import { Button, DatePicker, Input } from 'antd'
import cls from './Main.module.scss'
import { FieldForm } from '../components/FieldForm';
import { useState } from 'react';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const { RangePicker } = DatePicker;
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <main className={cls.main}>
      <h1>Данные о поле</h1>
      <div className={cls.card}>
        <label>
          период расчета
          <RangePicker />
        </label>
        <label>
          номер поля
          <Input type='text' placeholder='номер поля' />
        </label>
        <Link to={'/ndvi'}>
          <Button type='primary'>показать отчет</Button>
        </Link>
          <Button type='primary' onClick={() => setModalOpen(!modalOpen)}>внести данные</Button>
      </div>
      <div onClick={() => setModalOpen(false)}>
        <Modal
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          title='Внести данные о поле'
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} // Added type declaration for onClick prop
        >
          <FieldForm />
        </Modal>
      </div>
    </main>
  )
}

export default MainPage