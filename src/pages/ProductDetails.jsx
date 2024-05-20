import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  Flex,
  Button,
  Heading,
  SimpleGrid,
  Divider,
  ButtonGroup,
  Skeleton,
  Badge,
  Card,
  CardBody,
  useToast,
  Icon,
  CardFooter,
  Center,
} from "@chakra-ui/react";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ReactStars from "react-stars";
import { useParams, useNavigate } from "react-router-dom";
import client from "../setup/axiosClient";
import AddToCart from "../utils/addToCart";
import AddOrRemoveInWishlist from "../utils/addOrRemoveInWishlist";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import checkLogin from "../utils/checkLogin";
import ProductCarousel from "../components/ProductCarousel";
import ProductListSection from "../components/ProductListSection";
import dompurify from "dompurify";
import Loader from "../components/Loader";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ProductImageSection from "../components/ProductImageSection";

function ButtonIncrement(props) {
  return (
    <Button
      onClick={props.onClickFunc}
      isDibbled={props.isDisabled}
      color={"white"}
      colorScheme={"brand"}
      _hover={{ bg: "brand.100" }}
      isDisabled={props.disabled}
    >
      +
    </Button>
  );
}

function ButtonDecrement(props) {
  return (
    <Button
      onClick={props.onClickFunc}
      isDibbled={props.isDisabled}
      color={"white"}
      colorScheme={"brand"}
      _hover={{ bg: "brand.100" }}
    >
      -
    </Button>
  );
}

function Display(props) {
  return <label>{props.message}</label>;
}

