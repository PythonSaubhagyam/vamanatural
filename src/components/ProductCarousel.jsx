import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Flex,
    IconButton,
    useBreakpointValue,
    Image,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import ReactImageMagnify from "react-image-magnify";

const ProductCarousel = ({ banners }) => {
    const sliderRef = useRef(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const top = useBreakpointValue({ base: "50%", md: "50%" });

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(selectedImageIndex);
        }
    }, [selectedImageIndex]);

    // const customPaging = (index) => {
    //   const targetImage = banners[index];
    //   return (
    //     <img
    //       height={120}
    //       src={targetImage}
    //       alt={`Slide ${index + 1}`}
    //       style={{ margin: 5 }}
    //     />
    //   );
    // };

    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: false,
        speed: 500,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        afterChange: (currentSlide) => {
            setSelectedImageIndex(currentSlide);
        },
        // customPaging: customPaging,
    };
    useEffect(() => {
        const currentSlide = sliderRef?.current?.slick?.currentSlide;
        setSelectedImageIndex(currentSlide ? currentSlide : 0);
    }, [banners]);

    return (
        <>
            <Box
                position={"relative"}
                height={{ base: "75vw", md: "400px" }}
                width={{ base: "75vw", md: "400px" }}
                overflow={"hidden"}
            >
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                <IconButton
                    aria-label="left-arrow"
                    colorScheme="brand"
                    color="white"
                    size="sm"
                    position="absolute"
                    left={"-10px"}
                    top={top}
                    transform={"translate(50%, -50%)"}
                    zIndex={2}
                    display={"block"}
                    onClick={() => sliderRef.current?.slickPrev()}
                >
                    <ChevronLeftIcon />
                </IconButton>
                <IconButton
                    aria-label="right-arrow"
                    colorScheme="brand"
                    color="white"
                    size="sm"
                    position="absolute"
                    right={"-10px"}
                    top={top}
                    transform={"translate(-50%, -50%)"}
                    zIndex={2}
                    display={"block"}
                    onClick={() => sliderRef.current?.slickNext()}
                >
                    <ChevronRightIcon />
                </IconButton>
                <Slider {...settings} ref={sliderRef}>
                    {banners.map((url, index) => (
                        <Box
                            className="show"
                            key={index}
                            height={{ base: "75vw", md: "400px" }}
                            width={{ base: "70vw", md: "350px" }}
                            position="relative"
                            backgroundPosition={{ base: "0 0", md: "center" }}
                            backgroundRepeat="no-repeat"
                            backgroundSize="contain"
                            backgroundImage={`url("${url}")`}
                        />
                    ))}
                </Slider>
            </Box>
            <Box position={"relative"}>
                <Flex>
                    {banners.map((url, index) => (
                        <Image
                            key={index}
                            height={{ base: "20vw", md: "120px" }}
                            width={{ base: "65vw", md: "120px" }}
                            position="relative"
                            backgroundRepeat="no-repeat"
                            backgroundSize="contain"
                            backgroundImage={`url("${url}")`}
                            cursor="pointer"
                            top={top}
                            marginLeft={"2"}
                            border={
                                selectedImageIndex === index
                                    ? "1px solid #799a4e"
                                    : ""
                            }
                            borderRadius={3}
                            onClick={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </Flex>
            </Box>
        </>
    );
};

export default ProductCarousel;
