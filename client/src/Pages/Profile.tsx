import React from "react";
import { Container, Heading } from "@chakra-ui/react";

export default function Profile() {
  const username = localStorage.getItem("name");

  return (
    <Container>
      <Heading>${username} Profile</Heading>
    </Container>
  );
}
