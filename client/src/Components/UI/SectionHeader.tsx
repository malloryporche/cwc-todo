import React from "react";
import { Flex, Box, Heading, Badge } from "@chakra-ui/react";

export default function SectionHeader({
  title,
  count,
}: {
  title: string;
  count: number;
}) {
  return (
    <Flex mt={4}>
      <Box>
        <Heading size="md">
          {title}
          <Badge ml="3" fontSize="0.8em" colorScheme="green">
            {count}
          </Badge>
        </Heading>
      </Box>
    </Flex>
  );
}
