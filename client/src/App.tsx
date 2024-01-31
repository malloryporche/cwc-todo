import React from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>HoneyDo</h1>
        <p>
          If you're a new user <a href="/sign-up">click here</a> to join the
          fun.
        </p>
        <Button colorScheme="blue">Login</Button>
      </header>
    </div>
  );
}

export default App;
