import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Heading,
  ListItem,
  UnorderedList,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

export default function ReturnRefundPolicy() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const pageUrl = "/return-and-refund-policy";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      {IsMobileView !== "true" && <Navbar />}

      <Container maxW="container.xl">
        <BreadCrumbCom
          second="Return And Refund Policy"
          secondUrl="/return-and-refund-policy"
        />
      </Container>

      <Container maxW="container.xl" py={1} px={0} position="relative">
        {/* <Image
          src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/refund.jpg"
          alt="Refund Policy Banner"
        /> */}
        <Text
          pb={2}
          color="brand.100"
          textAlign="center"
          fontSize={{ lg: "6xl", md: "4xl", base: "xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          Refund & Return Policy
        </Text>
      </Container>

      <Container maxW="6xl" py={10}>
        <Heading textAlign="center" color="#436131" pb={8}>
          Return and Refund Policy
        </Heading>

        <Heading size="md" fontWeight="600" color="#436131">
          General Return & Refund Policy
        </Heading>
        <UnorderedList py={6} spacing={4} textAlign="justify">
          <ListItem>
            Products are returnable if received physically damaged, with missing parts, defective, or different from their description on sose.in.
          </ListItem>
        </UnorderedList>

        <Heading size="md" fontWeight="600" color="#436131" pt={8}>
          Return will be processed only if:
        </Heading>
        <UnorderedList spacing={4} textAlign="justify">
          <ListItem>
            It is determined that the product was not damaged while in your possession.
          </ListItem>
          <ListItem>
            The product is not different from what was shipped to you.
          </ListItem>
          <ListItem>
            The product is returned in original condition (with brand/manufacturer's box, MRP tag intact).
          </ListItem>
          <ListItem>
            For other product-related issues, contact us at: <Link as="b" href="mailto:support@suryanorganic.com">support@suryanorganic.com</Link>
          </ListItem>
          <ListItem>
            Final decisions relating to returns and refunds are at the sole discretion of the management at{" "}
            <Link href="https://sose.in/" isExternal fontWeight="600">
              www.sose.in.
            </Link>

          </ListItem>
        </UnorderedList>
      </Container>

      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
}
