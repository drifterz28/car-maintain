import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { Divider, Grid, Typography } from "@mui/material";

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className="Login-Container"
    >
      <Typography variant="subtitle1" gutterBottom>
        In order to keep this app private and for you to keep track of your
        score you will need to login/signup.
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={() => loginWithRedirect()}
        style={{ marginBottom: "24px" }}
      >
        Log In
      </Button>
      <Divider />
      <Typography variant="body1" gutterBottom>
        This data is not public, your information is not public.
      </Typography>
      <Typography variant="body1" gutterBottom>
        NOTICE! you were given a user name and password, that is not the same
        here and is no longer used.
      </Typography>
    </Grid>
  );
};
