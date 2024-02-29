import React, { useEffect, useState } from "react";
import "./App.css";
import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from "react-router-dom";
import Header from "./Components/UI/Header";
import {
  ChakraProvider,
  theme,
  ColorModeScript,
  useToast,
} from "@chakra-ui/react";
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
  deleteAccount: () => void;
  updateTaskData: (
    id: number,
    type: string,
    key: string,
    value: string | boolean
  ) => void;
};

const App = () => {
  const data = useLoaderData() as User | undefined;
  const [isLoggedIn, setIsLoggedIn] = useState(data?.email !== undefined);
  const [user, setUser] = useState(data);
  const toast = useToast();
  const navigate = useNavigate();
  const revalidate = useRevalidator();

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
        revalidate.revalidate();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateTaskData = (
    id: number,
    type: string,
    key: string,
    value: string | boolean
  ) => {
    axios
      .patch(
        `http://localhost:3001/${type}/${id}/`,
        { [key]: value },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        revalidate.revalidate();
        console.log(`http://localhost:3001/${type}/${id}/`);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteAccount = () => {
    axios
      .delete("http://localhost:3001/users/" + user?.id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        localStorage.removeItem("jwt");
        setUser({ id: 0, name: "", darkMode: true, email: "" });
        toggleLogin();
        navigate("/login");
        toast({
          title: "Account deletion successful.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.error(err);
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
    deleteAccount,
    updateTaskData,
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      toast({
        title: "Your token has expired, please log back in!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [isLoggedIn]);
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
