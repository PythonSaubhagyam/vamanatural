import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";
import client from "../setup/axiosClient";
import {
  Container,
  Heading,
  Image,
  Text,
  Flex,
  Box,
  ButtonGroup,
  IconButton,
  Icon,
  AspectRatio,
} from "@chakra-ui/react";
import { TimeIcon } from "@chakra-ui/icons";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import dompurify from "dompurify";

function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const { blogId } = useParams();

  useEffect(() => {
    getBlog();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); // eslint-disable-next-line
  }, [blogId]);

  async function getBlog() {
    const response = await client.get(`/blogs/${blogId}/`);
    if (response.data.status === true) {
      setBlogData(response.data.blogData);
      if (response.data.nextPost) {
        setNextPost(response.data.nextPost);
      } else {
        setNextPost(null);
      }
    }
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" my={10}>
        <Heading fontWeight={300} lineHeight={1.25} mb={4}>
          {blogData?.title}
        </Heading>
        <Text color="gray.500" fontSize={"sm"}>
          <TimeIcon me={2} />{" "}
          {blogData?.published_at &&
            new Intl.DateTimeFormat("en-CA", {
              dateStyle: "long",
              timeZone: "Asia/Kolkata",
            }).format(new Date(blogData?.published_at))}
        </Text>
        <Image
          src={blogData?.banner_url}
          // w="100%"
          // maxH="400px"
          my={3}
          objectFit={"cover"}
          objectPosition={"center"}
          mb={8}
          display={"block"}
          m={"auto"}
          p={8}
          maxWidth="100%"
        />
        <Flex
          gap={16}
          justify="space-between"
          pb={6}
          borderBottom={"1px"}
          borderColor="gray.300"
          direction={{ base: "column", md: "row" }}
          textAlign="center"
          justifyContent="center"
        >
          <Box
            w={{ base: "100%", lg: "70%" }}
            fontSize="xl"
            whiteSpace={"pre-line"}
            lineHeight={1.5}
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(blogData?.content),
            }}
          />
          <Flex direction={"column"} gap={16}>
            <Box borderLeft={"1px"} borderColor={"brand.900"} p={3}>
              <Image
                src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/suryan organic inline.png"}
              />
              <Text fontSize={"xs"} color="gray.500" mt={2}>
                {blogData?.published_at &&
                  new Intl.DateTimeFormat("en-CA", {
                    dateStyle: "long",
                    timeZone: "Asia/Kolkata",
                  }).format(new Date(blogData?.published_at))}
              </Text>
            </Box>
            <Box>
              <Heading
                size="xs"
                borderBottom={"1px"}
                borderColor="gray.300"
                pb={4}
              >
                SHARE THIS POST
              </Heading>
              <ButtonGroup p={4} gap={2}>
                <IconButton
                  isRound
                  border="1px"
                  borderColor={"gray.300"}
                  icon={<Icon as={FaFacebookSquare} color="facebook.600" />}
                />
                <IconButton
                  isRound
                  border="1px"
                  borderColor={"gray.300"}
                  icon={<Icon as={FaTwitter} color="twitter.500" />}
                />
                <IconButton
                  isRound
                  border="1px"
                  borderColor={"gray.300"}
                  icon={<Icon as={FaLinkedinIn} color="linkedin.900" />}
                />
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>
        <Box
          mt={4}
          ms="auto"
          display={nextPost ? "flex" : "none"}
          gap={4}
          align="end"
          width="fit-content"
          maxW={{ base: "95vw", lg: "50vw" }}
        >
          <Box as={Link} to={`/blogs/${nextPost?.id}`}>
            <Text
              bg="brand.500"
              color="white"
              fontSize="sm"
              px={2}
              // w="fit-content"
              ms="auto"
            >
              Read Next
            </Text>
            <Text fontSize={{ base: "md", lg: "2xl" }}>{nextPost?.title}</Text>
          </Box>
          <AspectRatio w="300px" ratio={16 / 9}>
            <Image src={nextPost?.banner_url} objectFit="cover" />
          </AspectRatio>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Blog;
