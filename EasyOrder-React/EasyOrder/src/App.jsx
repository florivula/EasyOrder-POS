import './App.css'
import {Routes,Route,Navigate} from "react-router-dom"

import Home from './Pages/Home'

function App() {
  

  return (
    <>
    <Routes>
      <Route index element={<Navigate to="/home" />}/>
      <Route path="/home" element={<Home />}/>
    </Routes>
    </>
  )
}

export default App
