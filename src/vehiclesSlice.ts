import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { useAuth0 } from "@auth0/auth0-react";

import { domain, auth0Params } from "./constants";

// export const useUserMetadata = () => {
//   const { user, getAccessTokenSilently } = useAuth0();
//   const [userMetadata, setUserMetadata] = useState(null);

//   useEffect(() => {
//     const getUserMetadata = async () => {
//       if(!user?.sub) return;
//       try {
//         const accessToken = await getAccessTokenSilently(auth0Params);
//         const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
//         const metadataResponse = await fetch(userDetailsByIdUrl, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         });
//         const {user_metadata} = await metadataResponse.json();
//         setUserMetadata(user_metadata);
//       } catch (e) {
//         // @ts-expect-error event unknown
//         console.log(e.message);
//       }
//     };

//     getUserMetadata();
//   }, [getAccessTokenSilently, user?.sub, user?.name]);

//   return userMetadata;
// };


export const fetchUserData = createAsyncThunk(
  'users/fetchByIdStatus',
  // @ts-expect-error nothing
  async ({user, getAccessTokenSilently}) => {
    const accessToken = await getAccessTokenSilently(auth0Params);
    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const {user_metadata} = await metadataResponse.json();
        return user_metadata;
  },)

export const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: [],
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes.
      // Also, no return statement is required from these functions.
      state
    },
    // @ts-expect-error this will be fixed
    [fetchUserData.fulfilled]: (state, { payload }) => {
      console.log(payload)
      state
    },
    decrement: (state) => {
      state
    },
    incrementByAmount: (state, action) => {
      console.log(action)
      state
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = vehiclesSlice.actions

export default vehiclesSlice.reducer