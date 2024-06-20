import { useAuth0 } from "@auth0/auth0-react";
import {
  useQuery,
  useQueryClient,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import "./App.css";
import { Login } from "./Login";
import Loading from "./Loading";
import { useUserMetadata } from "./hooks";

function App() {
  const { isAuthenticated, user, isLoading } = useAuth0();
  const { status, data, error, isFetching } = useUserMetadata();
  const queryClient = useQueryClient();
  // const query = useQuery({
  //   queryKey: ["LOAD_USER_DATA"],
  //   queryFn: userMetadata,
  // });

  // useEffect(() => {
  //   // dispatch({ type: "LOAD_USER_DATA", userMetadata });
  // }, [user, userMetadata]);
  console.log({ status, data, error, isFetching, user });
  const addMutation = useMutation({
    mutationFn: async (add) => {
      console.log(add);
      return await {};
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["USER_META_DATA"] }),
  });

  return (
    <>
      <div className="card">
        {isLoading && <Loading />}
        {!isLoading && !isAuthenticated && <Login />}
        {!isLoading && isAuthenticated && <>Loged in</>}
        <button
          onClick={(event) => {
            event.preventDefault();
            // @ts-expect-error shut up
            addMutation.mutate("value", {
              onSuccess: () => {
                // setValue("");
              },
            });
          }}
        >
          addMutation
        </button>
      </div>
    </>
  );
}

export default App;
