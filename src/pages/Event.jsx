import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  Center,
  Skeleton
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import moment from "moment";
import client from "../setup/axiosClient";
import Loader from "../components/Loader";
// import { Select } from "chakra-react-select";
import { useLocation } from "react-router-dom";
import MetaTags from "../context/MetaTagsContext";


const Event = () => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";

  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("upcoming_events");
  const [category, setCategory] = useState("Physical Event");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents();
  }, [status, category]);
  async function getEvents() {
    setLoading(true)
    let params = { status, category };

    const response = await client.get("/events/ecommerce/", {
      params: params,
    });
    setEvents(response.data.events);
    setLoading(false);
  }
  const pageUrl = "/event";


  return (
    <>
      <MetaTags pageUrl={pageUrl} />

      {IsMobileView !== "true" && <Navbar />}

      <Container
        maxW="container.xl"
        my={4}
        py={6}
        px={16}
        background={"gray.100"}
      >
        <Flex
          justifyContent={"space-between"}
          gap={2}
          flexDirection={{ md: "row", base: "column" }}
        >
          <Text
            fontSize={24}
            color={"text.500"}
            fontWeight={600}
            textAlign={{ base: "start", md: "start" }}
          >
            Events
          </Text>

          <Flex gap={3} flexDirection={{ md: "row", base: "column" }}>
            <Box>
              <Menu>
                <MenuButton
                  colorScheme={"brand"}
                  as={Button}
                  size={"sm"}
                  leftIcon={<FaCalendarDays />}
                  rightIcon={<ChevronDownIcon />}
                >
                  {category}
                </MenuButton>
                <MenuList onClick={(e) => setCategory(e.target.value)}>
                  <MenuItem value={"Physical Event"}>Physical Event</MenuItem>
                  <MenuItem value={"Online"}>Online</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <Menu>
                <MenuButton
                  colorScheme={"brand"}
                  as={Button}
                  size={"sm"}
                  leftIcon={<FaCalendarDays />}
                  rightIcon={<ChevronDownIcon />}
                >
                  {status
                    .split("_")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </MenuButton>
                <MenuList onClick={(e) => setStatus(e.target.value)}>
                  <MenuItem value={"all_events"}>All Events</MenuItem>
                  <MenuItem value={"upcoming_events"}>Upcoming Events</MenuItem>
                  <MenuItem value={"past_events"}>Past Events</MenuItem>
                  <MenuItem value={"this_month"}>This month</MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box>
              <InputGroup>
                <Input
                  variant={"outline"}
                  size={"sm"}
                  placeholder="Search an event.."
                />
                <InputRightElement height={"2rem"}>
                  <IoSearch color="green.500" />
                </InputRightElement>
              </InputGroup>
            </Box>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="container.xl" px={16} py={5}>
        {loading ? (
          <Center h="60vh" w="100%">
            <Loader />
          </Center>
        ) : (
          <>
            {events?.length > 0 ?
              <Grid
                templateColumns={{
                  md: "repeat(2, 1fr)",
                  base: "repeat(1, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={6}
              >
                {events?.map((data) => (
                  <Box
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                    background={"gray.100"}
                    cursor={"pointer"}
                    boxShadow={
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                    }
                    onClick={() => navigate(`/event/${data.id}`)}
                  >
                    <Box position="relative">
                      <Image
                        src={data.event_image}
                        alt="cyber security"
                        h={"210px"}
                        w={"100%"}
                        borderRadius="lg"
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "18px", // Adjusted to move the div to the top
                          right: "18px", // Keep it on the right side
                          backgroundColor: "#edf2f7",
                          padding: "6px",
                          fontWeight: "600",
                          fontSize: "small",
                          textAlign: "center",
                          borderRadius: "50%",
                          width: "80px",
                          //height:"50px",
                          boxShadow:
                            "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                        }}
                      >
                        {moment(data.start_datetime).format("MMMM")} <br />
                        {moment(data.start_datetime).format("D")}
                      </div>{" "}
                    </Box>
                    <Box p="6">
                      <Stack spacing="3">
                        <Heading fontSize="xl">{data.title}</Heading>
                        <Text fontSize="sm">
                          {moment(data.start_datetime).format(
                            "MMMM D, YYYY - h:mm A"
                          )}
                        </Text>
                        {/* <Text>(America/Martinique)</Text> */}
                      </Stack>
                    </Box>
                  </Box>
                ))}{" "}
              </Grid>
              : <Flex justifyContent="center" my={6}>
                <Text color="gray.400" fontWeight={600}>No events added!</Text>
              </Flex>}
          </>
        )}
      </Container>

      {IsMobileView !== "true" && <Footer />}

    </>
  );
};

export default Event;