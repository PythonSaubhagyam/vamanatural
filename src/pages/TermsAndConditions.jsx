import {
  Container,
  Heading,
  UnorderedList,
  ListItem,
  Link,
  Text,
  Image,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

export default function TermsAndConditions() {
  const pageUrl = "/terms-and-conditions";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />

      <Container maxW="container.xl">
        <BreadCrumbCom second="Terms And Conditions" secondUrl="/terms-and-conditions" />
      </Container>

      <Container maxW="container.xl" py={1} px={0} position="relative">
        <Image
          src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/terms.jpg"
          alt="Terms and Conditions Banner"
        />
        <Text
          pb={2}
          color="brand.100"
          textAlign="center"
          fontSize={{ lg: "7xl", md: "4xl", base: "xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          Terms & Condition
        </Text>
      </Container>

      <Container maxW="container.lg" pt={8} pb={10}>
        <Heading size="md" fontWeight={500} color="brand.900">
          Shipping Policy
        </Heading>
        <UnorderedList spacing={4} textAlign="justify">
          <ListItem>
            We aim to process and dispatch your orders as quickly as possible.
          </ListItem>
          <ListItem>
            For all orders, we normally charge a flat shipping rate of Rs. 100 within Bharat (India). FedEx delivery charges may vary based on weight and location.
          </ListItem>
          <ListItem>
            Orders within Bharat are usually dispatched same day or next working day, with delivery expected within 7 working days. For delays, check tracking email or contact: <Link href="mailto:care@suryanorganic.com">care@suryanorganic.com</Link>
          </ListItem>
          <ListItem>
            International delivery is not currently available.
          </ListItem>
          <ListItem>
            Suryan Organic reserves the right to refuse orders with pending payments.
          </ListItem>
          <ListItem>
            Delivery is made to the address provided in your order. Multiple destinations require separate orders.
          </ListItem>
          <ListItem>
            A representative may accept delivery on your behalf if you're unavailable.
          </ListItem>
          <ListItem>
            Delivery agents may request proof of identity (Aadhar, Passport, Driving License, Election Card, PAN).
          </ListItem>
          <ListItem>
            A signed delivery manifest may be required. Refusal to sign is considered a delivery refusal.
          </ListItem>
          <ListItem>
            Please provide detailed delivery address information for timely delivery.
          </ListItem>
          <ListItem>
            Shipping options and charges depend on items in your cart and delivery location.
          </ListItem>
        </UnorderedList>

        <Heading size="md" fontWeight={500} color="brand.900" pt={12}>
          Tracking your order
        </Heading>
        <UnorderedList spacing={4} textAlign="justify">
          <ListItem pb={8}>
            You'll receive a tracking email once your order is dispatched, containing a link to track it in real time via our courier partner.
          </ListItem>
        </UnorderedList>
      </Container>

      <ScrollToTop />
      <Footer />
    </>
  );
}