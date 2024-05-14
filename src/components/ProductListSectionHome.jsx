import React from "react";
import {
  Container,
  Text,
  Flex,
  useMediaQuery,
  Box,
  Skeleton,
  SkeletonText,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Import arrow icons
import ProductCardHome from "./ProductCardHome";
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{ left: "40px" }}
      zIndex={1}
    >
      <FaChevronLeft />
    </Box>
  );
};

// Custom arrow component for next button
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{ right: "40px" }}
      zIndex={1}
    >
      <FaChevronRight />
    </Box>
  );
};

const ProductListSectionHome = ({ title, products, loading, type }) => {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargerThan768 ? 4 : 1,
    slidesToScroll: 4,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerMode: true,
    centerPadding: "5%",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
          // centerPadding: "20%",
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          // centerPadding: "20%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          // centerPadding: "20%",
        },
      },
    ],
  };

  return (
    <>
      <Container maxW={"container.xl"} px={0} pt={4} pb={6}>
        <Text
          fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          mb={8}
          textAlign={{ base: "center", md: "start" }}
          fontWeight={500}
        >
          {title}
        </Text>
        {type === "carousal" && products.length > 4 ? (
          <Slider {...settings}>
            {loading === true
              ? [0, 1, 2, 3, 4].map((index) => (
                  <Box
                    key={index}
                    padding="6"
                    boxShadow="lg"
                    bg="white"
                    w={{ base: "80vw", sm: "3xs", lg: "2xs" }}
                  >
                    <Skeleton width={150} mx={"auto"} height={150} />
                    <SkeletonText
                      my="4"
                      noOfLines={1}
                      spacing="4"
                      skeletonHeight="2"
                    />
                    <Skeleton mx="auto" width={100} height={5} />
                  </Box>
                ))
              : products?.map((product) => (
                  <ProductCardHome key={product.id} product={product} />
                ))}
          </Slider>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              xl: "repeat(5, 1fr)",
            }}
            //justify={ "start"}
            justify="center"
            align="center"
            direction={{ base: "column", md: "row" }}
            // wrap={"wrap"}
            wrap={{ md: "wrap", lg: "nowrap" }}
            px={5}
          >
            {loading === true ? (
              <>
                {[0, 1, 2, 3, 4].map(() => (
                  <Box
                    padding="6"
                    boxShadow="lg"
                    bg="white"
                    w={{ base: "80vw", sm: "3xs", lg: "2xs" }}
                  >
                    <Skeleton width={150} mx={"auto"} height={150} />
                    <SkeletonText
                      my="4"
                      noOfLines={1}
                      spacing="4"
                      skeletonHeight="2"
                    />
                    <Skeleton mx="auto" width={100} height={5} />
                  </Box>
                ))}
              </>
            ) : (
              <>
                {products?.map((product) => (
                  <GridItem my={4}>
                    <ProductCardHome key={product.id} product={product} />
                  </GridItem>
                ))}
              </>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default ProductListSectionHome;
