import {
    Flex,
    Box,
    HStack,
    Text,
    Avatar,
    chakra,
    Button,
    CSSReset,
    Stack,
    Tag,
    TagLabel,
    TagCloseButton,
    Spacer, Center,
    CircularProgress,
    useToast
} from "@chakra-ui/react";
import { SendIcon } from "./icons";
import { useState } from "react";
import { useRef } from "react";
import InputEmoji from "react-input-emoji";
import { useEffect } from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import moment from "moment";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import { DownloadWithIcon } from "../utils/FileDownloader";
import { InfoIcon } from "@chakra-ui/icons";

export function RightPanel() {
  const [messageList, setMessageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState([]);
  const [text, setText] = useState("");
  const messageContainerRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const group_id = searchParams.get("group_id");
  const name = searchParams.get("name");
  const toast = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  // const [sendingMessage, setSendingMessage] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleFileRemove = () => {
    setSelectedFile();
  };
  useEffect(() => {
    getChats(); // eslint-disable-next-line
  }, [group_id]);

  setTimeout(() => {
    getChats();
  }, 20000);

  const addMessage = async (newMessage) => {
    // setSendingMessage(true);
    if (selectedFile) {
      const payload = {
        chat: group_id,
        files: selectedFile,
      };
      if (newMessage.length > 0) {
        payload.message = newMessage.trim();
      }
      sendRequest(payload);
    } else {
      if (newMessage.trim().length > 0) {
        const payload = {
          chat: group_id,
          message: newMessage.trim(),
        };
        sendRequest(payload);
      }
    }
  };

  const sendRequest = async (payload) => {
    try {
      const res = await client.post("/message/", payload, {
        headers: {
          Authorization: `token ${checkLogin().token}`,
          "content-type": "multipart/form-data",
        },
      });
      if (res.data.status === true) {
        setText();
      }
      getChats();
      handleFileRemove();
    } catch (error) {
      console.error(error);
    }
  };

  async function getChats() {
    try {
      const res = await client.get("/chats", {
        headers: { Authorization: `token ${checkLogin().token}` },
      });
      if (res.data.status === true) {
        // setGroups(res.data.groups);

        setGroup(res.data.groups);
        setMessageList(foundElement?.all_messages);
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: error.message ? error.message : error,
        position: "top-right",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }
  const handleInputSubmit = () => {
    addMessage(text);
  };

  const foundElement = group.find((item) => item.id === parseInt(group_id));

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <Box position="relative" h="90vh" minWidth="75%" maxWidth="75%">
      {!group_id && (
        <Box textAlign="center" pt={"20%"} px={6}>
          <InfoIcon boxSize={"50px"} color={"green.500"} />
          <Box
            style={{ fontSize: 20, fontWeight: 600 }}
            size="xl"
            mt={6}
            mb={2}
          >
            No message here yet...
          </Box>
          <Text color={"gray.500"}></Text>
        </Box>
      )}
      {group_id && (
        <>
          <HStack
            _hover={{
              backgroundColor: "#f5f6f6",
            }}
            backgroundColor={"#ffffff"}
            py="3"
          >
            <Avatar bg="green.500" mx="3" name={name} />
            <Box flex="1" pr="4">
              <Flex justify="space-between" align="baseline">
                <Box>
                  <Text style={{ fontWeight: "600" }}>{name}</Text>
                  <HStack>
                    <Text color="#667781" fontSize="sm">
                      {foundElement?.is_single_chat
                        ? ""
                        : foundElement?.group_members?.total_members +
                          " Members"}
                    </Text>
                  </HStack>
                </Box>
                <chakra.time fontSize="xs" color="#667781"></chakra.time>
              </Flex>
            </Box>
          </HStack>
          {loading ? (
            <Center w="100%" h="70vh" backgroundColor={"#f3f3f3"}>
              <CircularProgress
                isIndeterminate
                color="green.500"
                speed="0.65s"
                emptyColor="gray.200"
              />
            </Center>
          ) : (
            <HStack backgroundColor={"#f3f3f3"}>
              <CSSReset />
              <Stack
                spacing="0"
                pr="1"
                h="70vh"
                flex="1"
                overflow="auto"
                p="5"
                ref={messageContainerRef}
              >
                {foundElement?.all_messages?.map((message) => (
                  <Flex key={message.id} justify={"flex-start"} pb={3}>
                    <Avatar
                      bg="green.500"
                      size="xs"
                      name={message?.sent_by}
                      src=""
                    ></Avatar>
                    <span
                      style={{
                        marginLeft: "10px",
                        minWidth: "20%",
                        maxWidth: "85%",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: "12px",
                          margin: 2,
                          fontWeight: "600",
                        }}
                      >
                        {message?.sent_by}
                      </Text>
                      {message.message && (
                        <Box
                          bg={"gray.200"}
                          color={"black"}
                          p={2}
                          style={{
                            borderRadius: "0px 10px 10px",
                          }}
                          alignSelf={
                            message.sender === "user"
                              ? "flex-start"
                              : "flex-start"
                          }
                        >
                          <Text
                            style={{
                              fontSize: "14px",
                              whiteSpace: "wrap",
                            }}
                          >
                            {message.message}
                          </Text>
                          <Flex justifyContent={"flex-end"}>
                            <span
                              style={{
                                fontSize: "11px",
                                marginRight: 5,
                                fontWeight: "500",
                                color: "#8f8f8f",
                              }}
                            >
                              {moment(message.sent_at).format(
                                "Do YYYY, h:mm A"
                              )}
                            </span>
                          </Flex>
                        </Box>
                      )}

                      {message.attachment_data && (
                        <Box
                          bg={"gray.200"}
                          color={"black"}
                          p={2}
                          style={{
                            borderRadius: "0px 10px 10px",
                          }}
                          alignSelf={
                            message.sender === "user"
                              ? "flex-start"
                              : "flex-start"
                          }
                        >
                          <Flex m={2}>
                            <Box>
                              <BsFileEarmarkText size={28} />
                            </Box>
                            <Box ml={2}>
                              <span style={{ fontSize: 14 }}>
                                {message.attachment_data.file_name}
                              </span>
                            </Box>
                            <Spacer />
                            <Box>
                              <DownloadWithIcon
                                url={message.attachment_data.file_url}
                                fileName={message.attachment_data.file_name}
                                size={28}
                              />
                            </Box>
                          </Flex>
                          <Flex justifyContent={"flex-end"}>
                            <span
                              style={{
                                fontSize: "11px",
                                marginRight: 5,
                                fontWeight: "500",
                                color: "#8f8f8f",
                              }}
                            >
                              {moment(message.sent_at).format(
                                "Do YYYY, h:mm A"
                              )}
                            </span>
                          </Flex>
                        </Box>
                      )}
                    </span>
                  </Flex>
                ))}
              </Stack>
            </HStack>
          )}
          <HStack backgroundColor="#ffffff" px="3" h="10vh">
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <Button
              color="green.500"
              bg="green.100"
              style={{ borderRadius: "25px" }}
              variant="outline"
              onClick={() => fileInputRef.current.click()}
            >
              <BsFileEarmarkText size={24} />
            </Button>
            {selectedFile && (
              <Tag size="lg" colorScheme="green" borderRadius="full" py={2}>
                <TagLabel fontSize={13}>{selectedFile.name}</TagLabel>
                <TagCloseButton onClick={() => handleFileRemove()} />
              </Tag>
            )}
            <InputEmoji
              className="chat-input"
              type="text"
              id="messageInput"
              value={text}
              onChange={setText}
              cleanOnEnter
              onEnter={handleInputSubmit}
              placeholder="Type a message"
            />
            <Button
              bg="green.500"
              onClick={() => handleInputSubmit()}
              style={{ borderRadius: "25px" }}
            >
              <SendIcon />
            </Button>
          </HStack>
        </>
      )}
    </Box>
  );
}
