import React, { useState } from 'react'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { Box, Card, Text, Container, Flex, Grid, GridItem, Heading, Image, LinkBox, LinkOverlay, CardBody, CardFooter, Button, IconButton, useBreakpointValue } from '@chakra-ui/react'
import Slider from "react-slick";
import ProductCardHome from './ProductCardHome';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';
const CategoryProductSlider = ({ products, title, type }) => {

    const navigate = useNavigate()
    const [slider, setSlider] = useState(Slider | null)
    
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 5,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    infinite: true,
                    // dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };
    return (
        <>
            <Container maxW={"container.xl"} px={0} position={"relative"} >
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
                    <>

                        <IconButton
                            _hover={{ opacity: 0.5 }}
                            position="absolute"
                            top="60%"
                            left={"20px"}
                            translate="-50% -60%"
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
                            top={"60%"}
                            translate={"-50%, -60%"}
                            zIndex={10}
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                            onClick={() => slider?.slickNext()}
                            borderRadius={"50%"}
                        />
                    </>
                ) : (
                    <>

                        <IconButton
                            _hover={{ opacity: 0.5 }}
                            position="absolute"
                            top="60%"
                            left={"20px"}
                            translate="-50% -60%"
                            zIndex="100"
                            borderRadius="50%"
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                            colorScheme="brand"
                            size={"sm"}
                            display={"none"}
                            onClick={() => slider?.slickPrev()}
                            //icon={<FaArrowUp size={24}/>}
                            icon={<RiArrowLeftSLine size={25} />}
                        />
                        <IconButton
                            aria-label="right-arrow"
                            icon={<RiArrowRightSLine style={{ fontSize: 24 }} />}
                            _hover={{ opacity: 0.5 }}
                            display={"none"}
                            colorScheme="brand"
                            size="sm"
                            position="absolute"
                            right={"20px"}
                            top={"60%"}
                            translate={"-50%, -60%"}
                            zIndex={10}
                            boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"
                            onClick={() => slider?.slickNext()}
                            borderRadius={"50%"}
                        />
                    </>
                )
                }


                <Container maxWidth={"container.xl"} px={10} mt={5}>

                    <div className="slider-container">
                        <Slider {...settings} ref={(slider) => setSlider(slider)}>

                            {products?.map((product) => (
                                <GridItem px={5} key={product.id} mb={2}>
                                    <Card
                                        // w={{ base: "80vw", sm: "3xs", lg: "2xs" }}
                                        border="1px"
                                        borderColor="brand.100"
                                        borderRadius={"lg"}
                                        onClick={() => {
                                            navigate(`/products/${product.product?.id}`);                   
                                        }}
                                        cursor={"pointer"}
                                    >
                                        <CardBody backgroundColor={"white"} borderRadius="lg">
                                            <Image
                                                src={
                                                    product.product?.home_image
                                                        ? product.product?.home_image
                                                        : product.product?.image1
                                                }
                                                alt={product.product?.name}
                                                borderRadius="lg"
                                                boxSize="200px"
                                                objectFit={"contain"}
                                                mx="auto"
                                            />
                                        </CardBody>
                                        <CardFooter
                                            align={"center"}
                                            py={3}
                                            flexDirection="column"
                                            backgroundColor={"bg.500"}
                                            borderBottomRadius="lg"
                                        >
                                            <Box
                                                h="80px"
                                                display={"flex"}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
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
                                                to={`/products/${product.product?.id}`}
                                                fontSize="sm"
                                                w={{ base: "100%", lg: "80%" }}
                                                mx="auto"
                                                backgroundColor={"brand.500"}
                                                borderColor={"brand.100"}
                                                color="white"
                                                _hover={{ backgroundColor: "brand.900" }}
                                            >
                                                View Product
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </GridItem>

                            ))}
                            {/* {blogs?.slice(0, 8).map((blog) => (
                                <GridItem key={blog.id} px={5}>
                                    <Card>
                                        <LinkBox>
                                            <Image
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
                                                href={`/blogs/${blog.id}/`}
                                            >
                                                <Heading size="sm" fontWeight={500} m={2} noOfLines={3} >
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
                                                onClick={() => navigate(`/blogs/${blog.id}/`)}
                                                cursor={"pointer"}
                                            >
                                                Read more
                                                <ChevronRightIcon />
                                            </Text>
                                        </Flex>
                                    </Card>
                                </GridItem>
                            ))} */}

                        </Slider>
                    </div>
                </Container>
            </Container>
        </>
    )
}

export default CategoryProductSlider