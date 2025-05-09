import {
  Container,
  Text,
  Box,
  Skeleton,
  SkeletonText,
  Grid,
  GridItem,
  IconButton,
  useMediaQuery,
} from "@chakra-ui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductListSection({ title, products = [], type, loading }) {
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [slider, setSlider] = useState(null);

  const showCarousel = type === "carousal" && products.length > 4;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const renderSkeleton = (index) => (
    <Box
      key={`skeleton-${index}`}
      padding="6"
      boxShadow="lg"
      bg="white"
      w={{ base: "80vw", sm: "3xs", lg: "2xs" }}
    >
      <Skeleton width={150} mx="auto" height={150} />
      <SkeletonText my="4" noOfLines={1} spacing="4" skeletonHeight="2" />
      <Skeleton mx="auto" width={100} height={5} />
    </Box>
  );

  return (
    <Container maxW="container.xl" position="relative" px={0} pt={4} pb={6}>
      <Text
        fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
        bgColor="bg.500"
        px={{ base: 2, md: 8 }}
        py={4}
        mb={8}
        textAlign={{ base: "center", md: "start" }}
        fontWeight={500}
      >
        {title}
      </Text>

      {/* Arrows */}
      <IconButton
        icon={<RiArrowLeftSLine size={25} />}
        aria-label="Previous"
        position="absolute"
        top="60%"
        left="20px"
        zIndex={100}
        display={showCarousel ? "flex" : "none"}
        borderRadius="50%"
        size="sm"
        colorScheme="brand"
        boxShadow="base"
        transition="all 0.3s"
        _hover={{ opacity: 0.7, transform: "scale(1.1)" }}
        onClick={() => slider?.slickPrev()}
      />
      <IconButton
        icon={<RiArrowRightSLine size={25} />}
        aria-label="Next"
        position="absolute"
        top="60%"
        right="20px"
        zIndex={100}
        display={showCarousel ? "flex" : "none"}
        borderRadius="50%"
        size="sm"
        colorScheme="brand"
        boxShadow="base"
        transition="all 0.3s"
        _hover={{ opacity: 0.7, transform: "scale(1.1)" }}
        onClick={() => slider?.slickNext()}
      />

      <Container maxW="container.xl" px={10}>
        {showCarousel ? (
          <Slider {...settings} ref={(ref) => setSlider(ref)}>
            {loading
              ? Array.from({ length: 5 }, (_, index) => renderSkeleton(index))
              : products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
          </Slider>
        ) : (
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(5, 1fr)",
            }}
            gap={6}
            px={5}
          >
            {loading
              ? Array.from({ length: 5 }, (_, index) => renderSkeleton(index))
              : products.map((product) => (
                  <GridItem key={product.id}>
                    <ProductCard product={product} />
                  </GridItem>
                ))}
          </Grid>
        )}
      </Container>
    </Container>
  );
}
