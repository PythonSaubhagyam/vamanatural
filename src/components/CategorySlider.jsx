import {
    Container,
    Text,
    GridItem,
    Box,
    IconButton,
} from "@chakra-ui/react";
import React,{ useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

const CategorySlider = ({ ourProductSection }) => {
    const navigate = useNavigate()
    const [slider, setSlider] = useState(Slider | null)

    var settings = {
        dots: false,
        infinite: true,
        arrows: false,
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
                    <Container maxW={"container.xl"} px={0} position={"relative"}>
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
                        <IconButton
                            _hover={{ opacity: 0.5 }}
                            position="absolute"
                            top="55%"
                            left={"20px"}
                            translate="-50% -55%"
                            zIndex="100"
                            borderRadius="50%"
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                            colorScheme="brand"
                            size={"sm"}
                            onClick={() => slider?.slickPrev()}
                            //icon={<FaArrowUp size={24}/>}
                            icon={<RiArrowLeftSLine size={25} />}
                        />
                        <IconButton
                            aria-label="right-arrow"
                            icon={<RiArrowRightSLine style={{ fontSize: 24 }} />}
                            _hover={{ opacity: 0.5 }}
                            colorScheme="brand"
                            size="sm"
                            position="absolute"
                            right={"20px"}
                            top={"55%"}
                            translate={"-50%, -55%"}
                            zIndex={10}
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                            onClick={() => slider?.slickNext()}
                            borderRadius={"50%"}
                        />
                        <Container maxWidth={"container.xl"} px={10} mt={5}>
                            <div className="slider-container" >
                                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                                    {ourProductSection[0]?.images?.length > 0 &&
                                        ourProductSection[0]?.images?.map((data) => (
                                            <GridItem cursor={"pointer"} px={5} key={data.id}>
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