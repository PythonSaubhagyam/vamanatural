import React, { useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import ReactImageZoom from "react-image-zoom";

function ImageContainer({ children }) {
  return (
    <Box
      height={{ base: "75vw", md: "400px" }}
      width={{ base: "70vw", md: "350px" }}
      position="relative"
    >
      {children}
    </Box>
  );
}
function ProductImageSection({ images }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  if (!images) {
    return <ImageContainer />;
  }
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  return (
    <>
      <Flex >
        <Box position={"relative"} >
          <Grid
            gridTemplateRows="repeat(3, 1fr)"
            gap={2}
            pt={{md:5}}
            // marginRight={2}
            alignItems={"flex-start"}
          >
            {images?.map((url, index) => (
              <GridItem key={index} px={4}>
                <Image
                  src={url}
                  ml={{ md: 9 }}
                  //height={{ base: "60px", md: "60px" }}
                  maxW={{ base: "50px", md: "60px" }}
                  minW={{ base: "50px", md: "60px" }}
                  //position="relative"
                  cursor="pointer"
                  // paddingRight={"3px"}
                  border={
                    selectedImageIndex === index
                      ? "1px solid #436131"
                      : "1px solid #80808050"
                  }
                  _hover={{ borderColor: "#436131" }}
                  borderRadius={3}
                  onClick={() => setSelectedImageIndex(index)}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
        {!isMobile ? (
          <ReactImageZoom
            width={500}
            zoomWidth={500}
            img={images?.[selectedImageIndex]}
            //img={require("../assets/GIR Gau Products Images/demo11.jpg")}
          />
        ) : (
          <>
            <Image width={"250px"} src={images?.[selectedImageIndex]} />
          </>
        )}
      </Flex>
    </>
  );
}

export default ProductImageSection;
