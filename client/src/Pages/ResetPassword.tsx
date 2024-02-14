import {
  Container,
  Input,
  Heading,
  FormControl,
  FormLabel,
  Button,
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ResetPassword({ isOpen, onClose }: Props) {
  const [email, setEmail] = useState("");

  const resetPassword = (e: React.FormEvent) => {
    console.log(email);
    e.preventDefault();
    onClose();
    try {
      axios
        .post("http://localhost:3001/reset-password", {
          email: email,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>Reset Your Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container
            h={"30vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
          >
            <Stack spacing={4}>
              <Form onSubmit={(e) => resetPassword(e)}>
                <FormControl isRequired>
                  <FormLabel htmlFor="email" textAlign={"center"}>
                    Enter Your Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <Button type="submit" colorScheme="blue" mt={4}>
                  Send verification email
                </Button>
              </Form>
            </Stack>
          </Container>
        </ModalBody>

        <ModalFooter>
          {/* <Button colorScheme="blue" m={"auto"} onClick={onClose}>
            Send verification email
          </Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
