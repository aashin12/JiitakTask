
import { Route, Routes } from 'react-router-dom'
import './App.css'
import PasswordReset from './pages/PasswordReset'
import Login from './pages/Login'
import PasswordResetEmail from './pages/PasswordResetEmail'
import PasswordresetForm from './pages/PasswordresetForm'
import Dashboard from './pages/Dashboard'
import SplashScreen from './pages/SplashScreen'

function App() {
 

  return (
    <>
     <Routes>
       <Route path="/" element={<SplashScreen/>} />
      <Route path='/passwordset' element={<PasswordReset/>}/>
       <Route path="/forgot-password" element={<PasswordResetEmail />} />
        <Route path="/reset-password" element={<PasswordresetForm />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

     </Routes>
    </>
  )
}

export default App

