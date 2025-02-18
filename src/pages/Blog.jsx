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
import { CgMenuGridO } from "react-icons/cg";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import dompurify from "dompurify";
import ScrollToTop from "../components/ScrollToTop";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setprevPost] = useState(null);
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
        setprevPost(response.data.previousPost)
      } else {
        setNextPost(null);
      }
    }
  }

  return (
    <>
      <Navbar />
      <Container maxW="container.xl" my={2}>

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
        <Flex
          gap={10}
          justify="space-between"
          pb={6}
          // borderBottom={"1px"}
          borderColor="gray.300"
          direction={{ base: "column", md: "row" }}
        >
          <Box
            w={{ base: "90%", md: "80%", lg: "70%" }}
            mx="auto" // Centers the Box horizontally
            fontSize={{ base: "md", md: "lg", lg: "xl" }} // Responsive font sizes
            whiteSpace="initial"
            mt={4}
            px={{ base: 4, md: 8, lg: 10 }} // Responsive padding
            lineHeight={{ base: 1.6, lg: 2 }} // Adjust line height for readability
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(blogData?.content),
            }}
          />

          <Flex direction={"column"} gap={10}>
            <Box borderLeft={"1px"} borderColor={"brand.900"} p={3}>
              <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/dsose/suryan organic inline.png" />
              <Text fontSize={"xs"} color="gray.500" mt={2} align="center">
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


        <Container
          maxW={{ base: "full", xl: "container.xl" }}
          mt={2}
          gap={10}
          display="flex"
          px={0}
          alignItems="center"
          justifyContent="center"
        >
          {/* Left Arrow - Disable if prevPost.id is 1 */}
          <Box
            as={Link}
            to={prevPost?.id ? `/blogs/${prevPost.id}/${prevPost.title.replace(/\s+/g, "-")}` : "#"}
            cursor={prevPost?.id > blogData?.id ? "not-allowed" : "pointer"}
            opacity={prevPost?.id > blogData?.id ? 0.5 : 1}
            pointerEvents={prevPost?.id > blogData?.id ? "none" : "auto"} // Prevent clicking if disabled
          >
            <RiArrowLeftSLine size={35} color="#4a3218" />
          </Box>

          {/* Menu Grid Icon */}
          <Box as={Link} to={`/blogs/`}>
            <CgMenuGridO size={35} color="#4a3218" />
          </Box>

          {/* Right Arrow - Disable if nextPost.id is 42 */}
          <Box
            as={Link}
            to={nextPost?.id ? `/blogs/${nextPost.id}/${nextPost.title.replace(/\s+/g, "-")}` : "#"}
            cursor={nextPost?.id < blogData?.id ? "not-allowed" : "pointer"}
            opacity={nextPost?.id < blogData?.id ? 0.5 : 1}
            pointerEvents={nextPost?.id < blogData?.id ? "none" : "auto"} // Prevent clicking if disabled
          >
            <RiArrowRightSLine size={35} color="#4a3218" />
          </Box>
        </Container>






      </Container>
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default Blog;