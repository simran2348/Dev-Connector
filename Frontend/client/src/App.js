import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import Landing from './Components/Layouts/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Fragment>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/register' element={<Register />} />
      </Routes>
    </Fragment>
  </BrowserRouter>
)

export default App
