import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Container,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { Form, Link, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPass, setShowPass] = useState<boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = (
    event: MouseEvent<HTMLButtonElement>,
    state: boolean,
    setState: Dispatch<SetStateAction<boolean>>
  ) => setState(!state);

  const resetPassword = (e: React.FormEvent, password: string) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    } else {
      try {
        axios
          .post("http://localhost:3001/reset-password", {
            password: password,
            token: window.location.pathname.split("/")[2],
            id: window.location.pathname.split("/")[3],
          })
          .then((res) => {
            console.log(res);

            toast({
              title:
                "You have successfully updated your password.  Please login using your new password",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            navigate("/login");
          });
      } catch (err) {
        toast({
          title: `${err}`,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
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
      <Heading size="md" textAlign={"center"} m={4}>
        Reset Your Password
      </Heading>
      <Form onSubmit={(e) => resetPassword(e, password)}>
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Password</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="Enter a password."
                name="password"
                id="password"
                autoComplete="new-password"
                value={password}
                type={showPass ? "text" : "password"}
                onChange={(e) => setPassword(e.target.value)}
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
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Confirm Password</FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="Enter a password."
                name="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                type={showConfirmPass ? "text" : "password"}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={(e) =>
                    handleClick(e, showConfirmPass, setShowConfirmPass)
                  }
                >
                  {showPass ? <ViewOffIcon /> : <ViewIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Reset Password
          </Button>
        </Stack>
      </Form>
    </Container>
  );
}
