import {
    Container,
    Card,
    Image,
    Stack,
    CardBody,
    Heading,
    Text,
    CardFooter,
    Button,
    LinkBox,
    LinkOverlay,
} from "@chakra-ui/react";

const ReadMorePost = ({ postDetails }) => {
  return (
    <Container maxW={{ base: "100vw", lg: "80vw" }} my={12} centerContent>
      <Card
        direction={{ base: "column", lg: "row" }}
        overflow="hidden"
        boxShadow={"none"}
      >
        <Image
          //objectFit="contain"
          maxW={{ base: "100%", sm: "500px" }}
          h={{ base: "100%", sm: "300px" }}
          src={postDetails.image}
          alt={postDetails.title}
          border={"4px"}
          borderColor={"text.500"}
        />

        <Stack ps={{ base: 0, lg: 3 }}>
          <CardBody p={{ base: 2, lg: 2 }} >
            <Heading fontWeight={"600"} color="text.500" mb={3}  size="lg">{postDetails.title}</Heading>
            <Text textAlign={"justify"}>{postDetails.content}</Text>
          </CardBody>

          <CardFooter  px={{ base: 2, lg: 2 }}>
            <LinkBox
              as={Button}
              variant="outline"
              color="brand.500"
              borderColor={"text.500"}
              _hover={{ textDecoration: "none",bgColor:"text.500",color:"white" }}
            >
              <LinkOverlay href={postDetails.href}>Read More</LinkOverlay>
            </LinkBox>
          </CardFooter>
        </Stack>
      </Card>
    </Container>
  );
};

export default ReadMorePost;
