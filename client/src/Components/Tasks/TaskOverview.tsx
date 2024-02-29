import React, { useState } from "react";
import {
  Badge,
  Box,
  Heading,
  Select,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { Context } from "../../App";
import { useOutletContext, useRevalidator } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

export default function TaskOverview({ task }: any) {
  const revalidate = useRevalidator();
  const currentView = window.location.pathname.split("/")[1];
  const context = useOutletContext() as Context;
  const updateTaskData = context.updateTaskData;
  const [status, setStatus] = useState(task?.status);
  const taskStatus = [
    "not started",
    "planning",
    "assigned",
    "in progress",
    "review",
    "completed",
  ];

  const updateTaskStatus = (newStatus: string) => {
    revalidate.revalidate();
    updateTaskData(task.id, "todo", "status", newStatus);
    revalidate.revalidate();
  };
  return (
    <Box
      border={"1px solid white"}
      boxShadow={"md"}
      margin={4}
      ml={0}
      padding={4}
      borderRadius={10}
      minW={"25vw"}
      display="flex"
      flexDirection={"column"}
    >
      <Text fontSize="xs">{task?.project?.title}</Text>
      <Heading size="md" py={3}>
        {task?.title}
      </Heading>
      <Box display={"flex"} justifyContent={"space-between"}>
        {currentView !== "dashboard" && (
          <>
            <Select
              variant="unstyled"
              size={"sm"}
              maxW={"25%"}
              placeholder={task?.status}
              onChange={(e) => {
                setStatus(e.target.value);
                updateTaskStatus(e.target.value);
              }}
            >
              {taskStatus
                .filter((status) => {
                  return status !== task?.status;
                })
                .map((status, index) => (
                  <option value={status} key={index}>
                    {status}
                  </option>
                ))}
            </Select>
            <Spacer />
          </>
        )}
        {task?.dueDate ? (
          <>
            <Box display={"flex"} alignItems={"center"}>
              <CalendarIcon mr={1} />
              <Text fontSize="10px">{formatDistanceToNow(task?.dueDate)}</Text>
            </Box>
          </>
        ) : (
          <Box display={"flex"} alignItems={"center"}>
            <CalendarIcon mr={1} />
            <Text fontSize="10px">No Due Date set</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
