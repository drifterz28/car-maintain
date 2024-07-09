import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";

import App from "./App";
import { domain } from "./constants";
import "./index.css";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId="rbZS7RpzCIukO84ltTqcYqv8YHz2aK31"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://car-maintain.us.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata openid profile",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
