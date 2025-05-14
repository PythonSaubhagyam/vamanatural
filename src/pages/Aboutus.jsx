import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

const AboutUs = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const pageUrl = "/about-us";

  const SECTION_ICON = "https://forntend-bucket.s3.ap-south-1.amazonaws.com/vama_website/aboutus/section_icon+(1).png";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      {IsMobileView !== "true" && <Navbar />}

      <Container maxW="container.xl" alignContent="flex-start">
        <BreadCrumbCom second="About Us" secondUrl={pageUrl} />
      </Container>

      {/* Banner */}
      <Container maxW="container.xl" px={0} py={1} position="relative">
        <Image
          src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutUs.jpg"
          alt="About Us Banner"
        />
        <Text
          color="brand.100"
          textAlign="center"
          fontSize={{ lg: "7xl", md: "5xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          bg="rgba(255,255,255,0.1)"
          px={4}
          borderRadius="md"
        >
          About Us
        </Text>
      </Container>

      {/* Main Content */}
      <Container maxW="container.xl" mb={4} px={0} centerContent>
        <VStack spacing={10} px={4}>

          {/* Mission */}
          <Image src={SECTION_ICON} alt="Mission Icon" />
          <Box fontWeight="600" color="brand.500" fontSize="30px">
            Our Mission
          </Box>
          <Box maxW="6xl" textAlign="center" fontSize="lg">
            VAMA Herbal & Natural draws inspiration from Bansi Gir Gaushala and its work towards reviving Bharat’s ancient “GauSanskriti”.
            <br /><br />
            Ancient Bharat holds the solution to many of the challenges facing humanity today.
            <br /><br />
            Our mission is to change the way people think about beauty care products, bringing simple Ayurvedic wisdom back into people’s lives.
          </Box>

          {/* Vision */}
          <Image src={SECTION_ICON} alt="Vision Icon" />
          <Box fontWeight="600" color="brand.500" fontSize="30px">
            Our Vision
          </Box>
          <Box maxW="6xl" textAlign="center" fontSize="lg">
            Our brand aims to recreate the same purity and authenticity that is characteristic of VAMA Herbal & Natural and ancient Bharat.
            <br /><br />
            While doing so, we help people empower farmers who are the cornerstone of Bharatiya Gau Sanskriti.
          </Box>

          
        </VStack>
      </Container>

      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
};

export default AboutUs;
