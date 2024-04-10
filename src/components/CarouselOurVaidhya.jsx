import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaQuoteRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import {
  Box,
  Container,
  Avatar,
  Heading,
  IconButton,
  Text,
  Flex,
  Card,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const testimonialsData = {
  testimonials: [
    {
      quoteIconColor: "#436131",
      quote:
        "Suffering from a neurological disease, experiencing 50% relief in symptoms, with lower stress & better sleep even after stopping allopathic medicines. Taking Asthi Churna, Nasya, 21 Aushadhiya Ark and Shilajit.",
      author: "Jashwantbhai Prajapati",
      location: "Mehsana",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Started Mother's treatment few weeks back for joint & back pain. Treated with Asthigir Ghrit, Asthi Churna, Kabjamrut capsule, Sunthamrut capsule and Gir Nasya. See significant relief in join & back pains.",
      author: "Ritaben Kanjaria",
      location: "Botad",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Complete relief in blocked nose within 7-8 minutes of using Gir Ahinsak Nasya.",
      author: "Pranav Parikh",
      location: "USA",
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#436131",
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#436131",
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}

const CarouselOurVaidhya = () => {
  const [slider, setSlider] = useState(Slider | null);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,

    // nextArrow: <SampleNextArrow />,
    // prevArrow: <SamplePrevArrow />,
  };
  const shouldShowButtons = windowWidth > 330;
  const side = useBreakpointValue({ base: "0px", md: "0px" });

  return (
    <>
      <Container bg={"gray.100"} maxW={"container.xl"} py={3}>
        <Heading
          color="brand.500"
          fontSize={33}
          fontWeight={500}
          mx="auto"
          align={"center"}
          mt={3}
          pb={"10px"}
        >
          Happy Patients
        </Heading>

        <Box
          position={"relative"}
          height={{ base: "100%", md: "50%" }}
          //width={"100vw"}

          // overflow={"hidden"}
        >
          {/* CSS files for react-slick */}
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          {/* Left Icon */}
          {shouldShowButtons && (
            <>
              <IconButton
                aria-label="left-arrow"
                icon={<ChevronLeftIcon style={{ fontSize: 34 }} />}
                background={"#ffffff00"}
                color="#fff"
                size={{ base: "sm", md: "md" }}
                position="absolute"
                left={side}
                top={"50%"}
                transform={"translate(50%, -50%)"}
                zIndex={2}
                display={{ base: "none", md: "block" }}
                onClick={() => slider?.slickPrev()}
                _hover={"background:#ffffff00"}
                borderRadius={"40px"}
                style={{ display: { base: "none", md: "" } }}
              />
              {/* Right Icon */}
              <IconButton
                aria-label="right-arrow"
                icon={<ChevronRightIcon style={{ fontSize: 34 }} />}
                background={"#ffffff00"}
                color="#fff"
                size={{ base: "sm", md: "md" }}
                position="absolute"
                right={side}
                top={"50%"}
                transform={"translate(-50%, -50%)"}
                zIndex={2}
                display={{ base: "none", md: "block" }}
                onClick={() => slider?.slickNext()}
                _hover={"background:#ffffff00 "}
                borderRadius={"40px"}
              />
            </>
          )}
          {/* Slider */}
          <Slider {...settings} ref={(slider) => setSlider(slider)}>
            {testimonialsData?.testimonials.map((data, index) => (
              <>
                <Box
                  bgColor={"#fff"}
                  key={index}
                  textAlign="center"
                  mt={4}
                  mb={9}
                  w="40vw"
                  pb={1}
                  mx={"auto"}
                  pt={5}
                  px={7}
                >
                  {/* <Text fontSize="md" mb={4}>
                  {bannerData?.content}
                </Text> */}
                  <Text
                    textAlign={"justify"}
                    fontSize={"16px"}
                    fontWeight={500}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#436131",
                        fontWeight: 900,
                      }}
                    >
                      &#8220;
                    </span>{" "}
                    {data?.quote}
                    <span
                      style={{
                        color: "#436131",
                        fontSize: "1rem",
                        fontWeight: 900,
                      }}
                    >
                      &#8221;
                    </span>
                  </Text>
                  <Text
                    color={"text.300"}
                    fontSize={"18px"}
                    
                    mt={4}
                    mb={8}
                  >
                    -{data.author}<b style={{marginLeft:6}}>{data.location}</b>
                  </Text>
                </Box>
              </>
            ))}
          </Slider>
        </Box>
      </Container>
    </>
  );
};

export default CarouselOurVaidhya;
