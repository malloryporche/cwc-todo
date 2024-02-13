import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./Components/UI/Header";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";

const App = () => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header />
        <Outlet />
      </ChakraProvider>
    </>
  );
};

export default App;
