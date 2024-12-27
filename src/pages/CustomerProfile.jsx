import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Table from "../components/Table";
import CustomerAddressRow from "../components/CustomerAddressRow";
import {
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Flex,
  Box,
  Avatar,
  Heading,
  Divider,
  Button,
  Icon,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsPatchCheckFill } from "react-icons/bs";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

export default function CustomerProfile() {
  const [details, setDetails] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();
  const loginInfo = checkLogin();
  let is_sose_elite_user = localStorage.getItem("is_sose_elite_user");

  // const [hashValue, setHashValue] = useState(0);
  useEffect(() => {
    // setHashValue(window.location.hash === "#orders" ? 2 : 0);

    getDetails();
    getOrderData();
    if (is_sose_elite_user === "true") {
      getSubscriptionData();
    } // eslint-disable-next-line
  }, []);
  async function getSubscriptionData() {
    setLoading(true);
    try {
      const response = await client.get("/user/user_subscriptions/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      response.data.status
        ? setOrderData(response.data.data)
        : toast({
            title: `${response.message}`,
            description:
              "There was an error loading your order data! Please reload the page..",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      setLoading(false);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  }
  async function getOrderData() {
    setLoading(true);
    try {
      const response = await client.get("/web/orders/list/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      response.data.status
        ? setOrderData(response.data.data)
        : toast({
            title: `${response.message}`,
            description:
              "There was an error loading your order data! Please reload the page..",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
      setLoading(false);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  async function getDetails() {
    setLoading(true);
    try {
      const response = await client.get("/user/profile/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (response.data.status === true) {
        setDetails(response.data.data);
        setAddresses(response.data.data?.addresses);
        setMobile(response.data.data?.mobile_no);
        console.log(
          "response.data.data?.mobile_no",
          response.data.data?.mobile_no
        );
      } else {
        toast({
          title: `${response.message}`,
          description:
            "There was an error loading your profile! Please reload the page..",
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.order_id,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.order_date,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => "₹ " + row.final_total?.toFixed(2),
      sortable: true,
    },
    {
      name: "Payment Type",
      selector: (row) => row.pay_type,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.sale_status,
      sortable: true,
    },
  ];

  async function deactivateAccount() {
    var config = {
      method: "post",
      url: `${process.env.REACT_APP_API_BASE_URL}/user/deactivate/`,
      headers: {
        Authorization: `token ${loginInfo.token}`,
      },
    };

    axios(config)
      .then((response) => {
        if (response.data.status === true) {
          onClose();
          localStorage.clear();
          navigate("/", { replace: true });
        } else {
          onClose();
        }
      })
      .catch((error) => {});
  }

  function onProfileUpdateClick() {
    navigate("/profile/edit", {
      replace: true,
      state: { details: details },
    });
  }

  return (
    <>
      <Navbar />
      <Container maxW={"container.lg"} py={12}>
        <Tabs isLazy>
          <TabList mb="1em">
            <Tab fontSize={{ base: "sm", md: "md" }} me={4}>
              Details
            </Tab>
            <Tab fontSize={{ base: "sm", md: "md" }} me={4}>
              Addresses
            </Tab>
            <Tab fontSize={{ base: "sm", md: "md" }} me={4}>
              My Orders
            </Tab>
            {is_sose_elite_user === "true" && (
              <Tab fontSize={{ base: "sm", md: "md" }} me={4}>
                Subscription
              </Tab>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>
              <>
                {loading ? (
                  <Box textAlign="center">
                    <Loader />
                  </Box>
                ) : (
                  <Flex
                    justify={details ? "space-between" : "center"}
                    direction={{ base: "column", lg: "row" }}
                    align={"center"}
                  >
                    {details ? (
                      <Flex
                        justify={"flex-start"}
                        align={"center"}
                        gap={{ base: 6, lg: 14 }}
                        direction={{ base: "column", lg: "row" }}
                        mb={{ base: 6, md: 0 }}
                      >
                        <Box>
                          <Avatar
                            size="2xl"
                            src={details?.profile_pic ?? null}
                          />
                        </Box>
                        <Box textAlign={{ base: "center", md: "start" }}>
                          <Flex align="center" fontSize="2xl" gap={2}>
                            {[details?.first_name, details?.last_name].join(
                              " "
                            )}
                            {details?.is_subscribed && (
                              <Icon as={BsPatchCheckFill} color="brand.500" />
                            )}
                          </Flex>
                          <Text fontSize="md" opacity="0.75">
                            {details.company ?? "Company Name"}
                          </Text>
                          <Text fontSize="sm" pt={4} textAlign={"start"}>
                            {details ? (
                              <>
                                <EmailIcon me={2} />
                                {details?.email ?? null}
                              </>
                            ) : null}
                          </Text>
                          <Text fontSize="sm" pt={2} textAlign={"start"}>
                            {details ? (
                              <>
                                <PhoneIcon me={2} />
                                {details?.mobile_no || "Not added"}
                              </>
                            ) : null}
                          </Text>
                        </Box>
                      </Flex>
                    ) : (
                      <Heading size="md" fontWeight={600} align="center">
                        Fetching profile data..
                      </Heading>
                    )}
                    <Flex gap={4} flexDir="column" color={"white"}>
                      <Button
                        bg={"brand.500"}
                        color={"white"}
                        w={"100%"}
                        size="md"
                        _hover={{ bg: "brand.500" }}
                        onClick={onProfileUpdateClick}
                      >
                        Update Profile
                      </Button>
                      <Button
                        bg={"brand.500"}
                        w={"100%"}
                        size="md"
                        color={"white"}
                        _hover={{ bg: "brand.500" }}
                        onClick={() => navigate("/update-password")}
                      >
                        Change Password
                      </Button>
                      <Button
                        as={ReactRouterLink}
                        bg={"red.500"}
                        w={"100%"}
                        color={"white"}
                        size="md"
                        _hover={{ bg: "red.500" }}
                        onClick={onOpen}
                      >
                        Deactivate account
                      </Button>
                      <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                          <ModalHeader>Modal Title</ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Text>
                              Are you sure you want to deactivate your account?
                            </Text>
                          </ModalBody>

                          <ModalFooter justify="center">
                            <Button
                              variant="outline"
                              bg="red.500"
                              color="white"
                              _hover={{ bg: "red.500" }}
                              onClick={deactivateAccount}
                            >
                              Yes, deactivate my account
                            </Button>
                          </ModalFooter>
                        </ModalContent>
                      </Modal>
                    </Flex>
                  </Flex>
                )}
              </>
            </TabPanel>

            <TabPanel pt={0}>
              <Flex justify="flex-end" py={2}>
                <Button
                  as={ReactRouterLink}
                  w="full"
                  to="/profile/addresses/add"
                  colorScheme={"brand"}
                  _hover={{ bg: "brand.900", color: "white" }}
                >
                  <AddIcon boxSize={3} me={2} />
                  Add Address
                </Button>
              </Flex>
              {addresses !== undefined ? (
                addresses.map((address) => (
                  <Box w="100%" key={address.id}>
                    <CustomerAddressRow
                      address={address}
                      getDetails={getDetails}
                    />
                  </Box>
                ))
              ) : (
                <Text>No addresses added yet"</Text>
              )}
            </TabPanel>

            <TabPanel>
              <>
                {loading ? (
                  <Box textAlign="center">
                    <Loader />
                  </Box>
                ) : (
                  <>
                    {orderData?.length > 0 ? (
                      <Table
                        columns={columns}
                        data={orderData}
                        selectable={false}
                        onRowClick={(row, event) =>
                          navigate(`/orders/${row.id}`)
                        }
                        displayExtensions={false}
                      />
                    ) : (
                      <Heading size="md" fontWeight={600} align="center" mt={5}>
                        Order Not Found
                      </Heading>
                    )}
                  </>
                )}
              </>
            </TabPanel>
            <TabPanel>
              <Heading>Subscription</Heading>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
