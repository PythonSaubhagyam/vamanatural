import React, { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Text,
  Heading,
  Icon,
  Grid,
  GridItem,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import {
  TbDiscount2,
  TbTruckDelivery,
} from "react-icons/tb";
import { GiCancel, GiGears } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BiSupport } from "react-icons/bi";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import MetaTags from "../context/MetaTagsContext";
import checkLogin from "../utils/checkLogin";
import Router from "../routes/routes";
import ScrollToTop from "../components/ScrollToTop";
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
const faqData = [
  {
    question: "What are the terms & conditions for Free Shipping?",
    answer:
      "A member is eligible for the Free Shipping Benefit on Orders during his membership period. This cap is introduced keeping in mind that most of our regular users don't get impacted; however, it will help us curb the misuse of the membership benefit.",
  },
  {
    question: "SOSE Elite members will not be charged shipping charges on orders above Rs.250?",
    answer:
      "We are introducing this policy change to ensure that we can serve our members best while maintaining fair usage within reasonable parameters. These changes have been implemented to avoid future misuse of the subscription program.",
  },
  {
    question: "My SOSE Elite is a one-time membership fee, or do I have to pay anything extra?",
    answer:
      "The fee is recurring, which means that we will charge you monthly or yearly. When you pay for the plan, you pay for all the benefits we offer throughout the membership. There are no hidden charges.",
  },
  {
    question: "Can I cancel my subscription plan?",
    answer:
      "You can cancel the plan until you have not used any SOSE Elite benefits, and you will get a full refund. If you use even one of the benefits, you are not eligible for cancellation and refund. Also the requesting period for the cancellation of the subscription is 3 weeks from the subscription date.",
  },
  {
    question: "Is the membership fee static?",
    answer:
      "The membership plan is offered at an introductory price and is liable to change at SOSE Organic's discretion. If the membership fee is updated, you don't have to pay anything extra for your ongoing plan. However, plan renewals will happen at updated prices only.",
  },
  {
    question: "What do we mean by free premium consults?",
    answer:
      "As a part of our SOSE Elite benefit, you will get a free premium consult. Premium consults are a quick way to connect with the doctor, and users get a reply within 2-3 hours. As a part of the SOSE Elite benefit, you can chat with a specialist or any other specialist doctor or general physician for medical assistance.",
  },
  {
    question: "Is my order eligible for rapid delivery with this membership?",
    answer:
      "Yes, members now enjoy rapid delivery. Members get their orders delivered same day or next day at a discounted price. Currently available in Ahmedabad, Mumbai, Bangalore, Kolkata, Gandhinagar, and Bhavnagar. Expanding to all cities soon.",
  },
  {
    question: "Will there be any termination for misuse of Membership?",
    answer:
      "Misuse of SOSE Elite membership or benefits may result in membership termination. SOSE Organic holds sole rights to terminate or withdraw some user benefits in such a case. Disqualification of a SOSE Elite member arising out of his/her misconduct, fraud, or misuse of benefits may result in termination of his/her membership, and he/she will not be eligible to become a member again.",
  },
  {
    question: "What is the duration of the SOSE Elite membership plan?",
    answer:
      "Our membership plan for SOSE Elite members is structured over a period of one month. Please note that we do not offer any discounts associated with this membership.",
  },
];
function SubscriptionPlans() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const isMobileView = searchParams.get("mobile") === "true";
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const pageUrl = "/subscription-plans";
  const isLoggedIn = checkLogin().isLoggedIn;
  const isEliteUser = localStorage.getItem("is_sose_elite_user") === "true";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      {!isMobileView && <Navbar />}

      <Container maxW="container.xl" px={0} centerContent mb={4}>
        <Box
          w="100%"
          bgImage="https://cdn.create.vista.com/api/media/medium/381335542/stock-photo-natural-green-leaves-bokeh-sun-light-copy-space-beautiful-green?token="
          bgSize="cover"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={20}
          mt="-10px"
        >
          <Text
            textAlign="center"
            textShadow="1px 1px 2px lightgreen"
            fontSize="5xl"
            fontWeight="black"
            color="brand.100"
          >
            SOSE Elite
          </Text>
        </Box>

        <Heading size="xl" textAlign="center" my={9}>
          Benefits
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          mx="10%"
          mb={9}
        >
          <GridItem>
            <Flex direction="column" gap={7}>
              <BenefitItem
                icon={TbDiscount2}
                title="BAMS Doctor / Vaid"
                description="Get a free e-consultation from experts in different specialties, including dieticians and nutritionists."
              />
              <BenefitItem
                icon={GiCancel}
                title="Shipping Charges"
                description="No shipping charges on orders above Rs.250."
              />
              <BenefitItem
                icon={TbTruckDelivery}
                title="Delivery Speed"
                description="Now, you can deliver all your products quicker than before. Same-day or next-day delivery of available products is available in selected cities and will soon expand to all cities. Except product unavailability or extreme weather conditions."
              />
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" gap={6}>
              <BenefitItem
                icon={HiOutlineSpeakerphone}
                title="Early Access New Product Announcement"
                description="Be among the first ones to shop during our sale days. Get exclusive deals across all categories."
              />
              <BenefitItem
                icon={BiSupport}
                title="Premium Customer Support"
                description="SOSE Elite Plan members enjoy priority order processing. As our premium members, your orders are prioritized by being pushed to the front line for validation."
              />
              <BenefitItem
                icon={GiGears}
                title="Priority Processing"
                description="Members would be entitled to our dedicated customer support experts. We are committed to providing you with responsive assistance and resolution. Your queries are our priority. Fastest support to our premium members."
              />
            </Flex>
          </GridItem>
        </Grid>

        {isLoggedIn ? (
          !isEliteUser && (
            <Button
              colorScheme="brand"
              size="lg"
              onClick={() => Router.navigate("/subscription-payment")}
            >
              Get SOSE Elite today
            </Button>
          )
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

      <Container maxW="container.xl">
        <Box my={8}>
          <Heading bg="bg.500" size="lg" fontWeight="bold" textAlign="center" pt={8} pb={4}>
            See what SOSE Elite members have to say
          </Heading>

          <Carousel banners={testimonials} textBanners />

          <Heading size="lg" fontWeight="bold" textAlign="center" my={8}>
            Frequently Asked Questions
          </Heading>

          <Accordion allowToggle defaultIndex={[0]} pb={10} mx="9%">
            {faqData.map((faq, index) => (
              <AccordionItem key={index}>
                <h2>
                  <AccordionButton bg="brand.100" _hover={{ bg: "brand.100" }}>
                    <AccordionIcon color="white" />
                    <Box flex="1" textAlign="left" fontWeight="600" color="white">
                      {faq.question}
                    </Box>
                  </AccordionButton>
                </h2>
                <AccordionPanel
                  pb={4}
                  border="1px"
                  borderColor="gray.200"
                  borderBottom="none"
                >
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Container>

      {!isLoggedIn && (
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      )}
      <ScrollToTop />
      {!isMobileView && <Footer />}
    </>
  );
}

function BenefitItem({ icon, title, description }) {
  return (
    <Flex gap={4} align="center">
      <Icon as={icon} boxSize={10} color="brand.500" />
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text fontSize="14px" textAlign="justify">
          {description}
        </Text>
      </Box>
    </Flex>
  );
}

export default SubscriptionPlans;
