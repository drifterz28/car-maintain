import { useAuth0 } from "@auth0/auth0-react";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

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
      <Button
        variant="contained"
        size="large"
        onClick={() => loginWithRedirect()}
        style={{ marginBottom: "24px" }}
      >
        Log In
      </Button>
    </Grid>
  );
};
