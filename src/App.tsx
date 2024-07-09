import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import { Login } from "./Login";
import Loading from "./Loading";
import Vehicles from "./Vehicles";
import { Logout } from "./Logout";

import { loadUser } from "./userSlice";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(user));
  }, [dispatch, user]);

  return (
    <>
      <div className="card">
        {isLoading && <Loading />}
        {!isLoading && !isAuthenticated && <Login />}
        {!isLoading && isAuthenticated && (
          <>
            Welcome {user?.name}
            <br />
            <Vehicles />
            <Logout />
          </>
        )}
      </div>
    </>
  );
}

export default App;
