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

export default function NewProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const [date, setDate] = useState(new Date());
  const [showDescription, setShowDescription] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);

  const toggleView = (
    state: any,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    setState(!state);
  };

  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    completed: false,
  });

  const [newTask, setNewTask] = useState({
    title: "",
  });

  const resetModalView = () => {
    setNewProject({
      title: "",
      description: "",
      completed: false,
    });
    setDate(new Date());
    setNewTask({
      title: "",
    });
    setShowDescription(false);
    setDate(new Date());
    setShowAddTask(false);
  };

  const createNewProject = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    console.log("NEW PROJECT IS ", newProject);
    axios
      .post(
        "http://localhost:3001/projects",
        {
          title: newProject.title,
          description: newProject.description,
          dueDate: date,
          completed: newProject.completed,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        toast({
          title: `${newProject.title} created!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        resetModalView();
      })
      .catch((err) => {
        console.error(err);
        toast({
          title: `${err} creating project.`,
          description: "Something went wrong. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  const createNewTask = (e: React.FormEvent) => {
    e.preventDefault();
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
              onClick={(e) => createNewProject(e)}
            />
          </Box>
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <Input
              ref={initialRef}
              placeholder="Project name"
              value={newProject.title}
              onChange={(e) =>
                setNewProject({ ...newProject, title: e.target.value })
              }
            />
          </FormControl>
          {showDescription && (
            <FormControl mt={4}>
              <Input
                ref={initialRef}
                placeholder="Add a project description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
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
          <Button
            colorScheme="blue"
            mr={3}
            onClick={(e) => createNewProject(e)}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
function toast(arg0: {}) {
  throw new Error("Function not implemented.");
}
