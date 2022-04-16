import React, { Fragment, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './Components/Layouts/Navbar'
import Landing from './Components/Layouts/Landing'
import Login from './Components/Auth/Login'
import Register from './Components/Auth/Register'
import Alert from './Components/Layouts/Alert'
import Dashboard from './Components/Dashboard/Dashboard'
import CreateProfile from './Components/ProfileDashForm/CreateProfile'
import EditProfile from './Components/ProfileDashForm/EditProfile'
import AddExperience from './Components/ProfileDashForm/AddExperience'
import Profiles from './Components/Profiles/Profiles'
import Profile from './Components/Profile/Profile'
import Posts from './Components/Posts/Post'
import { loadUser } from './Actions/auth'
import setAuthToken from './Utils/setAuthToken'
import PrivateRoute from './Components/Routing/PrivateRoute'
import './App.css'

//Redux
import { Provider } from 'react-redux'
import store from './store'
import AddEducation from './Components/ProfileDashForm/AddEducation'
import Post from './Components/Post/Post'

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
              <Route exact path='/profiles' element={<Profiles />} />
              <Route exact path='/profile/:id' element={<Profile />} />
              <Route
                exact
                path='/dashboard'
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/create-profile'
                element={
                  <PrivateRoute>
                    <CreateProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/edit-profile'
                element={
                  <PrivateRoute>
                    <EditProfile />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/add-experience'
                element={
                  <PrivateRoute>
                    <AddExperience />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/add-education'
                element={
                  <PrivateRoute>
                    <AddEducation />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/posts'
                element={
                  <PrivateRoute>
                    <Posts />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path='/posts/:id'
                element={
                  <PrivateRoute>
                    <Post />
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
