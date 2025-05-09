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
import { AiFillGift } from "react-icons/ai";
import checkLogin from "../utils/checkLogin";
import { useLocation } from "react-router-dom";
import MetaTags from "../context/MetaTagsContext";
import ReCAPTCHA from "react-google-recaptcha";

export default function GiftVoucher() {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const [verified, setVerified] = useState(false);
  const txnId = useRef(new Date().getTime().toString());
  const recaptchaRef = useRef(null);

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
  const pageUrl = "/gift-voucher";
  const navigate = useNavigate();
  const toast = useToast();
  const [amount, setAmount] = useState();
  const [formData, setFormData] = useState(defaultValue);
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
      <MetaTags pageUrl={pageUrl} />
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
                  width={{ base: "100%", md: "0%" }}
                  mb={3}
                >
                  <img
                    src={
                      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/giftbanner.jpg"
                    }
                    alt=""
                  />
                </Grid>
                <Flex
                  justify={"space-between"}
                  direction="column"
                  width={{ md: "90%", base: "90%" }}
                >
                  <Text fontSize={{ md: "3xl", base: "xl" }} as="b">
                    SOSE Gift Voucher
                  </Text>
                  <FormControl pt={5}>
                    <FormLabel fontSize="sm">Choose an amount</FormLabel>
                    <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} spacing={3}>
                      <Button
                        colorScheme="green"
                        variant={amount === 100 ? "solid" : "outline"}
                        onClick={() => priceHandler(100)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                      >
                        ₹100
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 500 ? "solid" : "outline"}
                        onClick={() => priceHandler(500)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                      >
                        ₹500
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 1000 ? "solid" : "outline"}
                        onClick={() => priceHandler(1000)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}
                      >
                        ₹1000
                      </Button>
                      <Button
                        colorScheme="green"
                        variant={amount === 2000 ? "solid" : "outline"}
                        onClick={() => priceHandler(2000)}
                        fontSize={{ base: "14px", md: "18px" }}
                        leftIcon={<AiFillGift fontSize={24} />}

                      >
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
                    <Box align="center" mt={4}>
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_reCAPTCHA_KEY}
                        onChange={() => setVerified(true)}
                        onExpired={() => setVerified(false)}
                      />
                    </Box>
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
                    isDisabled={!verified}
                  >
                    Checkout
                  </Button>
                </Flex>
              </Box>
              <Grid
                display={{ base: "none", md: "block" }}
                mt={3}
              >
                <img
                  src={
                    "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/giftbanner.jpg"
                  }
                  alt=""
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </Grid>
            </Flex>
            <Card mt={12} boxShadow={"none"} mx={5}>
              <Text fontSize={16} as="b" mb={2}>
                SOSE Gift Card Terms and Conditions
              </Text>
              <Text fontSize={14} >
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
