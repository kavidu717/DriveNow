import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'
import Home from './Pages/Home'
import Vehicles from './Pages/Vehicles'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Otp from './Pages/Otp'
import VehicleDetails from './Pages/VehicleDetails'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<UserLayout />}>
       <Route index element={<Home />} />
      <Route path='/vehicle' element={<Vehicles />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/verify-otp' element={<Otp />} />
      <Route path='/vehicle/:id' element={<VehicleDetails />} />


      </Route>

     </Routes>
    </>
  )
}

export default App
