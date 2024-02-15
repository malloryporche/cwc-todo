import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLoaderData } from "react-router-dom";
import Header from "./Components/UI/Header";
import { ChakraProvider, theme, ColorModeScript } from "@chakra-ui/react";
import axios from "axios";

export type User = {
  id: number;
  email: string;
  darkMode: boolean;
  name: string;
};

export type Context = {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  user: {
    id: number;
    name: string;
    darkMode: boolean;
    email: string;
  };
  setUser: (user: User) => void;
  updateUserData: (id: number, key: string, value: string | boolean) => void;
};

const App = () => {
  const data = useLoaderData() as User | undefined;
  const [isLoggedIn, setIsLoggedIn] = useState(data?.email !== undefined);
  const [user, setUser] = useState(data);

  const updateTheme = () => {
    if (!user?.darkMode) {
      localStorage.setItem("chakra-ui-color-mode", "light");
    }
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const updateUserData = (id: number, key: string, value: string | boolean) => {
    axios
      .patch(
        "http://localhost:3001/users/" + id + "/",
        { [key]: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const context: Context = {
    isLoggedIn,
    toggleLogin,
    user: {
      id: user?.id as number,
      name: user?.name as string,
      darkMode: user?.darkMode as boolean,
      email: user?.email as string,
    },
    setUser,
    updateUserData,
  };

  useEffect(() => {
    updateTheme();
  }, [user?.darkMode]);
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header
          isLoggedIn={isLoggedIn}
          toggleLogin={toggleLogin}
          user={user}
          setUser={setUser}
        />
        <Outlet context={context} />
      </ChakraProvider>
    </>
  );
};

export default App;
