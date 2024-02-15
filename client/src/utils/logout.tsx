import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { Context } from "../App";

export default function logout() {
  const { toggleLogin, setUser } = useOutletContext() as Context;
  const navigate = useNavigate();
  const toast = useToast();

  // localStorage.removeItem("token");
  console.log("Logged out");
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
}
