import { Box, IconButton, Image, useBreakpointValue } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Slider from "react-slick";
import React, { useState } from "react";

const ProductThumbNail = ({ banners }) => {
  const handleImageClick = (url) => {};
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const [slider, setSlider] = useState(Slider | null);
  const top = useBreakpointValue({ base: "10%", md: "10%" });
  return (
    <>
      {/* <Flex>
        {banners && Array.isArray(banners) && banners.map((url, index) => (
          <Box
            key={index}
            maxW="200px"
            mr={2}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            textAlign="center"
            backgroundImage={`url("${url}")`}
            backgroundSize="cover"  
            cursor="pointer" 
            _hover={{ borderColor: "#799a4e" }}
             onClick={() => handleImageClick(`${url}`)}
          >
            <Image src={url}  alt={`Thumbnail ${url}`} maxH="120px" objectFit="cover" />
          </Box>
        ))}
      </Flex> */}
      <Box
        position={"absolute"}
        height={{ base: "75vw", md: "400px" }}
        width={{ base: "75vw", md: "400px" }}
        overflow={"hidden"}
        _hover={"799a4e"}
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
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {banners.map((url, index) => (
            <Image
              key={index}
              height={{ base: "85vw", md: "140px" }}
              width={{ base: "65vw", md: "140px" }}
              position="relative"
              backgroundRepeat="no-repeat"
              backgroundSize="contain"
              backgroundImage={`url("${url}")`}
              cursor="pointer"
              top={top}
              marginLeft={"2"}
              _hover={{
                borderColor: "#799a4e",
              }}
              onClick={() => {
                handleImageClick(url);
              }}
            />
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default ProductThumbNail;
