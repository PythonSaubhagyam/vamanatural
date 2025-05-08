import {
  Container,
  Image,
  Heading,
  Text,
  Button,
  LinkBox,
  LinkOverlay,
  Flex,
  Box,
} from "@chakra-ui/react";

const ReadMorePost = ({ postDetails, postAlign = "row" }) => {
  return (
    <Container maxW={{ base: "100vw", lg: "80vw" }} my={12}>
      <Flex
        direction={{ base: "column", md: postAlign }}
        gap={8}
        align="center"
      >
        {/* Image Section */}
        <Box flex="1">
          <Image
            src={postDetails.image}
            alt={postDetails.title}
            border="4px"
            borderColor="text.500"
            w="100%"
          />
        </Box>

        {/* Text Section */}
        <Box flex="1">
          <Heading fontWeight="600" color="text.500" size="lg" mb={4}>
            {postDetails.title}
          </Heading>
          <Text textAlign="justify" fontSize="14px" mb={6}>
            {postDetails.content}
          </Text>
          <LinkBox
            as={Button}
            variant="outline"
            color="brand.500"
            borderColor="text.500"
            _hover={{
              textDecoration: "none",
              bgColor: "text.500",
              color: "white",
            }}
          >
            <LinkOverlay href={postDetails.href} isExternal>
              Read More
            </LinkOverlay>
          </LinkBox>
        </Box>
      </Flex>
    </Container>
  );
};

export default ReadMorePost;
