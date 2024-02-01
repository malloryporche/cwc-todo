import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; //ViewIcon, ViewOffIcon
import axios from "axios";

export interface User {
  name: string;
  email: string;
  password: string;
  darkMode: boolean;
}

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    darkMode: true,
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const registerUser = (e: React.FormEvent, user: User) => {
    e.preventDefault();
    console.log(user);
    axios
      .post("/auth/register", user)
      .then((res) => {
        console.log(res.data);
        //redirect to user dashboard
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <h1>Register</h1>
      <Stack spacing={3}>
        <Input
          type="text"
          color="blue"
          placeholder="Enter your name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <Input
          type="email"
          color="blue"
          placeholder="Enter your email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            color="blue"
            placeholder="Enter a password."
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="blue" onSubmit={(e) => registerUser(e, user)}>
          Register
        </Button>
      </Stack>
    </div>
  );
}
