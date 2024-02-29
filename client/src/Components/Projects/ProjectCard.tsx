import React from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  CircularProgress,
  CircularProgressLabel,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";

export default function ProjectCard({ project }: any) {
  const completedTasks = project.todos.filter((task: any) => {
    return task.status === "completed";
  }).length;
  const totalTasks = project.todos.length;
  const progress = Math.round((completedTasks / totalTasks) * 100);

  return (
    <LinkBox
      padding={2}
      borderWidth="1px"
      borderRadius="xl"
      my={4}
      boxShadow={"md"}
    >
      <Flex my="3" alignItems={"center"}>
        <Box flex="1">
          <Heading size="sm">
            <LinkOverlay href={`/projects/${project.id}`}>
              {project.title}
            </LinkOverlay>
          </Heading>
          <Heading size="md">
            {project.todos.length > 0
              ? project.todos[0].title
              : project.description}
          </Heading>
          {/* <Text>2 hours</Text> */}
          <Text>{project.todos.length} tasks</Text>
        </Box>
        <Box>
          <CircularProgress
            value={progress ? progress : 0}
            size="100px"
            thickness="4px"
          >
            <CircularProgressLabel>
              {progress ? `${progress}%` : "0%"}
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
    </LinkBox>
  );
}
