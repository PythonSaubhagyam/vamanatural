import React from 'react'
import {
    Card,
    CardBody,
    Button,
    CardFooter,
    Heading,
    Image,
    Box,
  } from "@chakra-ui/react";
  import { Link, useNavigate } from "react-router-dom";

const ProductCardHome = ({ product }) => {
    const navigate = useNavigate();
    return (
      <Card
       // w={{ base: "80vw", sm: "3xs", xl: "2xs",md:"200px" }}
        //w={{ base: "80vw", sm: "3xs", lg: "18vw" }}
        //maxW="container.xl"
       mx="auto" 
        border="1px"
        borderColor="brand.100"
        borderRadius={"lg"}
        onClick={() => {
          navigate(`/products/${product.product?.id}`),
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
        }}
        cursor={"pointer"}
      >
        <CardBody backgroundColor={"white"} borderRadius="lg">
          <Image
            src={product.product?.home_image ? product.product?.home_image : product.product?.image1}
            alt={product.product?.name}
            borderRadius="lg"
            boxSize="150px"
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
              title={product.product?.name}
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
    );
}

export default ProductCardHome
