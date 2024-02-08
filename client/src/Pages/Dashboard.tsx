import {
  Container,
  Heading,
  Button,
  Text,
  Flex,
  Spacer,
  Box,
  Badge,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import UpcomingTaskList from "../Components/Tasks/UpcomingTaskList";
import ProjectOverview from "../Components/Projects/ProjectOverview";
import { useParams } from "react-router-dom";

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

export default function Dashboard() {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

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
  const { id } = useParams();
  // console.log("id is ", id);

  useEffect(() => {
    fetch(`http://localhost:3001/user/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Container mb={8}>
        <Flex>
          <Heading>Hello Username</Heading>
          <Spacer />
          <Button onClick={() => {}}>New Task</Button>
        </Flex>
      </Container>
      <Container p={5} bg={"gray.500"} maxW={"90%"} mb={8}>
        <Text>Today</Text>
        <Heading size={"md"}>2/10 tasks</Heading>
      </Container>

      <UpcomingTaskList upcomingTasks={upcomingTaskList} />

      <ProjectOverview projects={projectList} />
    </>
  );
}
