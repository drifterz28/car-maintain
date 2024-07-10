import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

import { domain, auth0Params } from './constants';
import { User } from './types';

interface FetchData {
  user: User,
  getAccessTokenSilently: (string) => string
}

export const fetchVehicleData: AsyncThunk<any, FetchData, any> = createAsyncThunk(
  'fetchVehicleData',
  async ({ user, getAccessTokenSilently } : FetchData) => {
    const accessToken = await getAccessTokenSilently(auth0Params);
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
    const metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await metadataResponse.json();
    return data;
  },
);

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: [],
  reducers: {
    // @ts-expect-error someday
    [fetchVehicleData.pending]: (state) => {
      console.log('pending');
      state;
    },
    // @ts-expect-error someday
    [fetchVehicleData.fulfilled]: (state, action) => {
      console.log(action);
      state = action.payload;
    },
    // @ts-expect-error someday
    [fetchVehicleData.rejected]: (state) => {
      state;
    },
  },
});

// export const { fetchVehicleData } = vehiclesSlice.actions

export default vehiclesSlice.reducer;
