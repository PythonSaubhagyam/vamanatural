import {
    Container,
    Text,
    GridItem,
    Box

} from "@chakra-ui/react";
import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const CategorySlider = ({ ourProductSection }) => {
    const navigate = useNavigate() 

    var settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    // centerMode: true,
                }
            }
        ]
    };
    return (
        <>
            {ourProductSection?.length > 0 &&
                ourProductSection[0]?.is_visible_on_website === true && (
                    <Container maxW={"container.xl"} px={0}>
                        <Box
                            bgColor={"bg.500"}
                            px={{ base: 2, md: 8 }}
                            py={4}
                            //my={7}
                            textAlign={{ base: "center", md: "start" }}
                        >
                            <Text
                                fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
                                fontWeight={500}
                            >
                                {ourProductSection[0]?.label}
                            </Text>
                        </Box>
                        <Container maxWidth={"container.xl"} px={10} mt={5}>
                            <div className="slider-container" >
                                <Slider {...settings}>
                                    {ourProductSection[0]?.images?.length > 0 &&
                                        ourProductSection[0]?.images?.map((data) => (
                                            <GridItem cursor={"pointer"} px={5}>
                                                <LazyLoadImage
                                                    cursor={"pointer"}
                                                    transition="all 1s ease"
                                                    _hover={{
                                                        transform: "scale(1.25)",
                                                    }}
                                                    src={data.image}
                                                    alt={data.category_name}
                                                    onClick={() => {
                                                        if (data?.category !== null) {
                                                            navigate(
                                                                `/shop?page=1&category=${data?.category}&category_name=${data?.category_name}`
                                                            );
                                                        }
                                                    }}
                                                    style={{
                                                        opacity: 1,
                                                        transition: "opacity 0.7s",
                                                        borderRadius: 10,
                                                    }}
                                                />
                                                <Text
                                                    textAlign={"center"}
                                                    color="text.500"
                                                    fontSize={{ md: 18, base: 16 }}
                                                    pt={2}
                                                    fontWeight={600}
                                                >
                                                    {data.category_name}
                                                </Text>
                                            </GridItem>
                                        ))}
                                </Slider>
                            </div>
                        </Container>
                    </Container>

                )}
        </>
    )
}

export default CategorySlider