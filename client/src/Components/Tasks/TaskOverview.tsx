import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function TaskOverview() {
  return (
    <Box
      border={"1px solid white"}
      maxW="xs"
      margin={4}
      ml={0}
      padding={4}
      borderRadius={10}
      minW={"25vw"}
      display="inline-block"
    >
      <Text fontSize="xs">Project name</Text>
      <Heading size="md" py={3}>
        Task Name
      </Heading>
      <Text fontSize="10px">Due date</Text>
    </Box>
  );
}
