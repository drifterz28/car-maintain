import { useEffect, useState } from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Card, Grid, Button } from '@mui/material';
import { useDispatch } from 'react-redux';

import AddVehicle from './AddVehicle';
import { fetchVehicleData } from './vehiclesSlice';
// import { useSelector } from "react-redux";
// import { Car } from "./helpers";

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, getAccessTokenSilently } = useAuth0();
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    // @ts-expect-error this will get fixed
    dispatch(fetchVehicleData({ user, getAccessTokenSilently }));
  }, [dispatch]);

  return (
    <Grid>
      <Card>
        <Button onClick={handleOpen}>Add Car</Button>
      </Card>

      {/* {data &&
        data?.map((car: Car) => {
          return <Card key={car.year}>Car </Card>;
        })} */}
      <AddVehicle open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Vehicles;
