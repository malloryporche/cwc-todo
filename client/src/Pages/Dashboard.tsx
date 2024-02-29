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
import { useLoaderData, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import NewProjectModal from "../Components/UI/NewProjectModal";

export interface Task {
  id: number;
  title: string;
  dueDate: string;
}

export interface Project {
  id: number;
  title: string;
  dueDate: Date;
  status: ["Not Started", "In Progress", "Completed"];
  todos: Task[];
}

interface User {
  id: number;
  name: string;
  email: string;
  projects: Project[];
  tasks: Task[];
  darkMode: boolean;
}

interface ActiveProjectsData {
  projects: Project[];
  activeTasks: Task[];
}

export default function Dashboard() {
  const projectData = useLoaderData() as ActiveProjectsData;
  console.log(projectData);
  const activeProjects = projectData.projects as Project[];
  const taskData = projectData.activeTasks as Task[];
  const context = useOutletContext() as Context;
  const user = context.user;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState(activeProjects);
  const [tasks, setTasks] = useState(taskData);

  console.log("tasks are: ", tasks);
  const toggleIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const createTask = (e: React.FormEvent, task: Task) => {
    e.preventDefault();
  };

  const todaysDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

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
      <Container p={5} mb={8} rounded={"2xl"}>
        <Text>{todaysDate}</Text>
        <Heading size={"md"}>2/10 tasks</Heading>
      </Container>

      <UpcomingTaskList upcomingTasks={tasks} />

      <ProjectOverview projects={projects} />

      <NewProjectModal isOpen={isModalOpen} onClose={() => toggleIsOpen()} />
    </>
  );
}
