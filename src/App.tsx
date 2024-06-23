import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import { Login } from "./Login";
import Loading from "./Loading";
import Vehicles from "./Vehicles";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();

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
          </>
        )}
      </div>
    </>
  );
}

export default App;
