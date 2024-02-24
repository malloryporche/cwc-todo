import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { Context } from "../../App";
import { useOutletContext } from "react-router-dom";

export default function DeleteAccountModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [deleteAccount, setDeleteAccount] = React.useState("");
  const context = useOutletContext() as Context;
  const deleteUser = context.deleteAccount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deleteAccount === "DELETE ACCOUNT") {
      console.log("DELETE ACCOUNT", deleteAccount);
      deleteUser();
      onClose();
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={6}>
            <FormControl isRequired>
              <FormLabel>Type DELETE ACCOUNT to confirm.</FormLabel>
              <Input
                ref={initialRef}
                placeholder="DELETE ACCOUNT"
                onChange={(e) => setDeleteAccount(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              display={"block"}
              m="auto"
              onClick={handleSubmit}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
