import { useEffect, useState } from "react";
import {
  Container,
  Flex,
  Image,
  Text,
  Box,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Center,
  Icon,
  Checkbox,
  CheckboxGroup,
  Button,
  Collapse,
  useDisclosure,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AiFillMail } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaStreetView } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";
import MetaTags from "../context/MetaTagsContext";

export default function StoreLocator() {
  const [storeData, setStoreData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onToggle } = useDisclosure();

  const pageUrl = "/store-locator";

  useEffect(() => {
    (async () => {
      const res = await client.get("/stores/");
      setStoreData(res.data.store_section_data);
      setCities(res.data.cities);
      setSelectedCities(res.data.cities);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);

  const formatTime = (timeStr) => {
    const [hourStr, minute] = timeStr.split(":");
    const hour = parseInt(hourStr, 10);
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  const renderStoreCard = (item) => (
    <Card
      key={item.id}
      direction={{ base: "column", lg: "row" }}
      overflow="hidden"
      variant="outline"
      p={0}
      boxShadow="md"
      w="100%"
    >
      <Image
        minW={{ sm: "300px", lg: "360px" }}
        height="auto"
        src={item.image}
        fallbackSrc="https://via.placeholder.com/360x240?text=No+Image"
        alt={item.store_name}
      />
      <Stack>
        <CardBody pb={0} fontSize="sm">
          <Text fontWeight="500" fontSize="md">
            {item.store_name
              .split(" ")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
              .join(" ")}
          </Text>
          <Box mt={5}>
            <Text fontWeight="bold" textTransform="capitalize">
              {item.landmark}
            </Text>
            <Text fontSize="sm">
              {[item.address_line_1, item.landmark]
                .filter(Boolean)
                .join(", ")}
              <br />
              {[item.address_line_2, item?.state_obj?.name]
                .filter(Boolean)
                .join(", ")}
              {item.postal_code && ` - ${item.postal_code}`}
            </Text>
          </Box>
        </CardBody>

        <CardFooter pt={0} flexDir="column" fontSize="sm" gap={4}>
          {item.work_start_time && (
            <Text>
              Working: {formatTime(item.work_start_time)} to{" "}
              {formatTime(item.work_end_time)}
            </Text>
          )}
          <Flex
            direction={{ base: "column", lg: "row" }}
            gap={{ base: 2, lg: 10 }}
            flexWrap="wrap"
          >
            <ContactIcon
              icon={BsFillTelephoneFill}
              label={item.mobile_no}
              link={`tel:${item.mobile_no}`}
            />
            <ContactIcon
              icon={AiFillMail}
              label={item.email}
              link={`mailto:${item.email}`}
            />
            <ContactIcon
              icon={FiMapPin}
              label="Google Location"
              link={item.location_url}
            />
            {item.virtual_location_url && (
              <ContactIcon
                icon={FaStreetView}
                label="Virtual Location"
                link={item.virtual_location_url}
              />
            )}
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );

  const ContactIcon = ({ icon, label, link }) => (
    <Flex
      align="center"
      gap={2}
      cursor="pointer"
      onClick={() => window.open(link, "_blank", "noreferrer")}
    >
      <Icon as={icon} />
      <Text>{label}</Text>
    </Flex>
  );

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />

      <Container maxW="container.xl">
        <BreadCrumbCom second="Store Locator" secondUrl={pageUrl} />
      </Container>

      {/* Banner */}
      <Container maxW="container.xl" py={1} px={0} position="relative">
        <Image
          src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/store-locator.webp"
          width="100%"
          alt="Store Locator"
        />
        <Text
          color="brand.400"
          textAlign="center"
          fontSize={{ lg: "7xl", md: "5xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          textShadow="0px 0px 100px lightgreen"
        >
          Store Locator
        </Text>
      </Container>

      <Container maxW="6xl" mb={10}>
        {loading ? (
          <Center h="70vh">
            <Loader site={true} />
          </Center>
        ) : (
          <>
            {/* Filter */}
            <Box bg="white" py={4} position="sticky" top="12%" zIndex={99}>
              <Box border="1px" borderRadius="md" maxW="6xl" mx="auto">
                <Button onClick={onToggle} w="100%">
                  <Text me={2}>Select Cities</Text>
                  {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                </Button>
                <Collapse in={isOpen} animateOpacity>
                  <CheckboxGroup
                    defaultValue={selectedCities}
                    onChange={setSelectedCities}
                    w="100%"
                  >
                    <Flex
                      direction="column"
                      gap={2}
                      px={{ base: 4, lg: 24 }}
                      py={4}
                    >
                      {cities.map((city) => (
                        <Checkbox key={city} value={city} colorScheme="green">
                          {city}
                        </Checkbox>
                      ))}
                    </Flex>
                  </CheckboxGroup>
                </Collapse>
              </Box>
            </Box>

            {/* Stores by City */}
            <Box mt={8}>
              {storeData && selectedCities.length > 0 ? (
                storeData
                  .filter((sec) => selectedCities.includes(sec.city))
                  .map((sec, idx) => (
                    <Box key={sec.city} my={idx === 0 ? 0 : 10}>
                      <Container maxW="container.xl">
                        <Heading
                          bg="brand.500"
                          color="white"
                          size="md"
                          borderRadius={8}
                          mb={6}
                          p={4}
                          textTransform="uppercase"
                        >
                          {sec.city}
                        </Heading>
                        <Flex direction="column" gap={6}>
                          {sec.stores.map((store) => renderStoreCard(store))}
                        </Flex>
                      </Container>
                    </Box>
                  ))
              ) : (
                <Text>No stores found</Text>
              )}
            </Box>
          </>
        )}
      </Container>

      <ScrollToTop />
      <Footer />
    </>
  );
}
