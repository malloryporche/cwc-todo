import React, { MouseEventHandler, useEffect, useState } from "react";
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
  Container,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../App";

type Props = {
  isLoggedIn: boolean;
  toggleLogin: () => void;
  user?: User;
  setUser: (user: User) => void;
};

const Header = ({ isLoggedIn, toggleLogin, user, setUser }: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navigate = useNavigate();
  const toast = useToast();
  console.log("IS LOGGED IN: ", isLoggedIn);
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

  return (
    <Container pb={4}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="sm">
            <Link to="/">HoneyDo</Link>
          </Heading>
        </Box>
        <Spacer />

        {isLoggedIn ? (
          <>
            <Box>
              <Link to="/projects">Projects</Link>
            </Box>
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    isActive={isOpen}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="ghost"
                  ></MenuButton>
                  <MenuList>
                    {isLoggedIn ? (
                      <>
                        <MenuItem>
                          <Avatar
                            size="sm"
                            name={user?.name || "User"}
                            src="https://bit.ly/kagebunshin"
                            mr={4}
                          ></Avatar>
                          <Link to={`/profile`}>Account Settings</Link>
                        </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                      </>
                    ) : (
                      <MenuItem>
                        <Link to="/login">Login</Link>
                      </MenuItem>
                    )}
                  </MenuList>
                </>
              )}
            </Menu>
          </>
        ) : (
          <Box>
            <Link to="/login">Sign In</Link>
          </Box>
        )}

        <Box>
          <Button onClick={toggleColorMode} variant={"ghost"}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </Flex>
    </Container>
  );
};

export default Header;
