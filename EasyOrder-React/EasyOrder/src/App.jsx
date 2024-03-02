import './App.css'
import {Routes,Route,Navigate} from "react-router-dom"
// import Home from './Pages/Home'
import {HomePage} from './Pages/HomePage'
import CategoriesCard from './Pages/Components/CategoriesCard'
import Orders from './Pages/Components/Orders'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UserTable from './Pages/UserTable'

function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/home" />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/order" element={<Orders />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/usertable" element={<UserTable />}/>
    </Routes>
    </>
  )
}

export default App
