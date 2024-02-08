import React, { useState, Dispatch, SetStateAction, MouseEvent } from "react";
import {
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Form, useNavigate } from "react-router-dom";

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
  const [confirmPass, setConfirmPass] = useState("");

  const [submitClicked, setSubmitClicked] = useState(false);
  const isErrorName = user.name === "" && submitClicked;
  const isErrorEmail = user.email === "" && submitClicked;
  const isErrorPassword = user.pass !== confirmPass && submitClicked;

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>
  ) => setState(!state);

  const navigate = useNavigate();
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
    setSubmitClicked(true);
    e.preventDefault();

    if (user.pass !== confirmPass) {
      return;
    } else {
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
          setConfirmPass("");
          setSubmitClicked(false);
          //redirect to user dashboard
          return navigate(`/dashboard/${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
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
        Register
      </Heading>
      <Form onSubmit={(e) => registerUser(e, user)}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={isErrorName}>
            <FormLabel htmlFor="username">Name</FormLabel>
            <Input
              type="text"
              name="username"
              id="username"
              autoComplete="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
            {isErrorName && (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isErrorEmail}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            {!isErrorEmail ? (
              <FormHelperText>
                Your email and username will be the same.
              </FormHelperText>
            ) : (
              <FormErrorMessage>
                A valid email address is required.
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isErrorPassword}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="password"
                id="pass"
                autoComplete="new-password"
                value={user.pass}
                type={showPass ? "text" : "password"}
                onChange={(e) => setUser({ ...user, pass: e.target.value })}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={(e) => handleClick(e, showPass, setShowPass)}
                >
                  {showPass ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isErrorPassword && (
              <FormErrorMessage>Passwords must match.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isErrorPassword}>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPass}
                type={showConfirmPass ? "text" : "password"}
                onChange={(e) => setConfirmPass(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={(e) =>
                    handleClick(e, showConfirmPass, setShowConfirmPass)
                  }
                >
                  {showConfirmPass ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
            {isErrorPassword && (
              <FormErrorMessage>Passwords must match.</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit" colorScheme="blue" mt={4}>
            Register
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}
