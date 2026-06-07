import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import UserLayout from './Layout/UserLayout'

function App() {
 

  return (
    <>
     <Routes>
      <Route path='/' element={<UserLayout />}>

      </Route>

     </Routes>
    </>
  )
}

export default App
