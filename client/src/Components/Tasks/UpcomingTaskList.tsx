import React from "react";
import TaskOverview from "./TaskOverview";
import { Flex, Heading, Box, Container, Badge } from "@chakra-ui/react";
import SectionHeader from "../UI/SectionHeader";
import { Task } from "../../Pages/Dashboard";

interface upcomingTaskListProps {
  upcomingTasks: Task[];
}

export default function UpcomingTaskList({
  upcomingTasks,
}: upcomingTaskListProps) {
  return (
    <Container width="100%">
      <SectionHeader title="To Do" count={upcomingTasks?.length} />

      <Flex overflowX="auto" p="4">
        {upcomingTasks?.map((task) => (
          <TaskOverview key={task?.id} task={task} />
        ))}
      </Flex>
    </Container>
  );
}
