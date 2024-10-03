import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Table,
  Button,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Image,
  TableContainer,
  Heading,
  Center,
  Card,
  Box,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import AddOrRemoveInWishlist from "../utils/addOrRemoveInWishlist";
import AddToCart from "../utils/addToCart";
import { Link } from "react-router-dom";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

export default function Addtocart() {
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState();
  const [wishlistItems, setWishlistItems] = useState([]);
  const loginInfo = checkLogin();
 

  useEffect(() => {
    async function getWishlist() {
      const checkOrSetUDIDInfo = await CheckOrSetUDID();
      let headers = { visitor: checkOrSetUDIDInfo.visitor_id };
    
      if (loginInfo.isLoggedIn === true) {
        headers = { Authorization: `token ${loginInfo.token}` };
      }
      const response = await client.get("/wishlist/", {
        headers: headers,
      });
      if (response.data.status) {
        if (response.data.data.length > 0) {
          setWishlistItems(response.data.data);
        } else {
          setWishlistItems("Your wishlist is empty");
        }
        localStorage.setItem(
          "wishlist_counter",
          response.data.wishlist_counter
        );
      }
      setLoading(false);
    }
    getWishlist(); // eslint-disable-next-line
  }, []);

  const handleWishlistChange = async (item, pos) => {
    setRemoveLoading(item.id);
    const wishlistResponse = await AddOrRemoveInWishlist(item.id);
    if (wishlistResponse.status === true) {
      const temp = wishlistItems.filter((item, index) => index !== pos);
      setWishlistItems(temp);
      setRemoveLoading();
    }
  };
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"My WishList"} secondUrl={"/wishlist"} />
      </Container>

      <Container maxW="container.xl" my={5}>
        <Heading size="lg" textAlign={"center"} mb={6} fontWeight={500}>
          My Wishlist
        </Heading>
        {loading ? (
          <Center h="100%" w="100%">
            <Loader site={true} />
          </Center>
        ) : (
          <Flex justify={"space-between"} gap={"2.5vw"}>
            {typeof wishlistItems === "string" ? (
              <Center p={6} w={"100%"} fontWeight="700">
                {wishlistItems}
              </Center>
            ) : wishlistItems.length > 0 ? (
              <Box mx={"auto"}>
                {wishlistItems?.map((product, index) => (
                  <Flex
                    alignItems={"center"}
                    flexDirection={{ base: "column", md: "row" }}
                    m={5}
                    p={5}
                    boxShadow={"md"}
                    borderRadius={"8px"}
                  >
                    <Link to={`/products/${product.id}`}>
                      <Image
                        src={product.images[0]}
                        boxSize={"100px"}
                        align={"center"}
                      />
                    </Link>

                    <Link
                      style={{ marginLeft: 20, marginRight: 20 }}
                      to={`/products/${product.id}`}
                    >
                      {product.name}
                    </Link>

                    <Flex
                      ml="auto"
                      mt={{ base: 4 }}
                      alignItems={"center"}
                      flexDirection={"row"}
                    >
                      <Text>₹{product.base_price}</Text>
                      <Button
                        isLoading={removeLoading === product.id}
                        bg={"red.500"}
                        leftIcon={<RiDeleteBin5Line />}
                        color="white"
                        _hover={{ bg: "red.500" }}
                        size={"sm"}
                        mx={6}
                        onClick={() => handleWishlistChange(product, index)}
                      >
                        Remove
                      </Button>
                      {product.available_stock_quantity === null ? (
                        <Button
                          id="addToCartButton"
                          gap={2}
                          colorScheme="gray"
                          size="sm"
                          title="Add product to cart"
                          me={3}
                        >
                          OUT OF STOCK
                        </Button>
                      ) : (
                        <Button
                          bg={"brand.100"}
                          color="white"
                          _hover={{ bg: "brand.100" }}
                          size={"sm"}
                          onClick={() => AddToCart(product.id)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Box>
            ) : (
              <Center p={6} w={"100%"} fontWeight="700">
                Your wishlist is empty
              </Center>
            )}
          </Flex>
        )}
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
