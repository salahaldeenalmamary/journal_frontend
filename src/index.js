import React from "react";


import { Provider } from 'react-redux';

import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle";
import App from "./app";
import store from "./redux/store";

// ...
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
  <App />
</Provider>,
);
// const rootElement = ReactDOM.createRoot(document.createRo("root"));
// rootElement.render(<App />);
