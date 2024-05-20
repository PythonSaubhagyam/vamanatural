import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Flex,
  Box,
  Heading,
  Text,
  Container,
  LinkBox,
  LinkOverlay,
  Image,
  Button,
  ButtonGroup,
  IconButton,
  Link,
  Icon,
  Select,
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
import BreadCrumbCom from "../components/BreadCrumbCom";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [archiveFilterOptions, setArchiveFilterOptions] = useState(null);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const { currentPage, setCurrentPage, pages } = usePagination({
    pagesCount: totalPages,
    limits: {
      outer: 3,
      inner: 3,
    },
    initialState: { currentPage: 1 },
  });

  useEffect(() => {
    getBlogs(); // eslint-disable-next-line
  }, [searchParams]);

  async function getBlogs() {
    const params =
      searchParams.get("archive") !== null
        ? {
            page: 1,
            publish_filter: searchParams.get("archive"),
          }
        : {
            page: searchParams.get("page") ?? 1,
          };
    const response = await client.get("/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
      setTotalPages(response.data.total_pages);
      setArchiveFilterOptions(response.data.filters);
    }
  }

  // function goToPrevPage() {
  //   if (parseInt(searchParams.get("page")) > pages) {
  //     setSearchParams({ page: pages });
  //   } else {
  //     setSearchParams({ page: parseInt(searchParams.get("page")) - 1 });
  //   }
  // }

  // function goToNextPage() {
  //   if (parseInt(searchParams.get("page")) < 1) {
  //     setSearchParams({ page: pages });
  //   } else {
  //     setSearchParams({ page: parseInt(searchParams.get("page")) + 1 });
  //   }
  // }

  async function handlePageChange(nextPage) {
    setCurrentPage(nextPage);
    setSearchParams({ ...searchParams, page: nextPage });
  }

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  function MonthOptions({ months, year }) {
    return months.map((month) => (
      <option value={`${month}-${year}`}>
        {getMonthName(month) + " " + year}
      </option>
    ));
  }

  return (
    <>
      <Navbar />

      <Container maxW="container.xl">
        <BreadCrumbCom second={"Blog"} secondUrl={"/blogs"} />
        {/* <Flex
          direction="column"
          w="100%"
          h="200px"
          justify={"center"}
          mt={2}
          ps={{ base: 4, lg: 20 }}
          color="white"
          bgGradient={["linear(to-b, brand.900, brand.100)"]}
        >
          <Heading color={"white"} fontWeight={"light"}>
            News & Articles
          </Heading>
          <Text color={"white"} fontWeight={"light"}>
            Get the latest updates & insights from SOSE
          </Text>
        </Flex> */}
      </Container>
      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/news and event.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "4xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
          News & Articles
        </Text>
      </Container>
      <Container
        as={Flex}
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 6, lg: 0 }}
        // maxW={{ base: "100%", lg: "90vw" }}
        minH="container.sm"
        justifyContent="center"
        my={8}
        px={6}
        maxW="container.xl"
      >
        <Flex direction="column" w={{ base: "90vw", lg: "60vw" }} gap={10}>
          {blogs.length > 0 ? (
            <>
              {blogs.map((blog) => (
                <Box key={blog.id}>
                  <LinkBox my={4}>
                    <LinkOverlay href={`/blogs/${blog.id}/`}>
                      <Heading size="lg" fontWeight={"600"} color="brand.500">
                        {blog.title}
                      </Heading>
                    </LinkOverlay>
                    <Text fontSize={"sm"} color="gray.500">
                      {new Intl.DateTimeFormat("en-CA", {
                        dateStyle: "long",
                        timeZone: "Asia/Kolkata",
                      }).format(new Date(blog.published_at))}
                    </Text>
                    <Image
                      src={blog.banner_url}
                      w="100%"
                      h="250px"
                      my={3}
                      objectFit={"cover"}
                      objectPosition={"center"}
                    />
                    <Text
                      fontSize="lg"
                      noOfLines={2}
                      textOverflow={"ellipsis"}
                      dangerouslySetInnerHTML={{
                        __html: dompurify.sanitize(blog.content),
                      }}
                    />
                  </LinkBox>
                  <Button
                    w={{ base: "100%", md: "25%" }}
                    colorScheme="brand"
                    onClick={() => navigate(`/blogs/${blog.id}/`)}
                  >
                    Read more
                    <ChevronRightIcon />
                  </Button>
                </Box>
              ))}
              <Pagination
                pagesCount={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              >
                <PaginationContainer
                  gap={2}
                  justifyContent="center"
                  width="100%"
                >
                  <PaginationPrevious>Previous</PaginationPrevious>
                  <PaginationPageGroup gap={1}>
                    {pages.map((page) => (
                      <PaginationPage
                        key={`page_${page}`}
                        page={page}
                        p={2}
                        _current={{
                          bg: "brand.500",
                          color: "white",
                          _hover: { bg: "brand.500", color: "white" },
                        }}
                      />
                    ))}
                  </PaginationPageGroup>
                  <PaginationNext>Next</PaginationNext>
                </PaginationContainer>
              </Pagination>
            </>
          ) : (
            <Flex justifyContent="center" mt={10}>
              <Text color="gray.400">No blogs added!</Text>
            </Flex>
          )}

          {/* <ButtonGroup
            mx="auto"
            display={searchParams.get("page") ? "block" : "none"}
          >
            <Button
              border="1px"
              borderColor={"gray.500"}
              colorScheme="brand"
              onClick={goToPrevPage}
              disabled={parseInt(searchParams.get("page")) <= 1}
            >
              Previous
            </Button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((pageNo) => (
              <Button
                border="1px"
                borderColor={"gray.500"}
                colorScheme="brand"
                key={pageNo}
                onClick={() => setSearchParams({ page: pageNo })}
              >
                {pageNo}
              </Button>
            ))}
            <Button
              border="1px"
              borderColor={"gray.500"}
              colorScheme="brand"
              onClick={goToNextPage}
              disabled={parseInt(searchParams.get("page")) >= pages}
            >
              Next
            </Button>
          </ButtonGroup> */}
        </Flex>
        <Flex
          direction={"column"}
          gap={10}
          my={8}
          ms={{ base: 0, lg: 8 }}
          w={{ base: "80vw", lg: "25vw" }}
          ps={{ base: 0, lg: 6 }}
          borderLeft={{ base: "none", lg: "1px" }}
          borderColor={"gray.300"}
        >
          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">
              ABOUT US
            </Heading>
            <Text textAlign="justify" mt={4}>
              We are an organic foods, natural home care and handmade personal
              care brand from the house of <b> Suryan Organic </b>. We were born
              out of the need to start at the beginning, to go to the roots of
              our problems. As an enterprise that is inspired by the mission of{" "}
              <b>Bansi Gir Gaushala </b>, our aim is to contribute to the
              revival of <b>“ Gau Sanskriti ”</b>, an ancient culture which
              placed the Gaumata (Cow as the Divine Mother) at the center of all
              economic, cultural and social activity.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">
              FOLLOW US
            </Heading>
            <ButtonGroup mt={6} gap={2}>
              <IconButton
                as={Link}
                href="https://www.facebook.com/SoseOrganicAndNaturalStore/"
                isRound
                boxSize="12"
                border="1px"
                borderColor={"gray.300"}
                icon={<Icon as={FaFacebookSquare} color="facebook.600" />}
              />
              <IconButton
                as={Link}
                href="https://www.youtube.com/channel/UC9OoW-ceIDeJLBVX37gBCww"
                isRound
                boxSize="12"
                border="1px"
                borderColor={"gray.300"}
                icon={<Icon as={FaYoutube} color="red.500" />}
              />
              <IconButton
                as={Link}
                href="https://www.instagram.com/sose_organic/"
                isRound
                boxSize="12"
                border="1px"
                borderColor={"gray.300"}
                icon={<Icon as={FaInstagram} color="pink.600" />}
              />
            </ButtonGroup>
          </Box>
          <Box>
            <Heading size="xs" pb={2} borderBottom="1px" borderColor="gray.300">
              ARCHIVE
            </Heading>
            <Select
              mt={4}
              value={searchParams.get("archive")}
              onChange={(e) => {
                if (parseInt(e.target.value) !== 0) {
                  setSearchParams({
                    ...searchParams,
                    archive: e.target.value,
                  });
                } else {
                  setSearchParams({
                    page: 1,
                  });
                }
              }}
            >
              <option value={0}>-- All dates</option>
              {archiveFilterOptions?.map((filterOption) => (
                <>
                  <optgroup label={filterOption.year}></optgroup>
                  <MonthOptions
                    months={filterOption.months}
                    year={filterOption.year}
                  />
                </>
              ))}
            </Select>
          </Box>
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
