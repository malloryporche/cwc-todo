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
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";

export default function Profile() {
  const data = useLoaderData();
  const context = useOutletContext() as Context;
  const user = context.user;
  const username = context.user.name;
  const email = user.email;
  const darkMode = user.darkMode;
  const setUser = context.setUser;

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
            aria-label="Update Username"
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
          onChange={(e) => {
            setUser({ ...user, darkMode: !darkMode });
          }}
        >
          Dark Mode?
        </Checkbox>
      </Stack>
    </Container>
  );
}
