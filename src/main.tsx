import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const pubKey = import.meta.env.VITE_stripePubKey;
const clientSecret = import.meta.env.VITE_stripeClientSecret;
const stripePromise = loadStripe(pubKey);
const options = {
  clientSecret: `{{clientSecret}}`,
};

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <Elements stripe={stripePromise} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Elements>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
