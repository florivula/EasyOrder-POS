import './App.css'
import {Routes,Route,Navigate} from "react-router-dom"
// import Home from './Pages/Home'
import {HomePage} from './Pages/HomePage'
import CategoriesCard from './Pages/Components/CategoriesCard'
import Orders from './Pages/Components/Orders'

function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/home" />}/>
      <Route path="/home" element={<HomePage />}/>
      <Route path="/order" element={<Orders />}/>
      
    </Routes>
    </>
  )
}

export default App
