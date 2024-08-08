import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Container,
  Flex,
  useToast,
  Center,
  Box,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../setup/axiosClient";
// import checkLogin from "../utils/checkLogin";
import { AiFillGift } from "react-icons/ai";
import checkLogin from "../utils/checkLogin";
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";
export default function GiftVoucher() {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const txnId = useRef(new Date().getTime().toString());
  const defaultValue = {
    amount: null,
    sender_name: null,
    sender_email: null,
    receiver_name: null,
    receiver_email: null,
    txnid: txnId.current,
  };
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const giftCardTerms = [
    {
      id: 1,
      name: "Redemption:",
      description:
        " Gift Voucher can only be redeemed on our websites or through the Mobile apps.",
    },
    {
      id: 2,
      name: "No Expiry: ",
      description:
        "Gift card funds do not expire, ensuring flexibility for the recipient.",
    },
    {
      id: 3,
      name: "Purchase and Activation:",
      description:
        " There are no fees associated with the purchase or activation of the card.",
    },
    {
      id: 4,
      name: "Non-Redeemable at Hotel/Stores:",
      description: "Gift Vouchers cannot be redeemed at Hotels/Stores.",
    },
    {
      id: 5,
      name: "Non-Reloadable:",
      description:
        " The card is non-reloadable and cannot be redeemed for cash, refunded, or returned, except where required by law. Treat this card as cash.",
    },
    {
      id: 6,
      name: "Lost or Stolen Cards:",
      description:
        "we are not responsible for lost, damaged, or stolen cards, or for unauthorized use.",
    },
    {
      id: 7,
      name: "Customer Responsibility: ",
      description:
        "It is the responsibility of the customer to ensure the accuracy of the recipient's email address or mobile number when purchasing an electronic voucher.",
    },
    {
      id: 8,
      name: "Non-Transferable: ",
      description:
        "The voucher is non-transferable and cannot be exchanged or resold.",
    },
  ];

  // const loginInfo = checkLogin();
  const navigate = useNavigate();
  const toast = useToast();
  const [amount, setAmount] = useState();
  const [formData, setFormData] = useState(defaultValue);
  // const [paymentInProgress, setPaymentInProgress] = useState(false);
  const loginInfo = checkLogin();
  const priceHandler = (price) => {
    setAmount(parseInt(price));
    setFormData({ ...formData, amount: "" + price });
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function CreateGiftVoucher() {
    try {
      const response = await client.post("getvoucgerpaymentlink/", {
        ...formData,
      });
      if (response.data.status === true) {
        window.open(response.data.data);
        navigate("/");
      }
      // if (response.data.status) {
      //   toast({
      //     title: response.data.message,
      //     position: "top-right",
      //     status: "success",
      //     duration: 4000,
      //     isClosable: true,
      //   });
      //   navigate("/");
      // } else {
      //   toast({
      //     title: `Validation Error`,
      //     position: "top-right",
      //     status: "error",
      //     duration: 5000,
      //     isClosable: true,
      //   });
      // }
    } catch (error) {
      toast({
        title: `Something went wrong`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    await CreateGiftVoucher(formData);
    // setFormData();
    setLoading(false);
  };
  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Card m={3}>
        <CardBody>
          <Container
            maxW="container.xl"
            p={5}
            my={10}
            border="1px"
            borderColor={"gray.300"}
            borderRadius="lg"
            boxShadow={"base"}
          >
            <Flex
              justify={"space-between"}
              direction={{ base: "column", md: "row" }}
            >
              <Box as="form" onSubmit={handleSubmit}>
                <Grid
                  // {Width < 400 ? 'block' : 'flex'}
                  // {Width < 400 ? 'start' : 'center'}
                  width={{ base: "100%", md: "0%" }}
                  mb={3}
                >
                  {/*  // width="50%"
                width={{ base: "50%", md: "50%" }}
                mt={3}  */}
                  <img
                    src={
                      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/giftbanner.jpg"
                    }
                    alt=""
                    // style={{ width: "100%", height: "auto" }}
                  />
                </Grid>
                <Flex
                  justify={"space-between"}
                  direction="column"
                  width={{ md: "90%", base: "90%" }}
                >
                  <Text fontSize={{ md: "3xl",  base: "xl" }} as="b">
                    SOSE Gift Voucher
                  </Text>
                  {/* {width > 600 ? ( */}
                  <FormControl pt={5}>
                    <FormLabel fontSize="sm">Choose an amount</FormLabel>
                    <SimpleGrid columns={{ base: 2, md: 2, lg:4 }} spacing={3}>
                      <Button
                        colorScheme="green"
                        variant={amount === 100 ? "solid" : "outline"}
                        onClick={() => priceHandler(100)}
                        fontSize={{ base: "14px", md: "18px"}}
                        leftIcon={<AiFillGift fontSize={24} />}
                         //w={{ base: 125, md: 120 }}
                      >
                        ₹100
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 500 ? "solid" : "outline"}
                        onClick={() => priceHandler(500)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                         //w={{ base: 125, md: 120 }}
                      >
                        {/* <AiFillGift
                            fontSize={35}
                            style={{ marginRight: "6px" }}
                          />{" "} */}
                        ₹500
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 1000 ? "solid" : "outline"}
                        onClick={() => priceHandler(1000)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                         //w={{ base: 125, md: 120 }}
                      >
                        {/* <AiFillGift
                            fontSize={35}
                            style={{ marginRight: "6px" }}
                          />{" "} */}
                        ₹1000
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 2000 ? "solid" : "outline"}
                        onClick={() => priceHandler(2000)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                         //w={{ base: 125, md: 120 }}
                      
                      >
                        {/* <AiFillGift
                            fontSize={35}
                            style={{ marginRight: "6px" }}
                          />{" "} */}
                        ₹2000
                      </Button>
                    </SimpleGrid>
                  </FormControl>

                  <FormControl>
                    <Input
                      mt={2}
                      value={amount}
                      type="number"
                      variant="outline"
                      placeholder="Enter custom amount"
                      maxW={"md"}
                      size="sm"
                      isRequired
                      onChange={(e) => priceHandler(e.target.value)}
                    />
                  </FormControl>
                  <FormControl my={2}>
                    <FormLabel fontSize="sm">Who's it for?</FormLabel>
                    <Input
                      type="text"
                      variant="outline"
                      placeholder="Recipient name"
                      maxW={"md"}
                      size="sm"
                      isRequired
                      value={formData?.receiver_name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          receiver_name: e.target.value,
                        })
                      }
                    />
                    <Input
                      mt={2}
                      type="email"
                      variant="outline"
                      placeholder="Recipient email"
                      maxW={"md"}
                      size="sm"
                      isRequired
                      value={formData?.receiver_email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          receiver_email: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl my={2}>
                    <FormLabel fontSize="sm">
                      Add a custom message (optional)
                    </FormLabel>
                    <Input
                      sx={{ paddingX: "10px" }}
                      placeholder="Gift message"
                      variant="outline"
                      type="text"
                      maxW={"md"}
                      size="sm"
                      value={formData?.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                    />
                    <FormControl my={2}>
                      <FormLabel fontSize="sm">Who's it from?</FormLabel>
                      <Input
                        type="text"
                        variant="outline"
                        placeholder="Sender name"
                        maxW={"md"}
                        size="sm"
                        isRequired
                        value={formData?.sender_name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sender_name: e.target.value,
                          })
                        }
                      />
                      <Input
                        mt={2}
                        type="email"
                        variant="outline"
                        placeholder="Sender email"
                        maxW={"md"}
                        size="sm"
                        isRequired
                        value={formData?.sender_email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sender_email: e.target.value,
                          })
                        }
                      />
                    </FormControl>
                  </FormControl>
                </Flex>
                <Text as="sup">
                  Questions? Reach out to care@suryanorganic.com
                </Text>
                <Flex justify={"left"} mt={8} gap={3}>
                  <Button
                    type="submit"
                    colorScheme={"brand"}
                    width={"100px"}
                    isLoading={loading}
                  >
                    Checkout
                  </Button>
                </Flex>
              </Box>

              <Grid
                  display={{base:"none",md:"block"}}
                // {Width < 400 ? 'start' : 'center'}
                // width={{ base: "0%", md: "100%" }}
                // style={{ height:"100%"}}
                mt={3}
              >
                {/*  // width="50%"
                width={{ base: "50%", md: "50%" }}
                mt={3}  */}
                <img
                  src={
                    "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/giftbanner.jpg"
                  }
                  alt=""
                  style={{ width: "100%",  objectFit: "cover" }}
                />
              </Grid>
            </Flex>
            <Card mt={12} boxShadow={"none"} mx={5}>
              <Text fontSize={16} as="b" mb={2}>
                SOSE Gift Card Terms and Conditions
              </Text>
              <Text fontSize={14} as={"i"}>
                {/* <p>
                  Gift card funds do not expire and can only be redeemed on
                  <a className="underline" href="https://www.sose.in/">
                    www.sose.in
                  </a>
                  or using the SOSE mobile apps.
                </p>
                <p>No fees for purchase or activation of the Card.</p>
                <p>SOSE Gift Cards cannot be redeemed at the hotel.</p>
                <p>
                  The Card is non-reloadable and, except where required by law,
                  cannot be redeemed for cash, refunded, or returned.{" "}
                </p>
                <p>
                  Treat this Card as cash. SOSE is not responsible for lost,
                  damaged or stolen cards, or for unauthorized use.
                </p>
                <p>
                  For Card and balance info, call +91-6354-8000-89 or visit
                  Terms apply and are subject to change without notice.
                </p> */}
                <ol>
                  {giftCardTerms.map((term) => (
                    <li style={{ marginBottom: 2 }} key={term.id}>
                      <b>{term.name}</b>
                      {term.description}
                    </li>
                  ))}
                </ol>
              </Text>
              <Text mt={4} fontSize={16} color={"text.500"}>
                Please review these terms carefully before purchasing or using
                the Gift Voucher.
              </Text>
            </Card>
          </Container>
        </CardBody>
      </Card>
      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
}
