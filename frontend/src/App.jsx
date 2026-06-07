import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'
import Home from './Pages/Home'
import Vehicles from './Pages/Vehicles'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<UserLayout />}>
       <Route index element={<Home />} />
      <Route path='/vehicle' element={<Vehicles />} />
      </Route>

     </Routes>
    </>
  )
}

export default App
