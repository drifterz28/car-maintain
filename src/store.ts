import { configureStore } from '@reduxjs/toolkit'
import vehiclesReducer from './vehiclesSlice'
import userReducer from './userSlice'

export default configureStore({
  reducer: {
    vehicles:vehiclesReducer,
    user: userReducer,
  },
})