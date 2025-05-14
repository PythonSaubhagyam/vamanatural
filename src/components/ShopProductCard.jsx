import {
  LinkBox,
  LinkOverlay,
  Card,
  CardBody,
  Image,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  IconButton,
  Box,
  Badge,
  Flex,
  Icon,
  CardHeader,
} from "@chakra-ui/react";
import { FaShoppingCart } from "react-icons/fa";
import { AiFillHeart, AiFillStar } from "react-icons/ai";
import AddToCart from "../utils/addToCart";
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const BestSellerImg = "https://s3organicbucket.s3.amazonaws.com/master/Products/images/best_seller1.png";

export default function ShopProductCard({
  productDetails,
  isInWishlist = true,
  onClick,
  displayWishlistButton = true,
}) {
  console.log(productDetails);
  return (


    <LinkBox
      as={Card}
      size="md"
      w={{ base: "80vw", sm: "40vw", md: "215px" }}
      border="1px"
      borderColor="gray.300"
      cursor={"pointer"}
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px) scale(1.01)",
        boxShadow: "lg",
      }}
    >
      <Link
        to={`/products/${productDetails.id}/${productDetails.name.replace(/\s+/g, "-")}`}
      >
        <CardHeader
          as={Flex}
          justify={"flex-start"}
          gap={"3rem"}
          mt={1.5}
          ml={1}
          padding={"none"}
          position={"absolute"}
        >
          {productDetails.product_tag_list
            .filter(
              (tag) =>
                tag === "Sugar Free" ||
                tag === "Best Seller" ||
                tag === "New Products"
            )
            .sort((a, b) => (a === "Best Seller" ? -1 : 1))
            .map((tag, index) => (
              <React.Fragment key={index}>
                {tag === "Best Seller" && (
                  <Image
                    src={BestSellerImg}
                    alt="Best Seller"
                    height={"4rem"}
                    width={"4rem"}
                    ml={"-2px"}
                    mt={"-11px"}
                  />
                )}
                {(tag === "Sugar Free" || tag === "New Products") && (
                  <Flex
                    justifyContent={"space-between"}
                    align={"baseline"}
                    gap={1}
                  >
                    <Badge
                      bgColor="brand.500"
                      color={"#fff"}
                      borderRadius={"8px"}
                      paddingX={"8px"}
                      py={1}
                      fontSize={11}
                      textTransform={"none"}
                      opacity={0.8}
                      m={0}
                      height={"1.6rem"}
                    >
                      {tag}
                    </Badge>
                  </Flex>
                )}
              </React.Fragment>
            ))}
        </CardHeader>
        <CardBody align="center" h={{ md: 300 }} py={1} flex={"none"}>
          <Flex marginTop={6} justifyContent={"center"}
          >
            <Image
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
              }}
              src={productDetails.image1}
              alt={productDetails.name}
              //objectFit="contain"
              boxSize={"175px"}
            />
          </Flex>

          <Box
            h="60px"
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          //position={"absolute"}
          >
            <LinkOverlay
              fontSize="xs"
              fontWeight={600}
              color={"brand.500"}
              px={-2}
              pt={4}
              noOfLines={3}
            >
              {productDetails.name}
            </LinkOverlay>
          </Box>
          {(productDetails?.average_rating?.average_rating > 0 ||
            productDetails?.average_rating?.review_count > 0) && (
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Badge
                  as={Flex}
                  w="fit-content"
                  gap={1}
                  colorScheme="brand"
                  px={2}
                  py={0.9}
                  color="white"
                  display={"inline-flex"}
                >
                  <Text fontSize={12}>
                    {productDetails?.average_rating?.average_rating}
                  </Text>
                  <Icon as={AiFillStar} boxSize={4} />
                </Badge>
                <Text
                  as="span"
                  color="gray.500"
                  fontSize={14}
                  ms={2}
                  align={"center"}
                >
                  {productDetails?.average_rating?.review_count + " " + "Reviews"}
                </Text>
              </Flex>
            )}
        </CardBody>
      </Link>
      <Divider />
      <CardFooter justify={"center"} gap={8} alignItems="center" py={2}>
        <Text color="brand.900" fontSize="md">
          ₹{parseFloat(productDetails.product_price || productDetails.base_price).toFixed(2)}
        </Text>
        <ButtonGroup spacing="2">
          <IconButton
            colorScheme={"brand"}
            icon={<FaShoppingCart />}
            size="sm"
            isDisabled={productDetails.available_stock_quantity ? false : true}
            onClick={() => AddToCart(productDetails.id)}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
          />
          <IconButton
            colorScheme={isInWishlist ? "red" : "brand"}
            icon={<AiFillHeart />}
            size="sm"
            display={displayWishlistButton ? "inline-flex" : "none"}
            onClick={onClick}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
          />
        </ButtonGroup>
      </CardFooter>
    </LinkBox>

  );
}
