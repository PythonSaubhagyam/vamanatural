import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Grid,
  GridItem,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  InputGroup,
  Input,
  Checkbox,
  InputLeftAddon,
  FormControl,
  FormLabel,
  Flex,
  Stack,
  Link,
  useToast,
  InputRightElement,
  IconButton,
  PinInput,
  PinInputField,
  HStack,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import CartEmitter from "../components/EventEmitter";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import CarouselLoginModal from "./CarouselLoginModal";

const imageList = [
  require("../assets/Login/banner2.jpeg"),
  require("../assets/Login/banner1.jpeg"),
];

const LoginModal = ({ isOpen, onClose, onOpen }) => {
  //const { isOpen, onOpen, onClose } = useDisclosure();
  const [countries, setCountries] = useState();
  const [code, setCode] = useState();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();

  const [show, setShow] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [show1, setShow1] = useState(false);
  const handleClick = () => setShow1(!show1);
  useEffect(() => {
    //getCountries();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const loginInfo = checkLogin();
    if (loginInfo.isLoggedIn) {
      navigate("/");
    } // eslint-disable-next-line
  }, []);

  const handleOTPSubmit = async () => {
    //e.preventDefault();
    setButtonLoading(true);
    const checkOrSetUDIDInfo = await CheckOrSetUDID();
    try {
      const response = await client.post(
        "/user/send-otp/",
        {
          mobile_no: "+91" + phoneNumber,
        },
        {
          headers: {
            visitor: checkOrSetUDIDInfo.visitor_id,
          },
        }
      );
      if (response.data.status === true) {
        setButtonLoading(false);
        toast({
          title: response.data.message,
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      } else {
        setButtonLoading(false);
        toast({
          title: response.data.message,
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      setButtonLoading(false);
      toast({
        title: error.response.data.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleMobileSubmit = async () => {
    //e.preventDefault();
    const checkOrSetUDIDInfo = await CheckOrSetUDID();
    setButtonLoading(true);
    try {
      const response = await client.post(
        "/user/verify-otp/",
        {
          mobile_no: "+91" + phoneNumber,
          otp: code,
        },
        {
          headers: {
            visitor: checkOrSetUDIDInfo.visitor_id,
          },
        }
      );
      if (response.data.status) {
        // navigate("/shop");
        toast({
          title: "Login successfully!",
          position: "top-right",
          status: "success",
          duration: 2000,
        });
        CartEmitter.emit("updateProductTotal", true);
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem(
          "first_name",
          response.data.data?.first_name.toString()
        );
        localStorage.setItem(
          "last_name",
          response.data.data?.last_name?.toString() || null
        );
        localStorage.setItem(
          "email",
          response.data.data?.email?.toString() || null
        );
        localStorage.setItem(
          "phone_no",
          response.data.data?.phone_no?.toString() || null
        );
        localStorage.setItem("cart_counter", response.data.data?.cart_counter);
        localStorage.setItem(
          "product_total",
          response.data.data?.cart_totals?.final_total
        );
        localStorage.setItem(
          "wishlist_counter",
          response.data.data?.wishlist_counter
        );
        localStorage.setItem(
          "allow_company_list",
          JSON.stringify(response.data?.allow_company_list)
        );
        localStorage.setItem(
          "is_sose_elite_user",
          response.data.data?.is_sose_elite_user
        );
        if (response.data.data.is_staff || response.data.data.is_superuser) {
          localStorage.setItem("id", response.data.data.id);
          localStorage.setItem("access", true);
          if (location.pathname === "/signup") {
            navigate("/shop", { replace: true });
            onClose();
          } else {
            onClose()
          }
        } else {
          // setTimeout(() => {
          if (location.pathname === "/signup") {
            navigate("/", { replace: true });
            onClose();
          } else {
            onClose();
          }
          //navigate("/", { replace: true });

          // }, 5000);
        }
        setButtonLoading(false);
        sessionStorage.setItem("hasShownPopup", "true");
      } else {
        setButtonLoading(false);
        toast({
          title: `${response.data.non_field_errors}`,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      setButtonLoading(false);
      toast({
        title: error.response.data.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  async function loginUser(credentials) {
    const checkOrSetUDIDInfo = await CheckOrSetUDID();
    try {
      client
        .post(
          "/user/signin/",
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              visitor: checkOrSetUDIDInfo.visitor_id,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          if (response.data.status) {
            // navigate("/shop");
            toast({
              title: "Login successfully!",
              position: "top-right",
              status: "success",
              duration: 2000,
            });
            CartEmitter.emit("updateProductTotal", true);
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem(
              "first_name",
              response.data.data?.first_name.toString()
            );
            localStorage.setItem(
              "last_name",
              response.data.data?.last_name?.toString() || null
            );
            localStorage.setItem(
              "email",
              response.data.data?.email?.toString() || null
            );
            localStorage.setItem(
              "phone_no",
              response.data.data?.phone_no?.toString() || null
            );
            localStorage.setItem(
              "cart_counter",
              response.data.data?.cart_counter
            );
            localStorage.setItem(
              "product_total",
              response.data.data?.cart_totals?.final_total
            );
            localStorage.setItem(
              "wishlist_counter",
              response.data.data?.wishlist_counter
            );
            localStorage.setItem(
              "allow_company_list",
              JSON.stringify(response.data?.allow_company_list)
            );
            localStorage.setItem(
              "is_sose_elite_user",
              response.data.data?.is_sose_elite_user
            );
            if (
              response.data.data.is_staff ||
              response.data.data.is_superuser
            ) {
              localStorage.setItem("id", response.data.data.id);
              localStorage.setItem("access", true);
              if (location.pathname === "/signup") {
                navigate("/shop", { replace: true });
                onClose();
              } else {
                onClose()
              }
            } else {
              if (location.pathname === "/signup") {
                navigate("/", { replace: true });
                onClose();
              } else {
                onClose();
              }
            }
            sessionStorage.setItem("hasShownPopup", "true");
          } else {
            setLoading(false);
            toast({
              title: `${response.data.non_field_errors}`,
              position: "top-right",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: error.response.data.message
              ? error.response.data.message
              : "Please try again later!",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Something went wrong",
        description: "Please try again later!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await loginUser({
      email,
      password,
    });
  };

  const countryOptions = async (inputValue) => {
    let Options = [];
    if (inputValue.length > 2) {
      const countryRes = await client.get(
        `/countries/?filter_search=${inputValue}`
      );
      if (countryRes.status) {
        countryRes.data.data?.map((data) =>
          Options.push({
            label: data.calling_code + " " + "(" + data.country_name + ")",
            value: data.calling_code,
          })
        );
        setCountries(Options);
      }
    }
    return Options;
  };

  return (
    <>
      {/* <Button
        _hover={{
          textDecoration: "none",
          color: "brand.900",
        }}
        variant={"link"}
        fontWeight={500}
        fontSize={{ md: "14px" }}
        onClick={() => onOpen()}
        color={"#545454"}
      >
        Login
      </Button> */}
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPhoneNumber();
          setCode();
          sessionStorage.setItem("hasShownPopup", "true");
          setShow(false);
        }}
      >
        <ModalOverlay />
        <ModalContent
          borderRadius={"10px"}
          maxW={{ lg: "50%", md: "90%", base: "90%" }}
          maxH={{ lg: "79vh", md: "47vh" }}
        >
          <Grid
            templateColumns={{ md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
          >
            {" "}
            {/* Set a consistent height for both columns */}
            <GridItem
              width={{ lg: "25vw", md: "45vw" }}
              position={"relative"}
              display={{ md: "block", base: "none" }}
            >
              <CarouselLoginModal images={imageList} />
              {/* <Image src={require("../assets/Login/banner1.jpeg")} /> */}
            </GridItem>
            <GridItem>
              <ModalCloseButton />
              <ModalBody mt={20}>
                <Tabs isFitted colorScheme="brand">
                  <TabList
                    borderRadius={"10px"}
                    boxShadow={"lg"}
                    sx={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)" }}
                  >
                    <Tab
                      fontSize={13}
                      //p={3}
                      _selected={{
                        color: "white",
                        bg: "brand.500",
                        borderRadius: "10px",
                      }}
                    >
                      Mobile
                    </Tab>
                    <Tab
                      fontSize={13}
                      //P={3}
                      _selected={{
                        color: "white",
                        bg: "brand.500",
                        borderRadius: "10px",
                      }}
                    >
                      Email
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Flex
                        as={"form"}
                        onSubmit={() => {
                          code === undefined || !show
                            ? handleOTPSubmit()
                            : handleMobileSubmit();
                        }}
                        flexDirection={"column"}
                        gap={6}
                        mt={6}
                      >
                        <FormControl id="mobile">
                          <FormLabel fontSize="sm">Mobile Number</FormLabel>
                          <InputGroup
                            display="flex"
                            alignItems="center"
                            border="1px solid"
                            borderColor="gray.300"
                            borderRadius="lg"
                          >
                            {/* <Box width="100px">
                          <AsyncSelect
                            isClearable
                            size="sm"
                            chakraStyles={{
                              inputContainer: (provided) => ({
                                ...provided,
                                width: "100px",
                              }),
                            }}
                            variant={"outline"}
                            name="Countries"
                            sx={{ padding: "0 10px" }}
                            placeholder=""
                            value={code}
                            onChange={(e) => setCode(e?.value)}
                            loadOptions={countryOptions}
                            defaultOptions={countries}
                            components={{
                              DropdownIndicator: () => null, // This removes the dropdown icon
                              IndicatorSeparator: () => null, // Optional: Removes the separator
                            }}
                          ></AsyncSelect>
                        </Box> */}
                            <InputLeftAddon
                              border={"none"}
                              borderRight={"1px solid"}
                              borderColor="gray.300"
                              px={3}
                            >
                              +91
                            </InputLeftAddon>
                            <Input
                              variant="unstyled"
                              type="number"
                              placeholder="phone number"
                              value={phoneNumber}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (value.length <= 10) {
                                  setPhoneNumber(value);
                                }
                              }}
                              size={"sm"}
                              pl={2}
                              flex="1"
                            />
                          </InputGroup>
                        </FormControl>
                        {show && (
                          <FormControl id="mobile">
                            <FormLabel fontSize="sm">OTP</FormLabel>
                            <Flex
                              gap={{ base: 4 }}
                              alignItems={"flex-start"}
                              flexDirection={{ base: "column", md: "column" }}
                            >
                              <HStack>
                                <PinInput
                                  placeholder=""
                                  size={"sm"}
                                  value={code}
                                  onChange={(e) => setCode(e)}
                                >
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                  <PinInputField />
                                </PinInput>
                              </HStack>
                              <Button
                                variant={"link"}
                                size={"sm"}
                                colorScheme="brand"
                                _hover={{ textDecoration: "none" }}
                                onClick={() => {
                                  setCode("");
                                  handleOTPSubmit();
                                }}
                              >
                                {" "}
                                Resend OTP
                              </Button>
                            </Flex>
                          </FormControl>
                        )}
                        <Button
                          colorScheme="brand"
                          size={"sm"}
                          isLoading={buttonLoading}
                          loadingText={"sending..."}
                          isDisabled={phoneNumber?.length === 10 ? false : true}
                          borderRadius={"10px"}
                          onClick={() => {
                            setShow(true);
                            if (code === undefined || !show) {
                              handleOTPSubmit(); // OTP submission if not done
                            } else {
                              handleMobileSubmit(); // Mobile verification after OTP
                            }
                          }}
                        >
                          Continue
                        </Button>
                        {/* {phoneNumber?.length === 10 && (
                          <Checkbox
                            colorScheme="brand"
                            size={"sm"}
                            color={"#545454"}
                          >
                            By continuing, you agree to receive an OTP via SMS &
                            WhatsApp from SOSE to login to your account
                          </Checkbox>
                        )} */}
                      </Flex>
                    </TabPanel>
                    <TabPanel>
                      <form onSubmit={handleSubmit}>
                        <Stack
                          spacing={6}
                          pt={8}
                          px={{ base: 1, sm: 8, md: 1 }}
                        >
                          <FormControl id="email">
                            <FormLabel fontSize={"sm"}>Email address</FormLabel>
                            <Input
                              isRequired
                              type="email"
                              variant={"solid"}
                              border="1px"
                              size={"sm"}
                              borderColor={"brand.900"}
                              placeholder="Email"
                              autoComplete="username"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </FormControl>
                          <FormControl id="password">
                            <FormLabel fontSize={"sm"}>Password</FormLabel>
                            <InputGroup size="sm">
                              <Input
                                isRequired
                                type={show1 ? "text" : "password"}
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <InputRightElement width="4.5rem">
                                <IconButton
                                  h="1.75rem"
                                  size="sm"
                                  onClick={handleClick}
                                >
                                  {show1 ? <ViewOffIcon /> : <ViewIcon />}
                                </IconButton>
                              </InputRightElement>
                            </InputGroup>
                          </FormControl>
                          <Button
                            isLoading={loading}
                            loadingText="Logging..."
                            type="submit"
                            colorScheme="brand"
                            size={"sm"}
                          >
                            Login
                          </Button>
                          <Stack spacing={10}>
                            <Stack
                              direction={{ base: "column", sm: "column" }}
                              align={"start"}
                              justify={"space-between"}
                            >
                              <Link
                                href="/signup"
                                fontSize={"12"}
                                color={"brand.500"}
                              >
                                Don't have an account?
                              </Link>
                              <Link
                                href="/reset-password"
                                fontSize={"12"}
                                color={"brand.500"}
                              >
                                Forgot password?
                              </Link>
                            </Stack>
                          </Stack>
                        </Stack>
                      </form>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </GridItem>
          </Grid>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LoginModal;
