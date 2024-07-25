import {
  Container,
  Flex,
  Text,
  Button,
  Link,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BsFillCartFill } from "react-icons/bs";
import { MdPlayArrow } from "react-icons/md";
import React, { useEffect, useState } from "react";
import CartEmitter from "./EventEmitter";
import { useLocation, useNavigate } from "react-router-dom";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";

const CartPopUp = () => {
  const [CartCount, setCartCount] = useState(
    localStorage.getItem("cart_counter") ?? 0
  );
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const loginInfo = checkLogin();

  let headers = { visitor: checkOrSetUDIDInfo?.visitor_id };

  if (loginInfo.isLoggedIn === true) {
    headers = { Authorization: `token ${loginInfo?.token}` };
  }

  const [total, setTotal] = useState(
    localStorage.getItem("product_total") === null ||
    localStorage.getItem("product_total") === undefined
      ? 0
      : localStorage.getItem("product_total")
  );

  useEffect(() => {
    const updateProductTotal = async () => {
      const cartRes = await client.get("/cart/", {
        headers: headers,
      });
      if (cartRes.data.status === true) {
        console.log(cartRes.data.data.cart_counter);
        console.log(cartRes.data.data.final_total);
        setCartCount(cartRes.data.data.cart_counter);
        localStorage.setItem("product_total", cartRes.data.data.final_total);
        setTotal(cartRes.data.data.final_total);
      }
    };

    CartEmitter.on("updateProductTotal", updateProductTotal);

    return () => {
      CartEmitter.off("updateProductTotal", updateProductTotal);
    };
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const isEliteMember = localStorage.getItem("is_sose_elite_user") === "true";

  return (
    <>
      <Container
        maxW={"container.xl"}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 1.95px 0px",
          position: "sticky",
          overflow: "hidden",
          bottom: 0,
          zIndex: 9,
        }}
        centerContent
        px={1}
        display={location.pathname === "/cart" ? "none" : "flex"}
      >
        {isEliteMember ? (
          <Box
            bgColor={"brand.500"}
            color={"#fff"}
            textAlign={"center"}
            py={3}
            fontWeight={400}
            borderTopRightRadius={"20px"}
            borderTopLeftRadius={"20px"}
            w={{ md: 600, base: "100%" }}
            opacity={0.9}
            fontSize={13}
          >
            Thank you for being a SOSE Elite member! Enjoy your complimentary delivery and exclusive benefits.
          </Box>
        ) : (
          <Box
            bgColor={"brand.500"}
            color={"#fff"}
            textAlign={"center"}
            py={3}
            fontWeight={400}
            borderTopRightRadius={"20px"}
            borderTopLeftRadius={"20px"}
            w={{ md: 600, base: "100%" }}
            opacity={0.9}
            fontSize={13}
          >
            Upgrade to{" "}
            <Link href="/subscription-plans" fontWeight={700} fontSize={"sm"}>
              SOSE Elite
            </Link>{" "}
            now for complimentary delivery and elevate your shopping experience!
          </Box>
        )}
        <Flex
          justifyContent={"space-between"}
          px={3}
          py={2}
          backgroundColor={"#5b5b5bbd"}

          color={"#fff"}
          w={{ md: 600, base: "100%" }}
          opacity={0.9}
        >
          <Flex gap={2} alignItems={"center"}>
            <BsFillCartFill fontSize={"1.4rem"} />
            <Text fontSize={17} mt={1}>
              {CartCount}
              {"  "}items
            </Text>
          </Flex>
          <Flex gap={2} mt={1} alignItems={"center"}>
            <Text fontSize={17} fontWeight={700}>
              ₹ {parseFloat(total).toFixed(2) ?? 0}
            </Text>
            <Text
              as={Flex}
              onClick={() => navigate("/cart")}
              fontSize={17}
              fontWeight={700}
            >
              Cart{" "}
              <MdPlayArrow
                color="#fff"
                cursor={"pointer"}
                fontSize={"1.5rem"}
              />
            </Text>
          </Flex>
        </Flex>
      </Container>
    </>
  );
};

export default CartPopUp;
