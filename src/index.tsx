import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import NodeQuery from "./node-query";
import NodeMutation from "./node-mutation";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/javascript/node-query"
          element={<Navigate to="/typescript/node-query" replace />}
        />
        <Route
          path="/javascript/node-mutation"
          element={<Navigate to="/typescript/node-mutation" replace />}
        />
        <Route path="/:language" element={<App />}>
          <Route path="node-query" element={<NodeQuery />} />
          <Route path="node-mutation" element={<NodeMutation />} />
        </Route>
        <Route
          path="/ruby"
          element={<Navigate to="/ruby/node-query" replace />}
        />
        <Route
          path="/javascript"
          element={<Navigate to="/typescript/node-query" replace />}
        />
        <Route
          path="/typescript"
          element={<Navigate to="/typescript/node-query" replace />}
        />
        <Route
          path="*"
          element={<Navigate to="/typescript/node-query" replace />}
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
