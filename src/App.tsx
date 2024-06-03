import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/Main'
import LoginPage from './pages/LoginPage'
import { ProfilePage } from './pages/ProfilePage'
import { DetailFieldPage } from './pages/DetailFieldPage'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/ndvi" element={<DetailFieldPage />} />
    </Routes>
    </>
  )
}

export default App
