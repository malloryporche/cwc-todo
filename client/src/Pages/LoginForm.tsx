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
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons"; //ViewIcon, ViewOffIcon
import { Form, useNavigate, Link, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import ForgotPassword from "./ForgotPassword";

export interface RegisteredUser {
  username: string;
  password: string;
}

export default function LoginForm() {
  const context = useOutletContext() as Context;
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const login = async (e: React.FormEvent, user: RegisteredUser) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3001/auth/login", user);
      context.setUser(res.data);
      setUser({
        username: "",
        password: "",
      });

      navigate(`/users/${context.user.id}/dashboard`, { replace: true });
      const jwt = res.data.accessToken;
      localStorage.setItem("jwt", jwt);
      context.toggleLogin();
      toast({
        title: `Welcome Back ${res.data.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
      setUser({
        username: "",
        password: "",
      });

      toast({
        title:
          "There was an error logging into your account.  Please try again!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <>
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
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
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
                <Text color="blue.200">Join the fun!</Text>
              </Link>{" "}
            </Box>
            <Box textAlign={"center"} mt={4}>
              <Text>Forgot your password?</Text>
              <Text onClick={onOpen} color="green.200">
                Reset here
              </Text>{" "}
            </Box>
          </Stack>
        </Form>
      </Container>

      <ForgotPassword isOpen={isOpen} onClose={onClose} />
    </>
  );
}
