import React, { useState } from "react";
import {
  Button,
  useColorMode,
  Flex,
  Spacer,
  Heading,
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Avatar,
  Text,
  Container,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const jwt = localStorage.getItem("jwt");
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedin, setIsLoggedin] = useState(true);

  const updateLogin = () => {
    setIsLoggedin(!isLoggedin);
  };

  console.log(localStorage);
  return (
    <Container>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="sm">HoneyDo</Heading>
        </Box>
        <Spacer />
        <Box>
          <Heading size="sm">Projects</Heading>
        </Box>
        <Box>
          <Heading size="sm">Tasks</Heading>
        </Box>
        <Box>
          <Button onClick={toggleColorMode} variant={"ghost"}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
        <Menu>
          {({ isOpen }) => (
            <>
              <MenuButton
                isActive={isLoggedin}
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="ghost"
              ></MenuButton>
              <MenuList>
                {isLoggedin ? (
                  <>
                    <MenuItem onClick={() => alert("Modal with user settings")}>
                      <Avatar
                        size="sm"
                        name={localStorage.getItem("name") || "User"}
                        src="https://bit.ly/kagebunshin"
                      ></Avatar>
                      <Text pl="2">Account Settings</Text>
                    </MenuItem>
                    <MenuItem onClick={updateLogin}>Logout</MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={() => alert("Modal with login")}>
                    Login
                  </MenuItem>
                )}
              </MenuList>
            </>
          )}
        </Menu>
      </Flex>
    </Container>
  );
};

export default Header;
