import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";

import ProductListSectionHome from "../components/ProductListSectionHome";
import {
  Container,
  Flex,
  Image,
  Heading,
  Stat,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Box,
  Link,
  Center,
  useMediaQuery,
  Text,
  Grid,
  GridItem,
  LinkBox,
  LinkOverlay,
  useBreakpointValue,
  Card,
  Skeleton,
  VStack,
  Button,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Testimonials from "../components/testimonials";

const productCategory = [
  {
    image1: require("../assets/home/shampoo.jpg"),
    title: "SHAMPOO",
    href: "/shop?page=1&category=467&category_name=Shampoo",
  },
  {
    image1: require("../assets/home/bodywash.jpg"),
    title: "BODY WASH",
    href: "/shop?page=1&category=393&category_name=Body Wash",
  },
  {
    image1: require("../assets/home/body srub.jpg"),
    title: "BODY SCRUB",
    href: "/shop?page=1&category=396&category_name=Body Scrub",
  },
  {
    image1: require("../assets/home/essential-oil.jpg"),
    title: "ESSENTIAL OIL",
    href: "/shop?page=1&category=510&category_name=Ess oil",
  },
  {
    image1: require("../assets/home/handwash.jpg"),
    title: "HAND WASH",
    href: "/shop?page=1&category=737&category_name=Hand Wash",
  },
  {
    image1: require("../assets/home/laundry-liquid.jpg"),
    title: "LAUNDRY LIQUID",
    href: "/shop?page=1&category=729&category_name=Liquid Detergent",
  },
];
const banner = [
  {
    id: 11,
    alt_text: "Image2",
    image: require("../assets/Home Page Banners/01.jpg"),
    display_status: true,
    image_url: "/products/2488",
  },
  {
    id: 12,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/02.jpg"),
    display_status: true,
    image_url: "/products/2462",
  },
  {
    id: 13,
    alt_text: "Image3",
    image: require("../assets/Home Page Banners/03.jpg"),
    display_status: true,
    image_url: "/products/2453",
  },
  {
    id: 14,
    alt_text: "Image4",
    image: require("../assets/Home Page Banners/04.jpg"),
    display_status: true,
    image_url: "/products/2445",
  },
];

export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [banners, setBanners] = useState(banner);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [newArrival, setNewArrival] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  // let [isFull] = useMediaQuery("(max-width:1920px)");
  const [blogs, setBlogs] = useState([]);
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    CheckOrSetUDID();
    getMustTry();
    //getHomePageData();
    getBestSeller();
    getNewArrival();
    getBlogs();
  }, []);

  // async function getHomePageData() {
  //   const response = await client.get("/home");
  //   if (response.data.status === true) {
  //     //setBanners(response.data.banners);
  //     setHome(response.data);
  //   }
  //   setLoading(false);
  // }
  async function getNewArrival() {
    const response = await client.get("newarrival/list");
    if (response) {
      setNewArrival(response.data.data);
    }
    setLoading(false);
  }
  async function getMustTry() {
    const response = await client.get("musttry/list");
    if (response) {
      setMustTry(response.data.data);
    }
    setLoading(false);
  }
  async function getBestSeller() {
    const response = await client.get("bestofalltime/list");
    if (response) {
      setBestSeller(response.data.data);
    }
    setLoading(false);
  }
  async function getBlogs() {
    const params = {};
    const response = await client.get("/home/blogs/", {
      params: params,
    });
    if (response.data.status === true) {
      setBlogs(response.data.blogs);
    }
  }

  return (
    <>
      {/* {loading === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      <Container maxW={"container.xl"} px={0}>
        {loading === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners} />
        )}
      </Container>
      <VStack background={"#fff6f0"} p={6}>
        <Box
          fontWeight={"600"}
          color="brand.500"
          fontSize={{md:30,base:24}}
          alignContent={"flex-start"}
        >
          Our Mission
        </Box>

        <Box maxW={"6xl"} textAlign={"center"}>
          VAMA Herbal & Natural draw inspiration from Bansi Gir Gaushala, and
          its work towards reviving Bharat’s ancient “GauSanskriti”.
          <br />
          <br />
          Ancient Bharat holds the solution to many of the challenges facing
          humanity today.
          <br />
          <br />
          Our mission is to change the way people think about beauty care
          products, bringing simple Ayurvedic wisdom back into people’s lives.
          <br />
          <Button
            background="text.500"
            mt={3}
            type="submit"
            color={"white"}
            onClick={() => navigate("/about-us")}
            _hover={{ color: "white" }}
          >
            Read more
          </Button>
        </Box>

        <br />

        <Box fontWeight={"600"} color="brand.500"  fontSize={{md:30,base:24}}>
          Our Vision
        </Box>

        <Box maxW={"6xl"} textAlign={"center"}>
          Our brand aims to recreate the same purity and authenticity that is
          characteristic of the VAMA Herbal & Natural and ancient Bharat.
          <br />
          <br />
          While doing so, we help people empower farmers who are the cornerstone
          of Bharatiya Gau Sanskriti.
          <br />
          <Button
            background="text.500"
            mt={3}
            type="submit"
            color={"white"}
            onClick={() => navigate("/about-us")}
            _hover={{ color: "white" }}
          >
            Read more
          </Button>
        </Box>
      </VStack>
      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <LazyLoadImage
          src={require("../assets/home/Vamacertificate.jpg")}
          alt=""
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />
      </Container>

      <Container maxW={"container.xl"} mb={5} px={0}>
        <Box
          bgColor={"bg.500"}
          px={{ base: 2, md: 8 }}
          py={4}
          my={7}
          textAlign={{ base: "center", md: "start" }}
        >
          <Text
            fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
            fontWeight={500}
          >
            Our Product Category
          </Text>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(6, 1fr)",
          }}
          gap={4}
          my={6}
          px={{ base: 7, md: 15, xl: 20 }}
        >
          {productCategory?.map((data) => (
            <GridItem cursor={"pointer"}>
              <LazyLoadImage
                cursor={"pointer"}
                transition="all 1s ease"
                _hover={{
                  transform: "scale(1.25)",
                }}
                src={data.image1}
                alt={data.title}
                onClick={() => navigate(data?.href)}
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s",
                  borderRadius: 10,
                }}
              />
              <Text
                textAlign={"center"}
                color="text.500"
                fontSize={{md:18,base:16}}
                pt={2}
                fontWeight={600}
              >
                {data.title}
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Container>

      <ProductListSectionHome
        title="Try Our New Products"
        loading={loading}
        products={newArrival}
      />

      <ProductListSectionHome
        title="Must Try: Vama Products"
        loading={loading}
        products={mustTry}
      />
      <ProductListSectionHome
        title="All Time Best Sellers"
        loading={loading}
        products={bestSeller}
      />
      <Container mb={5} px={0} maxW={"container.xl"} centerContent>
        <LazyLoadImage
          src={
            "https://forntend-bucket.s3.ap-south-1.amazonaws.com/vama_website/home/skin_care.jpg"
          }
        />
      </Container>
      <Container maxW={"container.xl"}>
        <Box
          w="100%"
          //backgroundImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"}
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            fontSize={{md:33,base:24}}
            mx="auto"
            align={"center"}
            mt={3}
            pb={3}
          >
            BLOGS
          </Heading>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            md: "repeat(2,1fr)",
            lg: "repeat(4,1fr)",
          }}
          px={2}
          my={6}
          spacing="40px"
        >
          {blogs?.slice(0, 8).map((blog) => (
            <GridItem key={blog.id} m={4}>
              <Card>
                <LinkBox h={400}>
                  <Image
                    src={blog.banner}
                    w="100%"
                    h="300px"
                    loading="lazy"
                    objectFit={"cover"}
                    borderRadius={5}
                    style={{
                      opacity: 1,
                      transition: "opacity 0.7s", // Note the corrected syntax here
                    }}
                  />
                  <LinkOverlay
                    _hover={{ color: "text.500" }}
                    href={`/blogs/${blog.id}/`}
                  >
                    <Heading size="sm" fontWeight={500} m={2}>
                      {blog.title}
                    </Heading>
                  </LinkOverlay>
                </LinkBox>
                <Flex m={2} justifyContent={"space-between"}>
                  <Text fontSize={"sm"} color="gray.500">
                    {new Intl.DateTimeFormat("en-CA", {
                      dateStyle: "long",
                      timeZone: "Asia/Kolkata",
                    }).format(new Date(blog.published_at))}
                  </Text>
                  <Text
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"brand.500"}
                    onClick={() => navigate(`/blogs/${blog.id}/`)}
                    cursor={"pointer"}
                  >
                    Read more
                    <ChevronRightIcon />
                  </Text>
                </Flex>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        <Heading
          color="brand.500"
          fontSize={{md:33,base:20}}
          mx="auto"
          align={"center"}
          mt={3}
          //pb={"10px"}
        >
          OUR CERTIFICATIONS & AWARDS
        </Heading>

        <Text mt={3} mb={5} textAlign={"center"} color="text.300">
          We are committed to quality and each of our facilities is
          independently certified by an industry-accredited agency.
        </Text>
        <Flex
          justifyContent="space-evenly"
          direction={{ base: "column", md: "row" }}
          align="center"
          gap={12}
          pt={1}
          pb={6}
        >
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/global-certificate.jpg"
            }
            alt="global-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/ciolook-certificate.jpg"
            }
            alt="ciolook-certificate"
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Flex>
      </Container>
      <Container backgroundColor={"bg.500"} maxW={"container.xl"} px={0} py={2}>
        <SimpleGrid
          columns={[2, 3, null, 5]}
          px={6}
          maxW={"container.xl"}
          my={6}
          backgroundColor={"bg.500"}
          align="center"
          spacingX={{ base: "10vw", md: "30px" }}
          spacingY="40px"
        >
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              22+
            </StatNumber>
            <StatHelpText color="gray.600">Natural Products</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              20930+
            </StatNumber>
            <StatHelpText color="gray.600">Satisfied Clients</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              1485+
            </StatNumber>
            <StatHelpText color="gray.600">Cities & Towns</StatHelpText>
          </Stat>
          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              7+
            </StatNumber>
            <StatHelpText color="gray.600">Countries</StatHelpText>
          </Stat>

          <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              15+
            </StatNumber>
            <StatHelpText color="gray.600">Stores</StatHelpText>
          </Stat>

          {/* <Stat>
            <StatNumber color="text.300" fontSize={{ base: "3xl", md: "3xl" }}>
              11<sup>th</sup>
            </StatNumber>
            <StatHelpText color="gray.600">Generation of Farmers</StatHelpText>
          </Stat> */}
        </SimpleGrid>
      </Container>
      <Container maxW={{ base: "100vw", md: "container.xl" }}>
        <Image
          w={{md:"65%"}}
          my={10}
          src={require("../assets/home/vama_icon(1).jpg")}
          mx="auto"
          style={{
            opacity: 1,
            transition: "opacity 0.7s", // Note the corrected syntax here
          }}
        />

        <Heading
          color="brand.500"
         fontSize={{md:33,base:20}}
          mx="auto"
          align={"center"}
          my={"5"}
          pb={"10px"}
        >
          OUR SERVICES ARE AVAILABLE IN 
        </Heading>

        <Box display={"flex"} px={0} justifyContent={"center"}>
          <LazyLoadImage
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/Map.webp"
            }
            w={{ base: "100%", md: "100%" }}
            alt=""
            py={4}
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Box>

        <Heading
          color="brand.500"
          fontSize={{md:33,base:22}}
          mx="auto"
          align={"center"}
          my={"5"}
          pb={"10px"}
        >
          AVAILABLE AT
        </Heading>

        <Container maxW={"container.xl"} mb={5} px={0} centerContent>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/01.jpg"
            }
            w={"container.xl"}
            alt=""
            style={{
              opacity: 1,
              transition: "opacity 0.7s", // Note the corrected syntax here
            }}
          />
        </Container>
      </Container>
      <Footer />
      {/* </>
      )} */}
    </>
  );
}
