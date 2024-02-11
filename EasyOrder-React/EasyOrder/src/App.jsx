import './App.css'
import {Routes,Route,Navigate} from "react-router-dom"
// import Home from './Pages/Home'
import {HomePage} from './Pages/HomePage'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'

function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/home" />}/>
      <Route path="/home" element={<HomePage />}/>
    </Routes>
    </>
  )
}

export default App
