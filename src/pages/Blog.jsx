import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import dompurify from "dompurify";
import client from "../setup/axiosClient";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

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
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

function Blog() {
  const [blogData, setBlogData] = useState(null);
  const [nextPost, setNextPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const { blogId } = useParams();

  useEffect(() => {
    getBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [blogId]);

  const getBlog = async () => {
    const response = await client.get(`/blogs/${blogId}/`);
    if (response.data.status) {
      setBlogData(response.data.blogData);
      setNextPost(response.data.nextPost || null);
      setPrevPost(response.data.previousPost || null);
    }
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-CA", {
      dateStyle: "long",
      timeZone: "Asia/Kolkata",
    }).format(new Date(date));

  return (
    <>
      <Navbar />

      <Container maxW="container.xl" my={6}>
        <Heading fontWeight={500} lineHeight={1.3} mb={3}>
          {blogData?.title}
        </Heading>

        <Text color="gray.500" fontSize="sm" mb={6}>
          <TimeIcon mr={2} />
          {blogData?.published_at && formatDate(blogData.published_at)}
        </Text>

        <Flex
          direction={{ base: "column", md: "row" }}
          gap={10}
          justify="space-between"
          borderColor="gray.300"
          pb={8}
        >
          <Box
            w={{ base: "100%", md: "75%" }}
            fontSize={{ base: "md", md: "lg" }}
            px={{ base: 4, md: 6 }}
            lineHeight={{ base: 1.6, md: 1.9 }}
            textAlign="justify"
            dangerouslySetInnerHTML={{
              __html: dompurify.sanitize(blogData?.content),
            }}
          />

          <Flex direction="column" gap={10} w={{ base: "100%", md: "25%" }}>
            <Box borderLeft="2px" borderColor="brand.900" p={3} textAlign="center">
              <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/suryan organic inline.png" />
              <Text fontSize="xs" color="gray.500" mt={2}>
                {blogData?.published_at && formatDate(blogData.published_at)}
              </Text>
            </Box>

            <Box>
              <Heading size="xs" borderBottom="1px" borderColor="gray.300" pb={2}>
                SHARE THIS POST
              </Heading>
              <ButtonGroup mt={3} gap={2}>
                <IconButton
                  isRound
                  border="1px"
                  borderColor="gray.300"
                  icon={<Icon as={FaFacebookSquare} color="facebook.600" />}
                />
                <IconButton
                  isRound
                  border="1px"
                  borderColor="gray.300"
                  icon={<Icon as={FaTwitter} color="twitter.500" />}
                />
                <IconButton
                  isRound
                  border="1px"
                  borderColor="gray.300"
                  icon={<Icon as={FaLinkedinIn} color="linkedin.900" />}
                />
              </ButtonGroup>
            </Box>
          </Flex>
        </Flex>

        <Flex justify="center" align="center" gap={10} mt={10}>
          <Box
            as={Link}
            to={prevPost?.id ? `/blogs/${prevPost.id}/${prevPost.title.replace(/\s+/g, "-")}` : "#"}
            cursor={prevPost?.id > blogData?.id ? "not-allowed" : "pointer"}
            opacity={prevPost?.id > blogData?.id ? 0.5 : 1}
            pointerEvents={prevPost?.id > blogData?.id ? "none" : "auto"}
          >
            <RiArrowLeftSLine size={35} color="#4a3218" />
          </Box>

          <Box as={Link} to="/blogs">
            <CgMenuGridO size={35} color="#4a3218" />
          </Box>

          <Box
            as={Link}
            to={nextPost?.id ? `/blogs/${nextPost.id}/${nextPost.title.replace(/\s+/g, "-")}` : "#"}
            cursor={nextPost?.id < blogData?.id ? "not-allowed" : "pointer"}
            opacity={nextPost?.id < blogData?.id ? 0.5 : 1}
            pointerEvents={nextPost?.id < blogData?.id ? "none" : "auto"}
          >
            <RiArrowRightSLine size={35} color="#4a3218" />
          </Box>
        </Flex>
      </Container>

      <ScrollToTop />
      <Footer />
    </>
  );
}

export default Blog;