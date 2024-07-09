import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    loadUser: (state, { payload }) => {
      return { ...state, ...payload }
    },
  },
})

// Action creators are generated for each case reducer function
export const { loadUser } = userSlice.actions

export default userSlice.reducer