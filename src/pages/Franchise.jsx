import {
  Heading,
  Text,
  Image,
  Container,
  Center,
  Flex,
  Box,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";

export default function Franchise() {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"Franchise"} secondUrl={"/franchise"} />
      </Container>
      <Container maxW={"container.xl"} py={8} px={{ base: 4, lg: 0 }}>
        <Box
          w={"100%"}
          bgImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchisee.jpg"}
          bgSize="cover"
          bgPosition="center"
          display="flex"
          justifyContent="center"
          alignItems="center"
          mt={"-10px"}
          py={20}
          boxShadow={"0px 0px 0px 0px"}
          height={"550px"}
          mb={10}
          // filter="brightness(200%)"
          // style={{ backdropFilter: "blur(10px)" }}
        >
          <Text
            pb={2}
            color={"brand.100"}
            textAlign={"center"}
            fontSize="7xl"
            fontWeight="600"
          >
            SOSE Franchise
          </Text>
        </Box>
        <Center flexDir="column">
          <Heading
            size={"xl"}
            textAlign="center"
            textDecor={"underline"}
            fontWeight={"600"}
            color="#436131"
            textTransform={"uppercase"}
          >
            SOSE Franchise
          </Heading>
          <Image
            src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/Gir Cycle.png"}
            w={{ base: "70vw", lg: "500px" }}
            maxW="500px"
            py={8}
          />
          <Heading size="xs" py={5} textAlign={{ base: "center", lg: "start" }}>
            SOSE Franchisee - Unique opportunity to earn 'Shubh Lakshmi' and
            undertake 'Gau Seva', and contribute to the revival of Bharat's
            ancient 'Gau Sanskriti.
          </Heading>
          <Heading
            size="lg"
            textDecor={"underline"}
            py={5}
            fontWeight={"600"}
            color="#436131"
            textAlign={{ base: "center", lg: "start" }}
          >
            Gau Sanskriti and Gau Adharit Vyapar
          </Heading>
          <Text textAlign={"justify"}>
            We are inspired by the mission of Bansi Gir Gaushala, and are
            progressively working to revive Bharat’s ancient ‘Gau Sanskriti’,
            where Gaumata was at the center of all life's activities, including
            nutrition, healthcare, agriculture, education, religion, etc.
            Nutrition & Healthcare are the foundation of such a civilization,
            and it is with this paradigm that we seek to find solutions to the
            challenges facing humanity. Panchgavya, a pristine gift of Gaumata
            to humanity, has been the secret of greatness of Bharatiya
            agriculture and healthcare since ancient times. Through the Gir
            Franchisee network, we now aim to deliver the same purity and
            authenticity to every household in Bharat.
          </Text>
          <Heading
            size="lg"
            textDecor={"underline"}
            py={10}
            textAlign={{ base: "center", lg: "start" }}
            fontWeight={"600"}
            color="#436131"
          >
            SOSE Franchise Store concept is built on the following sutras:
          </Heading>
          <Container maxW="100%" pb={10} centerContent>
            <Flex
              pb={10}
              direction={{ base: "column", lg: "row" }}
              justify="center"
            >
              <Image
                src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/farmer.jpeg"}
                rounded
                boxSize={{ base: "75%", lg: "275px" }}
                mx="auto"
              ></Image>
              <Box ps={{ base: 0, lg: 10 }}>
                <Heading
                  size="md"
                  py={5}
                  textAlign={{ base: "center", lg: "start" }}
                  fontWeight={"600"}
                  color="#436131"
                >
                  SOSE Organic & Natural - “Samruddh Kissan, Samruddh Bharat”
                </Heading>
                <Text textAlign={"justify"} pb={8} fontSize="sm">
                  Under our ‘Seedha Kissan Se’ initiative we can facilitate
                  supply of authentic organic commodities from our network of
                  trusted farmers. This helps farmers to find a ready market for
                  their products, reducing market uncertainties so that they can
                  focus their energies on growing the best quality foods, while
                  consumers can find authentic organic food products at a
                  reasonable price. Our retail brand 'SOSE' is successfully
                  selling a wide range of organic products through its stores as
                  well as online. Under this motto, we shall supply some of our
                  best selling organic products currently sold by SOSE to Gir
                  Franchisee Stores.
                </Text>
                <Text textAlign={"justify"} fontSize="sm">
                  Over more than last 10 years, we have meticulously developed
                  an efficient organization to develop and market a wide range
                  of Gau Adharit Herbal Supplements, Gau Adharit Beauty Care
                  products, Gau Adharit Krushi and Organic products. With
                  support of this central organization, our retail model can be
                  replicated across the country. Franchisees can expect support
                  along 6 critical operational pillars.
                </Text>
              </Box>
            </Flex>
            <Flex direction={{ base: "column", lg: "row" }} justify="center">
              <Image
                src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/gaumata.jpeg"}
                boxSize={{ base: "75%", lg: "275px" }}
                mx="auto"
              ></Image>
              <Box ps={{ base: 0, lg: 10 }}>
                <Heading
                  size="md"
                  py={3}
                  textAlign={{ base: "center", lg: "start" }}
                  fontWeight={"600"}
                  color="#436131"
                >
                  Gir Gauveda Gau Adharit Aushadhi - “Svasth Nagarik, Svasth
                  Parivar, Svasth Bharat”
                </Heading>
                <Text pb={6} textAlign={"justify"} fontSize="sm">
                  {" "}
                  Gaumata holds tremendous significance in both the Vedas and
                  Ayurveda, and Her products extremely potent particularly when
                  Gaumata has been cared for in accordance with Vedic
                  principles. Gir Gauveda Gau Adharit Ayurvedic supplements have
                  proved to be extremely effective in treating a wide range of
                  diseases including joint pains, hairfall, cardiovascular
                  disorders, infertility, insomnia, etc. Our Beauty Care
                  products are also made from completely natural herbal
                  ingredients. We now wish to offer these products to a wider
                  audience of customers throughout Bharat with Gir Franchisee
                  stores.
                </Text>
              </Box>
            </Flex>
          </Container>
          <Container maxW="100%" py={4}>
            <Flex flexDir="column" gap={4}>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/PureProduct.jpeg"}
                  size="lg"
                  boxSize="65px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontSize="lg"
                    pb={2}
                    fontWeight={"600"}
                    color="#436131"
                  >
                    Pure & Authentic Products
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    Gau Adharit Ayurvedic Aushadhi, Gau Adharit Beauty Products
                    and Pure Organic Products consistent with ancient Vedic
                    parampara.
                  </Text>
                </Box>
              </Box>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/StoreDesign.jpeg"}
                  size="lg"
                  boxSize="60px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontSize="lg"
                    pb={2}
                    fontWeight={"600"}
                    color="#436131"
                  >
                    Store Design
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    In-house team to develop attractive exteriors and interiors
                    for the store, which is well organized and informative for
                    the customers.
                  </Text>
                </Box>
              </Box>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/BusinessSupport.jpeg"}
                  size="lg"
                  boxSize="60px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontWeight={"600"}
                    color="#436131"
                    fontSize="lg"
                    pb={2}
                  >
                    Business Support
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    Dedicated, competent and experienced team of professionals
                    based at our head office and warehouse in Ahmedabad to
                    support Franchisee operations across Bharat.
                  </Text>
                </Box>
              </Box>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/Marketing.jpeg"}
                  size="lg"
                  boxSize="60px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontWeight={"600"}
                    color="#436131"
                    fontSize="lg"
                    pb={2}
                  >
                    Marketing & Social Media
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    In-store' marketing, product display & merchandising,
                    leaflet marketing, database marketing, Facebook - Instagram
                    - Whatsapp marketing.
                  </Text>
                </Box>
              </Box>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/StaffTraining.jpeg"}
                  size="lg"
                  boxSize="60px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontWeight={"600"}
                    color="#436131"
                    fontSize="lg"
                    pb={2}
                  >
                    Staff Training
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    Training on core mission,individual products and daily
                    operations so that the staff is well equipped to answer
                    customer queries and solve their problems.
                  </Text>
                </Box>
              </Box>
              <Box py={2} as={Flex} gap={6} align="center">
                <Image
                  src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/IT.jpeg"}
                  size="lg"
                  boxSize="60px"
                ></Image>
                <Box as="span">
                  <Heading
                    fontWeight={"600"}
                    color="#436131"
                    fontSize="lg"
                    pb={2}
                  >
                    I.T.
                  </Heading>
                  <Text textAlign={"justify"} fontSize="sm">
                    An integrated IT system which is easy to use but simplifies
                    various business complexities, such as sales & inventory,
                    customer information, invoicing, accounting, etc.
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Container>
          <Flex
            gap={8}
            shrink={0}
            pt={4}
            direction={{ base: "column", lg: "row" }}
          >
            <Image
              src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/Store1.jpeg"}
              maxW="350px"
            ></Image>
            <Image
              src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/Store2.jpeg"}
              maxW="350px"
            ></Image>
            <Image
              src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/franchise/Store3.jpeg"}
              maxW="350px"
            ></Image>
          </Flex>
          <Flex py={6} gap={8} direction={{ base: "column", lg: "row" }}>
            <Box>
              <Heading
                size="sm"
                pb={3}
                fontWeight={"600"}
                color="#436131"
                textAlign={{ base: "center", lg: "start" }}
              >
                SOSE 'Sidha Kisan Se' Products Range
              </Heading>
              <Text fontSize="sm">
                • Grains & Dailya • Edible Oils • Pulses & Lentils • Flours •
                Masala (whole & powders) • Traditional Masala Mixes • Super
                Foods • Jaggery • Sugar • Salt • Healthy Seeds • Dry Fruits &
                Nuts • Healthy Sweetener • International Cuisine • Seasoning &
                Dressings • Health Bars • Muesli & Cereals • Healthy Ready Mixes
                • Healthy Beverages • Healthy Snacks - Fried{" "}
              </Text>
            </Box>
            <Box>
              <Heading
                size="sm"
                pb={3}
                fontWeight={"600"}
                color="#436131"
                textAlign={{ base: "center", lg: "start" }}
              >
                Gir Gauveda Product Range
              </Heading>
              <Text textAlign={"justify"} fontSize="sm">
                • Gir Ahinsak Gau Ghee • Gir Aushadhiya Ghee • Gir Herbal
                Supplements • Gir Churna • Gir Gau Ark & Syrups • Gir Healthy
                Foods • Gir Beauty Care • Gir Ayurvedic Oils • Gir Home Care
                Products{" "}
              </Text>
            </Box>
          </Flex>
          <Flex py={4} direction={{ base: "column", lg: "row" }} gap={4}>
            <Box>
              <PhoneIcon
                color={"white"}
                bg={"brand.500"}
                boxSize={8}
                borderRadius="md"
                p={2}
                me={2}
              />
              +91 - 910 481 2222
            </Box>
            <Box>
              <EmailIcon
                color={"white"}
                bg={"brand.500"}
                boxSize={8}
                borderRadius="md"
                p={2}
                ms={{ base: 0, lg: 20 }}
                me={2}
              />
              organic@suryan.in
            </Box>
          </Flex>
        </Center>
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
