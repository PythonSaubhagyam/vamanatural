import {
  Flex,
  IconButton,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
// import { isDisabled } from "@testing-library/user-event/dist/utils";

export default function Actions({
  borderDisplay = true,
  onEditClick,
  onDeleteClick,
  showDelete = true,
  showEdit = true,
  isDisabled
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Flex
        justify="flex-end"
        align="center"
        borderBottom={borderDisplay ? "1px" : "none"}
        borderColor={"gray.300"}
        py={2}
        pe={4}
      >
       { showEdit === true && ( <IconButton
          aria-label="Edit Button"
          size="md"
          variant="link"
          colorScheme={"gray"}
          icon={<EditIcon />}
          onClick={onEditClick}
          isDisabled={isDisabled}
        />
       )}
        {showDelete === true && (
          <IconButton
            aria-label="Delete Button"
            size="md"
            variant="link"
            colorScheme={"red"}
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        )}
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody pt={6} pb={4}>
            Are you sure you want to remove this record?
          </ModalBody>
          <Divider h="1px" bg="gray.300" />
          <ModalFooter as={ButtonGroup} py={2}>
            <Button colorScheme="red" onClick={onDeleteClick}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
