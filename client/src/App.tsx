import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const handleSumbit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  axios
    .post("http://localhost:3001/users", {
      name: "Fred Flinstone",
      email: "Flintstone@gmail.com",
      darkMode: true,
      pass: "password",
      salt: "salt2",
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getUserById = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
  e.preventDefault();
  axios
    .get(`http://localhost:3001/users/${id}`)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button colorScheme="blue" onClick={(e) => getUserById(e, 1)}>
          Button
        </Button>
      </header>
    </div>
  );
}

export default App;
