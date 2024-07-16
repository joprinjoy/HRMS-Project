

import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './pages/home'
import ViewEmployee from './pages/viewEmployee'
import AdminTools from './pages/adminTools'
import AddEmployee from './pages/addemployee'
import ViewDesignation from './pages/viewDesignation'
import AddDesignation from './pages/viewDesignation/AddDesignation'
import UpdateEmployee from './pages/viewEmployee/UpdateEmployee'
import ViewDetails from './pages/ViewDetails'


function App() {


  

  return (
    <>

    <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route
            path='*'
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path='/viewemployee' element={<ViewEmployee />} />
                  <Route path='/admintools' element={<AdminTools />} />
                  <Route path='/addemployee' element={<AddEmployee />} />
                  <Route path='/viewdesignation' element={<ViewDesignation />} />
                  <Route path='/adddesignation' element={<AddDesignation />} />
                  <Route path='/updateemployee' element={<UpdateEmployee />} />
                  <Route path='/viewdetails' element={<ViewDetails />} />
                </Routes>
              </>
            }
          />

      
      </Routes>
    </Router>
     
    </>
  )
}

export default App
