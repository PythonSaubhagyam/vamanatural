import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import client from "../setup/axiosClient";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  IconButton,
  TableContainer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  FormLabel,
  FormControl,
  Link,
  useToast,
} from "@chakra-ui/react";
import ReactStars from "react-stars";
import { BsCheck, BsPrinter, BsDownload } from "react-icons/bs";

export default function CustomerOrderDetails() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: null,
    rating: 1,
    review: null,
  });
  const { orderId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPayment, setPayment] = useState(false);
  const [Txt_new_id, setTxt_new_id] = useState("");
  const [CartCount, setCartCount] = useState(
    localStorage.getItem("cart_counter") ?? 0
  );
  const toast = useToast();
  useEffect(() => {
    getOrderDetails(); // eslint-disable-next-line
  }, []);

  async function getOrderDetails() {
    const response = await client.get(`/orders/${orderId}`, {
      headers: { Authorization: `token ${checkLogin().token}` },
    });

    setOrderDetails(response.data.data);
  }

  async function postReview() {
    try {
      const { id, _, ...data } = formData;
      const loginInfo = checkLogin();
      const response = await client.post(
        `/rating_review/${id}/`,
        { ...data },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (response.data.status === true) {
        getOrderDetails();
        toast({
          title: response.data.message,
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        toast({
          title: response.data.message,
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message ?? "error",
        status: "error",
        position: "top-right",
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const printFun = () => {
    window.open(
      `${process.env.REACT_APP_API_BASE_URL}/accounting/invoice-pdf/?source_doc=${orderDetails.order_id}`,
      "_blank",
      "noreferrer"
    );
  };

  const downloadPdf = () => {
    // Replace 'pdf_url' with the actual URL of the PDF you want to download.
    const pdfUrl = `${process.env.REACT_APP_API_BASE_URL}/accounting/invoice-pdf/?source_doc=${orderDetails.order_id}`;

    // Use the fetch API to retrieve the PDF file.
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = `invoice-${orderDetails.order_id}.pdf`; // Change the name for the downloaded file.
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading PDF:", error);
      });
  };
  
  async function handleOnlinePayment() {
    setPayment(true); // Set the payment loading state

    const data = {
      txnid: new Date().getTime().toString(), // Generate a unique transaction ID
      amount: orderDetails.final_total?.toString() || "0", // Use the total amount from the order details
      productinfo: orderDetails.is_gift ? "Gift" : "SOSE", // Check if it's a gift
      billing_address: orderDetails.billing_address?.id, // Billing address
      shipping_amount: orderDetails.shipping_amt, // Shipping amount
      tax_amount: orderDetails.tax_amt, // Tax amount
      is_a_gift: orderDetails.is_gift, // If it's a gift
      giftMessage: orderDetails.gift_message || "", // Gift message (if any)
      voucherCode: orderDetails.applied_voucher_code || "", // Voucher code (if any)
    };

    // Send request to backend for payment link
    try {
      const res = await client.post("/get-order-payment-link/", data, {
        headers: {
          Authorization: `token ${checkLogin().token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === true) {
        setTxt_new_id(res.data.txn_id);
        localStorage.setItem("cart_counter", 0);
        setCartCount(0);
        const options = "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        window.open(res.data.payment_url, "_top", options);
        setTimeout(() => {
          window.open(res.data.payment_url, "_top", options);
        });
      }
    } catch (error) {
      console.error("Payment Error:", error); 
      toast({
        title: "Payment failed! Please try again.",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setPayment(false);
    }
  }

  return (
    <>
      <Navbar />
      <Container
        maxW="container.xl"
        boxShadow={"lg"}
        border="1px"
        borderColor="gray.300"
        borderRadius={"lg"}
        minH="container.sm"
        my={6}
        p={0}
      >
        <Flex
          justify="space-between"
          align={"center"}
          borderBottom={"1px"}
          py={2}
          px={6}
        >
          <Heading fontWeight={500}>{orderDetails?.order_id}</Heading>

          <Flex gap={2} align="center">
          
            { orderDetails.order_status !== "Cancelled" && orderDetails?.is_paid === false &&(
              <Button size="sm" colorScheme={"brand"} isLoading={isPayment}
                loadingText="Processing..." onClick={handleOnlinePayment}  >
                <Icon as={BsCheck} boxSize={6} />
                Accept and Pay
              </Button>
            )}
            {orderDetails.order_status !== "Pending" &&
              orderDetails.is_invoiced && (
                <>
                  <IconButton
                    icon={<BsPrinter fontSize={"1.25rem"} />}
                    size="md"
                    bg={"transparent"}
                    color={"brand"}
                    onClick={() => printFun()}
                  />
                  <IconButton
                    icon={<BsDownload fontSize={"1.25rem"} />}
                    size="md"
                    bg={"transparent"}
                    color={"brand"}
                    onClick={() => downloadPdf()}
                  />
                </>
              )}
          </Flex>
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          p={6}
          gap={{ base: 6, md: 0 }}
          w="100%"
          h="100%"
          justify={"space-between"}
        >
          <Flex direction={"column"} align="flex-start" gap={6}>
            <Box>
              <Heading size="sm">Order Date</Heading>
              <Text fontSize="sm" color="gray.500">
                {orderDetails?.order_date}
              </Text>
            </Box>
            <Box>
              <Heading size="sm">Delivery Date</Heading>
              <Text fontSize="sm" color="gray.500">
                {orderDetails?.delivery_date}
              </Text>
            </Box>
          </Flex>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={{ base: 6, md: 20 }}
          >
            {JSON.stringify(orderDetails.billing_address) ===
              JSON.stringify(orderDetails.shipping_address) ? (
              <Box fontSize="sm">
                <Heading size="sm">Invoicing and Shipping Address</Heading>
                <Box w="100%" mt={2}>
                  <Text fontStyle={"italic"} textTransform="capitalize">
                    {orderDetails?.billing_address?.full_name}
                  </Text>
                  <Text>
                    {orderDetails ??
                      orderDetails?.billing_address?.mobile_no === "None"
                      ? null
                      : "Phone : " + orderDetails?.billing_address?.mobile_no}
                  </Text>
                  <Text mt={1} w="25vw">
                    {orderDetails?.billing_address?.full_address}
                  </Text>
                  {/* <Text mt={1}>
                    {orderDetails?.billing_address?.address_line_1}
                  </Text>
                  <Text>{orderDetails?.billing_address?.address_line_2}</Text>
                  <Text>{orderDetails?.billing_address?.landmark}</Text>
                  <Text>
                    {[
                      orderDetails?.billing_address?.city_name,
                      orderDetails?.billing_address?.state_name,
                      orderDetails?.billing_address?.country_name,
                    ].join(", ")}{" "}
                    - {orderDetails?.billing_address?.postal_code}
                  </Text> */}
                </Box>
              </Box>
            ) : (
              <>
                <Box>
                  <Heading size="sm" mb={2}>
                    Billing Address
                  </Heading>
                  <Box w="100%" fontSize="sm">
                    <Text textTransform="capitalize" fontStyle={"italic"}>
                      {orderDetails?.billing_address?.full_name}
                    </Text>
                    <Text>
                      {orderDetails ??
                        orderDetails?.billing_address?.mobile_no === "None"
                        ? null
                        : "Phone : " + orderDetails?.billing_address?.mobile_no}
                    </Text>
                    <Text mt={1} w="20vw">
                      {orderDetails?.billing_address?.full_address}
                    </Text>
                    {/* <Text mt={1}>
                      {orderDetails?.billing_address?.address_line_1}
                    </Text>
                    <Text>{orderDetails?.billing_address?.address_line_2}</Text>
                    <Text>{orderDetails?.billing_address?.landmark}</Text>
                    <Text>
                      {[
                        orderDetails?.billing_address?.city_name,
                        orderDetails?.billing_address?.state_name,
                        orderDetails?.billing_address?.country_name,
                      ].join(", ")}{" "}
                      - {orderDetails?.billing_address?.postal_code}
                    </Text> */}
                  </Box>
                </Box>
                <Box>
                  <Heading size="sm" mb={2}>
                    Shipping Address
                  </Heading>
                  <Box w="100%" fontSize="sm">
                    <Text fontStyle={"italic"} textTransform="capitalize">
                      {orderDetails?.shipping_address?.full_name}
                    </Text>
                    <Text>
                      {orderDetails ??
                        orderDetails?.shipping_address?.mobile_no === "None"
                        ? null
                        : "Phone : " +
                        orderDetails?.shipping_address?.mobile_no}
                    </Text>
                    <Text mt={1} w="20vw">
                      {orderDetails?.shipping_address?.full_address}
                    </Text>
                    {/* <Text mt={1}>
                      {orderDetails?.shipping_address?.address_line_1}
                    </Text>
                    <Text>
                      {orderDetails?.shipping_address?.address_line_2}
                    </Text>
                    <Text>{orderDetails?.shipping_address?.landmark}</Text>
                    <Text>
                      {[
                        orderDetails?.shipping_address?.city_name,
                        orderDetails?.shipping_address?.state_name,
                        orderDetails?.shipping_address?.country_name,
                      ].join(", ")}{" "}
                      - {orderDetails?.shipping_address?.postal_code}
                    </Text> */}
                  </Box>
                </Box>
              </>
            )}
          </Flex>
        </Flex>
        <Box width="100%" p={6}>
          <TableContainer
            fontSize="14px"
            border="1px"
            borderRadius="10px"
            borderColor="gray.400"
          >
            <Table variant="simple" size={{ base: "sm", lg: "md" }}>
              <Thead bg="gray.300">
                <Tr>
                  <Th>Products</Th>
                  <Th isNumeric>Quantity</Th>
                  <Th isNumeric>Unit Price</Th>
                  <Th isNumeric>Taxes</Th>
                  <Th isNumeric>Tax Amount</Th>
                  <Th isNumeric>Total Price</Th>
                  <Th>Review</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderDetails.product_info?.length > 0 ? (
                  orderDetails.rated_product_info?.map((item) => (
                    <Tr key={item.id}>
                      <Td>
                        <Link href={`/products/${item.id}`} fontWeight="bold">
                          {item.product_name}
                        </Link>
                      </Td>
                      <Td isNumeric>{item.quantity}</Td>
                      <Td isNumeric>₹{item.selling_price.toFixed(2)}</Td>
                      <Td isNumeric>{item.tax_name}</Td>
                      <Td isNumeric>₹{orderDetails.tax_amt.toFixed(2)}</Td>
                      <Td isNumeric>₹{item.product_total.toFixed(2)}</Td>
                      <Td>
                        {item.is_rated ? (
                          <ReactStars
                            value={item.product_rating_by_user}
                            size={24}
                            edit={false}
                          />
                        ) : (
                          <Button
                            size="sm"
                            colorScheme="brand"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                id: item.id,
                                name: item.product_name,
                              });
                              onOpen();
                            }}
                          >
                            Review Product
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))
                ) : (
                  <Th>Data not found</Th>
                )}
              </Tbody>
            </Table>
            <Table
              size="sm"
              width={{ base: "75%", md: "25%" }}
              ms="auto"
              mt={8}
              position={{ base: "absolute", md: "relative" }}
            >
              <Tbody>
                <Tr>
                  <Th bg="gray.300">Subtotal</Th>
                  <Td isNumeric>
                    {" "}
                    ₹
                    {(orderDetails.final_total -
                      orderDetails.tax_amt -
                      orderDetails.shipping_amt +
                      orderDetails.discount_amt >
                      0
                      ? orderDetails.final_total -
                      orderDetails.tax_amt -
                      orderDetails.shipping_amt +
                      orderDetails.discount_amt
                      : 0
                    ).toFixed(2)}
                  </Td>
                </Tr>
                <Tr>
                  <Th bg="gray.300">GST (Tax)</Th>
                  <Td isNumeric>₹{orderDetails.tax_amt?.toFixed(2)} </Td>
                </Tr>
                <Tr>
                  <Th bg="gray.300">Shipping Amount</Th>
                  <Td isNumeric>₹{orderDetails.shipping_amt?.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Th bg="gray.300">Discount</Th>
                  <Td isNumeric>₹{orderDetails.discount_amt?.toFixed(2)}</Td>
                </Tr>
                <Tr>
                  <Th bg="gray.300">Total</Th>
                  <Td isNumeric>₹{orderDetails.final_total?.toFixed(2)}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Modal
          size={"xl"}
          closeOnOverlayClick={false}
          isCentered={true}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(2px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader fontWeight={600}>
              Review for {formData?.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input type="hidden" value={formData?.id} />
              <FormControl isRequired mb={4}>
                <FormLabel>Your rating</FormLabel>
                <ReactStars
                  count={5}
                  initialValue={1}
                  value={formData.rating}
                  onChange={(newRating) =>
                    setFormData({ ...formData, rating: newRating })
                  }
                  size={24}
                  half={false}
                  color1={"black"}
                  color2={"#D4AF37"}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Your review</FormLabel>
                <Textarea
                  rows={4}
                  onChange={(e) =>
                    setFormData({ ...formData, review: e.target.value })
                  }
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="brand" onClick={postReview}>
                Post Review
              </Button>
              <Button variant="ghost" ms={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}
