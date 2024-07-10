/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';

import { domain, auth0Params } from './constants';
import { User, Car } from './types';

export interface FetchData {
  user: User;
  getAccessTokenSilently: (string) => string;
}

interface carList {
  [key: string]: Car;
}

const initState = {
  loading: false,
  error: null,
  list: {},
  listByIds: [],
};

const addDataKeys = (data) => {
  if (data.length === 0) return {};
  return {
    list: data,
    listByIds: Object.keys(data),
  };
};

export const fetchVehicleData: AsyncThunk<any, FetchData, any> = createAsyncThunk(
  'fetchVehicleData',
  async ({ user, getAccessTokenSilently }: FetchData) => {
    const accessToken = await getAccessTokenSilently(auth0Params);
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
    const metadataResponse = await fetch(userDetailsByIdUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // eslint-disable-next-line camelcase
    const { user_metadata } = await metadataResponse.json();
    // eslint-disable-next-line camelcase
    return addDataKeys(user_metadata);
  },
);

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVehicleData.fulfilled, (state, action) => ({ ...state, ...action.payload, loading: false }))
      .addCase(fetchVehicleData.rejected, (state, action) => {
        state.loading = false;
        // @ts-expect-error message is a string
        state.error = action?.error?.message || 'An error occurred';
      });
  },
  reducers: {},
});

// export const { fetchVehicleData } = vehiclesSlice.actions

export default vehiclesSlice.reducer;
