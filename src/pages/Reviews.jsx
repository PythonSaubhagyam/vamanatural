import { useState, useEffect, useCallback } from "react";
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
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";
import client from "../setup/axiosClient";

export default function Reviews() {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    id: 0,
    name: "",
    imageURL: "",
  });
  const [avgRating, setAvgRating] = useState(null);
  const [noOfReviews, setNoOfReviews] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const getReviews = useCallback(async () => {
    try {
      const response = await client.get(`/rating_review/${productId}/`);
      if (response.data.status) {
        setProductData({
          id: response.data.product_id,
          name: response.data.product_name,
          imageURL: response.data.product_image,
        });
        setAvgRating(response.data.average_rating);
        setNoOfReviews(response.data.review_count);
        setReviews(response.data.reviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    getReviews();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [getReviews]);

  const pageUrl = "/reviews";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="90vw" my={8}>
        <Flex gap={6} align="center">
          <Skeleton isLoaded={!loading}>
            <Image
              src={productData.imageURL}
              boxSize="150px"
              borderRadius="lg"
              border="1px"
              alt={productData.name}
            />
          </Skeleton>
          <Flex direction="column" gap={2}>
            <Skeleton isLoaded={!loading}>
              <Heading
                lineHeight={1.1}
                fontWeight="normal"
                fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
              >
                {productData.name}
              </Heading>
            </Skeleton>
            <Text color="gray.500" fontSize="sm">
              {noOfReviews} customer reviews
            </Text>
            {avgRating && (
              <Flex align="center">
                <Text color="gray.500" fontSize="sm" me={2}>
                  Average rating:
                </Text>
                <Badge
                  as={Flex}
                  align="center"
                  gap={1}
                  px={2}
                  py={0.5}
                  colorScheme="brand"
                  color="white"
                >
                  <Text>{avgRating}</Text>
                  <Icon as={AiFillStar} boxSize={2} />
                </Badge>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Container>

      <Container maxW="100vw" px={0} mb={16}>
        <Text fontSize={{ base: "xl", sm: "2xl" }} bg="bg.100" px={{ base: 2, md: 8 }} py={4}>
          Product Reviews
        </Text>
        <Flex direction="column" gap={4} id="reviews">
          {loading
            ? Array(3)
                .fill("")
                .map((_, idx) => (
                  <Skeleton height="120px" key={idx} borderRadius="lg" />
                ))
            : reviews.map((review) => (
                <Card key={review.id || review.published_at} variant="outline" border="none">
                  <CardBody pb={0}>
                    <Heading size="sm">{review.name}</Heading>
                    <Text fontSize="xs" color="gray.600">
                      Published on {new Date(review.published_at).toLocaleDateString()}
                    </Text>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      edit={false}
                      size={20}
                      color1={"#dcdcdc"}
                      color2={"#D4AF37"}
                    />
                  </CardBody>
                  <CardFooter pt={0} pb={4}>
                    <Text maxW="75%">{review.review}</Text>
                  </CardFooter>
                  <Divider bg="green.400" />
                </Card>
              ))}
        </Flex>
      </Container>
      <ScrollToTop />
      <Footer />
    </>
  );
}
