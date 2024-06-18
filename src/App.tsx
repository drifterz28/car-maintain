import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import { Login } from "./Login";
import Loading from "./Loading";
import { useUserMetadata } from "./hooks";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  // const dispatch = useDispatch();
  // const userMetadata = useUserMetadata();
  const [count, setCount] = useState(0);

  const userMetadata = useUserMetadata();

  useEffect(() => {
    // dispatch({ type: "LOAD_USER_DATA", userMetadata });
  }, [user, userMetadata]);

  return (
    <>
      <div>
        {!isLoading && !isAuthenticated && <Login />}
        {isLoading && <Loading />}
        {!isLoading && isAuthenticated && <>Loged in</>}
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  );
}

export default App;
