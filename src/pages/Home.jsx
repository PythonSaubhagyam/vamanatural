import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
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
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";

const productItems = [
  {
    id: 8659,
    imageSrc:
      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/imgpsh_fullsize_anim_sose_website.jpg",
  },
  {
    id: 9249,
    imageSrc:
      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/imgpsh_fullsize_anim_sose_image.jpg",
  },
  {
    id: 9248,
    imageSrc:
      "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/baby_cream.jpg",
  },
];

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
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile] = useMediaQuery("(max-width: 480px)");
  const [newArrival, setNewArrival] = useState([]);
  const [mustTry, setMustTry] = useState([]);
  const [sections, setSections] = useState([]);
  const [servicesSection, setServicesSection] = useState();
  const [availableSection, setAvailableSection] = useState();
  const [awardsSection, setAwardSection] = useState();
  const [bestSeller, setBestSeller] = useState([]);
  const [missionSection, setMissionSection] = useState([]);
  const [visionSection, setVisionSection] = useState([]);
  const [newArrivalSection, setNewArrivalSection] = useState([]);
  const [certificateSection, setCertifcateSection] = useState([]);
  const [ourProductSection, setOurProductSection] = useState([]);
  const [skinCareSection, setSkinCareSection] = useState([]);
  const [nonGMOSection, setNonGMOSection] = useState([]);
  const [statisticsSection, setStatisticsSection] = useState([]);

  const [blogs, setBlogs] = useState([]);
  const loginInfo = checkLogin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };

    init();
    //CheckOrSetUDID();
    getMustTry();
    //getHomePageData();
    getBanners();
    getBestSeller();
    getNewArrival();
    getBlogs();
    getLowerSection();
    getUpperSectionUpper();
    getUpperSectionLower();
    getStatisticsSection();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, []);

  async function getBanners() {
    setLoading(true);
    try {
      const response = await client.get("/ecommerce/banners/?sequence=Upper");

      if (response.data.status === true) {
        setBanners(response?.data?.banner);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }
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
  async function getLowerSection() {
    const params = {};
    const response = await client.get("/lower-section", {
      params: params,
    });
    if (response.data.status === true) {
      setSections(response.data.data);

      const ourServicesSection = response.data.data?.filter(
        (section) => section.id === 2
      );
      const availableAtSection = response.data.data?.filter(
        (section) => section.id === 3
      );
      const ourAwardsSection = response.data.data?.filter(
        (section) => section.id === 1
      );

      setAwardSection(ourAwardsSection);
      setServicesSection(ourServicesSection);
      setAvailableSection(availableAtSection);
    }
  }

  async function getStatisticsSection() {
    const params = {};
    const response = await client.get("/statistics-section/", {
      params: params,
    });
    if (response.data.status === true) {
      setStatisticsSection(response?.data?.data);
    }
  }
  const getUpperSectionUpper = async () => {
    const response = await client.get("/vamanatural-section/?type=Upper");

    if (response.data.status === true) {
      const mission = response.data.data?.filter((section) => section.id === 1);
      const vision = response.data.data?.filter((section) => section.id === 2);
      const arrival = response.data.data?.filter((section) => section.id === 3);
      const certificate = response.data.data?.filter(
        (section) => section.id === 4
      );

      const products = response.data.data?.filter(
        (section) => section.id === 5
      );

      setMissionSection(mission);
      setVisionSection(vision);
      setNewArrivalSection(arrival);
      setCertifcateSection(certificate);
      setOurProductSection(products);
    }
  };
  const getUpperSectionLower = async () => {
    const response = await client.get("/vamanatural-section/?type=Lower");

    if (response.data.status === true) {
      const skinCare = response.data.data?.filter(
        (section) => section.id === 6
      );
      const nonGMO = response.data.data?.filter((section) => section.id === 7);

      setSkinCareSection(skinCare);
      setNonGMOSection(nonGMO);
    }
  };

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
          <Carousel banners={banners?.length > 0 && banners} />
        )}
      </Container>
      {missionSection?.length > 0 &&
        missionSection[0]?.is_visible_on_website === true && (
          <VStack
            background={"#fff6f0"}
            p={{ base: 4, md: 6, lg: 8 }}
            spacing={{ base: 6, md: 8 }}
            maxW="container.xl"
            mx="auto"
          >
            <Box
              fontWeight={"600"}
              color="brand.500"
              fontSize={{ md: 30, base: 24 }}
              // alignContent={"flex-start"}
            >
              {missionSection[0]?.label}
            </Box>

            <Box
              maxW={"6xl"}
              textAlign={"center"}
              whiteSpace={"pre-line"}
              px={{ base: 4, md: 6 }}
            >
              {missionSection[0]?.description}
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
        )}
      {visionSection?.length > 0 &&
        visionSection[0]?.is_visible_on_website === true && (
          <VStack
            background={"#fff6f0"}
            p={{ base: 4, md: 6, lg: 8 }}
            spacing={{ base: 6, md: 8 }}
            maxW="container.xl"
            mx="auto"
          >
            <Box
              fontWeight={"600"}
              color="brand.500"
              fontSize={{ md: 30, base: 24 }}
            >
              {visionSection[0]?.label}
            </Box>

            <Box maxW={"6xl"} textAlign={"center"} whiteSpace={"pre-line"}>
              {visionSection[0]?.description}
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
        )}
      {newArrivalSection?.length > 0 &&
        newArrivalSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={5} centerContent>
            <LazyLoadImage
              src={newArrivalSection[0]?.image}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
              gap={10}
              my={6}
              px={15}
            >
              {newArrivalSection[0]?.images?.length > 0 &&
                newArrivalSection[0]?.images?.map((product) => (
                  <GridItem
                    key={product.id}
                    onClick={() => {
                      if (product.product) {
                        navigate(`/products/${product.product}`);
                      }
                    }}
                    cursor={product.product ? "pointer" : "default"}
                  >
                    <LazyLoadImage
                      src={product.image}
                      style={{
                        opacity: 1,
                        transition: "opacity 0.7s",
                      }}
                    />
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}
      {certificateSection?.length > 0 &&
        certificateSection[0]?.is_visible_on_website === true && (
          <Container px={0} maxW={"container.xl"} centerContent>
            <LazyLoadImage
              src={certificateSection[0]?.image}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
                width: "100%",
              }}
            />
          </Container>
        )}

      {ourProductSection?.length > 0 &&
        ourProductSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} px={0}>
            <Box
              bgColor={"bg.500"}
              px={{ base: 2, md: 8 }}
              py={4}
              //my={7}
              textAlign={{ base: "center", md: "start" }}
            >
              <Text
                fontSize={{ base: "xl", sm: "2xl", xl: "3xl" }}
                fontWeight={500}
              >
                {ourProductSection[0]?.label}
              </Text>
            </Box>
            <Grid
              templateColumns={{
                base: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(6, 1fr)",
              }}
              gap={4}
              my={6}
              px={{ base: 7, md: 15, xl: 20 }}
            >
              {ourProductSection[0]?.images?.length > 0 &&
                ourProductSection[0]?.images?.map((data) => (
                  <GridItem cursor={"pointer"}>
                    <LazyLoadImage
                      cursor={"pointer"}
                      transition="all 1s ease"
                      _hover={{
                        transform: "scale(1.25)",
                      }}
                      src={data.image}
                      alt={data.category_name}
                      onClick={() => {
                        if (data?.category !== null) {
                          navigate(
                            `/shop?page=1&category=${data?.category}&category_name=${data?.category_name}`
                          );
                        }
                      }}
                      style={{
                        opacity: 1,
                        transition: "opacity 0.7s",
                        borderRadius: 10,
                      }}
                    />
                    <Text
                      textAlign={"center"}
                      color="text.500"
                      fontSize={{ md: 18, base: 16 }}
                      pt={2}
                      fontWeight={600}
                    >
                      {data.category_name}
                    </Text>
                  </GridItem>
                ))}
            </Grid>
          </Container>
        )}

      {newArrival?.length > 0 && (
        <ProductListSectionHome
          title="Try Our New Products"
          loading={loading}
          products={newArrival}
          type={isMobile && "carousal"}
        />
      )}

      <ProductListSectionHome
        title="Must Try: Vama Products"
        loading={loading}
        products={mustTry}
        type={isMobile && "carousal"}
      />
      <ProductListSectionHome
        title="All Time Best Sellers"
        loading={loading}
        products={bestSeller}
        type={isMobile && "carousal"}
      />
      {skinCareSection?.length > 0 &&
        skinCareSection[0]?.is_visible_on_website === true && (
          <Container mb={5} px={0} maxW={"container.xl"} centerContent>
            <LazyLoadImage src={skinCareSection[0]?.image} />
          </Container>
        )}
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
            fontSize={{ md: 33, base: 24 }}
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
                    _hover={{ color: "brand.500" }}
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
      {awardsSection?.length > 0 &&
        awardsSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }}>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 20 }}
              mx="auto"
              align={"center"}
              mt={3}
              pb={"10px"}
            >
              {awardsSection?.length > 0 && awardsSection[0]?.label}
            </Heading>

            <Text my={5} textAlign={"center"} color="text.300">
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
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[0]?.image
                }
                alt="global-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
              <LazyLoadImage
                src={
                  awardsSection[0]?.images?.length > 0 &&
                  awardsSection[0]?.images[1]?.image
                }
                alt="ciolook-certificate"
                style={{
                  opacity: 1,
                  transition: "opacity 0.7s", // Note the corrected syntax here
                }}
              />
            </Flex>
          </Container>
        )}
      {statisticsSection?.length > 0 &&
        statisticsSection[0]?.is_visible_on_website === true && (
          <Container
            backgroundColor={"bg.500"}
            maxW={"container.xl"}
            px={0}
            py={2}
          >
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
              {statisticsSection?.length > 0 &&
                statisticsSection?.map((data) => (
                  <Stat>
                    <StatNumber
                      color="text.300"
                      fontSize={{ base: "3xl", md: "3xl" }}
                    >
                      {data?.value}
                    </StatNumber>
                    <StatHelpText color="gray.600">{data?.name}</StatHelpText>
                  </Stat>
                ))}
            </SimpleGrid>
          </Container>
        )}

      {nonGMOSection?.length > 0 &&
        nonGMOSection[0]?.is_visible_on_website === true && (
          <Container maxW={"6xl"} centerContent>
            <Image
              my={10}
              src={nonGMOSection[0]?.image}
              mx="auto"
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
          </Container>
        )}

      {servicesSection?.length > 0 &&
        servicesSection[0]?.is_visible_on_website === true && (
          <Container maxW={{ base: "100vw", md: "container.xl" }}>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 20 }}
              mx="auto"
              align={"center"}
              my={"5"}
              pb={"10px"}
            >
              {servicesSection?.length > 0 && servicesSection[0].label}
            </Heading>

            <Box display={"flex"} justifyContent={"center"}>
              <LazyLoadImage
                src={
                  servicesSection?.length > 0 &&
                  servicesSection[0]?.images[0].image
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
          </Container>
        )}
      {availableSection?.length > 0 &&
        availableSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={5} px={0} centerContent>
            <Heading
              color="brand.500"
              fontSize={{ md: 33, base: 22 }}
              mx="auto"
              align={"center"}
              my={"5"}
              pb={"10px"}
            >
              {availableSection?.length > 0 && availableSection[0].label}
            </Heading>

            <Image
              src={
                availableSection?.length > 0 &&
                availableSection[0]?.images[0].image
              }
              w={"container.xl"}
              alt=""
              style={{
                opacity: 1,
                transition: "opacity 0.7s", // Note the corrected syntax here
              }}
            />
          </Container>
        )}
      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <ScrollToTop />
      <Footer />
    </>
  );
}
