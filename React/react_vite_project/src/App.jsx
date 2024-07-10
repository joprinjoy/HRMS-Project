import { useState } from 'react'

import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import ViewEmployee from './pages/viewEmployee'
import AdminTools from './pages/adminTools'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Router>
    <Navbar/>
      <Routes>
  
        <Route path='/' element={<Home/>}/>
        <Route path='/viewemployee' element={<ViewEmployee/>}/>
        <Route path='/admintools' element={<AdminTools/>}/>
        

      </Routes>
    </Router>
     
    </>
  )
}

export default App
