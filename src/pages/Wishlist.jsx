import {
  Container,
  Flex,
  Image,
  Heading,
  Center,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MetaTags from "../context/MetaTagsContext";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Loader from "../components/Loader";
import ScrollToTop from "../components/ScrollToTop";

import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import AddOrRemoveInWishlist from "../utils/addOrRemoveInWishlist";
import AddToCart from "../utils/addToCart";
import CheckOrSetUDID from "../utils/checkOrSetUDID";

export default function Addtocart() {
  const [loading, setLoading] = useState(true);
  const [removeLoading, setRemoveLoading] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const loginInfo = checkLogin();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      const { visitor_id } = await CheckOrSetUDID();
      const headers = loginInfo.isLoggedIn
        ? { Authorization: `token ${loginInfo.token}` }
        : { visitor: visitor_id };

      const { data } = await client.get("listwish/", { headers });
      setWishlistItems(data.data.length ? data.data : "Your wishlist is empty");
      localStorage.setItem("wishlist_counter", data.wishlist_counter);
      setLoading(false);
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (product, index) => {
    setRemoveLoading(product.id);
    const res = await AddOrRemoveInWishlist(product.id);
    if (res.status) {
      setWishlistItems((prev) => prev.filter((_, i) => i !== index));
    }
    setRemoveLoading(null);
  };

  const handleAddToCart = async (product, index) => {
    await AddToCart(product.id);
    await handleRemove(product, index);
    navigate("/cart");
  };

  const pageUrl = "/wishlist";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second="My WishList" secondUrl="/wishlist" />
      </Container>

      <Container maxW="container.xl" my={5}>
        <Heading size="lg" textAlign="center" mb={6} fontWeight={500}>
          My Wishlist
        </Heading>

        {loading ? (
          <Center w="100%">
            <Loader site />
          </Center>
        ) : typeof wishlistItems === "string" ? (
          <Center p={6} fontWeight="700">
            {wishlistItems}
          </Center>
        ) : (
          <Flex direction="column" align="center">
            {wishlistItems.map((product, index) => (
              <Box
                key={product.id}
                w={{ base: "100%", md: "60%" }}
                p={4}
                mb={6}
                borderWidth="1px"
                borderRadius="lg"
                boxShadow="sm"
                bg="white"
                transition="all 0.3s ease"
                _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
              >
                <Flex
                  direction={{ base: "column", md: "row" }}
                  align={{ base: "start", md: "center" }}
                  gap={5}
                >
                  {/* Product Image */}
                  <Link to={`/products/${product.id}/${product.name.replace(/\s+/g, "-")}`}>
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      boxSize={{ base: "100%", md: "100px" }}
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Link>

                  {/* Product Details */}
                  <Box flex="1">
                    <Link to={`/products/${product.id}/${product.name.replace(/\s+/g, "-")}`}>
                      <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        noOfLines={2}
                        _hover={{ textDecoration: "underline" }}
                      >
                        {product.name}
                      </Text>
                    </Link>
                    <Text fontSize="md" mt={1} color="gray.700">
                      ₹{Number(product.product_price || product.base_price).toFixed(2)}
                    </Text>
                  </Box>

                  {/* Actions */}
                  <Flex
                    direction={{ base: "column", sm: "row" }}
                    align="center"
                    justify="center"
                    gap={3}
                  >
                    <Button
                      isLoading={removeLoading === product.id}
                      colorScheme="red"
                      size="sm"
                      leftIcon={<RiDeleteBin5Line />}
                      onClick={() => handleRemove(product, index)}
                      _hover={{ opacity: 0.9 }}
                    >
                      Remove
                    </Button>

                    <Button
                      size="sm"
                      color="white"
                      backgroundColor={
                        product.available_stock_quantity === null ? "gray.400" : "brand.500"
                      }
                      disabled={product.available_stock_quantity === null}
                      onClick={
                        product.available_stock_quantity !== null
                          ? () => handleAddToCart(product, index)
                          : undefined
                      }
                      _hover={{ opacity: 0.9 }}
                    >
                      {product.available_stock_quantity === null ? "OUT OF STOCK" : "Add to cart"}
                    </Button>
                  </Flex>
                </Flex>
              </Box>
            ))}
          </Flex>
        )}
      </Container>

      <ScrollToTop />
      <Footer />
    </>
  );
}
