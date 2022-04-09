import React from 'react';
import App from './App';
import './App.css'
import { Provider } from 'react-redux';
import store from './Redux/Store';
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
