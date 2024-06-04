import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import MainPage from './pages/Main'
import LoginPage from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { DetailFieldPage } from './pages/DetailFieldPage'
import { useEffect } from 'react'
import { useRefresh } from './hooks'

function App() {
  const navigate = useNavigate()
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useRefresh()
    } else {
      navigate('/login')
    }
  }, [navigate])
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/ndvi" element={<DetailFieldPage />} />
    </Routes>
  )
}

export default App
