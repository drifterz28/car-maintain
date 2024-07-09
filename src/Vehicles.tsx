import { useState } from "react";
import { Card, Grid, Button } from "@mui/material";

import AddVehicle from "./AddVehicle";
// import { useSelector } from "react-redux";
// import { Car } from "./helpers";

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // const state = useSelector((state) => state.vehicle);
  // console.log(state);
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
