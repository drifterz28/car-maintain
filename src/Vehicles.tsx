import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Grid, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import AddVehicle from './AddVehicle';
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
    <Grid>
      <Card>
        <Button onClick={handleOpen}>Add Car</Button>
      </Card>

      {listByIds?.map((carId: string) => {
        const somethingforLessError = false;
        return <Card key={carId}>Car card soon {list[carId].model} </Card>;
      })}
      <AddVehicle open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Vehicles;
