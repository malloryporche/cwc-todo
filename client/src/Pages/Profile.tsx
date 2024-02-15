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
} from "@chakra-ui/react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context, User } from "../App";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

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

  const { colorMode, toggleColorMode } = useColorMode();

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
      <Stack p={4}>
        <Editable
          textAlign="center"
          defaultValue={username}
          fontSize="2xl"
          isPreviewFocusable={false}
          onSubmit={(value) => {
            updateUser(user.id, "name", value);
            setUser({ ...user, name: value });
          }}
          display="flex"
        >
          <Text mr={4} fontSize="sm" alignItems={"center"} display={"flex"}>
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
          fontSize="2xl"
          isPreviewFocusable={false}
          onSubmit={(value) => {
            updateUser(user.id, "email", value);
            setUser({ ...user, email: value });
          }}
          display="flex"
        >
          <Text mr={4} fontSize="sm" alignItems={"center"} display={"flex"}>
            User email
          </Text>
          <EditablePreview />
          <Input as={EditableInput} />
          <Box ml={4} display={"flex"} alignItems={"center"}>
            <EditableControls />
          </Box>
        </Editable>
        <Text mr={4} fontSize="sm" alignItems={"center"} display={"flex"}>
          Theme settings:
        </Text>
        <Checkbox
          size="lg"
          colorScheme="blue"
          defaultChecked={darkMode}
          display={"flex"}
          onChange={() => {
            updateUser(user.id, "darkMode", !darkMode);
            toggleColorMode();
            setUser({ ...user, darkMode: !darkMode });
          }}
        >
          Dark Mode?
        </Checkbox>
        <Button onClick={logout}>Logout</Button>
      </Stack>
    </Container>
  );
}
