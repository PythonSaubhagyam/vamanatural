import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdGroupAdd } from "react-icons/md";
import { useRef, useState } from "react";
import { AsyncSelect } from "chakra-react-select";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";

function CustomTooltip({ label, icon, ...rest }) {
  return (
    <Tooltip
      shouldWrapChildren
      label={label}
      bg="#eae6df"
      color="black"
      fontSize="xs"
      {...rest}
    >
      <IconButton variant="ghost">{icon}</IconButton>
    </Tooltip>
  );
}

export function Header({ setSearchQuery, setIsValid, isValid }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const loginInfo = checkLogin();
  const initialFormData = Object.freeze({
    group_name: null,
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
    e.preventDefault();
    setLoading(true);
    const response = await client.post(
      "chats/",
      { ...formData },
      {
        headers: { Authorization: `token ${loginInfo.token}` },
      }
    );
    try {
      if (response.data.status) {
        setIsValid(!isValid);
        setSearchQuery();
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
          title: `${response.data.message}`,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `${error}`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };
  return (
    <>
      <Flex
        bg="#f0f2f5"
        justify="space-between"
        py="2"
        px="4"
        borderRight="1px solid #f2f2f2"
        color="#54656f"
      >
        <Avatar
          bg="green.500"
          boxSize="40px"
          name={
            localStorage.getItem("first_name") +
            " " +
            localStorage.getItem("last_name")
          }
          src=""
        />
        <HStack spacing="3" onClick={onOpen}>
          <CustomTooltip
            label={"Create Group Chat"}
            icon={<MdGroupAdd size={28} />}
          />
        </HStack>
      </Flex>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader>Create Group</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Group name</FormLabel>
                <Input
                  size={"sm"}
                  ref={initialRef}
                  placeholder="Enter group name"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      group_name: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Select Group Members</FormLabel>
                <AsyncSelect
                  size={"sm"}
                  variant="outline"
                  placeholder="Select Members"
                  isMulti
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
                      members: arr?.map((obj) => obj.value),
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
