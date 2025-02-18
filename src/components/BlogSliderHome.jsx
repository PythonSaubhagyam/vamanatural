import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Card, Text, Container, Flex, Grid, GridItem, Heading, Image, LinkBox, LinkOverlay, IconButton, useBreakpointValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
import Slider from "react-slick";
import { Link as ReactRouterLink } from "react-router-dom"


const BlogSliderHome = ({ blogs }) => {

    const [slider, setSlider] = useState(Slider | null)

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
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
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
            <Container maxW={"container.xl"} px={0} position={"relative"} p={2}  >
                <Box
                    w="100%"
                    //backgroundImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"}
                    backgroundSize="100%"
                    backgroundPosition="50% 100%"
                    backgroundRepeat={"no-repeat"}
                >
                    <Heading
                        color="brand.500"
                        fontSize={{ md: 33, base: 24 }}
                        mx="auto"
                        align={"center"}
                        mt={3}
                        pb={3}
                    >
                        BLOGS
                    </Heading>
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
                    boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
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
                    onClick={() => slider?.slickNext()}
                    borderRadius={"50%"}
                />

                <Container maxWidth={"container.xl"} px={10} mt={5}>
                    <div className="slider-container">
                        <Slider {...settings} ref={(slider) => setSlider(slider)} >
                        {blogs?.slice(0, 8).map((blog) => (
                                <GridItem key={blog.id} px={5}>
                                    <Card>
                                        <LinkBox overflow={"hidden"} >
                                            <Image
                                                _hover={{transition: "scale(1.2)"}}
                                                src={blog.banner}
                                                w="100%"
                                                h="300px"
                                                loading="lazy"
                                                objectFit={"cover"}
                                                borderRadius={5}
                                                style={{
                                                    opacity: 1,
                                                    transition: "opacity 0.7s", // Note the corrected syntax here
                                                }}
                                            />
                                            <LinkOverlay
                                                _hover={{ color: "brand.500" }}
                                                as={ReactRouterLink} to={`/blogs/${blog.id}/${blog.title.replace(/\s+/g, "-")}`}
                                            >
                                                <Heading size="sm" fontWeight={500} m={2} noOfLines={2} >
                                                    {blog.title}
                                                </Heading>
                                            </LinkOverlay>
                                        </LinkBox>
                                        <Flex m={2} justifyContent={"space-between"}>
                                            <Text fontSize={"sm"} color="gray.500">
                                                {new Intl.DateTimeFormat("en-CA", {
                                                    dateStyle: "long",
                                                    timeZone: "Asia/Kolkata",
                                                }).format(new Date(blog.published_at))}
                                            </Text>
                                            <Text
                                                fontSize={"sm"}
                                                fontWeight={600}
                                                color={"brand.500"}
                                                onClick={() => navigate(`/blogs/${blog.id}/${blog.title.replace(/\s+/g, "-")}`)}
                                                cursor={"pointer"}
                                            >
                                                Read more
                                                <ChevronRightIcon />
                                            </Text>
                                        </Flex>
                                    </Card>
                                </GridItem>
                            ))}

                        </Slider>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default BlogSliderHome