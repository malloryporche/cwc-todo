import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  LinkOverlay,
} from "@chakra-ui/react";

export default function ProjectGlanceCard({ project }: any) {
  const activeTasks = project.todos.filter((task: any) => {
    return task.status !== "COMPLETED";
  });

  return (
    <Flex my="3">
      <Box flex="1">
        <Heading size="sm">
          <LinkOverlay href={`/projects/${project.id}`}>
            {project.title}
          </LinkOverlay>
        </Heading>
        <Heading size="sm">
          {project.todos.length > 0
            ? `{${activeTasks.length} - ${project.todos.length}} / ${project.todos.length} tasks complete` //project.todos/length
            : project.description}
        </Heading>
        {/* <Text>2 hours</Text> */}
        <Text>{project.todos.length} tasks</Text>
      </Box>
      <Box>
        <CircularProgress value={59} size="100px" thickness="4px">
          <CircularProgressLabel>59%</CircularProgressLabel>
        </CircularProgress>
      </Box>
    </Flex>
  );
}
