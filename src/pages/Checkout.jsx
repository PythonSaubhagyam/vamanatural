import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import Navbar from "../components/Navbar";

import Footer from "../components/Footer";
import Loader from "../components/Loader";
import checkLogin from "../utils/checkLogin";
import {
  useMediaQuery,
  Box,
  Container,
  Text,
  Badge,
  useToast,
  Flex,
  Button,
  SimpleGrid,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Heading,
  Center,
  Grid,
} from "@chakra-ui/react";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import Actions from "../components/Actions";

export default function Checkout({ getDetails }) {
  function onEditClick(id, address) {
    navigate(`/profile/addresses/${id}/edit`, {
      state: { address: address },
    });
  }

  // const [showPremiunDeliveryOption, setShowPremiunDeliveryOption] = useState(
  //   localStorage.getItem("is_sose_elite_user") === "true" ? true : false
  // );
  // const [showAllDeliveryOptions, setShowAllDeliveryOptions] = useState();
  const initialFormData = Object.freeze({
    billingAddress: null,
    full_name: "",
    mobile: "",
    another_mobile: "",
    address_line_1: "",
    address_line_2: "",
    landmark: "",
    city: "",
    state: "",
    postal_code: "",
    country: "India",
    pay_type: null,
    shipping_amt:
      localStorage.getItem("is_sose_elite_user") === "true" ? 0 : 100,
  });

  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isPayment, setPayment] = useState(false);

  const [paymentInProgress, setPaymentInProgress] = useState(false);

  const location = useLocation();

  const navigate = useNavigate();
  const toast = useToast();
  const loginInfo = checkLogin();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const SHOW_BY_DEFAULT = 2;
  const visibleAddresses = showAll ? addresses?.length : SHOW_BY_DEFAULT;

  const [Txt_new_id, setTxt_new_id] = useState("");

  useEffect(() => {
    getAddresses(); // eslint-disable-next-line
    getEliteUser();
  }, []);

  const getEliteUser = async () => {
    try {
      const response = await client.get("/user/elite_check/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });

      if (response.data.status === true) {
        localStorage.setItem(
          "is_sose_elite_user",
          response.data.is_sose_elite_user
        );
      }
    } catch (err) {
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
  };

  async function getAddresses() {
    try {
      const response = await client.get("/user/address/", {
        headers: { Authorization: `token ${loginInfo.token}` },
      });

      if (response.data.status) {
        setAddresses(response.data.data);
        const defaultAddress = response.data.data.filter(
          (address) => address.is_default === true
        );
        console.log(defaultAddress);

        if (response.data.data[0]?.city_obj.name === "Ahmedabad") {
          setFormData({
            ...formData,
            shipping_amt: 0,
            full_name: formData?.full_name ?? "",
            billingAddress: response.data.data[0]?.id,
          });
        } else {
          setFormData({
            ...formData,
            shipping_amt:
              localStorage.getItem("is_sose_elite_user") === "true" ? 0 : 100,
            full_name: formData?.full_name ?? "",
            billingAddress: response.data.data[0]?.id,
          });
        }
      } else {
        toast({
          title: "Error",
          status: "error",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      }
      setLoading(false);
    } catch (err) {
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

  const placeOrder = async (e) => {
    setPayment(true);
    e.preventDefault();
    setLoading(true);
    try {
      const response = await client.post(
        "/orders/",
        {
          address1: parseInt(formData.billingAddress),
          pay_type: formData.pay_type,
          udf2: formData.shipping_amt,
          udf3: location.state?.taxes,
          discount_amt: location.state?.discount,
          udf4: location.state?.voucherCode,
          order_total: location.state?.grandTotal,
          sale_status: "Quotation Sent",
          productinfo: location.state?.isAGift ? "Gift" : "SOSE",
          udf5: location.state?.giftMessage ?? "",
          amount: location.state?.grandTotal,
        },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (response.data.status === true) {
        toast({
          title: "Your order has been placed!",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        localStorage.removeItem("isAGift");
        localStorage.removeItem("giftMessage");
        localStorage.setItem("cart_counter", 0);
        localStorage.setItem("product_total",0)
        navigate("/profile#orders", { relative: true });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }

    setLoading(false);
    setPayment(false);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    // navigate("/");
  };
  async function updateDeliveryOptions(addressId) {
    let selectedAddress = addresses.find(
      (address) => address.id === parseInt(addressId)
    );

    if (selectedAddress.city_obj.name === "Ahmedabad") {
      setFormData({
        ...formData,
        billingAddress: addressId,
        shipping_amt: 0,
      });
    } else {
      setFormData({
        ...formData,
        billingAddress: addressId,
        shipping_amt:
          localStorage.getItem("is_sose_elite_user") === "true" ? 0 : 100,
      });
    }
  }

  async function handleOnlinePayment() {
    setPayment(true);
    if (formData.billingAddress === null) {
      toast({
        title: "Please select billing address!",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } else {
      let data = {};
      data.txnid = new Date().getTime().toString();
      data.amount = `${location.state.grandTotal + formData.shipping_amt}`;
      data.productinfo = location.state.isAGift ? "Gift" : "SOSE";
      data.billing_address = formData.billingAddress;
      data.shipping_amount = formData.shipping_amt;
      data.tax_amount = location.state.taxes;
      data.is_a_gift = location.state.isAGift;
      data.giftMessage = location.state.giftMessage;
      data.voucherCode = location.state?.voucherCode;
      const res = await client.post(
        "/get-order-payment-link/",
        {
          ...data,
        },
        {
          headers: {
            Authorization: `token ${checkLogin().token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      var txt_new = res.data.txn_id;
      if (res.data.status === true) {
        setTxt_new_id(res.data.txn_id);
        // setPaymentInProgress(true);
        // window.open(, "_top");
        const options =
          "location=yes,height=570,width=520,scrollbars=yes,status=yes";
        // openInNewTab(res.data.payment_url);
        setTimeout(() => {
          window.open(res.data.payment_url, "_top", options);
        });
        // const checkPayment = setInterval(async function () {
        //   const res = await getPaymentDetails(txt_new);
        //   if (res.data.status === true) {
        //     setPaymentInProgress(false);
        //     localStorage.removeItem("isAGift");
        //     localStorage.removeItem("giftMessage");
        //     // toast({
        //     //   title: "Your order has been placed!",
        //     //   status: "success",
        //     //   position: "top-right",
        //     //   duration: 5000,
        //     //   isClosable: true,
        //     // });
        //     navigate("/profile#orders");
        //     clearInterval(checkPayment);
        //     localStorage.setItem("cart_counter", 0);
        //   } else {
        //     // setPaymentInProgress(false);
        //     // navigate("/");
        //   }
        // }, 3000);
      } else {
      }

      setPayment(false);
    }
  }

  async function getPaymentDetails(txt_id) {
    const res = await client.get(`/check-payment-details/${txt_id}/`, {
      headers: { Authorization: `token ${checkLogin().token}` },
    });
    return res;
  }
  if (location.state !== null) {
    return (
      <>
        <Navbar />

        {loading ? (
          <Center h="75vh">
            <Loader site={true} />
          </Center>
        ) : paymentInProgress === true ? (
          <Center h="75vh" flexDirection="column" gap={6}>
            <Loader site={true} />
            <Box align="center">
              <Text fontSize="xl">
                We are currently processing your payment ...
              </Text>
              <Text fontSize="md" fontWeight="bold" color="red.500">
                Kindly do not refresh the page while the transaction is in
                progress
              </Text>
            </Box>
          </Center>
        ) : (
          <Container
            maxW={"container.xl"}
            py={8}
            as="form"
            onSubmit={(e) => placeOrder(e)}
          >
            <Flex justify="space-between" align="center" mb={4}>
              <Heading size="md">Select delivery address</Heading>
              <Button
                colorScheme={"brand"}
                size="sm"
                onClick={() => {
                  navigate("/profile/addresses/add");
                }}
              >
                + Add new {isMobile ? null : "address"}
              </Button>
            </Flex>

            <FormControl
              as="fieldset"
              id="shipping"
              isRequired
              // disabled={sameAddresses}
            >
              <RadioGroup
                value={parseInt(formData.billingAddress) || addresses[0].id}
                onChange={(addressId) => updateDeliveryOptions(addressId)}
                name="billing-address"
              >
                <SimpleGrid columns={[1, 1, null, 2]} spacing="1vw">
                  {addresses
                    .slice(0, visibleAddresses)
                    .map((address, index) => (
                      <Flex
                        key={address.id}
                        border="1px"
                        borderColor="brand.900"
                        borderRadius="2xl"
                        p={4}
                        width={"100%"}
                        justifyContent={"space-between"}
                      >
                        <Radio value={address.id} colorScheme="brand">
                          <Flex
                            gap={2}
                            align="center"
                            justifyContent={"space-between"}
                          >
                            <Flex align="center">
                              <Text fontWeight={700}>{address.full_name}</Text>
                              <Badge
                                px={1}
                                h="fit-content"
                                bg={"brand.500"}
                                color="white"
                              >
                                {address.address_tags}
                              </Badge>
                            </Flex>
                          </Flex>
                          <Text fontSize={"xs"}>{addresses.mobile}</Text>
                          <Text>{address.address_line_1 ?? null}</Text>
                          <Text>{address.address_line_2 ?? null}</Text>
                          <Text>
                            {[
                              address?.landmark ?? null,
                              address?.city_obj?.name ?? null,
                              address?.state_obj?.name ?? null,
                              address?.country_obj?.name ?? null,
                            ].join(", ") ?? null}
                          </Text>
                        </Radio>
                        <Box alignItems={"baseline"}>
                          <Actions
                            borderDisplay={false}
                            onEditClick={() => onEditClick(address.id, address)}
                            showDelete={false}
                          />
                        </Box>
                      </Flex>
                    ))}
                </SimpleGrid>
                <Flex justify="center">
                  {addresses.length > SHOW_BY_DEFAULT && (
                    <Button
                      onClick={toggleShowAll}
                      bg="brand.100"
                      color="white"
                      w={{ base: "35vw", lg: "25vw" }}
                      border="1px"
                      borderRadius={"2xl"}
                      my={"1vw"}
                      _hover={{ bg: "brand.500" }}
                    >
                      {!showAll ? "Show all addresses" : "Show Less"}
                    </Button>
                  )}
                </Flex>
              </RadioGroup>
            </FormControl>
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify="space-between"
              my={4}
            >
              <FormControl
                as={Flex}
                direction="column"
                id="payment-options"
                isRequired
              >
                <Heading as={FormLabel} size="lg" my={4}>
                  Choose a payment method
                </Heading>
                <RadioGroup
                  name="payment-options"
                  value={formData.pay_type}
                  onChange={(payType) =>
                    setFormData({ ...formData, pay_type: payType })
                  }
                >
                  <Flex gap={5} direction="column">
                    <Radio colorScheme="brand" value="Cash on Delivery">
                      Cash on Delivery
                    </Radio>
                    <Radio colorScheme="brand" value="Online Payment">
                      Online Payment
                    </Radio>
                  </Flex>
                </RadioGroup>
              </FormControl>
              <FormControl
                as={Flex}
                direction="column"
                id="delivery-options"
                isRequired
              >
                <Heading as={FormLabel} size="lg" my={4}>
                  Choose a delivery method
                </Heading>
                <RadioGroup
                  name="delivery-options"
                  value={parseInt(formData.shipping_amt)}
                  // onChange={(shippingCost) => {
                  //   setFormData({
                  //     ...formData,
                  //     shipping_amt: parseInt(shippingCost),
                  //   });
                  // }}
                >
                  <Flex gap={5} direction="column">
                    {formData.shipping_amt === 0 ? (
                      <Radio colorScheme="brand" value={0}>
                        Free Home Delivery (Elite / within Ahmedabad)
                      </Radio>
                    ) : (
                      <Radio colorScheme="brand" value={100}>
                        Normal Delivery{" "}
                        <Text fontWeight="bolder" display="inline">
                          (₹ 100)
                        </Text>{" "}
                      </Radio>
                    )}
                  </Flex>
                </RadioGroup>
              </FormControl>
            </Flex>
            <Flex justify={"center"} mt={8}>
              {formData?.pay_type === "Cash on Delivery" && (
                <Button type="submit" mx="auto" colorScheme="brand">
                  Place order
                </Button>
              )}
              {formData?.pay_type === "Online Payment" && (
                <Button
                  type="button"
                  mx="auto"
                  colorScheme="brand"
                  onClick={handleOnlinePayment}
                  isLoading={isPayment}
                  loadingText="Processing..."
                >
                  Pay online
                </Button>
              )}
            </Flex>
          </Container>
        )}
        <Footer />
      </>
    );
  } else {
    return <Navigate to="/cart"></Navigate>;
  }
}
