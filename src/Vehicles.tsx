import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Grid, Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AddVehicle from './AddVehicle';
import VehicleCard from './VehicleCard';
import { State } from './types';
import { fetchVehicleData } from './vehiclesSlice';

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently } = useAuth0();
  const handleOpen = () => setOpen(true);
  const { list, listByIds } = useSelector((state: State) => state.vehicles);

  useEffect(() => {
    // @ts-expect-error this will get fixed
    dispatch(fetchVehicleData({ user, getAccessTokenSilently }));
  }, [dispatch, getAccessTokenSilently, user]);

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Add Car
      </Button>
      <Divider />
      <Grid>
        {listByIds?.map((carId: string) => <VehicleCard key={carId} vehicle={list[carId]} />)}
        <AddVehicle open={open} setOpen={setOpen} />
      </Grid>
    </>
  );
};

export default Vehicles;
