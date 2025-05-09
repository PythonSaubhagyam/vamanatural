import {
    Box,
    Card,
    Text,
    Container,
    Flex,
    GridItem,
    Heading,
    Image,
    LinkBox,
    LinkOverlay,
    IconButton,
  } from "@chakra-ui/react";
  import { ChevronRightIcon } from "@chakra-ui/icons";
  import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
  import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
  import React, { useRef } from "react";
  import Slider from "react-slick";
  import { motion } from "framer-motion";
  
  const MotionGridItem = motion(GridItem);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };
  
  const BlogSliderHome = ({ blogs = [] }) => {
    const sliderRef = useRef(null);
    const navigate = useNavigate();
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      arrows: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    };
  
    return (
      <Container maxW="container.xl" px={0} position="relative" py={4}>
        <Box textAlign="center" mb={3}>
          <Heading as="h1" fontSize={{ base: "2xl", md: "2xl", xl: "2xl" }} color="brand.500">
            BLOGS
          </Heading>
        </Box>
  
        {/* Arrows */}
        <IconButton
          icon={<RiArrowLeftSLine size={25} />}
          aria-label="Previous"
          position="absolute"
          top="55%"
          left="20px"
          zIndex={10}
          borderRadius="full"
          size="sm"
          colorScheme="brand"
          boxShadow="base"
          _hover={{ opacity: 0.6, transform: "scale(1.1)" }}
          onClick={() => sliderRef.current?.slickPrev()}
        />
        <IconButton
          icon={<RiArrowRightSLine size={25} />}
          aria-label="Next"
          position="absolute"
          top="55%"
          right="20px"
          zIndex={10}
          borderRadius="full"
          size="sm"
          colorScheme="brand"
          boxShadow="base"
          _hover={{ opacity: 0.6, transform: "scale(1.1)" }}
          onClick={() => sliderRef.current?.slickNext()}
        />
  
        <Container maxW="container.xl" px={10} mt={5}>
          <Slider {...settings} ref={sliderRef}>
            {blogs.slice(0, 8).map((blog, index) => (
              <MotionGridItem
              my={5}
                key={blog.id}
                px={5}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.03 }}
              >
                <Card
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{
                    boxShadow: "xl",
                  }}
                  cursor="pointer"
                >
                  <LinkBox>
                    <Box overflow="hidden">
                      <Image
                        src={blog.banner}
                        alt={blog.title}
                        w="100%"
                        h="300px"
                        objectFit="cover"
                        borderRadius="md"
                        transition="transform 0.5s ease"
                        _hover={{ transform: "scale(1.1)" }}
                        loading="lazy"
                      />
                    </Box>
                    <LinkOverlay
                      as={ReactRouterLink}
                      to={`/blogs/${blog.id}/${blog.title.replace(/\s+/g, "-")}`}
                      _hover={{ color: "brand.500" }}
                    >
                      <Heading size="sm" fontWeight={500} m={3} noOfLines={2}>
                        {blog.title}
                      </Heading>
                    </LinkOverlay>
                  </LinkBox>
  
                  <Flex m={3} justify="space-between" align="center">
                    <Text fontSize="sm" color="gray.500">
                      {new Intl.DateTimeFormat("en-CA", {
                        dateStyle: "long",
                        timeZone: "Asia/Kolkata",
                      }).format(new Date(blog.published_at))}
                    </Text>
                    <Text
                      fontSize="sm"
                      fontWeight={600}
                      color="brand.500"
                      cursor="pointer"
                      onClick={() =>
                        navigate(`/blogs/${blog.id}/${blog.title.replace(/\s+/g, "-")}`)
                      }
                    >
                      Read more <ChevronRightIcon />
                    </Text>
                  </Flex>
                </Card>
              </MotionGridItem>
            ))}
          </Slider>
        </Container>
      </Container>
    );
  };
  
  export default BlogSliderHome;
  