import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Este é o ponto de entrada. Ele pega o componente principal <App />
// e o renderiza dentro da div com id="root" no arquivo public/index.html.
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
