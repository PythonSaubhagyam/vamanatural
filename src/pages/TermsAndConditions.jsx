import {
  Container,
  Heading,
  UnorderedList,
  ListItem,
  Link,
  Box,
  Text,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
// import { useLocation } from "react-router-dom";

export default function TermsAndConditions() {
  // let { search } = useLocation();
  // const searchParams = new URLSearchParams(search);
  // const IsMobileView = searchParams.get("mobile") ?? "false";

  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom
          second={"Terms And Conditions"}
          secondUrl={"/terms-and-conditions"}
        />
      </Container>
      <Container maxW={"container.xl"} mb={4} px={0} >
        <Box
          w={"100%"}
          bgImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/terms.jpg"}
          bgSize="cover"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={"-10px"}
          py={20}
          boxShadow={"0px 0px 0px 0px"}
          backdropFilter="blur(10px)"
          height={"550px"}
        // mb={10}
        >
          <Text
            pb={2}
            color={"brand.100"}
            textAlign={"center"}
            textShadow={"lightgreen"}
            fontSize="6xl"
            fontWeight="700"
          >
        Terms & Condition
          </Text>
        </Box>
      </Container>
      <Container maxW="container.lg" pt={10}>
        <Heading size="md" fontWeight={500} color={"brand.900"}>
          Shipping Policy
        </Heading>
        <UnorderedList>
          <ListItem py={4} textAlign={"justify"}>
            It is our sincere endeavor to process and dispatch your orders as
            quickly as possible.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            For all orders we normally charge a flat shipping rate of Rs. 100
            for all delivery locations within Bharat (India). However, customers
            also have the option of choosing FedEx as their delivery agent in
            which case delivery charges may be higher based on weight of the
            shipment and the delivery location .
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            For deliveries in Bharat: order is normally dispatched on the same
            day or on the subsequent working day, and normally delivered to you
            within 7 working days. In rare cases where an order has taken longer
            to deliver, we request you to check the order tracking details sent
            to you by email or get in touch with us at{" "}
            <Link href="mailto:care@suryanorganic.com">
              care@suryanorganic.com.
            </Link>
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            For deliveries in the rest of the world: At this moment, we don’t
            accept orders for delivery outside Bharat.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            Suryan Organic reserves the right to refuse confirmed orders that
            are approved by the customer but where payment status is still
            pending.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            Delivery will be made at the address specified by you while placing
            the order. For multiple delivery destinations, you will need to
            submit separate orders for each delivery destination.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            If you are not personally available to accept delivery, you may
            appoint a representative to do so in your place.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            While affecting delivery, the delivery agent may require you or your
            nominated representative to produce a proof of identity, such as a
            valid Aadhar Card, Passport, Driving License, Election Card or PAN
            Card.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            You or your nominated representative may be required to sign a
            delivery manifest to confirm that the delivery has taken place. If
            you refuse to sign the delivery document, this will be taken as a
            refusal to accept the delivery.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            You agree to give us as much detail as possible about particular
            features of the Delivery Address to ensure smooth and timely
            delivery.
          </ListItem>
          <ListItem py={4} textAlign={"justify"}>
            Eligible shipping speeds and their charges are displayed based on
            the item(s) in your cart and the delivery address.
          </ListItem>
        </UnorderedList>
        <Heading size="md" fontWeight={500} color={"brand.900"} pt={12}>
          Tracking your order
        </Heading>
        <UnorderedList>
          <ListItem py={4} pb={8} textAlign={"justify"}>
            We shall send you an email containing tracking details when we
            dispatch your order. In this email, you will see a link to track
            your order via our courier partner’s website. You can then track
            your order in real time.
          </ListItem>
        </UnorderedList>
      </Container>
      <Footer />
    </>
  );
}
