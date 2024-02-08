import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/UI/Header";

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;
