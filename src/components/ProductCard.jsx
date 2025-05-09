import {
  Card,
  CardBody,
  Button,
  CardFooter,
  Heading,
  Image,
  Box,
  GridItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <GridItem px={5} mb={4}>
      <Card
        my={5}
        border="1px"
        borderColor="brand.100"
        borderRadius="lg"
        cursor="pointer"
        transition="all 0.3s"
        _hover={{
          transform: "scale(1.02)",
          boxShadow: "lg",
        }}
        onClick={() =>
          navigate(`/products/${product?.id}/${product?.name?.replace(/\s+/g, "-")}`)
        }
      >
        <CardBody bg="white" borderRadius="lg" display="flex" justifyContent="center" alignItems="center" h="220px">
          <Image
            src={product?.home_image || product?.image1}
            alt={product?.name}
            borderRadius="md"
            transition="transform 0.4s"
            _hover={{ transform: "scale(1.05)" }}
            boxSize="200px"
            objectFit="contain"
            mx="auto"
          />
        </CardBody>

        <CardFooter
          flexDirection="column"
          align="center"
          py={3}
          bg="bg.500"
          borderBottomRadius="lg"
        >
          <Box
            h="80px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              size="sm"
              mb={3}
              noOfLines={3}
              fontWeight="500"
              title={product?.name}
            >
              {product?.name}
            </Heading>
          </Box>

          <Button
            as={Link}
            to={`/products/${product?.id}/${product?.name?.replace(/\s+/g, "-")}`}
            fontSize="sm"
            w={{ base: "100%", lg: "80%" }}
            mx="auto"
            bg="brand.500"
            borderColor="brand.100"
            color="white"
            transition="all 0.3s"
            _hover={{ bg: "brand.900", transform: "scale(1.05)" }}
            onClick={(e) => e.stopPropagation()} // prevents navigation from wrapping card
          >
            View Product
          </Button>
        </CardFooter>
      </Card>
    </GridItem>
  );
}
