import {
  Container,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

export default function ShippingPolicy() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const pageUrl = "/shipping-policy";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      {IsMobileView !== "true" && <Navbar />}

      <Container maxW="container.xl">
        <BreadCrumbCom second="Shipping Policy" secondUrl="/shipping-policy" />
      </Container>

      <Container maxW="container.xl" py={1} px={0} position="relative">
        <Image
          src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/shipping.jpg"
          alt="Shipping Policy Banner"
        />
        <Text
          pb={2}
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
          Shipping Policy
        </Text>
      </Container>

      <Container maxW="6xl" pt={5} pb={10}>
        <Heading
          fontSize="3xl"
          fontWeight={600}
          textAlign="center"
          color="brand.900"
        >
          Shipping Policy
        </Heading>

        <Text py={6} textAlign="justify">
          We aim to process and dispatch orders as quickly as possible.
        </Text>

        <UnorderedList spacing={4} textAlign="justify">
          <ListItem>
            For deliveries in Ahmedabad: two working days unless we are out of stock. We will inform you in advance if that happens.
          </ListItem>
          <ListItem>
            For deliveries in the rest of India: five to six working days unless out of stock.
          </ListItem>
          <ListItem>
            For deliveries outside India: Currently, we do not deliver outside India.
          </ListItem>
          <ListItem>
            Suryan Organic reserves the right to refuse confirmed orders lacking sufficient funds.
          </ListItem>
          <ListItem>
            Delivery of goods will take place at the address specified during the order process. Submit separate orders for multiple delivery destinations.
          </ListItem>
          <ListItem>
            If unavailable, you may appoint a representative to accept delivery.
          </ListItem>
          <ListItem>
            Delivery agents may request proof of identity. Refusal to sign may be taken as refusal of delivery.
          </ListItem>
          <ListItem>
            Please provide detailed delivery address information to ensure smooth delivery.
          </ListItem>
        </UnorderedList>
      </Container>

      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
}
