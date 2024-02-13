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
import { AddIcon } from "@chakra-ui/icons";
import React, { useState, useEffect } from "react";
import UpcomingTaskList from "../Components/Tasks/UpcomingTaskList";
import ProjectOverview from "../Components/Projects/ProjectOverview";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    email: "",
    projects: [],
    tasks: [],
    darkMode: true,
  });
  const [isLoggedin, setIsLoggedin] = useState(true);
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

  useEffect(() => {
    const configHeaders = {
      headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
    };

    axios
      .get(`http://localhost:3001/users/${id}`, configHeaders)
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .then(() => setIsLoggedin(true))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <Container mb={8}>
        <Flex>
          <Heading size="lg" mb={4}>
            Hello {user && user.name}
          </Heading>
          <Spacer />
          <Button onClick={() => {}}>
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
    </>
  );
}
