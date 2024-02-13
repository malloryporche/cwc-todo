import React, { useEffect, useState } from "react";
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
  Toast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";

const Header = () => {
  const jwt = localStorage.getItem("jwt");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);
  let { id } = useParams();

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    if (jwt) {
      if (localStorage.getItem("id") === id) {
        setIsLoggedin(true);
      }
    } else {
      setIsLoggedin(false);
      Toast({
        title: "Logged out",
        description: "You must be logged in to view the Dashboard",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      navigate("/login", { replace: true });
    }
  }, [jwt]);

  return (
    <Container pb={4}>
      <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading size="sm">
            <Link to="/">HoneyDo</Link>
          </Heading>
        </Box>
        <Spacer />

        {jwt ? (
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
                    {jwt ? (
                      <>
                        <MenuItem>
                          <Avatar
                            size="sm"
                            name={localStorage.getItem("name") || "User"}
                            src="https://bit.ly/kagebunshin"
                            mr={4}
                          ></Avatar>
                          <Link to={`/users/${id}/profile`}>
                            Account Settings
                          </Link>
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
