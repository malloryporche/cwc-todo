import React from "react";
import {
  Box,
  ButtonGroup,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  IconButton,
  Input,
  Checkbox,
  useEditableControls,
  Stack,
  Text,
  Button,
  useToast,
  useColorMode,
  Image,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context, User } from "../App";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import DeleteAccountModal from "../Components/UI/DeleteAccountModal";

export default function Profile() {
  const context = useOutletContext() as Context;
  const user = context.user;
  const username = context.user.name;
  const email = user.email;
  const darkMode = user.darkMode;
  const { toggleLogin, setUser } = useOutletContext() as Context;
  const navigate = useNavigate();
  const toast = useToast();
  const updateUser = context.updateUserData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    toggleLogin();
    localStorage.removeItem("jwt");
    setUser({ id: 0, name: "", darkMode: true, email: "" });
    navigate("/");
    toast({
      title: "You've successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const { toggleColorMode } = useColorMode();

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    if (isEditing) {
      return (
        <ButtonGroup justifyContent="center" size="sm" mt={2}>
          <IconButton
            aria-label="Update User Data"
            icon={<CheckIcon />}
            {...getSubmitButtonProps()}
          />
          <IconButton
            aria-label="Close editable input"
            icon={<CloseIcon />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      );
    } else {
      return (
        <Flex justifyContent="right">
          <IconButton
            size="sm"
            aria-label="Edit username"
            icon={<EditIcon />}
            {...getEditButtonProps()}
          />
        </Flex>
      );
    }
  }
  return (
    <Container
      h={"90vh"}
      display={"flex"}
      justifyContent={"top"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Heading textAlign="center">Profile</Heading>
      <Stack p={6}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mb={4}
        >
          {/* <Image
            src="https://bit.ly/dan-abramov"
            alt="Dan Abramov"
            borderRadius="full"
            boxSize="100px"
          />{" "} */}
          <Avatar
            size="lg"
            name={user?.name || "User"}
            src="https://bit.ly/kagebunshin"
            mr={4}
          ></Avatar>
        </Box>
        <Editable
          textAlign="center"
          defaultValue={username}
          fontSize="sm"
          isPreviewFocusable={false}
          onSubmit={(value) => {
            updateUser(user.id, "name", value);
            setUser({ ...user, name: value });
          }}
          display="flex"
        >
          <Text mr={4} fontSize="xs" alignItems={"center"} display={"flex"}>
            Name
          </Text>
          <EditablePreview />
          <Input as={EditableInput} />
          <Box ml={4} display={"flex"} alignItems={"center"}>
            <EditableControls />
          </Box>
        </Editable>
        <Editable
          textAlign="center"
          defaultValue={email}
          fontSize="sm"
          isPreviewFocusable={false}
          onSubmit={(value) => {
            updateUser(user.id, "email", value);
            setUser({ ...user, email: value });
          }}
          display="flex"
        >
          <Text mr={4} fontSize="xs" alignItems={"center"} display={"flex"}>
            User email
          </Text>
          <EditablePreview />
          <Input as={EditableInput} />
          <Box ml={4} display={"flex"} alignItems={"center"}>
            <EditableControls />
          </Box>
        </Editable>
        <Flex>
          <Text mr={4} fontSize="xs" alignItems={"center"} display={"flex"}>
            Theme settings:
          </Text>
          <Checkbox
            size="sm"
            colorScheme="blue"
            defaultChecked={darkMode}
            display={"flex"}
            onChange={() => {
              updateUser(user.id, "darkMode", !darkMode);
              toggleColorMode();
              setUser({ ...user, darkMode: !darkMode });
            }}
          >
            <Text mr={4} fontSize="sm" alignItems={"center"} display={"flex"}>
              Dark Mode?
            </Text>
          </Checkbox>
        </Flex>
        <Button onClick={logout} mt={4}>
          Logout
        </Button>

        <Heading size="sm" textAlign={"center"} mt={4}>
          Delete Account
        </Heading>
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Delete your account, your project and all of your tasks.
              </Box>
              <AccordionIcon />
            </AccordionButton>

            <AccordionPanel pb={4}>
              <Button
                colorScheme="red"
                size="sm"
                display={"block"}
                m="auto"
                mb={3}
                onClick={onOpen}
              >
                Delete Account
              </Button>
              <Text> This action cannot be undone. </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
      <DeleteAccountModal isOpen={isOpen} onClose={onClose} />
    </Container>
  );
}
