import { AddIcon, ArrowBackIcon, CheckIcon, StarIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  IconButton,
  Input,
  ModalFooter,
  Button,
  Box,
  InputLeftElement,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  MdComment,
  MdOutlineNewLabel,
  MdOutlineNotificationAdd,
  MdOutlineDescription,
  MdPlusOne,
} from "react-icons/md";
import { DatePicker } from "./Datepicker";
import axios from "axios";
import { Project } from "../../Pages/Dashboard";
import { useRevalidator } from "react-router-dom";

export default function NewTodoModal({
  project,
  isOpen,
  onClose,
}: {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const [date, setDate] = useState(new Date());
  const [showDescription, setShowDescription] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const revalidate = useRevalidator();
  const toggleView = (
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setState(!state);
  };

  const [tasks, setTasks] = useState(project.todos);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });

  const resetModalView = () => {
    setDate(new Date());
    setNewTask({
      title: "",
      description: "",
    });
    setShowDescription(false);
    setDate(new Date());
    setShowAddTask(false);
  };

  const createNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    console.log("NEW TASK IS ", newTask);
    axios
      .post(
        "http://localhost:3001/todo",
        {
          title: newTask.title,
          description: newTask.description,
          dueDate: date,
          projectId: project?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        setTasks((prev) => [...prev, res.data]);
        revalidate.revalidate();
        toast({
          title: `${newTask.title} created!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetModalView();
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `${err} creating task.`,
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
      <ModalContent>
        <ModalHeader display={"flex"} justifyContent={"space-between"}>
          <Box>
            <IconButton
              aria-label="Back"
              icon={<ArrowBackIcon />}
              onClick={() => {
                onClose();
                resetModalView();
              }}
            />
          </Box>
          <Box>Create New Task</Box>
          <Box>
            <IconButton
              aria-label="Save project"
              icon={<CheckIcon />}
              onClick={(e) => createNewTask(e)}
            />
          </Box>
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <Input
              ref={initialRef}
              placeholder="Task name"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
          </FormControl>
          {showDescription && (
            <FormControl mt={4}>
              <Input
                ref={initialRef}
                placeholder="Add a description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
            </FormControl>
          )}
          <FormControl mt={4} display={"flex"}>
            <IconButton
              aria-label="add description"
              icon={<MdOutlineDescription />}
              mr={3}
              onClick={() => toggleView(showDescription, setShowDescription)}
            />
            <Button
              aria-label="Choose due date"
              leftIcon={<StarIcon />}
              mr={3}
              onClick={() => setDate(date)}
            >
              Today
            </Button>

            <DatePicker
              selectedDate={date}
              onChange={setDate}
              showPopperArrow={false}
            />
          </FormControl>
          <FormControl mt={4} display={"flex"}>
            <IconButton
              aria-label="label project"
              icon={<MdOutlineNewLabel />}
              mr={3}
            />
            <IconButton
              aria-label="add notification"
              icon={<MdOutlineNotificationAdd />}
              mr={3}
            />
            <IconButton aria-label="add comment" icon={<MdComment />} mr={3} />
            <IconButton
              aria-label="add comment"
              icon={<AddIcon />}
              onClick={() => toggleView(showAddTask, setShowAddTask)}
            />
          </FormControl>
          {showAddTask && (
            <FormControl mt={4}>
              <InputGroup>
                <InputLeftElement>
                  <AddIcon color="gray.300" />
                </InputLeftElement>
                <Input placeholder="Add task" />
              </InputGroup>
            </FormControl>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={(e) => createNewTask(e)}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
