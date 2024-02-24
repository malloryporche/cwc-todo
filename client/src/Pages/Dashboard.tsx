import {
  Container,
  Heading,
  Button,
  Text,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import UpcomingTaskList from "../Components/Tasks/UpcomingTaskList";
import ProjectOverview from "../Components/Projects/ProjectOverview";
import { useOutletContext } from "react-router-dom";
import { Context } from "../App";
import NewProjectModal from "../Components/UI/NewProjectModal";

export interface Task {
  id: number;
  name: string;
  dueDate: string;
}

export interface Project {
  id: number;
  name: string;
  deadline: Date;
  nextTask: Task;
}

interface User {
  id: number;
  name: string;
  email: string;
  projects: Project[];
  tasks: Task[];
  darkMode: boolean;
}

export default function Dashboard() {
  const context = useOutletContext() as Context;
  const user = context.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const toggleIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };
  const upcomingTaskList: Task[] = [
    {
      id: 1,
      name: "Task 1",
      dueDate: "2022-01-01",
    },
    {
      id: 2,
      name: "Task 2",
      dueDate: "2022-01-02",
    },
  ];

  const projectList: Project[] = [
    {
      id: 1,
      name: "Project 1",
      deadline: new Date("2022-01-01"),
      nextTask: upcomingTaskList[0],
    },
    {
      id: 2,
      name: "Project 2",
      deadline: new Date("2022-01-01"),
      nextTask: upcomingTaskList[0],
    },
  ];

  return (
    <>
      <Container mb={8}>
        <Flex>
          <Heading size="lg" mb={4}>
            Hello {user.name}
          </Heading>
          <Spacer />
          <Button onClick={() => toggleIsOpen()}>
            <AddIcon />
          </Button>
        </Flex>
      </Container>
      <Container p={5} bg={"gray.500"} mb={8} rounded={"2xl"}>
        <Text>Today</Text>
        <Heading size={"md"}>2/10 tasks</Heading>
      </Container>

      <UpcomingTaskList upcomingTasks={upcomingTaskList} />

      <ProjectOverview projects={projectList} />

      <NewProjectModal isOpen={isModalOpen} onClose={() => toggleIsOpen()} />
    </>
  );
}
