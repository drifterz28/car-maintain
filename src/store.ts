import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import vehiclesReducer from './vehiclesSlice';

export default configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    user: userReducer,
  },
});
