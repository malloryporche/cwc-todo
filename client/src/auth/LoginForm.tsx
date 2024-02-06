import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; //ViewIcon, ViewOffIcon
import { Form } from "react-router-dom";

export interface RegisteredUser {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const login = (e: React.FormEvent, user: RegisteredUser) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", user)
      .then((res) => {
        console.log(res.data);
        setUser({
          username: "",
          password: "",
        });
        //redirect to user dashboard
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h1>Login</h1>
      <Form onSubmit={(e) => login(e, user)}>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            color="blue"
            name="email"
            id="email"
            autoComplete="email"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="Enter a password."
              color="blue"
              name="password"
              id="password"
              autoComplete="new-password"
              value={user.password}
              type={show ? "text" : "password"}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Login
        </Button>
      </Form>
    </Container>
  );
}
