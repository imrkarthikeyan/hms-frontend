import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RoleSelect from './pages/Auth/RoleSelect'
import SignupStudent from './pages/Auth/SignupStudent';
import LoginStudent from './pages/Auth/LoginStudent';
import LoginWarden from './pages/Auth/LoginWarden';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect/>}/>
        <Route path='/signup/student' element={<SignupStudent/>}/>
        <Route path='/login/student' element={<LoginStudent/>}/>
        <Route path='/login/warden' element={<LoginWarden/>}/>
      </Routes>
    </Router>
  )
}

export default App
