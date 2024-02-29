import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import TaskOverview from "../Components/Tasks/TaskOverview";
import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Project, Task } from "./Dashboard";
import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import NewTodoModal from "../Components/UI/NewTodoModal";

export default function ProjectView() {
  const project = useLoaderData() as Project;
  const tasks = project?.todos as Task[];
  console.log(project);
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    revalidator.revalidate();
    navigate("/dashboard");
  };

  return (
    <>
      <Container>
        <Box display="flex">
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon />}
            mr={4}
            onClick={handleBack}
          />
          <Heading>{project?.title}</Heading>
          {project?.todos?.length > 0 && (
            <>
              <Spacer />
              <Button onClick={() => toggleOpen()}>
                <AddIcon />
              </Button>
            </>
          )}
        </Box>
        <Box
          m={4}
          textAlign={"center"}
          display={"flex"}
          justifyContent={"center"}
          height={"80vh"}
          overflow={"hidden"}
          overflowY={"scroll"}
          pt={9}
        >
          {tasks?.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems={"center"}
            >
              <Text>Your project currently has no tasks</Text>
              <Button colorScheme="teal" onClick={() => toggleOpen()}>
                Add Task
              </Button>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              w={"100%"}
            >
              {tasks?.map((task) => (
                <TaskOverview key={task?.id} task={task} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
      <NewTodoModal
        project={project}
        isOpen={isOpen}
        onClose={() => {
          revalidator.revalidate();
          toggleOpen();
        }}
      />
    </>
  );
}
