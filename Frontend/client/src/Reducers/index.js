import { combineReducers } from 'redux'
import alertReducer from './alerts'
import authReducer from './auth'

export default combineReducers({
  alertReducer,
  authReducer
})
