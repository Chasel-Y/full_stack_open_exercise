import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import App from "./App";

import "./index.css";
import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import usersReducer from "./reducers/usersReducer";
import { Router } from "react-router-dom";

const rootReducer = combineReducers({
  blogs: blogReducer,
  notifications: notificationReducer,
  users: usersReducer,
});

const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
