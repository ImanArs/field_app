import { Button, Table } from 'antd';
import cls from './styles.module.scss';
import Modal from '../Modal';
import { NDVIChart } from './ndvi_chart';
import { useEffect, useState } from 'react';
import { useRefresh } from '../../hooks';
import axios from 'axios';

export const FieldTable = () => {
  useRefresh()
  const [ modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://188.166.57.73:8001/api/v1/vegetables', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });
        setData(response.data);
      } catch (error) {
        // window.location.href = '/login';
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const columns = [
    { title: 'Поле', dataIndex: 'name', key: 'name' },
    { title: 'Местоположение', dataIndex: 'location', key: 'location' },
    { title: 'Культура', dataIndex: 'cultivated_crop', key: 'culture' },
    { title: 'Сорт', dataIndex: 'sort', key: 'sort', render: (sort: { name: string }) => sort.name, },
    { title: 'Дата', dataIndex: 'created_at', key: 'date', render: (date: string) => new Date(date).toLocaleDateString()},
    { title: 'NDVI', dataIndex: 'ndvi', key: 'ndvi' },
    { title: 'Урожайность', dataIndex: 'productivity', key: 'yield' },
    { title: 'Фаза роста', dataIndex: 'growth_phase', key: 'growthPhase' },
  ];

  // const data = Array.from({ length: 15 }, (_, i) => ({
  //   key: i,
  //   field: `Field ${i}`,
  //   location: `Location ${i}`,
  //   culture: `Culture ${i}`,
  //   sort: `Sort ${i}`,
  //   date: `Date ${i}`,
  //   ndvi: `NDVI ${i}`,
  //   yield: `Yield ${i}`,
  //   growthPhase: `Growth Phase ${i}`,
  // }));

  return (
    <div className={cls.root}>
      <Button type="primary" onClick={() => setModalOpen(true)}>График динамики NDVI</Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 15 }} />
      <div onClick={() => setModalOpen(false)}>
        <Modal
          className={cls.modal}
          isOpen={modalOpen}
          closeModal={() => setModalOpen(false)}
          title='NDVIChart'
          onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        >
          <NDVIChart />
        </Modal>
      </div>
    </div>
  );
};