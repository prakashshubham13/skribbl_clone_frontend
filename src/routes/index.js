import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Login from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Protected from "./Protected";
import Layout from "./Layout";

const route = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path='/:roomId?' element={<Login />} />
      <Route element={<Protected />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

export default route;
