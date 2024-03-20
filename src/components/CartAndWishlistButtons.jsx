import { useState, useEffect } from "react";
import { ButtonGroup, Flex, Badge } from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";
import { BsFillCartFill, BsFillHeartFill } from "react-icons/bs";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";

export default function CartAndWishlistButtons() {
  const location = useLocation();
  const loginInfo = checkLogin();
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  let headers = { visitor: checkOrSetUDIDInfo?.visitor_id };
  if (loginInfo.isLoggedIn === true) {
    headers = { Authorization: `token ${loginInfo?.token}` };
  }
  const [CartCount, setCartCount] = useState(0);
  const [Wishlist, setWishlistCount] = useState(
    localStorage.getItem("wishlist_counter") ?? 0
  );

  const MINUTE_MS = 500;

  useEffect(() => {
    getCart(); // eslint-disable-next-line
    const interval = setInterval(() => {
      // getCart(); // eslint-disable-next-line
    }, MINUTE_MS);

    return () => clearInterval(interval); // eslint-disable-next-line
  }, [location.pathname]);

  async function getCart() {
    const response = await client.get("/cart/", {
      headers: headers,
    });
    if (response.data.status === true) {
      setCartCount(response.data.data.cart_counter);
    } else {
      setCartCount(0);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getWishlist();
      getCart();
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, [Wishlist]);

  async function getCart() {
    setCartCount(localStorage.getItem("cart_counter") ?? 0);
  }

  async function getWishlist() {
    setWishlistCount(localStorage.getItem("wishlist_counter") ?? 0);
  }

  return (
    <ButtonGroup gap={{ base: 1, md: 2 }}>
      <Flex align={"center"} as={ReactRouterLink} to="/cart">
        <BsFillCartFill color={"brand.900"} />
        <Badge
          bg={"brand.900"}
          color="white"
          fontSize="10px"
          pos="relative"
          bottom={2}
        >
          {CartCount > 99 ? "99+" : CartCount}
        </Badge>
      </Flex>
      <Flex align={"center"} as={ReactRouterLink} to="/wishlist">
        <BsFillHeartFill color={"brand.900"} />
        <Badge
          bg={"brand.900"}
          color="white"
          fontSize="10px"
          pos="relative"
          bottom={2}
          right={-0.5}
        >
          {Wishlist > 99 ? "99+" : Wishlist}
        </Badge>
      </Flex>
    </ButtonGroup>
  );
}
