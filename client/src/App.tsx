import React, { useState } from "react";
import "./App.css";
import LoginForm from "./auth/LoginForm";
import { Button } from "@chakra-ui/react";
import Register from "./auth/Register";

const App = () => {
  const [view, setView] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        {view === 0 ? (
          <>
            <p>Welcome to HoneyDo</p>
            <Button colorScheme="blue" onClick={() => setView(2)}>
              Login
            </Button>
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
          <LoginForm />
        ) : null}
      </header>
    </div>
  );
};

export default App;
