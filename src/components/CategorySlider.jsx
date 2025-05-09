import {
    Container,
    Text,
    GridItem,
    Box,
    IconButton,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
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

const CategorySlider = ({ ourProductSection }) => {
    const navigate = useNavigate();
    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        arrows: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2, initialSlide: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <>
            {ourProductSection?.length > 0 &&
                ourProductSection[0]?.is_visible_on_website === true && (
                    <Container maxW={"container.xl"} px={0} position={"relative"}>
                        <Box
                            bgColor={"bg.500"}
                            px={{ base: 2, md: 8 }}
                            py={4}
                            textAlign={{ base: "center", md: "start" }}
                        >
                            <Text
                                as="h1"
                                fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
                                fontWeight={500}
                            >
                                {ourProductSection[0]?.label}
                            </Text>
                        </Box>

                        {/* Arrows */}
                        <IconButton
                            icon={<RiArrowLeftSLine size={25} />}
                            aria-label="left-arrow"
                            position="absolute"
                            top="55%"
                            left="20px"
                            zIndex={100}
                            size="sm"
                            borderRadius="50%"
                            colorScheme="brand"
                            boxShadow="base"
                            transition="all 0.3s"
                            _hover={{ opacity: 0.7, transform: "scale(1.1)" }}
                            onClick={() => sliderRef.current?.slickPrev()}
                        />
                        <IconButton
                            icon={<RiArrowRightSLine size={25} />}
                            aria-label="right-arrow"
                            position="absolute"
                            top="55%"
                            right="20px"
                            zIndex={100}
                            size="sm"
                            borderRadius="50%"
                            colorScheme="brand"
                            boxShadow="base"
                            transition="all 0.3s"
                            _hover={{ opacity: 0.7, transform: "scale(1.1)" }}
                            onClick={() => sliderRef.current?.slickNext()}
                        />

                        {/* Slider */}
                        <Container maxW="container.xl" px={10} mt={5}>
                            <Slider {...settings} ref={sliderRef}>
                                {ourProductSection[0]?.images?.map((data, index) => (
                                    <MotionGridItem
                                        my={5}
                                        key={data.id}
                                        px={5}
                                        custom={index}
                                        variants={fadeInUp}
                                        initial="hidden"
                                        animate="visible"
                                        cursor="pointer"
                                    >
                                        <Box

                                            borderRadius="lg"
                                            overflow="hidden"
                                            _hover={{ transform: "scale(1.03)", transition: "0.3s" }}
                                            onClick={() => {
                                                if (data?.category) {
                                                    navigate(
                                                        `/shop?page=1&category=${data?.category}&category_name=${data?.category_name}`
                                                    );
                                                }
                                            }}
                                        >
                                            <LazyLoadImage
                                                src={data.image}
                                                alt={data.category_name}
                                                effect="opacity"
                                                style={{
                                                    borderRadius: "12px",
                                                    width: "100%",
                                                    height: "auto",
                                                    transition: "transform 0.4s ease",
                                                }}
                                            />
                                        </Box>
                                        <Text
                                            textAlign="center"
                                            color="text.500"
                                            fontSize={{ md: 18, base: 16 }}
                                            pt={2}
                                            fontWeight={600}
                                        >
                                            {data.category_name}
                                        </Text>
                                    </MotionGridItem>
                                ))}
                            </Slider>
                        </Container>
                    </Container>
                )}
        </>
    );
};

export default CategorySlider;
