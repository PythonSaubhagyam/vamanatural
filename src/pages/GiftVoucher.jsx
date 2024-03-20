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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../setup/axiosClient";
// import checkLogin from "../utils/checkLogin";
import { AiFillGift } from "react-icons/ai";
import checkLogin from "../utils/checkLogin";
import Loader from "../components/Loader";
export default function GiftVoucher() {
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
    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  async function CreateGiftVoucher() {
    try {
      const response = await client.post(
        "getvoucgerpaymentlink/",
        { ...formData },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
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
      <Navbar />
      <Card m={3}>
        <CardBody>
          <Container
            maxW="container.xl"
            p={10}
            my={10}
            border="1px"
            borderColor={"gray.300"}
            borderRadius="lg"
            boxShadow={"base"}
          >
            <Flex justify={"space-between"} direction="row">
              <form onSubmit={handleSubmit}>
                <Flex
                  as="form"
                  justify={"space-between"}
                  direction="column"
                  width={"90%"}
                >
                  <Text fontSize="3xl" as="b">
                    SOSE Gift Voucher
                  </Text>
                  {width > 600 ? (
                    <FormControl pt={5}>
                      <FormLabel fontSize="sm">Choose an amount</FormLabel>
                      <Stack
                        direction={"row"} align="center"
                      >
                        <Button
                          colorScheme="green"
                          variant={amount === 100 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(100)}
                          fontSize={20}
                        >
                          <AiFillGift fontSize={35} style={{ marginRight: '6px' }} /> ₹100
                        </Button>
                        <Button
                          colorScheme="green"
                          variant={amount === 500 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(500)}
                          fontSize={20}
                        >
                          <AiFillGift fontSize={35} style={{ marginRight: '6px' }} /> ₹500
                        </Button>
                        <Button
                          colorScheme="green"
                          variant={amount === 1000 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(1000)}
                          fontSize={20}
                        >
                          <AiFillGift fontSize={35} style={{ marginRight: '6px' }} /> ₹1000
                        </Button>
                        <Button
                          colorScheme="green"
                          variant={amount === 2000 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(2000)}
                          fontSize={20}
                        >
                          <AiFillGift fontSize={35} style={{ marginRight: '6px' }} /> ₹2000
                        </Button>
                      </Stack>
                    </FormControl>
                  ) : (
                    <FormControl pt={5}>
                      <FormLabel fontSize="sm">Choose an amount</FormLabel>
                      <Stack mt={2} direction={width > 400 ? 'row' : 'column'} spacing={2} wrap={width > 800 ? 'wrap' : 'nowrap'} align="center">
                        <Button
                          colorScheme="green"
                          variant={amount === 100 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(100)}
                          fontSize={width > 800 ? '20' : '12'}
                        >
                          <AiFillGift fontSize={30} style={{ marginRight: '6px' }} /> ₹100
                        </Button>
                        <Button
                          colorScheme="green"
                          variant={amount === 500 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(500)}
                          fontSize={width > 800 ? '20' : '12'}
                        >
                          <AiFillGift fontSize={30} style={{ marginRight: '6px' }} /> ₹500
                        </Button>
                      </Stack>

                      <Stack mt={2} direction={width > 400 ? 'row' : 'column'} spacing={2} wrap={width > 800 ? 'wrap' : 'nowrap'} align="center">
                        <Button
                          colorScheme="green"
                          variant={amount === 1000 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(1000)}
                          fontSize={width > 800 ? '20' : '12'}
                        >
                          <AiFillGift fontSize={30} style={{ marginRight: '6px' }} /> ₹1000
                        </Button>
                        <Button
                          colorScheme="green"
                          variant={amount === 2000 ? 'solid' : 'outline'}
                          onClick={() => priceHandler(2000)}
                          fontSize={width > 800 ? '20' : '12'}
                        >
                          <AiFillGift fontSize={30} style={{ marginRight: '6px' }} /> ₹2000
                        </Button>
                      </Stack>


                    </FormControl>
                  )}

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
                      type="url"
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
                  Questions? Reach out to info@suryanorganic.com
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
              </form>

              <Card width="50%" mt={3} style={{ display: width > 800 ? "flex" : "none" }}>
                <img
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/giftbanner.jpg"}
                  alt=""
                  style={{ display: width > 800 ? "block" : "none" }}
                />
              </Card>

            </Flex>
            <Card mt={12} boxShadow={"none"}>
              <Text fontSize="sm" as="b">
                SOSE Gift Card Terms and Conditions
              </Text>
              <Text fontSize="sm" as="i">
                <p>
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
                </p>
              </Text>
            </Card>

          </Container>
        </CardBody>
      </Card>
      <Footer />
    </>
  );
}
