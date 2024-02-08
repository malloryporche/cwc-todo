import React from "react";
import TaskOverview from "./TaskOverview";
import { Flex, Heading, Box, Container, Badge } from "@chakra-ui/react";
import SectionHeader from "../UI/SectionHeader";

interface Task {
  id: number;
  name: string;
  dueDate: string;
}

interface upcomingTaskListProps {
  upcomingTasks: Task[];
}

export default function UpcomingTaskList({
  upcomingTasks,
}: upcomingTaskListProps) {
  return (
    <Container width="100%">
      <SectionHeader title="To Do" count={upcomingTasks.length} />

      <Flex overflowX="auto" p="4">
        <TaskOverview />
        <TaskOverview />
        <TaskOverview />
        <TaskOverview />
        <TaskOverview />
        <TaskOverview />
      </Flex>
    </Container>
  );
}
