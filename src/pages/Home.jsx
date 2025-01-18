import { useState, useEffect } from "react";
// import Loader from "../components/Loader";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import CarouselWithLinks from "../components/CarouselWithLinks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ScrollToTop from "../components/ScrollToTop";
// import ProductListSectionHome from "../components/ProductListSectionHome";
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
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
// import { ChevronRightIcon } from "@chakra-ui/icons";
// import Testimonials from "../components/testimonials";
import LoginModal from "../components/LoginModal";
import checkLogin from "../utils/checkLogin";
import CategorySlider from "../components/CategorySlider";
import BlogSliderHome from "../components/BlogSliderHome";
import CategoryProductSlider from "../components/CategoryProductSlider";
import { useDispatch, useSelector } from "react-redux"

import {
  initializeAppData
} from "../redux/slices/homeApi";


export default function Home() {
  const [isFullScreen] = useMediaQuery("(min-width: 768px)");
  const width = useBreakpointValue({ base: "100%", lg: "100%" });
  const height = useBreakpointValue({ base: "300", lg: "400" });
  const [isMobile] = useMediaQuery("(max-width: 1024px)");
  const loginInfo = checkLogin();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  const [showPopup, setShowPopup] = useState(
    sessionStorage.getItem("hasShownPopup")
  );
  const isMobiles = width <= 768;
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  })


  const dispatch = useDispatch();
  const {
    banners,
    upperSection,
    tryOurNewProductSection,
    mustTrySection,
    loader,
    allTimeBestSellerSection,
    lowerSection1,
    blogs,
    statisticsSection,
    lowerSection2,
    hasFetched,
  } = useSelector((state) => state.home);

  const {
    ourMissionSection,
    ourVissionSection,
    certificateSection,
    newArrivalsSection,
    ourProductSection
  } = upperSection;

  const {
    skinCareSection,
    nonGMOSection,
  } = lowerSection1;

  const {
    awardsSection,
    servicesSection,
    availableSection,
  } = lowerSection2;
  
  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };
    init();
    if (showPopup === null && !loginInfo.isLoggedIn) {
      setIsLoginModalOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched) {
      dispatch(initializeAppData());
    }
  }, [dispatch, hasFetched]);

  


  return (
    <>
      {/* {loader === true ? (
        <Center h="100vh" w="100vw" backgroundColor={"bg.500"}>
          <Loader site={true} />
        </Center>
      ) : (
        <> */}
      <Navbar />
      {/* Upper Banner --------------------------*/}
      <Container maxW={"container.xl"} px={0}>
        {loader === true ? (
          <Skeleton h={489}></Skeleton>
        ) : (
          <Carousel banners={banners?.length > 0 && banners} />
        )}
      </Container>
      {ourMissionSection?.length > 0 &&
        ourMissionSection[0]?.is_visible_on_website === true && (
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
              {ourMissionSection[0]?.label}
            </Box>

            <Box
              maxW={"6xl"}
              textAlign={"center"}
              whiteSpace={"pre-line"}
              px={{ base: 4, md: 6 }}
            >
              {ourMissionSection[0]?.description}
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
      {ourVissionSection?.length > 0 &&
        ourVissionSection[0]?.is_visible_on_website === true && (
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
              {ourVissionSection[0]?.label}
            </Box>

            <Box maxW={"6xl"} textAlign={"center"} whiteSpace={"pre-line"}>
              {ourVissionSection[0]?.description}
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
      {newArrivalsSection?.length > 0 &&
        newArrivalsSection[0]?.is_visible_on_website === true && (
          <Container maxW={"container.xl"} mb={5} centerContent>
            <LazyLoadImage
              src={newArrivalsSection[0]?.image}
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
              {newArrivalsSection[0]?.images?.length > 0 &&
                newArrivalsSection[0]?.images?.map((product) => (
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


      {/* Our Product category Section */}

      <CategorySlider ourProductSection={ourProductSection} />

      {/* Category-Product-Slider */}
      <CategoryProductSlider
        title="Try Our New Products"
        products={tryOurNewProductSection}
        type={"carousal"}
      />
      <CategoryProductSlider
        title="Must Try:  VAMA - Herbal & Natural Beauty "
        products={mustTrySection}
        type={"carousal"}
      />
      <CategoryProductSlider
        title="All Time Best Sellers"
        products={allTimeBestSellerSection}
        type={"carousal"}
      />

      {/* {tryOurNewProductSection?.length > 0 && (
        <ProductListSectionHome
          title="Try Our New Products"
          loader={loader}
          products={tryOurNewProductSection}
          type={"carousal"}
        />
      )} */}
      {/* <ProductListSectionHome
        title="Must Try: Vama Products"
        loader={loader}
        products={mustTrySection}
        type={isMobile  && "carousal"}
      />
     <ProductListSectionHome
        title="All Time Best Sellers"
        loader={loader}
        products={allTimeBestSellerSection}
        type={"carousal"}
      /> */}
      {skinCareSection?.length > 0 &&
        skinCareSection[0]?.is_visible_on_website === true && (
          <Container mb={5} px={0} maxW={"container.xl"} centerContent>
            <LazyLoadImage src={skinCareSection[0]?.image}
              style={{
                opacity: 1,
                width: "100%",
              }} />
          </Container>
        )}

      {/* Blog-Slider-Home */}

      <BlogSliderHome blogs={blogs} />


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
