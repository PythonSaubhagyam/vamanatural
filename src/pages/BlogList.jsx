// Optimized BlogList.jsx
import { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Container,
  Image,
  Button,
  IconButton,
  Select,
  Wrap,
  WrapItem,
  Center,
  Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import dompurify from "dompurify";
import client from "../setup/axiosClient";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [archiveFilterOptions, setArchiveFilterOptions] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { currentPage, setCurrentPage, pages } = usePagination({
    pagesCount: totalPages,
    limits: { outer: 3, inner: 3 },
    initialState: { currentPage: 1 },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    getBlogs();
  }, [searchParams]);

  const getBlogs = async () => {
    const archive = searchParams.get("archive");
    const page = searchParams.get("page") || 1;
    const response = await client.get("/blogs/", {
      params: archive ? { page: 1, publish_filter: archive } : { page },
    });

    if (response.data.status) {
      setBlogs(response.data.blogs);
      setTotalPages(response.data.total_pages);
      setArchiveFilterOptions(response.data.filters);
    }
  };

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: nextPage });
  };

  const getMonthName = (month) => new Date(0, month - 1).toLocaleString("en-US", { month: "long" });

  return (
    <>
      <MetaTags pageUrl="/blogs" />
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second="Blog" secondUrl="/blogs" />
      </Container>

      <Container maxW="container.xl" py={1} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/news and event.jpg" />
        <Text
          color="brand.100"
          textAlign="center"
          fontSize={{ lg: "7xl", md: "4xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          News & Articles
        </Text>
      </Container>

      <Container as={Flex} direction={{ base: "column", lg: "row" }} gap={6} justify="center" my={8} px={6} maxW="container.xl">
        <Flex direction="column" w={{ base: "90vw", lg: "60vw" }} gap={10}>
          {blogs.length ? (
            <>
              <Wrap spacing="30px" justify="center">
                {blogs.map(({ id, title, content, banner_url, published_at }) => (
                  <WrapItem key={id} w={["100%", "48%", "45%"]}>
                    <Box
                      w="100%"
                      borderRadius="xl"
                      overflow="hidden"
                      boxShadow="sm"
                      borderWidth="1px"
                      borderColor="gray.200"
                      transition="all 0.3s ease"
                      _hover={{ boxShadow: "xl", transform: "translateY(-4px)" }}
                    >
                      <Image
                        src={banner_url}
                        objectFit="center"
                        w="100%"
                        h="300px"
                        transition="transform 0.3s ease"
                        _hover={{ transform: "scale(1.05)" }}
                        cursor="pointer"
                        onClick={() => navigate(`/blogs/${id}/${title.replace(/\s+/g, "-")}`)}
                      />

                      <Box p={4}>
                        <Heading
                          fontSize={{ base: "md", md: "lg" }}
                          mb={2}
                          color="brand.600"
                          noOfLines={2}
                          cursor="pointer"
                          _hover={{ textDecoration: "underline" }}
                          onClick={() => navigate(`/blogs/${id}/${title.replace(/\s+/g, "-")}`)}
                        >
                          {title}
                        </Heading>

                        <Text
                          fontSize={{ base: "sm", md: "sm" }}
                          noOfLines={3}
                          color="gray.600"
                          dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content) }}
                        />

                        <Flex justifyContent="space-between" alignItems="center" mt={4}>
                          <Button
                            variant="outline"
                            size="sm"
                            colorScheme="brand"
                            _hover={{ bg: "brand.500", color: "white" }}
                            onClick={() => navigate(`/blogs/${id}/${title.replace(/\s+/g, "-")}`)}
                          >
                            Read more <ChevronRightIcon ml={1} />
                          </Button>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(published_at).toLocaleDateString("en-CA", { dateStyle: "long" })}
                          </Text>
                        </Flex>
                      </Box>
                    </Box>
                  </WrapItem>
                ))}
              </Wrap>

              <Pagination pagesCount={totalPages} currentPage={currentPage} onPageChange={handlePageChange}>
                <PaginationContainer justify="center">
                  <PaginationPrevious>Previous</PaginationPrevious>
                  <PaginationPageGroup>
                    {pages.map((page) => (
                      <PaginationPage
                        key={page}
                        page={page}
                        _current={{ bg: "brand.500", color: "white" }}
                      />
                    ))}
                  </PaginationPageGroup>
                  <PaginationNext>Next</PaginationNext>
                </PaginationContainer>
              </Pagination>
            </>
          ) : (
            <Text color="gray.400" textAlign="center">No blogs added!</Text>
          )}
        </Flex>

        <Flex direction="column" gap={10} my={8} w={{ base: "80vw", lg: "25vw" }} ps={{ base: 0, lg: 6 }} borderLeft={{ base: "none", lg: "1px" }} borderColor="gray.300">
          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">ABOUT US</Heading>
            <Text mt={4} textAlign="justify">
              We are an organic foods, natural home care and handmade personal care brand from the house of <b>Suryan Organic</b>. Inspired by <b>Bansi Gir Gaushala</b>, our aim is to revive <b>Gau Sanskriti</b>, an ancient culture centered on the divine cow.
            </Text>
          </Box>

          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">FOLLOW US</Heading>
            <Flex mt={6} gap={2}>
              <IconButton as="a" href="https://www.facebook.com/SoseOrganicAndNaturalStore/" isRound icon={<FaFacebookSquare color="#1877F2" />} />
              <IconButton as="a" href="https://www.youtube.com/channel/UC9OoW-ceIDeJLBVX37gBCww" isRound icon={<FaYoutube color="#FF0000" />} />
              <IconButton as="a" href="https://www.instagram.com/sose_organic/" isRound icon={<FaInstagram color="#E4405F" />} />
            </Flex>
          </Box>

          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">ARCHIVE</Heading>
            <Select
              mt={4}
              value={searchParams.get("archive") || 0}
              onChange={(e) => {
                const value = e.target.value;
                setSearchParams(value !== "0" ? { archive: value } : { page: 1 });
              }}
            >
              <option value="0">-- All dates</option>
              {archiveFilterOptions.map(({ year, months }) => (
                <optgroup key={year} label={year}>
                  {months.map((month) => (
                    <option key={`${month}-${year}`} value={`${month}-${year}`}>
                      {getMonthName(month)} {year}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </Box>
        </Flex>
      </Container>

      <ScrollToTop />
      <Footer />
    </>
  );
}