import React, { useState } from "react";
import "./App.css";
import LoginForm from "./auth/Login";
import { Link } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import CreatePw from "./auth/CreatePw";
import Register from "./auth/Register";

const App = () => {
  const [view, setView] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        {view === 0 ? (
          <>
            <p>Welcome to HoneyDo</p>
            <Button colorScheme="blue">Login</Button>
            <p>
              If you're a new user{" "}
              <a href="#" color="blue" onClick={() => setView(1)}>
                click here{" "}
              </a>
              to join the fun.
            </p>
          </>
        ) : view === 1 ? (
          <div>
            <h1>HoneyDo</h1>
            <Register />
          </div>
        ) : view === 2 ? (
          <CreatePw />
        ) : null}
      </header>
    </div>
  );
};

export default App;
