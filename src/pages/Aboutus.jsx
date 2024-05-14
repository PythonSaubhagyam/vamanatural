import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import { Box, Container, VStack, Image, Text, Heading } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
const AboutUs = () => {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Container maxW={"container.xl"} alignContent={"flex-start"}>
        <BreadCrumbCom second={"About Us"} secondUrl={"/about-us"} />{" "}
      </Container>
      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/aboutUs.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "5xl", base: "xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
          About Us
        </Text>
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} centerContent>
        <VStack>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/vama_website/aboutus/section_icon+(1).png"
            }
          />
          <Box
            fontWeight={"600"}
            color="brand.500"
            fontSize={"30px"}
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
          </Box>

          <br />
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/vama_website/aboutus/section_icon+(1).png"
            }
          />
          <Box fontWeight={"600"} color="brand.500" fontSize={"30px"}>
            Our Vision
          </Box>

          <Box maxW={"6xl"} textAlign={"center"}>
            Our brand aims to recreate the same purity and authenticity that is
            characteristic of the VAMA Herbal & Natural and ancient Bharat.
            <br />
            <br />
            While doing so, we help people empower farmers who are the
            cornerstone of Bharatiya Gau Sanskriti.
          </Box>
          <Image
            src={
              "https://forntend-bucket.s3.ap-south-1.amazonaws.com/vama_website/aboutus/section_icon+(1).png"
            }
          />

          <Heading
            color="brand.500"
            size="lg"
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
        </VStack>
      </Container>
      {IsMobileView !== "true" && <Footer />}
    </>
  );
};

export default AboutUs;
