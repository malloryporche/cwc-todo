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
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const jwt = localStorage.getItem("jwt");
  const { colorMode, toggleColorMode } = useColorMode();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const updateLogin = () => {
    setIsLoggedin(!isLoggedin);
  };

  console.log(localStorage);
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading size="md">HoneyDo</Heading>
      </Box>
      <Spacer />
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
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                <Text pl="2">Mode</Text>
              </MenuItem>
              {isLoggedin ? (
                <>
                  <MenuItem onClick={() => alert("Modal with user settings")}>
                    <Avatar
                      size="sm"
                      name="Mallory Burke"
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
  );
};

export default Header;
