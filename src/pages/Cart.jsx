import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import CartRow from "../components/cartRow";
import ShopProductCard from "../components/ShopProductCard";
import ScrollToTop from "../components/ScrollToTop";
import AmountTable from "../components/AmountTable";
import BreadCrumbCom from "../components/BreadCrumbCom";
import LoginModal from "../components/LoginModal";
import MetaTags from "../context/MetaTagsContext";

import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Center,
  Textarea,
  useToast,
  useMediaQuery,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { EditIcon } from "@chakra-ui/icons";
import { RiDeleteBin5Line } from "react-icons/ri";

import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";
import client from "../setup/axiosClient";

export default function Cart() {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0.0);
  const [discount, setDiscount] = useState(0.0);
  const [taxes, setTaxes] = useState(0.0);
  const [grandTotal, setGrandTotal] = useState(0.0);
  const [continueCheckout, setContinueCheckout] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const [giftMaterials, setGiftMaterials] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [checkingVoucherCode, setCheckingVoucherCode] = useState(false);
  const [cartRemoveLoading, setCartRemoveLoading] = useState();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const navigate = useNavigate();
  const messageRef = useRef(null);
  const voucherCodeRef = useRef(null);
  const loginInfo = checkLogin();

  const pageUrl = "/cart";

  useEffect(() => {
    const loginInfo = checkLogin();
    if (loginInfo.isLoggedIn) getCart();
  }, [checkLogin().isLoggedIn]);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (isGift) {
      messageRef.current?.focus();
      getPackingMaterials();
      const giftMsg = localStorage.getItem("giftMessage");
      setGiftMessage(giftMsg ?? "");
    }
  }, [isGift]);

  async function getCart() {
    const { visitor_id } = await CheckOrSetUDID();
    let headers = { visitor: visitor_id };
    if (loginInfo.isLoggedIn) headers = { Authorization: `token ${loginInfo.token}` };

    const { data } = await client.get("/cart/", { headers });
    if (data.status) {
      setCartItems(data.data.cart_items || []);
      setTotal(data.data.total);
      setDiscount(data.data.discount_amt);
      setTaxes(data.data.gst_amt);
      setGrandTotal(data.data.final_total);
      localStorage.setItem("cart_counter", data.data.cart_counter);
      localStorage.setItem("product_total", data.data.final_total);
      if (loginInfo.isLoggedIn && data.data.cart_counter > 0) setContinueCheckout(true);
    }
    setLoading(false);
  }

  async function getPackingMaterials() {
    const res = await client.get("/products", { params: { categoryID: 490 } });
    setGiftMaterials(res.data.data.products);
  }

  async function handleQuantityChange(cartItemId, newQuantity) {
    const { visitor_id } = await CheckOrSetUDID();
    let headers = { visitor: visitor_id };
    if (loginInfo.isLoggedIn) headers = { Authorization: `token ${loginInfo.token}` };

    const response = await client.patch(`/cart/${cartItemId}/`, { quantity: newQuantity }, { headers });
    if (response.data.status) {
      localStorage.setItem("cart_counter", response.data.cart_counter);
      toast({ title: "Quantity updated!", status: "success", position: "top-right", isClosable: true });
      setVoucherCode("");
      setVoucherApplied(false);
      getCart();
    } else {
      toast({ title: "Error updating quantity!", status: "error", position: "top-right" });
    }
  }

  async function removeProductFromCart(id) {
    setCartRemoveLoading(id);
    const { visitor_id } = await CheckOrSetUDID();
    let headers = { visitor: visitor_id };
    if (loginInfo.isLoggedIn) headers = { Authorization: `token ${loginInfo.token}` };

    const response = await client.delete(`/cart/${id}`, { headers });
    if (response.data.status) {
      toast({ title: "Removed from cart!", status: "success", position: "top-right" });
      setCartItems(cartItems.filter((item) => item.id !== id));
      setContinueCheckout(response.data.cart_counter > 0);
      setTotal(response.data.total);
      setDiscount(response.data.discount_amt);
      setTaxes(response.data.gst_amt);
      setGrandTotal(response.data.final_total);
    }
    setCartRemoveLoading();
    setVoucherCode("");
    setVoucherApplied(false);
  }

  async function checkVoucherCodeAvailability(e) {
    e.preventDefault();
    setCheckingVoucherCode(true);
    try {
      const res = await client.get("/validate-voucher-code/", {
        params: { voucher_code: voucherCode },
        headers: { Authorization: `token ${checkLogin().token}` },
      });
      if (res.data.status) {
        toast({ title: res.data.message, status: "success", position: "top-right" });
        setTotal(res.data.total);
        setTaxes(res.data.gst_amt);
        setDiscount(res.data.discount_amt);
        setGrandTotal(res.data.final_total);
        setVoucherApplied(true);
      } else {
        toast({ title: res.data.message, status: "error", position: "top-right" });
      }
    } catch (err) {
      toast({ title: err?.response?.data?.message || "Error!", status: "error", position: "top-right" });
    }
    setCheckingVoucherCode(false);
  }

  function checkNavigate() {
    if (!loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
      toast({ title: "Please login to continue", status: "info", position: "top-right" });
      return;
    }
    if (grandTotal <= 250) {
      toast({ title: "Minimum order is ₹250", status: "info", position: "top-right" });
      return;
    }
    navigate("/checkout", {
      state: {
        total,
        discount,
        taxes,
        grandTotal,
        isAGift: isGift,
        giftMessage,
        voucherCode,
      },
    });
  }

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second="My Cart" secondUrl="/cart" />
        <Heading size="lg" textAlign="center" my={6}>My Cart</Heading>
        {loading ? (
          <Center h="50vh"><Loader site /></Center>
        ) : cartItems.length === 0 ? (
          <Flex direction="column" align="center" gap={4} py={10}>
            <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/emptyCart.gif" boxSize="200px" />
            <Text>Your cart is empty</Text>
            <Button as={Link} to="/shop" colorScheme="brand">Shop Now</Button>
          </Flex>
        ) : (
          <Flex direction={{ base: "column", md: "row" }} justify="space-between" gap={8}>
            <Box w={{ base: "100%", md: "70%" }}>
              {cartItems.map((cartItem, index) => (
                <CartRow
                  key={cartItem.id}
                  index={index}
                  cartItem={cartItem}
                  defaultValue={cartItem.quantity}
                  onSubmit={(newQty) => handleQuantityChange(cartItem.id, newQty)}
                  cartRemoveLoading={cartRemoveLoading}
                  removeProductFromCart={removeProductFromCart}
                />
              ))}
              {isGift && (
                <Box mt={6}>
                  <Text mb={2}>Add your message here</Text>
                  <Textarea ref={messageRef} value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} />
                  <Text fontWeight="bold" fontSize="lg" mt={6} mb={4}>Select Packing Material</Text>
                  <Flex wrap="wrap" gap={4}>
                    {giftMaterials.map((material) => (
                      <ShopProductCard
                        key={material.id}
                        productDetails={material}
                        displayWishlistButton={false}
                      />
                    ))}
                  </Flex>
                </Box>
              )}
              <Flex mt={6} justify="space-between" mb={"10"} >
                <Button as={Link} to="/shop" leftIcon={<IoIosArrowBack />} colorScheme="brand">Continue Shopping</Button>
                <Button rightIcon={<IoIosArrowForward />} colorScheme="brand" onClick={checkNavigate} disabled={!continueCheckout}>Process Checkout</Button>
              </Flex>
            </Box>
            <AmountTable
              cartItems={cartItems}
              total={total}
              taxes={taxes}
              discount={discount}
              grandTotal={grandTotal}
              isMobile={isMobile}
              voucherCode={voucherCode}
              setVoucherCode={setVoucherCode}
              voucherApplied={voucherApplied}
              setVoucherApplied={setVoucherApplied}
              checkVoucherCodeAvailability={checkVoucherCodeAvailability}
              checkingVoucherCode={checkingVoucherCode}
              getCart={getCart}
            />
          </Flex>
        )}
      </Container>
      {!loginInfo.isLoggedIn && <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />}
      <ScrollToTop />
      <Footer />
    </>
  );
}
