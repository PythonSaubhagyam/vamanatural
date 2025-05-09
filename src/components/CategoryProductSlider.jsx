import React, { useRef } from 'react';
import {
    Box, Button, Card, CardBody, CardFooter, Container, GridItem, Heading, IconButton, Image, Text
} from '@chakra-ui/react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

const MotionGridItem = motion(GridItem);

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.4,
            ease: 'easeOut'
        }
    })
};

const CategoryProductSlider = ({ products = [], title, type }) => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    const showArrows = type === "carousal" && products.length > 4;

    return (
        <Container maxW="container.xl" px={0} position="relative">
            <Text
                as="h1"
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

            {showArrows && (
                <>
                    <IconButton
                        icon={<RiArrowLeftSLine size={25} />}
                        aria-label="Previous"
                        position="absolute"
                        top="60%"
                        left="20px"
                        zIndex={100}
                        borderRadius="50%"
                        size="sm"
                        colorScheme="brand"
                        boxShadow="base"
                        transition="all 0.3s"
                        _hover={{ opacity: 0.7, transform: 'scale(1.1)' }}
                        onClick={() => sliderRef.current?.slickPrev()}
                    />
                    <IconButton
                        icon={<RiArrowRightSLine size={25} />}
                        aria-label="Next"
                        position="absolute"
                        top="60%"
                        right="20px"
                        zIndex={100}
                        borderRadius="50%"
                        size="sm"
                        colorScheme="brand"
                        boxShadow="base"
                        transition="all 0.3s"
                        _hover={{ opacity: 0.7, transform: 'scale(1.1)' }}
                        onClick={() => sliderRef.current?.slickNext()}
                    />
                </>
            )}

            <Container maxW="container.xl" px={10} mt={5}>
                <div className="slider-container">
                    <Slider {...settings} ref={sliderRef}>
                        {products.map((product, i) => (
                            <MotionGridItem
                                px={5}
                                mb={2}
                                key={product.id}
                                variants={fadeInUp}
                                initial="hidden"
                                animate="visible"
                                custom={i}
                            >
                                <Card
                                    my={"5"}
                                    border="1px"
                                    borderColor="brand.100"
                                    borderRadius="lg"
                                    cursor="pointer"
                                    transition="transform 0.3s, box-shadow 0.3s"
                                    _hover={{
                                        transform: "scale(1.02)",
                                        boxShadow: "lg"
                                    }}
                                    onClick={() => {
                                        navigate(`/products/${product.product?.id}/${product.product?.name.replace(/\s+/g, "-")}`);
                                    }}
                                >
                                    <CardBody
                                        bg="white"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        display="flex"
                                        justifyContent="center"
                                        alignItems="center"
                                        height="220px"
                                    >
                                        <Image
                                            src={product.product?.home_image || product.product?.image1}
                                            alt={product.product?.name}
                                            borderRadius="md"
                                            transition="transform 0.4s"
                                            _hover={{ transform: "scale(1.05)" }}
                                            boxSize="200px"
                                            objectFit="contain"
                                            mx="auto"
                                        />
                                    </CardBody>
                                    <CardFooter
                                        flexDirection="column"
                                        align="center"
                                        py={3}
                                        bg="bg.500"
                                        borderBottomRadius="lg"
                                    >
                                        <Box h="80px" display="flex" alignItems="center" justifyContent="center">
                                            <Heading
                                                size="sm"
                                                mb={3}
                                                noOfLines={3}
                                                fontWeight="500"
                                                title={product.name}
                                            >
                                                {product.product?.name}
                                            </Heading>
                                        </Box>
                                        <Button
                                            as={Link}
                                            to={`/products/${product.product?.id}/${product.product?.name.replace(/\s+/g, "-")}`}
                                            fontSize="sm"
                                            w={{ base: "100%", lg: "80%" }}
                                            mx="auto"
                                            bg="brand.500"
                                            borderColor="brand.100"
                                            color="white"
                                            transition="all 0.3s"
                                            _hover={{
                                                bg: "brand.900",
                                                transform: "scale(1.05)",
                                            }}
                                        >
                                            View Product
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </MotionGridItem>
                        ))}
                    </Slider>
                </div>
            </Container>
        </Container>
    );
};

export default CategoryProductSlider;
