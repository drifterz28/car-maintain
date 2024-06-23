// import {
//   useQuery,
//   useQueryClient,
//   useMutation,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";
import { useState } from "react";
import { Card, Grid, Button } from "@mui/material";

import { useUserMetadata } from "./hooks";
import AddVehicle from "./AddVehicle";
import { Car } from "./helpers";

const Vehicles = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { data } = useUserMetadata();
  console.log({ data });

  return (
    <Grid>
      <Card>
        <Button onClick={handleOpen}>Add Car</Button>
      </Card>

      {data?.vehicles &&
        data?.vehicles?.map((car: Car) => {
          return <Card key={car.year}>Car </Card>;
        })}
      <AddVehicle open={open} setOpen={setOpen} />
    </Grid>
  );
};

export default Vehicles;
