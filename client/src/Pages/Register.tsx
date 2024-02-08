import React, { useState } from "react";
import {
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; //ViewIcon, ViewOffIcon
import axios from "axios";
import { Form, redirect } from "react-router-dom";

export interface User {
  name: string;
  email: string;
  pass: string;
  darkMode: boolean;
}

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    pass: "",
    darkMode: true,
  });

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  // const registrationFailedToast: Toast = {
  //   title: "Registration Failed",
  //   description: "Please try again",
  //   status: "error",
  //   duration: 3000,
  //   isClosable: true,
  // };

  // const registrationSuccessfulToast: Toast = {
  //   title: "Registration Successful",
  //   description: "Welcome!",
  //   status: "success",
  //   duration: 3000,
  //   isClosable: true,
  // };

  const registerUser = (e: React.FormEvent, user: User) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/auth/register", user)
      .then((res) => {
        console.log(res.data);
        setUser({
          name: "",
          email: "",
          pass: "",
          darkMode: true,
        });

        //redirect to user dashboard
        return redirect(`/dashboard/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container>
      <Heading>Register</Heading>
      <Form onSubmit={(e) => registerUser(e, user)}>
        <FormControl isRequired>
          <FormLabel htmlFor="username">Name</FormLabel>
          <Input
            placeholder="Enter your name"
            type="text"
            name="username"
            id="username"
            autoComplete="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            autoComplete="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup size="md">
            <Input
              placeholder="Enter a password."
              name="password"
              id="pass"
              autoComplete="new-password"
              value={user.pass}
              type={show ? "text" : "password"}
              onChange={(e) => setUser({ ...user, pass: e.target.value })}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Register
        </Button>
      </Form>
    </Container>
  );
}
