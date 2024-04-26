import {Routes,Route,Navigate} from "react-router-dom"
import {HomePage} from './Pages/HomePage'
import Order from './Pages/Order'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import UserTable from './Pages/UserTable'
import AdminDashboard from './Pages/AdminDashboard'
import OrdersList from './Pages/OrdersList'

function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/home" />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/order" element={<Order />}/>
      <Route path="/signin" element={<SignIn />}/>
      <Route path="/signup" element={<SignUp />}/>
      <Route path="/usertable" element={<UserTable />}/>
      <Route path="/admindashboard" element={<AdminDashboard />}/>
      <Route path="/orderslist" element={<OrdersList />}/>
    </Routes>
    </>
  )
}

export default App
