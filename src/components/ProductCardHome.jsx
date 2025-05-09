import React from "react";
import {
  Card,
  CardBody,
  Button,
  CardFooter,
  Heading,
  Image,
  Box,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const ProductCardHome = ({ product }) => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const footerBg = useColorModeValue("gray.50", "gray.700");

  const handleNavigate = () => {
    navigate(`/products/${product.product?.id}/${product.product?.name.replace(/\s+/g, "-")}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const imgSrc = product.product?.home_image || product.product?.image1;
  const productName = product.product?.name;

  return (
    <Card
      maxW="sm"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="xl"
      overflow="hidden"
      boxShadow="sm"
      transition="all 0.3s"
      _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
      cursor="pointer"
      onClick={handleNavigate}
    >
      <CardBody bg={bgColor} p={4}>
        <Image
          src={imgSrc}
          alt={productName}
          borderRadius="md"
          boxSize="200px"
          objectFit="contain"
          mx="auto"
          loading="lazy"
        />
      </CardBody>

      <CardFooter
        py={4}
        px={4}
        bg={footerBg}
        flexDirection="column"
        gap={3}
        align="center"
      >
        <Heading
          size="sm"
          noOfLines={2}
          fontWeight="semibold"
          title={productName}
          textAlign="center"
        >
          {productName}
        </Heading>

        <Button
          as={Link}
          to={`/products/${product.product?.id}/${product.product?.name.replace(/\s+/g, "-")}`}
          fontSize="sm"
          w="full"
          bg="brand.500"
          color="white"
          _hover={{ bg: "brand.600" }}
          onClick={(e) => e.stopPropagation()} // Prevent card click conflict
        >
          View Product
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCardHome;
