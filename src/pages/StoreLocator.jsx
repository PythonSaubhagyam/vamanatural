import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
import Loader from "../components/Loader";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaStreetView } from "react-icons/fa";
import BreadCrumbCom from "../components/BreadCrumbCom";
import ScrollToTop from "../components/ScrollToTop";

export default function StoreLocator() {
  const [storeData, setStoreData] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  async function fetchData() {
    const res = await client.get("/stores/");
    setStoreData(res.data.store_section_data);
    setCities(res.data.cities);
    setSelectedCities(res.data.cities);
  }

  function formatTime(timeString) {
    const [hourString, minute] = timeString.split(":");
    const hour = +hourString % 24;
    return (hour % 12 || 12) + ":" + minute + (hour < 12 ? " AM" : " PM");
  }

  return (
    <>
      <Navbar />

      <Container maxW="container.xl" alignContent={"flex-start"}>
        <BreadCrumbCom second={"Store Locator"} secondUrl={"/store-locator"} />
      </Container>

      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/store-locator.webp" />

        <Text
          pb={2}
          color={"brand.400"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "5xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          textShadow={"0px 0px 100px lightgreen"}
          // Optional: Add background to improve text readability
        >
          Store Locator
        </Text>
      </Container>
      <Container maxW={"6xl"} px={0} mb={10}>
        <Flex direction={"column"}>
          {/* <Center maxW={"6xl"}>
                        <Image
                            src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/store locator main banner.jpg"}
                            alt="store locator main banner"
                            maxH="350px"
                            w="100vw"
                            pb="10px"
                            objectFit="cover"
                            filter="auto"
                            contrast={"50%"}
                        />
                        <Heading
                            fontSize={{ base: "xl", lg: "4xl" }}
                            textAlign="center"
                            position="absolute"
                            color="white"
                        >
                            AYURVEDIC, ORGANIC & NATURAL STORES <br />
                            We'd love to welcome you!
                        </Heading>
                    </Center>{" "} */}
          <Center></Center>
          {loading ? (
            <Center w="100%" h="70vh">
              <Loader site={true} />
            </Center>
          ) : (
            <>
              <Container
                maxW={"6xl"}
                // as={Flex}
                direction="column"
                // direction={{ base: "column-reverse", lg: "row" }}
                justify="space-between"
                align="flex-start"
                // gap={{ base: 4, lg: 0 }}
                // centerContent={{ base: true, lg: false }}
              >
                <Box
                  maxW={"6xl"}
                  // w={{ base: "50vw", lg: "20vw" }}
                  justify={{
                    base: "flex-start",
                    lg: "flex-end",
                  }}
                  h="fit-content"
                  position="sticky"
                  bg="white"
                  py={4}
                  top={0}
                  // zIndex={999}
                >
                  <Box border="1px" borderRadius={"md"} maxW={"6xl"} mx="auto">
                    <Button onClick={onToggle} maxW={"6xl"}>
                      <Text me={0.5}>Select Cities</Text>
                      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                    </Button>
                    <Collapse in={isOpen} animateOpacity>
                      <CheckboxGroup
                        defaultValue={selectedCities}
                        onChange={(newCityList) => {
                          setSelectedCities(newCityList);
                        }}
                        w="100%"
                      >
                        <Flex
                          direction="column"
                          gap={{ base: 1, md: 2 }}
                          px={{ base: 4, lg: 24 }}
                          py={4}
                        >
                          {cities.map((citiesname) => (
                            <Checkbox
                              defaultValue={citiesname}
                              key={citiesname}
                              value={citiesname}
                              colorScheme="green"
                            >
                              {citiesname}
                            </Checkbox>
                          ))}
                        </Flex>
                      </CheckboxGroup>
                    </Collapse>
                  </Box>
                </Box>
              </Container>

              {/* <Box w={{ base: "100%", lg: "75vw" }}> */}
              <Box>
                {storeData && selectedCities.length > 0 ? (
                  storeData.map((citySection, index) => (
                    <Box key={citySection.city} my={index === 0 ? 0 : 6}>
                      {selectedCities?.includes(citySection.city) && (
                        <Container maxW="container.xl">
                          <Heading
                            bg={"brand.500"}
                            color={"white"}
                            size="md"
                            borderRadius={8}
                            mb={6}
                            p={4}
                            textTransform={"uppercase"}
                          >
                            {citySection.city}
                          </Heading>
                          <>
                            <Flex
                              direction="column"
                              gap={5}
                              align={{
                                base: "center",
                                lg: "flex-start",
                              }}
                            >
                              {citySection.stores.map((item) => (
                                <Card
                                  key={item.id}
                                  direction={{
                                    base: "column",
                                    lg: "row",
                                  }}
                                  overflow="hidden"
                                  variant="outline"
                                  p={0}
                                  // border={"1px solid"}
                                  boxShadow={
                                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
                                  }
                                  w={{
                                    base: "100%",
                                    lg: "100%",
                                  }}
                                >
                                  <Image
                                    minW={{
                                      sm: "300px",
                                      lg: "360px",
                                    }}
                                    height={"auto"}
                                    src={item.image}
                                  />
                                  <Stack>
                                    <CardBody pb={0} fontSize="sm">
                                      <Text size="md" fontWeight={500}>
                                        {item?.store_name
                                          .split(" ")
                                          .map(
                                            (word) =>
                                              word?.charAt(0).toUpperCase() +
                                              word?.slice(1).toLowerCase()
                                          )
                                          .join(" ")}
                                      </Text>
                                      <Flex gap={2} mt={7} direction="column">
                                        <Box>
                                          <Text
                                            textTransform="capitalize"
                                            fontWeight={"bold"}
                                          >
                                            {item.landmark}
                                          </Text>
                                          <Text fontSize={"sm"}>
                                            {`${
                                              item.address_line_1
                                                ? item.address_line_1 + ", "
                                                : ""
                                            }
                                
                                ${item.landmark ? item.landmark + ", " : ""}
                                `}
                                            <br />
                                            {`${
                                              item.address_line_2
                                                ? item.address_line_2 + ", "
                                                : ""
                                            } 
                                ${item.state_obj ? item.state_obj.name : ""}
                                ${
                                  item.postal_code
                                    ? " - " + item.postal_code
                                    : ""
                                }`}
                                          </Text>
                                        </Box>
                                      </Flex>
                                    </CardBody>
                                    <CardFooter
                                      pt={0}
                                      flexDir="column"
                                      fontSize="sm"
                                      gap={4}
                                    >
                                      {item.work_start_time && (
                                        <Text>
                                          Working:{" "}
                                          {formatTime(item.work_start_time)} to{" "}
                                          {formatTime(item.work_end_time)}
                                        </Text>
                                      )}
                                      <Flex
                                        direction={{
                                          base: "column",
                                          lg: "row",
                                        }}
                                        gap={{
                                          base: 2,
                                          lg: 10,
                                        }}
                                      >
                                        <Flex
                                          align="center"
                                          gap={2}
                                          cursor={"pointer"}
                                          onClick={() =>
                                            window.open(
                                              `tel:${item.mobile_no}`,
                                              "_blank",
                                              "noreferrer"
                                            )
                                          }
                                        >
                                          <Icon
                                            as={BsFillTelephoneFill}
                                            // color="brand.500"
                                          />
                                          {item.mobile_no}
                                        </Flex>
                                        <Flex
                                          align="center"
                                          gap={2}
                                          cursor={"pointer"}
                                          onClick={() =>
                                            window.open(
                                              `mailto:${item.email}`,
                                              "_blank",
                                              "noreferrer"
                                            )
                                          }
                                        >
                                          <Icon
                                            as={AiFillMail}
                                            // color="brand.500"
                                          />
                                          {item.email}
                                        </Flex>
                                        <Flex
                                          align="center"
                                          gap={2}
                                          cursor={"pointer"}
                                          onClick={() =>
                                            window.open(
                                              item.location_url,
                                              "_blank",
                                              "noreferrer"
                                            )
                                          }
                                        >
                                          <FiMapPin />
                                          Google Location
                                        </Flex>
                                        {item.virtual_location_url && (
                                          <Flex
                                            align="center"
                                            gap={2}
                                            cursor={"pointer"}
                                            onClick={() =>
                                              window.open(
                                                item.virtual_location_url,
                                                "_blank",
                                                "noreferrer"
                                              )
                                            }
                                          >
                                            <FaStreetView />
                                            Virtual Location
                                          </Flex>
                                        )}
                                      </Flex>
                                    </CardFooter>
                                  </Stack>
                                </Card>
                              ))}
                            </Flex>
                          </>
                        </Container>
                      )}
                    </Box>
                  ))
                ) : (
                  <Text>No stores found</Text>
                )}
              </Box>
            </>
          )}
          {/* </Container> */}
        </Flex>
      </Container>
      <ScrollToTop/>
      <Footer />
    </>
  );
}
