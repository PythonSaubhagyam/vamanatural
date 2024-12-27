import React from "react";
import Slider from "react-slick";
import { Image, Box,IconButton } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const PrevArrow = ({ className, style, onClick }) => {
    return (
      <IconButton
        icon={<ChevronLeftIcon boxSize={8} />} // Custom icon
        onClick={onClick}
        aria-label="Previous"
        position="absolute"
        left="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        color={"white"}
        bg="transparent"
        borderRadius="full"
        _hover={{ bg: "gray.200" }}
      />
    );
  };
  
  // Custom Next Arrow Component
  const NextArrow = ({ className, style, onClick }) => {
    return (
      <IconButton
        icon={<ChevronRightIcon boxSize={8} />} // Custom icon
        onClick={onClick}
        aria-label="Next"
        position="absolute"
        right="10px"
        top="50%"
        transform="translateY(-50%)"
        zIndex={1}
        color={"white"}
        bg="transparent"
        borderRadius="full"
        _hover={{ bg: "gray.200" }}
      />
    );
  };

const CarouselLoginModal = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        nextArrow: <NextArrow />, 
        prevArrow: <PrevArrow />, 
      };
    
  return (
    <>
    
        <Slider {...settings}>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`carousel-image-${index}`}
             
              height={{lg:"79vh" , md:"47vh"}}
              width="100%"
              objectFit="fill"
              borderLeftRadius={"10px"}
              marginLeft={0}
            />
          ))}
        </Slider>
      
    </>
  );
};

export default CarouselLoginModal;
