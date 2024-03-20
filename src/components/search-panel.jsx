import {
  Button, FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter, ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AsyncSelect } from "chakra-react-select";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import { SearchIcon } from "./icons";
import { FaUserPlus } from "react-icons/fa";

export function SearchPanel({ setSearchQuery, setIsValid, isValid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const loginInfo = checkLogin();
  const initialFormData = Object.freeze({
    members: [],
  });
  const [formData, setFormData] = useState(initialFormData);

  const employeesOptions = async (inputValue) => {
    let Options = [];
    if (inputValue.length > 2) {
      const employeesRes = await client.get(
        `/user/employee/?responsible=${inputValue}`,
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (employeesRes.status) {
        employeesRes.data.employees?.map((data) =>
          Options.push({
            label: [data.first_name, data.last_name].join(" "),
            value: data.id,
          })
        );
      }
    }
    return Options;
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const response = await client.post(
        "chats/",
        { members: [formData.members] },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (response?.data.status) {
        setSearchQuery();
        setIsValid(!isValid);
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error?.response.data.message,
        position: "top-right",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }
    setLoading(false);
  };
  return (
    <>
      <HStack
        spacing={2}
        px="4"
        py="2"
        borderBottom="1px"
        borderColor="#e2e8f0"
      >
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            _placeholder={{
              opacity: 0.6,
              color: "#3b4a54",
              fontSize: "15px",
            }}
            h="36px"
            _hover={{ bg: "#f0f2f5" }}
            bg="#f0f2f5"
            variant="outline"
            placeholder="Search or start new chat"
            className="chat-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <Tooltip
          shouldWrapChildren
          label="New Chat"
          bg="#eae6df"
          color="black"
          fontSize="xs"
        >
          <IconButton
            style={{ border: "1px solid" }}
            className="chat-input"
            onClick={onOpen}
          >
            <FaUserPlus />
          </IconButton>
        </Tooltip>
      </HStack>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Select Person</FormLabel>
                <AsyncSelect
                  size={"sm"}
                  variant="outline"
                  placeholder="Select Person"
                  selectedOptionColorScheme={"brand"}
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      minWidth: "350px",
                    }),
                  }}
                  loadOptions={employeesOptions}
                  onChange={(arr) =>
                    setFormData({
                      ...formData,
                      members: arr.value,
                    })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                isLoading={loading}
                loadingText="Creating"
                colorScheme="green"
                mr={3}
                type="submit"
              >
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
