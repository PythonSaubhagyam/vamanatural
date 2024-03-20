import {
  Avatar,
  chakra,
  HStack,
  Stack,
  Flex,
  Box,
  StackDivider,
  Text,
  //  useToast
} from "@chakra-ui/react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

export function ChatList({ Groups, closeChat }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group_id = searchParams.get("group_id");
  const navigate = useNavigate();
  // const toast = useToast();

  return (
    <Stack
      spacing="0"
      pr="1"
      divider={<StackDivider w="82%" alignSelf="flex-end" />}
      style={{ overflow: "auto" }}
    >
      <Box
        style={{
          backgroundColor: "#325800",
          color: "white",
          padding: "5px 12px",
          display: "flex",
          fontSize: 14,
          borderRadius: 5,
        }}
      >
        <MdGroup size={22} />
        <span style={{ paddingLeft: 4, fontWeight: 600 }}>Groups</span>
      </Box>
      {Groups.filter((data) => data.is_single_chat === false).map((item) => (
        <>
          <HStack
            style={
              item.id === group_id
                ? { background: "#38a16978", borderRadius: "8px" }
                : {}
            }
            _hover={{
              cursor: "pointer",
              backgroundColor: "#f5f6f6",
            }}
            py="2"
            onClick={() => {
              navigate(
                `/discuss/?group_id=${item.id}&chat_id=${item.chat_id}&name=${item.group_name}`
              );
            }}
          >
            <Avatar size="sm" bg="green.500" mx="3" name={item.group_name} />
            <Box flex="1" pr="4">
              <Flex justify="space-between" align="baseline">
                <Box>
                  <Text fontWeight="medium">{item.group_name}</Text>
                  <HStack>
                    <Text color="#667781" fontSize="sm"></Text>
                  </HStack>
                </Box>
                <chakra.time fontSize="xs" color="#667781"></chakra.time>
              </Flex>
            </Box>
          </HStack>
        </>
      ))}
      {Groups.filter((data) => data.is_single_chat === false).length === 0 && (
        <Box
          style={{ fontSize: 14, fontWeight: 600, textAlign: "center" }}
          py={10}
        >
          No group chat here yet..
        </Box>
      )}
      <Box
        style={{
          backgroundColor: "#325800",
          color: "white",
          padding: "5px 12px",
          display: "flex",
          fontSize: 14,
          borderRadius: 5,
        }}
      >
        <FaUser size={16} style={{ marginTop: 2 }} />
        <span style={{ paddingLeft: 7, fontWeight: 600 }}> Personal</span>
      </Box>
      {Groups.filter((data) => data.is_single_chat === true).map((item) => (
        <>
          <HStack
            style={
              item.id === group_id
                ? { background: "#38a16978", borderRadius: "8px" }
                : {}
            }
            _hover={{
              cursor: "pointer",
              backgroundColor: "#f5f6f6",
            }}
            py="2"
          >
            <Avatar
              size="sm"
              bg="green.500"
              mx="3"
              name={item.group_name}
              onClick={() => {
                navigate(
                  `/discuss/?group_id=${item.id}&chat_id=${item.chat_id}`
                );
              }}
            />
            <Box
              flex="1"
              pr="4"
              onClick={() => {
                navigate(
                  `/discuss/?group_id=${item.id}&chat_id=${item.chat_id}&name=${item.group_name}`
                );
              }}
            >
              <Flex justify="space-between" align="baseline">
                <Box>
                  <Text fontWeight="medium">{item.group_name}</Text>
                  <HStack>
                    <Text color="#667781" fontSize="sm"></Text>
                  </HStack>
                </Box>
                <chakra.time fontSize="xs" color="#667781"></chakra.time>
              </Flex>
            </Box>

            <AiFillCloseCircle
              size={"24px"}
              color="red.500"
              style={{ marginRight: 8 }}
              onClick={() => closeChat(item.chat_id)}
            />
          </HStack>
        </>
      ))}
      {Groups.filter((data) => data.is_single_chat === true).length === 0 && (
        <Box
          style={{ fontSize: 14, fontWeight: 600, textAlign: "center" }}
          py={10}
        >
          No chat here yet..
        </Box>
      )}
    </Stack>
  );
}
