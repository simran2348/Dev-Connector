import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import Landing from './Components/Layouts/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Alert from './Components/Layouts/Alert'
import Dashboard from './Components/Dashboard/Dashboard'
import { loadUser } from './Actions/auth'
import setAuthToken from './Utils/setAuthToken'
import PrivateRoute from './Components/Routing/PrivateRoute'
import './App.css'

//Redux
import { Provider } from 'react-redux'
import store from './store'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
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
              <Route
                exact
                path='/dashboard'
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </section>
        </Fragment>
      </BrowserRouter>
    </Provider>
  )
}

export default App
