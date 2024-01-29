import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Button } from "@chakra-ui/react";
import axios from "axios";

const handleSumbit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  console.log("Button clicked!");
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
        <Button colorScheme="blue" onClick={(e) => handleSumbit(e)}>
          Button
        </Button>
      </header>
    </div>
  );
}

export default App;
