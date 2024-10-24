import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Flex,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { FaFacebookF, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { TfiYoutube } from "react-icons/tfi";
import { FiInstagram } from "react-icons/fi";
import { useNavigate, NavLink as RouterLink } from "react-router-dom";
import { IoMail } from "react-icons/io5";
import CartPopUp from "./CartPopUp";
import CartEmitter from "./EventEmitter";
import checkLogin from "../utils/checkLogin";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import WhatsUp from "./WhatsUp";

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={1} color="brand.100">
      {children}
    </Text>
  );
};

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isMobiles, setIsMobiles] = useState(window.innerWidth <= 600);
  const loginInfo = checkLogin();
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin().isLoggedIn);
  // const checkOrSetUDIDInfo = CheckOrSetUDID();
  // let headers = { visitor: checkOrSetUDIDInfo.visitor_id };

  // if (loginInfo.isLoggedIn === true) {
  //   headers = { Authorization: `token ${loginInfo.token}` };
  // }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    const updateLoginStatus = () => {
      const loginInfo = checkLogin();
      setIsLoggedIn(loginInfo.isLoggedIn);
    };

    // Add event listener to window resize
    window.addEventListener("resize", handleResize);

    // Set interval to check login status every few seconds (optional if login can change dynamically)
    const loginInterval = setInterval(updateLoginStatus, 1000);

    // Cleanup event listener and interval on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(loginInterval);
    };
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [RouterLink]);
  return (
    <>
      <hr />
      <Container maxW={"container.xl"}>
        <Box className="scrolling-text-container">
          <Text
            align={"center"}
            color="brand.900"
            pt={4}
            px={4}
            fontSize={{ base: "sm", lg: "md" }}
            className="scrolling-text"
          >
            For deliveries in the USA, UAE, UK, Singapore, Canada and Australia, email us at{" "} 
            <Link
              target="_blank"
              href="mailto:export@suryanorganic.com"
              isExternal
              fontWeight={"bold"}
            >
              export@suryanorganic.com
            </Link>{" "}
            or WhatsApp us at{" "}
            <Link
              target="_blank"
              href="https://wa.me/+916354800089?text=Hello%2C%20this%20is%20a%20test%20message"
              fontWeight={"bold"}
            >
              +91-6354-8000-89
            </Link>
          </Text>
        </Box>
        <Container as={Stack} maxW={"6xl"} pt={10} pb={2}>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            // spacing={8}
            spacingY="8px"
          >
            {/* <Stack align={"flex-start"} color="brand.900"> */}

            {/* <SimpleGrid columns={{ base: 1, md: 3 }}> */}
            <Stack align={"flex-start"} color="text.300">
              <Stack
                ml={{ md: "50%" }}
                align={{ md: "flex-start", base: "center" }}
              >
                <ListHeader style={{ color: "text.500" }}>
                  Quick Links
                </ListHeader>
              </Stack>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/"}
              >
                Home
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/shop"}
              >
                Shop
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/blogs?page=1"}
              >
                Blogs
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/inspire-and-support"}
              >
                Inspire & Support
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/store-locator"}
              >
                Store Locator
              </Link>

              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/about-us"}
              >
                About Us
              </Link>
            </Stack>
            <Stack align={"flex-start"} color="text.300">
              {!isMobile && <ListHeader>&nbsp;</ListHeader>}
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/contact-us"}
              >
                Contact Us
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/faq"}
              >
                FAQ
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/shipping-policy"}
              >
                Shipping Policy
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/terms-and-conditions"}
              >
                Terms & Conditions
              </Link>

              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/return-and-refund-policy"}
              >
                Return & Refund Policy
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                as={RouterLink}
                to={"/privacy-policy"}
              >
                Privacy Policy
              </Link>
            </Stack>

            {/* </SimpleGrid> */}
            {/* </Stack> */}

            <Stack color="text.300" mt={{ md: 3 }}>
             
                <ListHeader align={"flex-start"}>Customer Support</ListHeader>
             
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                target="_blank"
                href={"tel:917405095969"}
                display={"flex"}
                flexDirection={"row"}
              >
                <FaPhoneAlt
                  alignItems={"center"}
                  size={16}
                  style={{ marginRight: 8 }}
                />{" "}
                +91 74050 95969
              </Link>
              <Link
                display={"flex"}
                flexDirection={"row"}
                textDecoration="none"
                _hover={{ color: "text.500" }}
                target="_blank"
                // alignItems={"center"}
                href={"mailto:care@suryanorganic.com"}
              >
                <IoMail
                  alignItems={"center"}
                  size={18}
                  style={{ marginRight: 6 }}
                />{" "}
                care@suryanorganic.com
              </Link>
            </Stack>
            <Stack mt={{ md: 3 }}>
              <Stack ml={{lg:3}}>
              <ListHeader>Talk To Our Vaidya</ListHeader>
              </Stack>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                target="_blank"
                href={"tel:+916351979706"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                ml={{lg:3}}
              >
                <FaPhoneAlt size={16} style={{ marginRight: 8 }} /> +91 6351
                9797 06
              </Link>
              <Link
                textDecoration="none"
                _hover={{ color: "text.500" }}
                target="_blank"
                href={"tel:+916351979712"}
                display={"flex"}
                flexDirection={"row"}
                alignItems={"center"}
                ml={{lg:3}}
              >
                <FaPhoneAlt size={16} style={{ marginRight: 8 }} />
                +91 6351 9797 12
              </Link>
              <Stack  ml={{lg:3}}>
              <ListHeader marginBottom={5}>We accept payments via</ListHeader>
              </Stack>
              <Image
              ml={{ base: "-15px",md:"-15px",lg:0 }}
                src={
                  "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/footer/payment method.png hnghngh.png"
                }
              />
              {/* <ListHeader>Download App</ListHeader>
              <Link
                target="blank"
                href="https://play.google.com/store/apps/details?id=com.sose.main&pcampaignid=web_share"
              >
                <Image
                  src={playstore}
                  alt="google-app-sose"
                  style={{ height: "78px", width: "150px" }}
                />
              </Link> */}
            </Stack>
          </SimpleGrid>
        </Container>
        <Box py={4}>
          <Text pt={6} fontSize={"sm"} textAlign={"center"} color={"brand.100"}>
            Copyright © Suryan Organic
          </Text>
        </Box>
      </Container>
      {isLoggedIn && <CartPopUp />}
<WhatsUp/>
    </>
  );
}
