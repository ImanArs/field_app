import { Button, Select } from 'antd'
import cls from './styles.module.scss'
import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';
import { useRefresh } from '../../hooks';
import { toast, ToastContainer } from 'react-toastify';

interface Sort {
  id: number;
  name: string;
}

interface Field {
  sort: Sort;
  sort_id: number;
  name: string;
  location: string;
  cultivated_crop: string;
  created_at: Date;
  productivity: number;
  growth_phase: string;
  soil_type: string;
  area: number;
  ndvi: number | null;
  user: number;
}

interface Props {
  closeModal?: () => void;
}
export const FieldForm = (props: Props) => {
  const { closeModal } = props
  const userId = localStorage.getItem('user_id');
  
  useRefresh()
  const [sorts, setSorts] = useState<Sort[] | undefined>()
  const [fields, setFields] = useState<Field>({
    sort: {
      id: 0, 
      name: "", 
    },
    sort_id: 0, 
    name: "", 
    location: "", 
    cultivated_crop: "", 
    created_at: new Date(),
    productivity: 1, 
    growth_phase: "", 
    soil_type: "", 
    area: 1, 
    ndvi: null, 
    user: +userId!, 
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  const getSorts = async () => {
    try {
      const response = await axios.get<Sort[]>('http://167.99.145.49:8001/api/v1/sorts/');
      setSorts(response.data);
    } catch (error) {
      console.error(error);
    }      
  }
  useEffect(() => {
    getSorts()
  }, [])

  const submitData = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post('http://167.99.145.49:8001/api/v1/vegetables/', fields,  {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });
      toast.success("успешно загружено!")
      if (closeModal) {
        closeModal();
      }
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={cls.form}>
      <ToastContainer />
      <ul className={cls.list}>
        <li>
          <label htmlFor="name">Название поля</label>
          <input type="text" id="name" name="name" placeholder="Название поля" value={fields.name} onChange={handleInputChange} />
        </li>
        
        <li>
          <label htmlFor="soil_type">Тип почвы</label>
          <Select
            placeholder="Outlined"
            style={{ flex: 1 }}
            options={[
              {value: 'sandy', label: 'Sandy'}, 
              {value: 'clay', label: 'Clay'}, 
              {value: 'silt', label: 'Silt'}, 
              {value: 'loam', label: 'Loam'}, 
              {value: 'peat', label: 'Peat'}, 
              {value: 'chalk', label: 'Chalk'}, 
            ]}
            onChange={(value) => setFields({...fields, soil_type: value})}
          />
        </li>
        <li>
          <label htmlFor="area">Площадь</label>
          <input type="text" id="area" name="area" placeholder="Площадь" value={fields.area} onChange={handleInputChange} />
        </li>
        <li>
          <label htmlFor="location">Местоположение поля</label>
          <input type="text" id="location" name="location" placeholder="Местоположение поля" value={fields.location} onChange={handleInputChange} />
        </li>
        <li>
          <label htmlFor="cultivated_crop">Выращиваемая культура</label>
          <input type="text" id="cultivated_crop" name="cultivated_crop" placeholder="Выращиваемая культура" value={fields.cultivated_crop} onChange={handleInputChange} />
        </li>
        <li>
          <label htmlFor="sort">Сорт</label>
          
          <Select
            placeholder="Outlined"
            style={{ flex: 1 }}
            options={sorts?.map((sort) => ({value: sort.id, label: sort.name}))}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(_, record: any) => {
              setFields({
                ...fields, 
                sort_id: Number(record.value),
                sort: { id: Number(record.value), name: `${record.label}`}
              })
            }}
          />
        </li>
        <li>
          <label htmlFor="ndvi">Сорт</label>
          <Select
            id='ndvi'
            placeholder="Outlined"
            style={{ flex: 1 }}
            options={[
              {value: 0.2, label: '0.2'},
              {value: 0.3, label: '0.3'},
              {value: 0.4, label: '0.4'},
              {value: 0.5, label: '0.5'},
              {value: 0.6, label: '0.6'},
              {value: 0.7, label: '0.7'},
            ]}
            onChange={(value) => {setFields({...fields, ndvi: value})}}
          />
        </li>
        <li>
          <label htmlFor="productivity">Урожайность</label>
          <input type="text" id="productivity" name="productivity" placeholder="Урожайность" value={fields.productivity} onChange={handleInputChange} />
        </li>
        <li>
          <label htmlFor="growth_phase">Фаза роста растения на момент внесения данных</label>
          <input type="text" id="growth_phase" name="growth_phase" placeholder="Фаза роста растения на момент внесения данных" value={fields.growth_phase} onChange={handleInputChange} />
        </li>
      </ul>
      <Button type="primary" onClick={submitData}>Сохранить изменения</Button>
    </form>
  )
}