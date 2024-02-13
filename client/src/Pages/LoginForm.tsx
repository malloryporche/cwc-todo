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
  Heading,
  Stack,
  Text,
  Box,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; //ViewIcon, ViewOffIcon
import { Form, useNavigate, Link } from "react-router-dom";

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
  const navigate = useNavigate();

  const login = async (e: React.FormEvent, user: RegisteredUser) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/auth/login", user);
      console.log("res data ", res.data);
      const loggedInUser = res.data;
      setUser({
        username: "",
        password: "",
      });

      navigate("/dashboard/" + loggedInUser.id, { replace: true });

      const jwt = res.data.accessToken;
      localStorage.setItem("jwt", jwt);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      h={"90vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Heading size="md" textAlign={"center"}>
        Login
      </Heading>
      <Form onSubmit={(e) => login(e, user)}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
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
          <Box textAlign={"center"}>
            <Text>Don't have an account?</Text>
            <Link to="/register">
              <Text color="blue.200">Register here.</Text>
            </Link>{" "}
          </Box>
        </Stack>
      </Form>
    </Container>
  );
}
