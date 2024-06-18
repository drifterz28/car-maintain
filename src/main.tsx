import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="drifterz28.auth0.com"
      clientId="0hfSXK4s78nbSqFJM92Abga2ViMeJsG7"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://drifterz28.auth0.com/api/v2/",
        scope: "read:current_user update:current_user_metadata openid profile",
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
