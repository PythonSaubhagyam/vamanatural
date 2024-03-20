import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import CartRow from "../components/cartRow";
import ShopProductCard from "../components/ShopProductCard";
import {
  Container,
  Flex,
  Table,
  ButtonGroup,
  Button,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Box,
  Heading,
  Divider,
  Checkbox,
  Textarea,
  useToast,
  Center,
  Image,
  FormControl,
  FormLabel,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { RiDeleteBin5Line } from "react-icons/ri";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import client from "../setup/axiosClient";
import { Link, useNavigate } from "react-router-dom";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";
import BreadCrumbCom from "../components/BreadCrumbCom";

export default function Cart() {
  const messageRef = useRef(null);
  const voucherCodeRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [taxes, setTaxes] = useState(0.0);
  const [grandTotal, setGrandTotal] = useState(0.0);
  const [isGift, setIsGift] = useState(false);
  const [cartRemoveLoading, setCartRemoveLoading] = useState();
  // const [useGiftWrap, setUseGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftMaterials, setGiftMaterials] = useState([]);
  const [continueCheckout, setContinueCheckout] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [checkingVoucherCode, setCheckingVoucherCode] = useState(false);
  const [voucherApplied, setVoucherApplied] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  const loginInfo = checkLogin();
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  let headers = { visitor: checkOrSetUDIDInfo?.visitor_id };

  if (loginInfo.isLoggedIn === true) {
    headers = { Authorization: `token ${loginInfo?.token}` };
  }

  async function getCart() {
    const response = await client.get("/cart/", {
      headers: headers,
    });
    if (response.data.status === true) {
      if (response.data.data.cart_items !== undefined) {
        setCartItems(response.data.data.cart_items);
      } else {
        setCartItems([]);
      }
      setTotal(response.data.data.total);
      setDiscount(response.data.data.discount_amt);
      setTaxes(response.data.data.gst_amt);
      setGrandTotal(response.data.data.final_total);
      localStorage.setItem("cart_counter", response.data.data.cart_counter);
      if (
        loginInfo.isLoggedIn === true &&
        response.data.data.cart_counter > 0
      ) {
        setContinueCheckout(true);
      }
    }
    setLoading(false);
  }

  useEffect(() => {
    getCart(); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let isAGift = localStorage.getItem("isAGift");
    // if (isAGift !== undefined) {
    //   setIsGift(isAGift === "false" ? false : true);
    // } else {
    //   setIsGift(false);
    // }
    if (isGift === true) {
      messageRef.current?.focus();
      getPackingMaterials();
      let giftMsg = localStorage.getItem("giftMessage");
      setGiftMessage(giftMsg ?? "");
    }
  }, [isGift]);

  async function getPackingMaterials() {
    const res = await client.get("/products", {
      params: { categoryID: 490 },
    });
    setGiftMaterials(res.data.data.products);
  }

  const removeProductFromCart = async (id) => {
    setCartRemoveLoading(id);
    const response = await client.delete(`/cart/${id}`, {
      headers: {
        Accept: "application/json",
        ...headers,
      },
    });
    if (response.data.status === true) {
      setCartRemoveLoading();
      toast({
        title: "Product removed from cart!",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
      var temp = cartItems.filter((item) => item.id !== id);
      if (temp.length > 0) {
        setCartItems(temp);
      } else {
        setCartItems([]);
        setContinueCheckout(false);
      }
      setTotal(response.data.total);
      setTaxes(response.data.gst_amt);
      setDiscount(response.data.discount_amt);
      setGrandTotal(response.data.final_total);
      localStorage.setItem("cart_counter", response.data.cart_counter);
    } else
      toast({
        title: response.data.error,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
  };

  async function handleQuantityChange(
    cartItemId,
    newQuantity
    // handleAmountChange
  ) {
    try {
      const response = await client.patch(
        `/cart/${cartItemId}/`,
        { quantity: newQuantity },
        {
          headers: headers,
        }
      );
      if (response.data.status === true) {
        newQuantity = parseInt(newQuantity);
        if (newQuantity > 0) {
          localStorage.setItem("cart_counter", response.data.cart_counter);
          toast({
            title: "Quantity updated!",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Please set the quantity greater than 0!",
            status: "warning",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        }
        getCart();
      } else {
        toast({
          title: response.data.errors.quantity
            ? "Quantity cannot be set less than 0!"
            : "There was an error updating the quantity!",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.toString(),
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  }

  async function checkNavigate() {
    const loginInfo = checkLogin();
    if (loginInfo.isLoggedIn === true) {
      if (grandTotal > 250.0) {
        const response = await client.get("/user/address/", {
          headers: { Authorization: `token ${loginInfo.token}` },
        });
        if (response.data.data.length === 0) {
          navigate("/profile/addresses/add/");
        } else {
          navigate("/checkout/", {
            state: {
              total: total,
              discount: discount,
              taxes: taxes,
              grandTotal: grandTotal,
              isAGift: isGift,
              giftMessage: giftMessage,
              voucherCode: voucherCode,
            },
          });
        }
      } else {
        toast({
          title: "Minimum order value should be ₹250",
          status: "info",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
      }
    } else {
      navigate("/login");
      toast({
        title: "Please login to place an order!",
        status: "info",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
    }
  }

  async function checkVoucherCodeAvailability(e) {
    e.preventDefault();
    try {
      setCheckingVoucherCode(true);
      const res = await client.get("/validate-voucher-code/", {
        params: { voucher_code: voucherCode },
        headers: { Authorization: `token ${checkLogin().token}` },
      });
      if (res.data.status === true) {
        setCheckingVoucherCode(false);
        toast({
          title: res.data.message,
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        setTotal(res.data.total);
        setTaxes(res.data.gst_amt);
        setDiscount(res.data.discount_amt);
        setGrandTotal(res.data.final_total);
        setVoucherApplied(true);
      } else {
        toast({
          title: res.data.message ?? "There was an error!",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message ?? "There was an error!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
    setCheckingVoucherCode(false);

    // const timer = setTimeout(() => {
    //   setCheckingVoucherCode(false);
    // }, 2000);
    // return () => clearTimeout(timer);
  }

  const AmountTable = () => {
    return (
      <>
        {cartItems.length > 0 ? (
          <Box
            w={{ md: "25%", base: "320px" }}
            border={"1px"}
            borderColor={"gray.100"}
            py={{ base: 4, md: 10 }}
            mt={8}
            mr={{ md: 13, base: 6 }}
            h="fit-content"
            ms={isMobile ? "auto" : "0"}
          >
            <Heading
              fontWeight={"normal"}
              size={"md"}
              pb={4}
              ps={{ base: 2, md: 6 }}
            >
              Order Total
            </Heading>
            <Divider orientation="horizontal" />
            <Table w="100%" size={{ base: "sm", md: "md" }}>
              <Tbody>
                <Tr>
                  <Td fontSize="sm">Subtotal:</Td>
                  <Td isNumeric>₹{total.toFixed(2)} </Td>
                </Tr>
                <Tr>
                  <Td fontSize="sm">Taxes:</Td>
                  <Td isNumeric>₹{taxes.toFixed(2)} </Td>
                </Tr>
                {discount > 0.0 && (
                  <Tr>
                    <Td fontWeight={"bold"}>Discount:</Td>
                    <Td fontWeight={"bold"} color="red.500" isNumeric>
                      - ₹{discount?.toFixed(2)}
                    </Td>
                  </Tr>
                )}
                <Tr bg="gray.100">
                  <Td fontWeight={"bold"}>Total:</Td>
                  <Td fontWeight={"bold"} isNumeric>
                    ₹{grandTotal?.toFixed(2)}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Checkbox
              colorScheme="brand"
              ps={6}
              pt={4}
              isChecked={isGift}
              onChange={(e) => {
                setIsGift(e.target.checked);
                localStorage.setItem("isAGift", e.target.checked.toString());
              }}
            >
              <Text fontSize="sm">
                Send as a gift. <br /> Include custom gift message
              </Text>
            </Checkbox>
            {localStorage.getItem("token") && (
              <form onSubmit={checkVoucherCodeAvailability} display={{}}>
                {/* <FormControl as={Flex} direction="column" my={6} px={4}>
                  <FormLabel fontSize="sm" fontWeight={600}>
                    Have a voucher code?
                  </FormLabel>
                  <Input
                    size="sm"
                    ref={voucherCodeRef}
                    value={voucherCode}
                    onChange={(e) => setVoucherCode(e.target.value)}
                    variant="outline"
                    placeholder="SOSEXXXXXXXXXXXXXXXXXX"
                    borderColor="gray.300"
                    me="auto"
                    borderRadius="md"
                    _invalid={{ borderColor: "red.600" }}
                    _focusVisible={{ borderColor: "gray.600" }}
                    _placeholder={{ color: "gray.300" }}
                    isDisabled={voucherApplied}
                  ></Input>
                  {voucherApplied ? (
                    <ButtonGroup as={Flex} size="sm" justify="center" mt={2}>
                      <Button
                        colorScheme="brand"
                        onClick={() => {
                          setVoucherApplied((applied) => !applied);
                          voucherCodeRef.current?.focus();
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={() => {
                          setVoucherCode("");
                          setVoucherApplied(false);
                          getCart();
                        }}
                      >
                        <RiDeleteBin5Line />
                      </Button>
                    </ButtonGroup>
                  ) : (
                    <Button
                      type="submit"
                      isLoading={checkingVoucherCode}
                      size="sm"
                      colorScheme="brand"
                      mt={2}
                    >
                      Apply code
                    </Button>
                  )}
                </FormControl> */}
              </form>
            )}

            {/* <Text
              fontSize="md"
              // align={"right"}
              color={"brand.900"}
              _hover={{ color: "black" }}
              py={4}
              px={6}
            >
              I have promo code
            </Text> */}
            {/* <Button
              color={"white"}
              colorScheme={"brand"}
              mx={6}
              disabled={!continueCheckout}
            >
              Process Checkout
            </Button> */}
          </Box>
        ) : null}
      </>
    );
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"My Cart"} secondUrl={"/cart"} />
      </Container>

      <Container maxW="container.xl" mt={2} mb={10}>
        <Heading size="lg" textAlign={"center"} mb={4} fontWeight={500}>
          My Cart
        </Heading>
        {loading ? (
          <Center h="100%" w="100%">
            <Loader site={true} />
          </Center>
        ) : (
          <>
            {cartItems.length === 0 ? (
              <Flex
                p={6}
                w={"100%"}
                fontWeight="700"
                direction="column"
                align="center"
                gap={4}
              >
                <Box textAlign={"center"}>
                  <Image
                    src={
                      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/emptyCart.gif"
                    }
                    boxSize="200px"
                  />
                  Your cart is empty
                </Box>
                <Button
                  as={Link}
                  color={"white"}
                  colorScheme={"brand"}
                  to="/shop"
                >
                  Shop Now
                </Button>
              </Flex>
            ) : (
              <></>
            )}
            <Flex justify={"space-between"} gap={"2.5vw"}>
              <Box w={{ md: "70%", base: "100%" }}>
                {cartItems.length !== 0 && (
                  <>
                    {/* <TableContainer whiteSpace={"normal"}>
                    <Table variant="simple" size={isMobile ? "sm" : "md"}>
                      <Thead>
                        <Tr>
                          <Th>Product </Th>
                          <Th> </Th>
                          <Th>Quantity</Th>
                          <Th>Price</Th>
                          <Th>Total</Th>
                          <Th> </Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {cartItems.length > 0 ? (
                          cartItems?.map((cartItem) => (
                            <CartRow
                              key={cartItem.id}
                              cartItem={cartItem}
                              defaultValue={cartItem.quantity}
                              onSubmit={(newQuantity) =>
                                handleQuantityChange(cartItem.id, newQuantity)
                              }
                              removeProductFromCart={removeProductFromCart}
                            ></CartRow>
                          ))
                        ) : (
                          <Center p={6} w={"100%"} fontWeight="700">
                            {cartItems}
                            <CartRow />
                          </Center>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer> */}
                    <Box mx={"auto"} w={{ md: "100%" }}>
                      {/* <Flex
                        alignItems={"center"}
                        flexDirection={{ base: "column", md: "row" }}
                        m={5}
                        p={5}
                        boxShadow={"md"}
                        borderRadius={"8px"}
                        gap={10}
                      >
                        <Text>No</Text>
                        <Text>Product Images</Text>
                        <Text>Product name</Text>
                        <Text>Quantity</Text>
                        <Text>Price</Text>
                        <Text>Total</Text>
                      </Flex> */}
                      {cartItems.length > 0 ? (
                        cartItems?.map((cartItem, index) => (
                          <CartRow
                            index={index}
                            key={cartItem.id}
                            cartItem={cartItem}
                            defaultValue={cartItem.quantity}
                            onSubmit={(newQuantity) =>
                              handleQuantityChange(cartItem.id, newQuantity)
                            }
                            cartRemoveLoading={cartRemoveLoading}
                            removeProductFromCart={removeProductFromCart}
                          ></CartRow>
                        ))
                      ) : (
                        <Center p={6} w={"100%"} fontWeight="700">
                          {cartItems}
                          <CartRow />
                        </Center>
                      )}
                    </Box>
                    {isGift === true && (
                      <>
                        <Text mt={6}>Add your message here</Text>
                        <Textarea
                          value={giftMessage}
                          ref={messageRef}
                          onChange={(e) => {
                            setGiftMessage(e.target.value);
                            localStorage.setItem(
                              "giftMessage",
                              e.target.value.toString()
                            );
                          }}
                        ></Textarea>
                        <Flex direction="column" gap={6} my={6}>
                          <Text fontSize="xl" fontWeight="bold">
                            Select Packing Material
                          </Text>
                          <Flex wrap="wrap" gap={6}>
                            {giftMaterials.length > 0 &&
                              giftMaterials.map((material, index) => (
                                <ShopProductCard
                                  key={material.id}
                                  productDetails={material}
                                  isInWishlist={material.is_wished}
                                  displayWishlistButton={false}
                                  onClick={null}
                                />
                              ))}
                          </Flex>
                        </Flex>
                      </>
                    )}
                    {isMobile && <AmountTable />}

                    <Flex
                      my={6}
                      gap={6}
                      size="sm"
                      mx={{ md: 5 }}
                      justify={"space-between"}
                    >
                      <Button
                        as={Link}
                        leftIcon={<IoIosArrowBack />}
                        color={"white"}
                        colorScheme={"brand"}
                        fontSize={{ base: "sm", md: "md" }}
                        to="/shop"
                      >
                        Continue Shopping
                      </Button>
                      <Button
                        fontSize={{ base: "sm", md: "md" }}
                        color={"white"}
                        bg={"brand.500"}
                        _hover={{ bg: "brand.500" }}
                        disabled={!continueCheckout}
                        onClick={() => checkNavigate()}
                      >
                        Process Checkout
                        <IoIosArrowForward />
                      </Button>
                    </Flex>
                  </>
                )}
              </Box>
              {!isMobile ? <AmountTable /> : null}
            </Flex>
          </>
        )}
      </Container>
      <Footer />
    </>
  );
}
