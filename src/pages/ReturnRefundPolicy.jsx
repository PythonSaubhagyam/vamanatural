import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Heading,
  ListItem,
  UnorderedList,
  Link,
  Box,
  Text,
  Image
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";

export default function ReturnRefundPolicy() {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";

  return (
    <>
      {IsMobileView !== "true" && <Navbar />}
      <Container maxW="container.xl">
        <BreadCrumbCom
          second={"Return And Refund Policy"}
          secondUrl={"/return-and-refund-policy"}
        />
      </Container>
      <Container maxW={"container.xl"} py={1} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/refund.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "6xl", md: "4xl", base: "xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
           Refund & Return Policy
        </Text>
      </Container>
      <Container maxW={"6xl"} py={10}>
        <Heading textAlign={"center"} color="#436131" pb={8}>
          Return and Refund Policy
        </Heading>
        <Heading size="md" fontWeight={"600"} color="#436131" textDecor="none">
          General Return & Refund Policy
        </Heading>
        <UnorderedList py={6}>
          <ListItem textAlign={"justify"}>
            Products are returnable within the Terms & Condition if you’ve
            received them in a condition that is physically damaged, has missing
            parts, is defective or different from their description on the
            product detail page on sose.in
          </ListItem>
        </UnorderedList>
        <Heading
          size="md"
          fontWeight={"600"}
          color="#436131"
          textDecor="none"
          pt={8}
        >
          Return will be processed only if
        </Heading>
        <UnorderedList>
          <ListItem textAlign={"justify"} py={2}>
            It is determined that the product was not damaged while in your
            possession.
          </ListItem>
          <ListItem textAlign={"justify"} py={2}>
            The product is not different from what was shipped to you.
          </ListItem>
          <ListItem textAlign={"justify"} py={2}>
            The product is returned in original condition (with
            brand’s/manufacturer's box, MRP tag intact).
          </ListItem>
          <ListItem textAlign={"justify"} py={2}>
            For any other product related issues, please contact us directly at{" "}
            <Link href="mailto:support@suryanorganic.com" as="b">
              support@suryanorganic.com
            </Link>
          </ListItem>
          <ListItem py={2} textAlign={"justify"}>
            Final Decisions relating to General Return & Refunds are at the sole
            discretion of the management of www.sose.in
          </ListItem>
        </UnorderedList>
      </Container>
      <ScrollToTop/>
      {IsMobileView !== "true" && <Footer />}
    </>
  );
}
