// File: pages/CustomerProfile.js
import { useState, useEffect } from "react";
import {
  Container,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";
import Loader from "../components/Loader";
import checkLogin from "../utils/checkLogin";
import client from "../setup/axiosClient";
import ProfileDetailsCard from "../components/ProfileDetailsCard";
import CustomerAddressesTab from "../components/CustomerAddressesTab";
import CustomerOrdersTab from "../components/CustomerOrdersTab";
import CustomerSubscriptionTab from "../components/CustomerSubscriptionTab";
import { FaCheckCircle } from "react-icons/fa";
import { RiCloseCircleFill } from "react-icons/ri";

export default function CustomerProfile() {
  const [details, setDetails] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [eliteData, setEliteData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const loginInfo = checkLogin();
  const is_sose_elite_user = localStorage.getItem("is_sose_elite_user");

  useEffect(() => {
    if (location.hash === "#orders") setActiveTabIndex(2);
    getDetails();
    getOrderData();
    if (is_sose_elite_user === "true") getSubscriptionData();
  }, [location]);

  async function getDetails() {
    setLoading(true);
    try {
      const res = await client.get("/user/profile/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (res.data.status) {
        setDetails(res.data.data);
        setAddresses(res.data.data.addresses);
      } else {
        toast({
          title: "Error loading profile",
          description: res.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  async function getOrderData() {
    setLoading(true);
    try {
      const res = await client.get("/web/orders/list/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (res.data.status) setOrderData(res.data.data);
    } catch {
      toast({
        title: "Order loading failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  async function getSubscriptionData() {
    setLoading(true);
    try {
      const res = await client.get("/user/profile_elite_users/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (res.data.status) setEliteData(res.data.data);
    } catch {
      toast({
        title: "Subscription loading failed",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  }

  const orderColumns = [
    { name: "Order ID", selector: (row) => row.order_id, sortable: true },
    { name: "Order Date", selector: (row) => row.order_date, sortable: true },
    { name: "Amount", selector: (row) => `₹ ${row.final_total?.toFixed(2)}`, sortable: true },
    { name: "Payment Type", selector: (row) => row.pay_type, sortable: true },
    { name: "Status", selector: (row) => row.sale_status, sortable: true },
  ];

  const subscriptionColumns = [
    { name: "Name", selector: (row) => row.user_data?.name || "-", sortable: true },
    { name: "Start Date", selector: (row) => moment(row.start_date).format("DD-MM-YYYY"), sortable: true },
    { name: "End Date", selector: (row) => moment(row.end_date).format("DD-MM-YYYY"), sortable: true },
    { name: "Expire", selector: (row) => row.is_expired ?? "-", sortable: true },
    {
      name: "Is Active",
      selector: (row) => row.is_active,
      sortable: true,
      cell: (row) => row.is_active ? <FaCheckCircle color="#436131" fontSize={16} /> : <RiCloseCircleFill color="#A52A2A" fontSize={18} />,
    },
  ];

  async function deactivateAccount() {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/deactivate/`, {}, {
        headers: { Authorization: `token ${loginInfo.token}` },
      });
      if (res.data.status === true) {
        localStorage.clear();
        onClose();
        navigate("/", { replace: true });
      }
    } catch {}
  }

  const pageUrl = "/profile";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="container.lg" py={12}>
        <Tabs isLazy index={activeTabIndex} onChange={setActiveTabIndex}>
          <TabList mb="1em">
            <Tab fontSize={{ base: "sm", md: "md" }}>Details</Tab>
            <Tab fontSize={{ base: "sm", md: "md" }}>Addresses</Tab>
            <Tab fontSize={{ base: "sm", md: "md" }}>My Orders</Tab>
            {is_sose_elite_user === "true" && (
              <Tab fontSize={{ base: "sm", md: "md" }}>Subscription</Tab>
            )}
          </TabList>
          <TabPanels>
            <TabPanel>{loading ? <Loader /> : <ProfileDetailsCard details={details} onOpen={onOpen} />}</TabPanel>
            <TabPanel><CustomerAddressesTab addresses={addresses} getDetails={getDetails} /></TabPanel>
            <TabPanel><CustomerOrdersTab orderData={orderData} columns={orderColumns} loading={loading} /></TabPanel>
            {is_sose_elite_user === "true" && (
              <TabPanel>
                <CustomerSubscriptionTab eliteData={eliteData} details={details} columns={subscriptionColumns} loading={loading} />
              </TabPanel>
            )}
          </TabPanels>
        </Tabs>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deactivate Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to deactivate your account?</Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="red" onClick={deactivateAccount}>
              Yes, deactivate my account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ScrollToTop />
      <Footer />
    </>
  );
}
