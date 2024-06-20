import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { domain } from "./constants";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Auth0Provider
        domain={domain}
        clientId="rbZS7RpzCIukO84ltTqcYqv8YHz2aK31"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: "https://car-maintain.us.auth0.com/api/v2/",
          scope:
            "read:current_user update:current_user_metadata openid profile",
        }}
      >
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
      </Auth0Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