export default function ProductDetails() {
  const [productData, setProductData] = useState(null);
  const [avgRating, setAvgRating] = useState(null);
  const [nobenefits, setNoBenefits] = useState("");
  const [noOfReviews, setNoOfReviews] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [otherProducts, setOtherProducts] = useState([]);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);
  const [isWished, setWished] = useState(false);
  const [counter, setCounter] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const toast = useToast();
  // const maxWidth = useBreakpointValue({ base: "100%", lg: "container.xl" });
  // const boxWidth = useBreakpointValue({ base: "100%", lg: "75%" });
  const loginInfo = checkLogin();
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const MINIMUM_RATING_THRESHOLD = 0.0;
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  let headers = { visitor: checkOrSetUDIDInfo.visitor_id };
  if (loginInfo.isLoggedIn === true) {
    headers = {
      Authorization: `token ${loginInfo.token}`,
    };
  }

  const { productId } = useParams();
  useEffect(() => {
    getProductDetails(); // eslint-disable-next-line
  }, [productId]);

  async function getProductDetails() {
    setLoading(true);
    client
      .get(`/products/${productId}/`, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.status) {
          setTotalQuantity(
            response.data.data.products?.available_stock_quantity
          );

          setProductData(response.data.data.products);
          if (response.data.data.average_rating > MINIMUM_RATING_THRESHOLD) {
            setAvgRating(response.data.data.average_rating);
          }
          if (response.data.data.rating_review_data !== null) {
            setReviews(response.data.data.rating_review_data);
          }
          if (response.data.data.review_count > 0) {
            setNoOfReviews(response.data.data.review_count);
          }
          setWished(response.data.data.products.is_wished);
          setRecentlyViewedProducts(
            response.data.data.recently_viewed_products
          );
          if (response.data?.data?.related_products !== undefined) {
            setRelatedProducts(response.data.data.related_products);
          }
          if (response.data?.data?.other_products !== undefined) {
            setOtherProducts(response.data.data.other_products);
          }
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
          setLoading(false);
        } else {
          toast({
            title: "There was an error loading the product details!",
            description: "Please reload the page",
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        }
      });
  }

  const handleWishlistChange = async (id) => {
    const wishlistResponse = await AddOrRemoveInWishlist(id);
    if (wishlistResponse.status === true) {
      setWished((isWished) => !isWished);
    }
  };
  const scrollToElement = () => {
    const element = document.getElementById("review-area");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };
  return (
    <>
      <Navbar />
      {loading ? (
        <Center h="80vh" w="100%">
          <Loader />
        </Center>
      ) : (
        <>
          <Container maxW="container.xl" mb={0}>
            <Box>
              <BreadCrumbCom
                second={"Product"}
                secondUrl={"/shop"}
                third={`${productData?.name
                  .toLowerCase()
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}`}
                // thirdUrl={`/shop?category=${categories.categoryId || ''}`}
              />
            </Box>
          </Container>

          <Container maxW={"6xl"} mb={0} centerContent>
            <Flex
              position={"relative"}
              direction={{ base: "column", sm: "row" }}
              gap={{ base: 8, md: 10 }}
              pt={{ base: 18, md: 10 }}
              pb={{ base: 18, md: 0 }}
            >
              <Box width={"50%"}>
                <Skeleton isLoaded={!loading}>
                  <ProductImageSection images={productData?.images ?? []} />
                </Skeleton>
              </Box>

              <Stack spacing={{ base: 6, md: 10 }} width={"50%"}>
                <Flex
                  justify="center"
                  direction={"column"}
                  gap={2}
                  align={{ base: "center", lg: "flex-start" }}
                >
                  <Heading
                    as={"header"}
                    lineHeight={1.1}
                    fontWeight={"normal"}
                    fontSize={{
                      base: "1xl",
                      sm: "2xl",
                      lg: "3xl",
                    }}
                    textAlign={{
                      base: "center",
                      lg: "start",
                    }}
                    textTransform={"capitalize"}
                  >
                    {productData?.name
                      .toLowerCase()
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </Heading>
                  <Flex>
                    <Badge
                      as={Flex}
                      w="fit-content"
                      gap={1}
                      size={"sm"}
                      colorScheme="brand"
                      px={2}
                      py={0.9}
                      color="white"
                      display={avgRating ? "inline-flex" : "none"}
                    >
                      <Text fontSize={16}>{avgRating}</Text>
                      <Icon as={AiFillStar} marginTop={1} boxSize={4} />
                    </Badge>
                    {noOfReviews && noOfReviews !== 0 && (
                      <Text
                        as="span"
                        color="gray.500"
                        fontSize={"lg"}
                        ms={2}
                        align={"center"}
                        onClick={scrollToElement}
                        cursor={"pointer"}
                      >
                        {/* {noOfReviews} customer review */}
                        {noOfReviews} Review
                        {noOfReviews > 1 ? "s" : null}
                      </Text>
                    )}
                  </Flex>
                  <>
                    {productData.brand_name &&
                      productData.brand_name.length > 0 && (
                        <Text
                          fontSize={{
                            base: "14px",
                            lg: "18px",
                          }}
                          color={"black"}
                          fontWeight={"500"}
                        >
                          {productData.brand_name}
                        </Text>
                      )}
                    <Box
                      // as="ul"
                      whiteSpace={"pre-line"}
                      marginLeft={5}
                      fontSize={{
                        base: "14px",
                        lg: "18px",
                      }}
                      fontWeight={"380"}
                      textAlign="justify"
                      color={"black"}
                    >
                      {Array.isArray(productData.brand_name) &&
                        productData.brand_name.map((brand, index) => (
                          <li key={index}>{brand}</li>
                        ))}
                    </Box>
                  </>

                  <>
                    <Text
                      fontSize={{
                        base: "20px",
                        lg: "22px",
                      }}
                      // color={"brand.500"}
                      color={"black"}
                      fontWeight={"600"}
                    >
                      {productData?.benefits?.length > 0 && "Benefits :-"}
                    </Text>
                    <Box
                      as="ul"
                      whiteSpace={"pre-line"}
                      marginLeft={5}
                      fontSize={{
                        base: "16px",
                        lg: "20px",
                      }}
                      // lineHeight={1.5}
                      fontWeight={"400"}
                      textAlign="justify"
                      // color={"brand.500"}
                      color={"black"}
                    >
                      {productData?.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </Box>
                  </>

                  <Divider
                    orientation="horizontal"
                    my={2}
                    h="1px"
                    bg={"gray.300"}
                    display={{ base: "none", lg: "block" }}
                    zIndex={-1}
                  />

                  <Skeleton isLoaded={!loading}>
                    <Text
                      color={"gray.900"}
                      fontWeight={"bold"}
                      fontSize={"2xl"}
                    >
                      ₹{productData?.base_price}
                    </Text>
                  </Skeleton>
                  <SimpleGrid spacing={{ base: 8, md: 10 }} zIndex={0}>
                    {totalQuantity?.Quantity !== 0 && (
                      <ButtonGroup
                        as={Flex}
                        p={0}
                        alignItems="center"
                        justifyContent={{
                          base: "center",
                          lg: "start",
                        }}
                      >
                        <ButtonDecrement onClickFunc={decrementCounter} />
                        <Button>
                          <Display message={counter} />
                        </Button>
                        <ButtonIncrement
                          disabled={
                            totalQuantity?.Quantity === counter ? true : false
                          }
                          onClickFunc={incrementCounter}
                        />
                      </ButtonGroup>
                    )}
                    <ButtonGroup>
                      {totalQuantity?.Quantity === 0 ? (
                        <Button
                          id="addToCartButton"
                          as={Flex}
                          textAlign={"center"}
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
                          id="addToCartButton"
                          as={Flex}
                          textAlign={"center"}
                          gap={2}
                          colorScheme="brand"
                          size="sm"
                          title="Add product to cart"
                          _hover={{
                            color: "white",
                            bg: "brand.500",
                            cursor: "pointer",
                          }}
                          me={3}
                          onClick={() => AddToCart(productData?.id, counter)}
                        >
                          <FaShoppingCart />
                          ADD TO CART
                        </Button>
                      )}

                      <Button
                        colorScheme={isWished ? "red" : "brand"}
                        as={Flex}
                        gap={1}
                        size="sm"
                        _hover={
                          isWished
                            ? {
                                color: "white",
                                bg: "red.600",
                                cursor: "pointer",
                              }
                            : {
                                color: "white",
                                bg: "brand.900",
                                cursor: "pointer",
                              }
                        }
                        onClick={() => handleWishlistChange(productData?.id)}
                      >
                        <AiFillHeart />
                        {isWished ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
                      </Button>
                    </ButtonGroup>
                  </SimpleGrid>
                </Flex>
              </Stack>
            </Flex>
            <Box pr={10} mx={8}>
              <Skeleton isLoaded={!loading}>
                <Box
                  //whiteSpace={"pre-line"}
                  lineHeight={1.8}
                  textAlign="justify"
                  dangerouslySetInnerHTML={{
                    // __html: dompurify.sanitize(productData?.description),
                    __html: productData?.description,
                  }}
                />
              </Skeleton>
            </Box>
            {/* </Container> */}
            {reviews && (
              <Container
                maxW="container.xl"
                centerContent
                id="review-area"
                display={"flex"}
                justifyContent={{ base: "center", lg: "start" }}
                px={0}
              >
                <Box>
                  <Text
                    fontSize={{ base: "xl", sm: "2xl" }}
                    bgColor={"bg.100"}
                    px={{ base: 2, md: 8 }}
                    py={4}
                  >
                    Product Reviews
                  </Text>
                  <Flex direction="column" mb={4} id="reviews">
                    {reviews &&
                      reviews.map((review) => (
                        <Skeleton isLoaded={!loading}>
                          <Card
                            direction={"column"}
                            overflow="hidden"
                            variant="outline"
                            border={"none"}
                          >
                            <CardBody pb={0}>
                              <Heading size="sm">{review.name}</Heading>
                              <Text fontSize="xs" color="gray.700">
                                Published at{" "}
                                {new Date(
                                  review.published_at
                                ).toLocaleDateString()}
                              </Text>
                              <ReactStars
                                count={5}
                                value={review.rating}
                                edit={false}
                                size={24}
                                color1={"black"}
                                color2={"#D4AF37"}
                              />
                            </CardBody>
                            <CardFooter pt={0} pb={4}>
                              <Text maxW="75%">{review.review}</Text>
                            </CardFooter>
                          </Card>
                          <Divider h="2.5px" bg={"green.400"} m={0} />
                        </Skeleton>
                      ))}
                    {noOfReviews - 3 >= 1 && (
                      <Button
                        w={{ base: "75%", md: "20vw" }}
                        mx="auto"
                        mt={4}
                        colorScheme="brand"
                        onClick={() =>
                          navigate(`/products/${productId}/reviews`)
                        }
                      >
                        View all reviews
                      </Button>
                    )}
                  </Flex>
                </Box>
              </Container>
            )}
          </Container>
          {relatedProducts.length > 0 && (
            <ProductListSection
              title="Related Products"
              products={relatedProducts}
              justify="center"
              fontSize={{ base: "sm", lg: "md" }}
              type={"carousal"}
            />
          )}
          {otherProducts.length > 0 && (
            <ProductListSection
              title="Other Products"
              products={otherProducts}
              justify="center"
              fontSize={{ base: "sm", lg: "md" }}
              type={"carousal"}
            />
          )}
          {recentlyViewedProducts.length > 0 && (
            <ProductListSection
              title="Recently Viewed Products"
              products={recentlyViewedProducts}
              justify="center"
              fontSize={{ base: "sm", lg: "md" }}
              type={"carousal"}
            />
          )}

          {/* </Flex> */}
        </>
      )}
      <Footer />
    </>
  );
}
