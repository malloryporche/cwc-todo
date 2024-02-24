import {
  AddIcon,
  ArrowBackIcon,
  CalendarIcon,
  CheckIcon,
  StarIcon,
} from "@chakra-ui/icons";
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
  Icon,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import React from "react";
import {
  MdAddComment,
  MdDateRange,
  MdComment,
  MdOutlineNewLabel,
  MdOutlineNotificationAdd,
  MdInsertComment,
} from "react-icons/md";

export default function NewProjectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const newProject = {
    title: "",
    description: "",
    dueDate: "",
    completed: false,
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
              onClick={onClose}
            />
          </Box>
          <Box>Create New Task</Box>
          <Box>
            <IconButton aria-label="Save project" icon={<CheckIcon />} />
          </Box>
        </ModalHeader>
        <ModalBody pb={6}>
          <FormControl>
            <Input ref={initialRef} placeholder="Project name" />
          </FormControl>
          <FormControl mt={4} display={"flex"}>
            <Button aria-label="Choose due date" leftIcon={<StarIcon />} mr={3}>
              Today
            </Button>
            <Button aria-label="Add due date" leftIcon={<MdDateRange />}>
              Tomorrow
            </Button>
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
            <IconButton aria-label="add comment" icon={<MdComment />} />
          </FormControl>
          <FormControl mt={4}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AddIcon color="gray.300" />
              </InputLeftElement>
              <Input placeholder="Add task" />
            </InputGroup>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
