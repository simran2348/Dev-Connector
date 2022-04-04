import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import Landing from './Components/Layouts/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Alert from './Components/Layouts/Alert'
import './App.css'

//Redux
import { Provider } from 'react-redux'
import store from './store'

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Navbar />
        <section className='container'>
          <Alert />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/register' element={<Register />} />
          </Routes>
        </section>
      </Fragment>
    </BrowserRouter>
  </Provider>
)

export default App
