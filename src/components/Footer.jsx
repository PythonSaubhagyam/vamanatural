import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Image,
  Divider,
  Flex,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { NavLink as RouterLink } from "react-router-dom";
import CartPopUp from "./CartPopUp";
import checkLogin from "../utils/checkLogin";
import WhatsUp from "./WhatsUp";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [isLoggedIn, setIsLoggedIn] = useState(checkLogin().isLoggedIn);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const { isLoggedIn } = checkLogin();
      setIsLoggedIn(isLoggedIn);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/blogs?page=1", label: "Blogs" },
    { to: "/inspire-and-support", label: "Inspire & Support" },
    { to: "/store-locator", label: "Store Locator" },
    { to: "/about-us", label: "About Us" },
  ];

  const policyLinks = [
    { to: "/contact-us", label: "Contact Us" },
    { to: "/faq", label: "FAQ" },
    { to: "/shipping-policy", label: "Shipping Policy" },
    { to: "/terms-and-conditions", label: "Terms & Conditions" },
    { to: "/return-and-refund-policy", label: "Return & Refund Policy" },
    { to: "/privacy-policy", label: "Privacy Policy" },
  ];

  const vaidyaPhones = ["+916351979706", "+916351979712"];

  return (
    <>
      <Box bg="white" my={2} borderTop="1px solid #e2e8f0">
        <hr />
        <Box my={2} className="scrolling-text-container" bg="#7c7a73">
          <Text
            align="center"
            color="white"
            py={1}
            fontSize={{ base: "sm", lg: "md" }}
            className="scrolling-text"
          >
            For deliveries in the USA, UAE, UK, Singapore, Canada and Australia,
            email us at{" "}
            <Link href="mailto:export@suryanorganic.com" isExternal fontWeight="bold" color="brand.600">
              export@suryanorganic.com
            </Link>{" "}
            or WhatsApp us at{" "}
            <Link href="https://wa.me/+916354800089" isExternal fontWeight="bold" color="brand.600">
              +91-6354-8000-89
            </Link>
          </Text>
        </Box>
        <Box w="100%" >
          <Heading color="brand.500" size="lg" align="center" my={5} pb="10px">
            AVAILABLE AT
          </Heading>
        </Box>
        <Image
          src="https://s3organicbucket.s3.amazonaws.com/website/SectionImages/visit_our_stores.jpg"
          w="full"
          alt="Available at"
          transition="opacity 0.7s"
        />
        <Container maxW="6xl" py={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
            {/* Quick Links */}
            <Stack align="flex-start">
              <Text fontWeight="bold" fontSize="lg" mb={2}>Quick Links</Text>
              {quickLinks.map(({ to, label }) => (
                <Link
                  as={RouterLink}
                  to={to}
                  fontSize={{ base: "md", md: "sm" }}
                  position="relative"
                  display="inline-block"
                  px={1}
                  color="gray.700"
                  sx={{
                    _hover: {
                      color: "brand.600",
                    },
                    "::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: "2px",
                      width: "0%",
                      backgroundColor: "currentColor",
                      transition: "width 0.3s ease-in-out",
                    },
                    ":hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {label}
                </Link>



              ))}

            </Stack>

            {/* Policies */}
            <Stack align="flex-start">
              <Text fontWeight="bold" fontSize="lg" mb={2}>Policies</Text>
              {policyLinks.map(({ to, label }) => (
                <Link
                  as={RouterLink}
                  to={to}
                  fontSize={{ base: "md", md: "sm" }}
                  position="relative"
                  display="inline-block"
                  px={1}
                  color="gray.700"
                  sx={{
                    _hover: {
                      color: "brand.600",
                    },
                    "::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0,
                      height: "2px",
                      width: "0%",
                      backgroundColor: "currentColor",
                      transition: "width 0.3s ease-in-out",
                    },
                    ":hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  {label}
                </Link>


              ))}
            </Stack>

            {/* Customer Support */}
            <Stack align="flex-start">
              <Text fontWeight="bold" fontSize="lg" mb={2}>Customer Support</Text>
              <Flex align="center">
                <FaPhoneAlt size={16} style={{ marginRight: 8 }} />
                <Link href="tel:917405095969" isExternal _hover={{ color: "brand.600" }} fontSize="sm">
                  +91 74050 95969
                </Link>
              </Flex>
              <Flex align="center">
                <IoMail size={18} style={{ marginRight: 8 }} />
                <Link href="mailto:care@suryanorganic.com" isExternal _hover={{ color: "brand.600" }} fontSize="sm">
                  care@suryanorganic.com
                </Link>
              </Flex>
            </Stack>

            {/* Vaidya & Payments */}
            <Stack align="flex-start">
              <Text fontWeight="bold" fontSize="lg" mb={2}>Talk to Our Vaidya</Text>
              {vaidyaPhones.map((phone) => (
                <Flex key={phone} align="center">
                  <FaPhoneAlt size={16} style={{ marginRight: 8 }} />
                  <Link
                    href={`tel:${phone}`}
                    isExternal
                    _hover={{ color: "brand.600" }}
                    fontSize="sm"
                  >
                    {phone.replace(/^(\+91)(\d{4})(\d{4})(\d{2})$/, "$1 $2 $3 $4")}
                  </Link>
                </Flex>
              ))}
              <Box mt={4}>
                <Text fontWeight="bold" fontSize="md" mb={2}>We accept payments via</Text>
                <Image
                  ml={{ base: "-15px", md: "-15px", lg: 0 }}
                  src={
                    "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/footer/payment method.png hnghngh.png"
                  }
                />
              </Box>
            </Stack>
          </SimpleGrid>

          <Divider my={6} />

          <Text fontSize="sm" color="gray.600" textAlign="center">
            © {new Date().getFullYear()} Suryan Organic. All rights reserved.
          </Text>
        </Container>
      </Box>

      {isLoggedIn && <CartPopUp />}
      <WhatsUp />
    </>
  );
}
