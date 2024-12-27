 import React,{useState} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import {
  SimpleGrid,
  Text,
  Heading,
  Container,
  Flex,
  Icon,
  Box,
  Image,
  Grid,
  GridItem,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { TbDiscount2 } from "react-icons/tb";
import { GiCancel, GiGears } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import checkLogin from "../utils/checkLogin";
import Router from "../routes/routes";
import ScrollToTop from "../components/ScrollToTop";
import { useLocation } from "react-router-dom";
import LoginModal from "../components/LoginModal";

const testimonials = [
  {
    content:
      "SOSE Elite Membership has been a game-changer for me! The access to exclusive resources and personalized assistance is unparalleled. I've learned so much and have seen tangible improvements in my skills. Definitely worth every penny!",
    title: "Rajesh Patel",
  },
  {
    content:
      "Being a part of SOSE Elite has been a positive experience. The variety of courses and the flexibility in learning make it convenient. Though there's room for improvement in the interface, the content quality overshadows any minor inconveniences.",
    title: "Priya Sharma",
  },
  {
    content:
      "I'm incredibly impressed with the mentorship available in SOSE Elite. The mentors are knowledgeable, responsive, and genuinely interested in helping members succeed. It's like having a personal guide throughout my learning journey.",
    title: "Aruna Reddy",
  },
  {
    content:
      "The resources provided are excellent, but the customer support could use improvement. There were delays in responses to my queries. Otherwise, the content and opportunities available through SOSE Elite have been beneficial.",
    title: "Vikram Singh",
  },
  {
    content:
      "SOSE Elite Membership is worth every penny. The range of subjects covered is extensive, and the community aspect adds immense value. I've not only learned but also networked with like-minded individuals. Highly recommended!",
    title: "Ananya Desai",
  },
];

function SubscriptionPlans() {
  let { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <>
      {IsMobileView !== "true" && <Navbar />}

      {/* <Image src=""></Image> */}

      <Container maxW="container.xl" mb={4} px={0} centerContent>
        <Box
          w={"100%"}
          bgImage="https://cdn.create.vista.com/api/media/medium/381335542/stock-photo-natural-green-leaves-bokeh-sun-light-copy-space-beautiful-green?token="
          bgSize="cover"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={"-10px"}
          py={20}
        >
          <Text
            pb={2}
            color={"brand.100"}
            textAlign={"center"}
            textShadow={"1px 1px 2px lightgreen"}
            fontSize="5xl"
            fontWeight="black"
          >
            SOSE &nbsp;Elite
          </Text>
        </Box>

        <Heading size="xl" align="center" my={9}>
          Benefits
        </Heading>
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
          gap={6}
          mx={"10%"}
          mb={9}
        >
          <GridItem>
            <Flex direction="column" gap={7}>
              <Flex gap={4} align="center">
                <Icon as={TbDiscount2} boxSize={12} color="brand.500" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    BAMS Doctor / Vaid
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    Get a free e-consultation from experts in different
                    specialties, including dieticians and nutritionists.
                  </Text>
                </Box>
              </Flex>
              <Flex gap={4} align="center">
                <Icon as={GiCancel} me={3} boxSize={10} color="brand.500" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Shipping Charges
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    No shipping charges on orders above Rs.250.
                  </Text>
                </Box>
              </Flex>
              <Flex gap={4} align="center">
                <Icon
                  as={TbTruckDelivery}
                  me={3}
                  boxSize={10}
                  color="brand.500"
                />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Delivery Speed
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    Now, you can deliver all your products quicker than before.
                    Same-day or next-day delivery of available products is
                    available in selected cities and will soon expand to all
                    cities. Except product unavailability or extreme weather
                    conditions.
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" gap={6}>
              <Flex gap={4} align="center">
                <Icon
                  as={HiOutlineSpeakerphone}
                  me={3}
                  boxSize={10}
                  color="brand.500"
                />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Early Access New Product Announcement
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    Be among the first ones to shop during our sale days. Get
                    exclusive deals across all categories.
                  </Text>
                </Box>
              </Flex>
              <Flex gap={4} align="center">
                <Icon as={BiSupport} me={3} boxSize={10} color="brand.500" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Premium Customer Support
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    SOSE Elite Plan members enjoy priority order processing. As
                    our premium members, your orders are prioritized by being
                    pushed to the front line for validation.
                  </Text>
                </Box>
              </Flex>
              <Flex gap={7} align="center">
                <Icon as={GiGears} boxSize={10} color="brand.500" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold">
                    Priority Processing
                  </Text>
                  <Text textAlign={"justify"} fontSize={"14px"}>
                    Members would be entitled to our dedicated customer support
                    experts. We are committed to providing you with responsive
                    assistance and resolution. Your queries are our priority.
                    Fastest support to our premium members.
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </GridItem>
        </Grid>

        {checkLogin().isLoggedIn === true ? (
          <>
            {localStorage.getItem("is_sose_elite_user") === "false" ? (
              <Button
                colorScheme="brand"
                size="lg"
                onClick={() => Router.navigate("/subscription-payment")}
              >
                Get SOSE Elite today
              </Button>
            ) : (
              ""
            )}
          </>
        ) : (
          <Button
            colorScheme="brand"
            size="lg"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login to join SOSE Elite
          </Button>
        )}
      </Container>
      <Container maxW={"container.xl"}>
        <Box my={8}>
          <Box bg="bg.500">
            <Heading
              size="lg"
              fontWeight="bold"
              align="center"
              pt={8}
              pb={4}
              // w={{ base: "75%", md: "100%" }}
              mx={{ base: "auto", md: "0" }}
            >
              See what SOSE Elite members have to say
            </Heading>
          </Box>

          <Carousel banners={testimonials} textBanners={true} />
          <Heading size="lg" fontWeight="bold" align="center" my={8}>
            Frequently Asked Questions
          </Heading>

          <Accordion defaultIndex={[0]} pb={10} mx={"9%"}>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    What are the terms & conditions for Free Shipping?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                A member is eligible for the Free Shipping Benefit on Orders
                during his membership period. This cap is introduced keeping in
                mind that most of our regular users don't get impacted; however,
                it will help us curb the misuse of the membership benefit.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    SOSE Elite members will not be charged shipping charges on
                    orders above Rs.250?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                We are introducing this policy change to ensure that we can
                serve our members best while maintaining fair usage within
                reasonable parameters. These changes have been implemented to
                avoid future misuse of the subscription program.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    My SOSE Elite is a one-time membership fee, or do I have to
                    pay anything extra?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                The fee is recurring, which means that we will charge you
                monthly or yearly. When you pay for the plan, you pay for all
                the benefits we offer throughout the membership. There are no
                hidden charges.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    Can I cancel my subscription plan?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                You can cancel the plan until you have not used any SOSE Elite
                benefits, and you will get a full refund. If you use even one of
                the benefits, you are not eligible for cancellation and refund.
                Also the requesting period for the cancellation of the
                subscription is 3 weeks from the subscription date.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    Is the membership fee static?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                The membership plan is offered at an introductory price and is
                liable to change at SOSE Organic's discretion. If the membership
                fee is updated, you don't have to pay anything extra for your
                ongoing plan. However, plan renewals will happen at updated
                prices only.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    What do we mean by free premium consults?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                As a part of our SOSE Elite benefit, you will get a free premium
                consult. Premium consults are a quick way to connect with the
                doctor, and users get a reply within 2-3 hours. As a part of the
                SOSE Elite benefit, you can chat with a specialist or any other
                specialist doctor or general physician for medical assistance.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    Is my order eligible for rapid delivery with this
                    membership?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                Yes, members now enjoy rapid delivery. Members get their orders
                delivered same day or next day at a discounted price. Currently
                available in Ahmedabad, Mumbai, Bangalore, Kolkata, Gandhinagar,
                and Bhavnagar. Expanding to all cities soon.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    Will there be any termination for misuse of Membership?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                Misuse of SOSE Elite membership or benefits may result in
                membership termination. SOSE Organic holds sole rights to
                terminate or withdraw some user benefits in such a case.
                Disqualification of a SOSE Elite member arising out of his/her
                misconduct, fraud, or misuse of benefits may result in
                termination of his/her membership, and he/she will not be
                eligible to become a member again.
              </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
              <h2>
                <AccordionButton bg={"brand.100"} _hover={{ bg: "brand.100" }}>
                  <AccordionIcon color="white" />
                  <Box flex="1" textAlign="left" fontWeight="600" color="white">
                    Is there a maximum limit on the discounts?
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                border="1px"
                borderColor="gray.200"
                borderBottom={"none"}
              >
                Discounts are subject to a maximum capping for all users on the
                SOSE Organic platform. SOSE Elite members get a discount on
                products along with a higher maximum capping for these
                discounts, as compared to non-SOSE Elite users. The maximum
                capping at any given point in time is dependent on the platform
                offer that is live.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      </Container>
      {!checkLogin().isLoggedIn && (
          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
          />
        )}
      <ScrollToTop />
      {IsMobileView !== "true" && <Footer />}
    </>
  );
}

export default SubscriptionPlans;