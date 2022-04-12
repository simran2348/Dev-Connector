import axios from 'axios'
import { setAlert } from './alert'

import {
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE
} from './types'

//get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

//create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const res = await axios.post('/api/profile', formData, config)

      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      )

      if (!edit) {
        navigate('/dashboard')
      }
    } catch (err) {
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, 'danger'))
        })
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err?.response?.statusText,
          status: err?.response?.status
        }
      })
    }
  }

//add experiance
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/experience', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience Added', 'success'))

    navigate('/dashboard')
  } catch (err) {
    const errors = err?.response?.data?.errors
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status }
    })
  }
}

//add educatiion
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.put('/api/profile/education', formData, config)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education Added', 'success'))

    navigate('/dashboard')
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'))
      })
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status }
    })
  }
}

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Experience removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status }
    })
  }
}

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    })

    dispatch(setAlert('Education removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err?.response?.statusText, status: err?.response?.status }
    })
  }
}

//delete account and profile
export const deleteAccount = (id) => async (dispatch) => {
  if (window.confirm('Are you sure? This cannot be undone!'))
    try {
      const res = await axios.delete(`/api/profile/`)

      dispatch({
        type: CLEAR_PROFILE
      })
      dispatch({
        type: DELETE_ACCOUNT
      })

      dispatch(setAlert('Ypur account has been permanantly deleted'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err?.response?.statusText,
          status: err?.response?.status
        }
      })
    }
}
