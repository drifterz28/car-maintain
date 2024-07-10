import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { v6 as uuid } from 'uuid';

import { domain, auth0Params } from './constants';
import { Car, State } from './types';
import { fetchVehicleData } from './vehiclesSlice';

export const useSaveUserMetadata = () => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState<Car>({} as Car);
  const dispatch = useDispatch();
  const allCars = useSelector((state: State) => state.vehicles.list);
  const carUuid = uuid();
  useEffect(() => {
    const getUserMetadata = async () => {
      const raw = JSON.stringify({
        user_metadata: { ...allCars, [carUuid]: userMetadata },
      });

      try {
        const accessToken = await getAccessTokenSilently(auth0Params);
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
        await fetch(userDetailsByIdUrl, {
          method: 'PATCH',
          body: raw,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
        // @ts-expect-error need to find out why
        dispatch(fetchVehicleData({ user, getAccessTokenSilently }));
      } catch (e: unknown) {
        // @ts-expect-error event unknown
        console.log(e.message);
      }
    };
    if (!userMetadata?.year) return;
    getUserMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMetadata]);

  return [userMetadata, setUserMetadata];
};
