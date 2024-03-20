import {
    Container,
    Image,
    Heading,
    Text,
    Flex,
    Box,
    Link,
    useBreakpointValue,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Carousel from "../components/Carousel";
import BreadCrumbCom from "../components/BreadCrumbCom";

export default function OrganicLiving() {
    const banners = [
        {
        
            image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/banner 1.jpg",
            alt_text: "Banner 1",
        },
        {
        
            image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/banner 2.jpg",
            alt_text: "Banner 2",
        },
        {
         
            image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/banner 3.jpg",
            alt_text: "Banner 3",
        },
        {
            image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/banner 4.jpg",
            alt_text: "Banner 4",
        },
        {
           
            image: "https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/banner 5.jpg",
            alt_text: "Banner 5",
        },
    ];

    const width = useBreakpointValue({ base: "100%", lg: "1200" });
    const height = useBreakpointValue({ base: "300", lg: "600" });

    return (
        <>
            <Navbar />

            <Container maxW={"container.xl"} alignContent={"flex-start"}>
                <BreadCrumbCom
                    second={"Organic Living"}
                    secondUrl={"/organic-living"}
                />
            </Container>
            <Container maxW={"container.xl"}>
                {/* <Container maxW={"6xl"}> */}
                {/* {" "} */}
                <Carousel
                    banners={banners}
                    transparentBtn={false}
                ></Carousel>{" "}
                {/* </Container> */}
                <Container maxW={"6xl"} pb={10}>
                    <Image
                        maxW={"6xl"}
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/location & sq yards.jpg"}
                    ></Image>
                    <Heading
                        textAlign={"justify"}
                        size="lg"
                        pt={8}
                        pb={3}
                        maxW={"6xl"}
                        color={"brand.500"}
                    >
                        Bansi Prerna Upvan - Overview
                    </Heading>
                    <Heading
                        textAlign={"justify"}
                        size="sm"
                        py={2}
                        maxW={"6xl"}
                    >
                        “Lakeside Forest Living”
                    </Heading>
                    <Heading
                        textAlign={"justify"}
                        size="sm"
                        py={2}
                        maxW={"6xl"}
                    >
                        “Organic & Ayurvedic Lifestyle”
                    </Heading>
                    <Text textAlign={"justify"} maxW={"6xl"} pb={8}>
                        Bansi Prerna Upvan is a unique project that is close to
                        Ahmedabad, and yet right in the middle of verdant
                        Nature. This project is blessed to sit on a land that
                        has for many years been considered sacred by the locals,
                        and has in the past been nourished by manure bestowed by
                        Gir Gaumatas of Bansi Gir Gaushala which took birth on
                        this land over 15 years ago. The project campus is right
                        next to a beautiful lake with rich, green and serene
                        surroundings.
                    </Text>
                    <Heading
                        textAlign={"justify"}
                        maxW={"6xl"}
                        size="lg"
                        py={2}
                        color={"brand.500"}
                    >
                        Bansi Prerna Upvan - 5 Cornerstones
                    </Heading>
                    <Heading
                        textAlign={"justify"}
                        maxW={"6xl"}
                        size="sm"
                        py={2}
                    >
                        A natural & divine living experience
                    </Heading>
                    <Image
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/five point BPU image.jpg"}
                        w="6xl"
                        mx={"auto"}
                    ></Image>
                    <Heading
                        textAlign={"justify"}
                        maxW={"6xl"}
                        size="md"
                        pt={12}
                        pb={2}
                        color={"brand.500"}
                    >
                        Natural Lake - 1000 Acre
                    </Heading>
                    <Text textAlign={"justify"} maxW={"6xl"}>
                        Mainly inhabited by migratory birds in winter and
                        spring, it is the Finest Wetland Bird Sanctuary in South
                        Ahmedabad, and one of the Largest Lake near Sardar Patel
                        Ring Road.Finest Wetland Bird Sanctuary in South
                        Ahmedabad, and one of the Largest Natural Lake -
                        9,07,000 sq.yd. near Sardar Patel Ring Road.
                    </Text>
                    <Heading
                        textAlign={"justify"}
                        maxW={"6xl"}
                        size="md"
                        pt={10}
                        pb={2}
                        color={"brand.500"}
                    >
                        Wild Forest - 2000 Acre
                    </Heading>
                    <Text maxW={"6xl"} textAlign={"justify"}>
                        The 20.60 Lac sq.yd. The area of Dry Mixed Deciduous
                        Forest is ebulliently green between July and December
                        after the monsoon rains when the lake is full. The land
                        is extremely fertile and boasts of extremely diverse
                        flora and fauna. Dry Mixed Deciduous Forest - 20,60,000
                        sq.yd.near Sardar Patel Ring Road.At any time of the
                        year, it provides a rich wildlife experience, with over
                        100 Species of Birds and 200 Species of Medicinal
                        Plants. These virgin green surroundings are home to
                        Deer, Monkeys, Wild Nilgai, Wild Boar, and many other
                        Wild Animals all living under the canopy of diverse
                        plants and trees. During Winter, many types of migratory
                        birds occupy the Forest. During the Rainy season, there
                        are wetland birds.
                    </Text>
                    <Heading
                        maxW={"6xl"}
                        textAlign={"justify"}
                        size="md"
                        pt={10}
                        pb={2}
                        color={"brand.500"}
                    >
                        Natural Hills - 70 ft height
                    </Heading>
                    <Text maxW={"6xl"} textAlign={"justify"}>
                        Inhabited by a plethora of Wildlife and Plant Life, the
                        uneven sloping terrain has a calm lake and is a
                        beautifully scenic spot to revel in. the area
                        surrounding the project site, the land gradually
                        elevates to a height of about 60-70 feet from the
                        natural ground level into a verdant hilly forest
                        terrain.
                    </Text>
                    <Heading
                        size="md"
                        maxW={"6xl"}
                        textAlign={"justify"}
                        pt={10}
                        pb={2}
                        color={"brand.500"}
                    >
                        Land of Divinity - 'Kalki Avatar'
                    </Heading>
                    <Text maxW={"6xl"} textAlign={"justify"}>
                        Bansi Prerna Upvan is blessed to be close to an ancient
                        and extremely revered place of worship called Satpanth
                        Prernapeeth Temple. Legend suggests that this land,
                        which includes the project site, was once visited by
                        Lord Krishna Himself.
                        <br />
                        The Temple worshippers firmly believe that based on
                        scriptures, ‘Kalki’, the next Avatar of Lord Vishnu will
                        emerge from this Holy Land. Close to the campus is also
                        the Nakaland Mahadev Temple, where the Shiv Linga is
                        said to have been installed by Nakul himself, one of the
                        five Pandavas.
                        <br />
                        The Legends lend a mystic air to this auspicious land.
                        Locals firmly believe that this fertile land is always
                        blessed with sufficient rainfall and has never seen a
                        year of drought. The Developers are sensitive to these
                        beliefs and have pledged to execute the project in a way
                        that is worthy of these legends and helps to preserve.
                    </Text>
                    <Heading
                        textAlign={"justify"}
                        maxW={"6xl"}
                        size="md"
                        pt={10}
                        pb={2}
                        color={"brand.500"}
                    >
                        Bansi Gir Gaumata Tapobhumi - Since 2006
                    </Heading>
                    <Text textAlign={"justify"} maxW={"6xl"}>
                        This sacred land has been graced by the presence of the
                        Divine Gir Gaumata of Bansi Gir Gaushala. Hence the
                        locals often refer to this area as a "Tapobhumi", a
                        place of penance blessed by the Divine Mother of all
                        Creation.
                    </Text>
                </Container>
                <Container maxW={"6xl"} py={8}>
                    <Image
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/gaushala.jpg"}
                    ></Image>
                    <Flex
                        p={{ base: 4, lg: 8 }}
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: 4, lg: 8 }}
                    >
                        <Image
                            src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/krishna.jpg"}
                            w={{ base: "100%", lg: "650px" }}
                        />
                        <Box maxW={"6xl"} textAlign={"justify"}>
                            <Heading size="lg" pb={4} color={"brand.500"}>
                                Inspired by Divinity
                            </Heading>
                            <Text textAlign={"justify"}>
                                Bansi Prerna Upvan is blessed to be close to an
                                ancient and extremely revered place of worship
                                called Satpanth Prernapeeth Temple. Legend
                                suggests that this land, which includes the
                                project site, was once visited by Lord Krishna
                                Himself.
                                <br />
                                <br />
                                The Temple worshippers firmly believe that based
                                on scriptures, ‘Kalki’, the next Avatar of Lord
                                Vishnu will emerge from this Holy Land. Close to
                                the campus is also the Nakaland Mahadev Temple,
                                where the Shiv Linga is said to have been
                                installed by Nakul himself, once of the five
                                Pandavas.
                                <br />
                                <br />
                                The Legends lend a mystic air to this auspicious
                                land. Locals firmly believe that this fertile
                                land is always blessed with sufficient rainfall
                                and has never seen a year of drought. The
                                Developers are sensitive to these beliefs, and
                                have pledged to execute the project in a way
                                that is worthy of these legends, and helps to
                                preserve and protect the pristine atmosphere.
                            </Text>
                        </Box>
                    </Flex>
                    <Image
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/nature.jpg"}
                    ></Image>
                </Container>
                <Container maxW={"6xl"} pb={4}>
                    <Heading
                        textAlign={"justify"}
                        size="lg"
                        pb={4}
                        color={"brand.500"}
                    >
                        Close to Mother Nature and Affordable
                    </Heading>
                    <Text textAlign={"justify"}>
                        We are a family of entrepreneurs that have executed
                        world class real estate development projects, including
                        the ultra-luxury Suryan Logeco Homes in Ahmedabad and
                        the high end commercial property Suryan Monolith in
                        Gandhinagar. We are inspired by Bansi Gir Gaushala, and
                        its mission to revive Bharat's Ancient Gau Sanskriti. We
                        believe in giving our clients something that is uniquely
                        differentiated, and nothing but the very best.
                        <br />
                        <br />
                        With our unique domain expertise spread across Real
                        Estate Development as well as Vedic Gopalan & Krishi, we
                        envision a living space that is a blend of ancient
                        purity and modern convenience. This project sincerely
                        hopes to live up to its name, and inspire people to come
                        closer to Mother Nature with its rich experience of
                        Divinity. With our mission to revive Bharat's ancient
                        Gau Sanskriti, this project is placed in a segment that
                        is affordable to the maximum number of urban families.
                        <br />
                        <br />
                        Bansi Prerna Upvan is located 6.6 km from S.P.Ring Road,
                        20 km from Prahlad Nagar, and 18 km from Paldi &
                        Maninagar. This project is envisaged as a plotting
                        scheme for those who wish to invest in land, with an
                        option to construct living spaces that will be
                        facilitated by the developers. The project will boast of
                        a high end Club House with expansive amenities as well
                        as beautifully landscaped gardens that will derive the
                        best from our deep experience in Herbal & Organic
                        farming.
                        <br />
                        <br />
                        Bansi Prerna Upvan is sure to redefine Nature centric
                        real estate development in Gujarat. Bansi Prerna Upvan
                        is planned such that it is reasonably accessible to all
                        who aspire to come and closely live with Mother Nature.
                        We firmly believe that being close to Her should be
                        everybody's right, and it need neither be beyond a
                        reasonable distance nor prohibitively expensive.
                        <br />
                        <br />
                    </Text>
                </Container>
                <Container maxW={"6xl"} pb={8}>
                    <Heading size="lg" pb={4} color={"brand.500"}>
                        Lakeside Forest Living
                    </Heading>
                    <Image
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/lakeside forest living.jpg"}
                    ></Image>
                    <Box align="center" maxW={"6xl"} mx={"auto"}>
                        <Text textAlign={"justify"} fontSize="md" py={6}>
                            Bansi Prerna Upvan sits right in the middle of a
                            Lush Green Forest and is adjacent to an expansive
                            Natural Lake. Mainly inhabited by migratory birds in
                            winter and spring, it is the Finest Wetland Bird
                            Sanctuary in South Ahmedabad, and one of the Largest
                            Lake near Sardar Patel Ring Road.
                        </Text>
                        <Text fontSize="xl" py={2}>
                            Finest Wetland Bird Sanctuary in South Ahmedabad,
                            and one of the Largest Natural Lake
                        </Text>
                        <Text fontSize="2xl" py={2} fontWeight={700}>
                            1000 Acre
                        </Text>
                        <Text fontSize="md" py={2}>
                            near Sardar Patel Ring Road
                        </Text>
                        <Text py={6} textAlign={"justify"}>
                            Inhabited by a plethora of Wildlife and Plant Life,
                            the uneven sloping terrain has a calm lake and is a
                            beautifully scenic spot to revel in. The 20.60 Lac
                            sq.yd. Area of Dry Mixed Deciduous Forest is
                            ebulliently green between July and December after
                            the monsoon rains when the lake is full. The land is
                            extremely fertile, and boasts of extremely diverse
                            flora and fauna.
                        </Text>
                        <Text fontSize="xl" py={2}>
                            Dry Mixed Deciduous Forest
                        </Text>
                        <Text fontSize="2xl" py={2} fontWeight={700}>
                            1000 Acre
                        </Text>
                        <Text fontSize="md" py={2}>
                            near Sardar Patel Ring Road
                        </Text>
                        <Text fontSize="md" textAlign={"justify"} py={6}>
                            At any time of the year it provides a rich wildlife
                            experience, with over 100 Species of Birds and 200
                            Species of Medicinal Plants. These virgin green
                            surroundings are home to Deer, Monkeys, Wild Nilgai,
                            Wild Boar and many other Wild Animals all living
                            under the canopy of diverse plants and trees. During
                            Winter, many types of migratory birds occupy the
                            Forest. During the Rainy season, there are wetland
                            birds.
                        </Text>
                    </Box>
                    <Heading size="lg" py={4} color={"brand.500"}>
                        Bansi Prerna Upvan - Aerial View
                    </Heading>
                    <Image
                        src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/aerial view.jpg"}
                    ></Image>
                    <Link href="https://www.suryan.in/bansi-upvan">
                        <Image
                            src={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/button more information.jpg"}
                            mx="auto"
                            w="550px"
                            py={10}
                        ></Image>
                    </Link>
                </Container>
                <Container maxW={"6xl"} pb={10}>
                    <Heading size="lg" pb={4} color={"brand.900"}>
                        Site Address
                    </Heading>
                    <Text pb={6}>
                        Bansi Prerna Upvan, Pirana Vasai Road, Ahmedabad,
                        Gujarat - 382425.
                    </Text>
                    <iframe
                        title="Site Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.4756824951965!2d72.5355486!3d22.85888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8da298db242f%3A0xa4fe8341fc1fee7!2sBansi%20Prerna%20Upvan!5e0!3m2!1sen!2sin!4v1668779878099!5m2!1sen!2sin"
                        width={width}
                        height={height}
                        style={{ border: 0 }}
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <Text fontSize="xl" pt={10}>
                        Contact us : +91 93138 02226 / 27 / 28
                    </Text>
                </Container>
            </Container>

            <Footer />
        </>
    );
}
