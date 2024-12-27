import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import {
  Container,
  Flex,
  Skeleton,
  Badge,
  Image,
  Icon,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { AiFillStar } from "react-icons/ai";
import ReactStars from "react-stars";
import client from "../setup/axiosClient";
import ScrollToTop from "../components/ScrollToTop";
export default function Reviews() {
  const initialProductData = Object.freeze({
    id: 0,
    name: "",
    imageURL: "",
  });
  const [productData, setProductData] = useState(initialProductData);
  const [avgRating, setAvgRating] = useState();
  const [noOfReviews, setNoOfReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    getReviews();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // eslint-disable-next-line
  }, []);

  async function getReviews() {
    const response = await client.get(`/rating_review/${productId}/`);
    if (response.data.status === true) {
      setAvgRating(response.data.average_rating);
      setNoOfReviews(response.data.review_count);
      setReviews(response.data.reviews);
      setProductData({
        id: response.data.product_id,
        name: response.data.product_name,
        imageURL: response.data.product_image,
      });
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <Container maxW="90vw" my={8}>
        <Flex gap={6} align="center">
          <Image
            src={productData.imageURL}
            border="1px"
            boxSize="150px"
            borderRadius={"lg"}
          />
          <Flex justify="center" direction="column" gap={2}>
            <Heading
              lineHeight={1.1}
              fontWeight={"normal"}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              <Skeleton isLoaded={!loading}>{productData?.name}</Skeleton>
            </Heading>
            <Text color="gray.500" fontSize={"sm"}>
              {noOfReviews} customer reviews
            </Text>
            <Flex>
              <Text color="gray.500" fontSize={"sm"} me={2}>
                Average rating :
              </Text>
              <Badge
                as={Flex}
                align="center"
                w="fit-content"
                gap={1}
                colorScheme="brand"
                px={2}
                py={0.5}
                color="white"
                display={avgRating ? "inline-flex" : "none"}
              >
                <Text>{avgRating}</Text>
                <Icon as={AiFillStar} boxSize={2} />
              </Badge>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Container maxW="100vw" px={0} mb={16}>
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
                      {new Date(review.published_at).toLocaleDateString()}
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
        </Flex>
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
