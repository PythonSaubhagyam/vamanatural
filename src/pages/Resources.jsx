import {
    Box,
    Flex,
    Heading,
    Text,
    Container,
    useBreakpointValue,
} from "@chakra-ui/react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BreadCrumbCom from "../components/BreadCrumbCom";

const Resources = () => {
    const width = useBreakpointValue({ base: "100%", lg: "540" });
    const height = useBreakpointValue({ base: "100%", lg: "359" });

    return (
        <>
            <Navbar />
            <Container maxW="container.xl">
                <BreadCrumbCom second={"Resource"} secondUrl={"/resources"} />
            </Container>
            <Box
                w={"100%"}
                bgImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/resources.webp"}
                bgSize="cover"
                bgPosition="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={"-10px"}
                py={20}
                height={"550px"}
                mb={10}
            >
                <Text
                    pb={2}
                    color={"brand.100"}
                    textAlign={"center"}
                    // textShadow={"1px 1px 5px lightgreen"}
                    fontSize="7xl"
                    fontWeight="600"
                >
                    Resources
                </Text>
            </Box>

            <Container maxW="container.xl" py={10}>
                <Flex
                    direction="column"
                    style={{ alignItems: "center" }}
                    gap={{ base: 16, lg: 6 }}
                >
                    <Flex
                        gap={{ base: 2, lg: 14 }}
                        direction={{ base: "column", lg: "row" }}
                    >
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/2mAbgiYzQZI"
                            title="ગુજરાતનો ગોપાલ: ગાયો અને ખેડૂતો  માટે છોડી દીધો હીરાનો કરોડોનો ધંધો |  Hu Chhu Gujarati"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <Flex direction="column" pt={10} gap={4}>
                            <Heading
                                size={"md"}
                                fontWeight={"600"}
                                color="#436131"
                                maxW={"500px"}
                            >
                                The inspiring story of an effort to revive Gau
                                Sanskriti
                            </Heading>
                            <Text>Language - Gujarati</Text>
                            <Text maxW={"500px"}>
                                Shri Gopalbhai Sutariya, Founder - Bansi Gir
                                Gaushala talks to VTV Gujarati News & Beyond
                                about Bansi Gir Gaushala's efforts to revive
                                'Gau Sanskriti'. He talks about what Vedic
                                Gopalan entails, its beneficial consequences on
                                Agriculture, Medicine & Education.
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        gap={{ base: 2, lg: 14 }}
                        direction={{ base: "column-reverse", lg: "row" }}
                    >
                        <Flex direction="column" pt={10} gap={4}>
                            <Heading
                                size={"md"}
                                fontWeight={"600"}
                                color="#436131"
                                maxW={"500px"}
                            >
                                Is Gau Sanskriti the answer to problems facing
                                Bharat & Humanity?
                            </Heading>
                            <Text>Language - Gujarati</Text>
                            <Text maxW={"500px"}>
                                An engaging & eye opening talk by Shri Gopalbhai
                                Sutariya, addressing farmers and dairy business
                                owners about ancient Gopalan, and its benefits
                                to farmers and the country at large.
                            </Text>
                        </Flex>
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/942qEzO7eEE"
                            title="Shree Gopalbhai Sutariya  speech in Dairy Business at GPBS2018"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </Flex>
                    <Flex
                        gap={{ base: 2, lg: 14 }}
                        direction={{ base: "column", lg: "row" }}
                    >
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/hrAtHU3bR50"
                            title="गो-कृपा अमृतम बैक्टीरिया - गो-कृषि के लिए मित्र सूक्ष्म कीटाणु - Bansi Gir Gaushala"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <Flex direction="column" pt={10} gap={4}>
                            <Heading
                                fontWeight={"600"}
                                color="#436131"
                                size={"md"}
                                maxW={"500px"}
                            >
                                Revolution in Farming - Go-Krupa Amrutam
                                Agricultural Probiotic
                            </Heading>
                            <Text>Language - Hindi</Text>
                            <Text maxW={"500px"} textAlign={"justify"}>
                                Shri Gopalbhai Sutariya talks about a new
                                revolution in farming - Gir Go-Krupa Amrutam
                                Agricultural Probiotic which has the power to
                                heal and replenish the soil with beneficial
                                friendly bacteria. Developed after many years of
                                research and collaboration with leading
                                Agricultural Acientists and Ayurvedacharya's of
                                Bharat, this culture has over 40 different
                                strains of friendly bacteria and is being
                                offered free to farmers by Bansi Gir Gaushala.
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        gap={{ base: 2, lg: 14 }}
                        direction={{ base: "column-reverse", lg: "row" }}
                    >
                        <Flex direction="column" pt={10} gap={4}>
                            <Heading
                                size={"md"}
                                maxW={"500px"}
                                fontWeight={"600"}
                                color="#436131"
                            >
                                Gauchar - why are grazing fields so important?
                            </Heading>
                            <Text>Language - Hindi</Text>
                            <Text maxW={"500px"} textAlign={"justify"}>
                                Shri Gopalbhai Sutariya talks about a critical
                                aspect of Gopalan - Gauchars or grazing fields
                                for Gaumata. He explains how ancient Bharatiya
                                parampara as recently as British colonial rule
                                placed huge emphasis on Gauchar, and the impact
                                of disappearance of Gauchars on farmers as well
                                as consumer health. He also offers some
                                solutions to the problem of vanishing Gauchars.
                            </Text>
                        </Flex>
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/93A5PlRUub0"
                            title="Gopal Sutariya - गोचर देश की धरोहर - Bansi Gir Gaushala"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                    </Flex>
                    <Flex
                        gap={{ base: 2, lg: 14 }}
                        direction={{ base: "column", lg: "row" }}
                    >
                        <iframe
                            width={width}
                            height={height}
                            src="https://www.youtube.com/embed/llQtpvrQukw"
                            title="गो-कृपा घास - गौचर बनाने में अति लाभकारी - Bansi Gir Gaushala"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                        ></iframe>
                        <Flex direction="column" pt={10} gap={4}>
                            <Heading
                                size={"md"}
                                maxW={"500px"}
                                fontWeight={"600"}
                                color="#436131"
                            >
                                Gauchar - how can we revive & re-establish
                                grazing fields?
                            </Heading>
                            <Text>Language - Hindi</Text>
                            <Text maxW={"500px"} textAlign={"justify"}>
                                Bansi Gir Gaushala has extensively studied over
                                100 varieties of grass, their taste & nutrition
                                value, potential medicinal value and liking of
                                Gaumata. Here, Shri Gopalbhai talks about one
                                such unique variety - Go-Krupa Grass, and its
                                utility in our efforts to revive grazing fields
                                for Gaumata.
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Container>
            <Footer />
        </>
    );
};

export default Resources;
