import { useEffect, useState } from 'react';
import axios from 'axios';
import cls from './styles.module.scss'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export const NDVIChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://167.99.145.49:8001/api/v1/vegetables', {
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

  return (
    <div>
      <h2>NDVI Chart</h2>
      <LineChart
        width={900}
        height={300}
        data={data}
        className={cls.chart}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ndvi" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
};