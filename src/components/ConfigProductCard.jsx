import {
  LinkBox,
  LinkOverlay,
  Card,
  CardBody,
  Image,
  Text,
  CardFooter,
  Flex,
} from "@chakra-ui/react";

export default function ConfigProductCard({ productDetails }) {
  return (
    <LinkBox
      as={Card}
      direction={{ base: "column", sm: "row" }}
      size="md"
      w="20vw"
      maxW="20vw"
      border="1px"
      borderColor="gray.300"
      cursor={"pointer"}
    >
      <CardBody align={"center"} w="2.5vw" my={1} mx={8} p={0}>
        <Image
          src={productDetails.image1}
          alt={productDetails.name}
          objectFit="cover"
          objectPosition={"center"}
          boxSize={"75px"}
        />
      </CardBody>
      <CardFooter
        as={Flex}
        me={6}
        p={0}
        gap={1}
        direction="column"
        justify="center"
        align="flex-start"
        fontSize="xs"
      >
        <LinkOverlay
          href={`/configurations/products/${productDetails.id}`}
          fontWeight={600}
          noOfLines={1}
        >
          {productDetails.name}
        </LinkOverlay>
        <Text color="gray.500">
          Price: ₹{parseFloat(productDetails.base_price).toFixed()}
        </Text>
      </CardFooter>
    </LinkBox>
  );
}
