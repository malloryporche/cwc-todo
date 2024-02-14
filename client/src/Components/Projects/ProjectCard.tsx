import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";

export default function ProjectCard() {
  return (
    <Flex my="3">
      <Box flex="1">
        <Heading size="sm">Sam's Project</Heading>
        <Heading size="md">Create two add banners</Heading>
        <Text>2 hours</Text>
      </Box>
      <Box>
        <CircularProgress value={59} size="100px" thickness="4px">
          <CircularProgressLabel>59%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Flex>
  );
}
