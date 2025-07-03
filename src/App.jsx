import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import RoleSelect from './pages/Auth/RoleSelect'
import SignupStudent from './pages/Auth/SignupStudent';
import LoginStudent from './pages/Auth/LoginStudent';
import LoginWarden from './pages/Auth/LoginWarden';
import ProtectedRoute from './pages/components/ProtectedRoute';
import Dashboard from './pages/student/Dashboard';
import Profile from './pages/student/Profile';
import RoomDetails from './pages/student/RoomDetails';
import SubmitComplaint from './pages/student/SubmitComplaint';
import ViewComplaints from './pages/student/ViewComplaints';
import MessMenu from './pages/student/MessMenu';
import VisitRequest from './pages/student/VisitRequest';
import PastVisitRequests from './pages/student/PastVisitRequests';
import Fees from './pages/student/Fees';
import WardenProfile from './warden/WardenProfile';
import WardenDashboard from './warden/WardenDashboard';
import ViewStudents from './warden/ViewStudents';
import ViewRooms from './warden/ViewRooms';
import UpdateMenu from './warden/UpdateMenu';
import ManageVisitors from './warden/ManageVisitors';
import ManageComplaints from './warden/ManageComplaints';
import AssignStudent from './warden/AssignStudent';
import UpdateFees from './warden/UpdateFees';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect/>}/>
        <Route path='/signup/student' element={<SignupStudent/>}/>
        <Route path='/login/student' element={<LoginStudent/>}/>
        <Route path='/login/warden' element={<LoginWarden/>}/>

        <Route path='/student/dashboard' element={
          <ProtectedRoute role="student">
            <Dashboard/>
          </ProtectedRoute>
        }>
          <Route path='profile' element={<Profile/>}/>
          <Route path='room' element={<RoomDetails/>}/>
          <Route path='submit-complaint' element={<SubmitComplaint/>}/>
          <Route path='view-complaints' element={<ViewComplaints/>}/>
          <Route path='mess-menu' element={<MessMenu/>}/>
          <Route path='visit-request' element={<VisitRequest/>}/>
          <Route path='my-visits' element={<PastVisitRequests/>}/>
          <Route path='fees' element={<Fees/>}/>
        </Route>

        <Route path='/warden/dashboard' element={
          <ProtectedRoute role="warden">
            <WardenDashboard/>
          </ProtectedRoute>
        }>
          <Route path='profile' element={<WardenProfile/>}/>
          <Route path='students' element={<ViewStudents/>}/>
          <Route path='update-fees' element={<UpdateFees/>}/>
          <Route path='rooms' element={<ViewRooms/>}/>
          <Route path='update-menu' element={<UpdateMenu/>}/>
          <Route path='manage-visitors' element={<ManageVisitors/>}/>
          <Route path='manage-complaints' element={<ManageComplaints/>}/>
          <Route path='assign-student' element={<AssignStudent/>}/>

        </Route>

      </Routes>
    </Router>
  )
}

export default App
