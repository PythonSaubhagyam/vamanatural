import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import {
    Container,
    Heading,
    Text,
    Flex,
    UnorderedList,
    ListItem,
    Accordion,
    AccordionItem,
    AccordionButton,
    Box,
    AccordionIcon,
    AccordionPanel,
    useBreakpointValue,
} from "@chakra-ui/react";
import ScrollToTop from "../components/ScrollToTop";

export default function Testimonials() {
    const width = useBreakpointValue({ base: "100%", lg: "890" });
    const height = useBreakpointValue({ base: "300", lg: "500" });

    return (
        <>
            <Navbar />
            <Container maxW="container.xl">
                <BreadCrumbCom
                    second={"Testimonials"}
                    secondUrl={"/testimonials"}
                />
            </Container>
            <Box
                w={"100%"}
                bgImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/testimonial.webp"}
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
            >
                <Text
                    pb={2}
                    color={"brand.100"}
                    textAlign={"center"}
                    fontSize="7xl"
                    fontWeight="600"
                >
                    Testimonials
                </Text>
            </Box>
            <Container maxW="6xl">
                <Heading
                    textAlign={"center"}
                    fontWeight={"600"}
                    color="#436131"
                    pb={8}
                >
                    GIR Gauveda - Testimonials
                </Heading>
                <Text pb={4} textAlign={"justify"}>
                    Gaumata has been assigned tremendous significance in the
                    Vedas and Ayurveda. Vedas state that the 'gavyas' (milk,
                    curd, ghee, 'gomutra' and 'gomay') of 'santusht' (satisfied)
                    and 'prasann' (happy) Gaumatas are 'kalyankari' (auspicious)
                    and 'mangalkari' (beneficial). As stated in Ayurvedic texts,
                    such 'gavyas' are highly beneficial to the body, and they
                    help to multiply the healing qualities of medicinal herbs
                    when processed appropriately.
                </Text>
                <Text pb={4} textAlign={"justify"}>
                    Bansi Gir Gauveda is an outcome of the holy foundation of
                    service provided by Bansi Gir Gaushala. Our products are
                    made using highest quality herbs, under the supervision of
                    leading Ayurvedacharyas of Bharat, using our proprietary
                    processes which are consistent with the best traditions of
                    Gau Adharit Ayurveda.
                </Text>
                <Text pb={4} textAlign={"justify"}>
                    Our supplements have helped to bring lasting health to
                    thousands of people over the last few years. Given below are
                    brief notes from experiences shared by some of these people.
                    We sincerely hope these testimonials will inspire others to
                    pursue Gau Adharit Ayurved for their healthcare needs.
                </Text>
                <Heading
                    textAlign={"center"}
                    fontWeight={"600"}
                    color="#436131"
                    size="lg"
                    py={8}
                >
                    Testimonials by Products
                </Heading>
                <Flex gap={10} wrap="wrap" justify={"center"} pb={10}>
                    <iframe
                        title="YouTube video player"
                        src="https://www.youtube-nocookie.com/embed/videoseries?list=PL5bibhgUYQNU2AwLsPlYzlHgKn7mA-BzF"
                        width={width}
                        height={height}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </Flex>
                <Heading
                    fontWeight={"600"}
                    color="#436131"
                    textAlign={"center"}
                    size="lg"
                    py={8}
                >
                    Testimonials by Disease
                </Heading>
                <Accordion defaultIndex={[0]} allowMultiple pb={10}>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Cardiac, Blood Pressure & Obesity
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem textAlign={"justify"}>
                                    Reduction in weight by 1.5 Kg within a week,
                                    sharp improvement in overall energy.{" "}
                                    <b>Maulik Bhuptani (Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Significant relief in high blood pressure
                                    symptoms after starting Gauveda medicines.
                                    <b> Rajni Purohit (Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Suffered from serious left ventricle
                                    dysfunction and injection projection, was
                                    admitted to ICU and adviced 3 months rest
                                    thereafter. Started Gauveda medicines Arjun
                                    Ghrit, Dhavalamrut, Arjun Chai and Phalamrut
                                    with daily Pranayam. Experience significant
                                    relief and improvement in 2D echo report.{" "}
                                    <b>Akash Dave(Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Suffering from various ailments including
                                    obesity, depression, sleeplessness, joint
                                    pains, etc since a long time. Tried many
                                    medicines but there was no change in
                                    condition. After starting Gauveda medicines,
                                    in just 1 month patient feels her entire
                                    situation changed, and experienced
                                    significant relief in all symptoms.
                                    <b> Manjulaben Makwana (Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Suffering from sleeplessness, muscle
                                    stretches, anxiety, high BP and heart
                                    related problems. After a few months of
                                    taking Gauveda medications, patient gets
                                    good sleep, stretch in muscles has ceased,
                                    reduction in anxiety, and BP has reduced to
                                    130/80. <b>Yogesh Parkhi (Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Significant reduction in weight after
                                    starting Gauveda medicines.{" "}
                                    <b>Urvish Jaiswal</b> (Ahmedabad)
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Patient was suffering from high BP, stress,
                                    sleeplessness, body ache and cholesterol.
                                    After 3 months of taking Gauveda medicines
                                    patient has experienced significant relief,
                                    better sleep, lower stress levels, etc. On
                                    one occassion, patient also experienced
                                    symptomatic relief from cough using Gir Ayur
                                    Rub. <b>Akhilesh Mehta</b> (Ahmedabad)
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Obesity and cholesterol - treated with Arjun
                                    Ghrit, Akar capsule, Godhatri Ghrit and
                                    Lasamrut capsules - significant reduction in
                                    weight, bad cholesterol levels have gone
                                    down & good cholesterol level has gone up.
                                    Also found relief from sinus & high mucus
                                    issues with Gir Ahinsak Nasya.{" "}
                                    <b>Ravi Kumar (Ahmedabad)</b>
                                </ListItem>
                                <ListItem textAlign={"justify"}>
                                    Sharp reduction & normalization in fasting
                                    plasma glucose, HbA1C, post-prandial plasma
                                    glucose, cholesterol and triglyceride levels
                                    within 2.5 months of being treated with
                                    Gauveda medicines.{" "}
                                    <b>Prashant Parikh (Ahmedabad)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Digestion
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    Treated for gas, acidity and pain in hands &
                                    legs since last few weeks. Seen significant
                                    relief with Sunthamrut capsule,
                                    Drakshavaleh, Kabjamrut Churna and Asthi
                                    Churna.
                                    <b> Bharatiben (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from acidity since long time,
                                    tried various medicines without much relief.
                                    Started Gauveda Sunthamrut with Mishri along
                                    with certain lifestyle changes. Patient sees
                                    complete relief in acidity & gas symptoms.{" "}
                                    <b>Neeraj Tanna (Rajkot)</b>
                                </ListItem>
                                <ListItem>
                                    Significant relief in constipation, acidty
                                    and bloating symptoms with Sunthamrut
                                    capsules with Mishri.{" "}
                                    <b>Bipinbhai Mody (Mumbai)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from pain in stomach since a long
                                    time, experienced significant relief with
                                    Gauveda medicines Sunthamrut and Hadamrut.{" "}
                                    <b>Alpesh Kachhad (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Paralysis attack since 3 years. After taking
                                    Gauveda medicines, patient experiences
                                    improved immunity and complete relief from
                                    digestive problems.
                                    <b> Kiranbhai Morzaria (Rajkot)</b>
                                </ListItem>
                                <ListItem>
                                    Got relief from severe constipation with
                                    Gauveda medicines.
                                    <b> Ronak Jaiswal (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from Piles and Constipation.
                                    Almost complete relief from symptoms after
                                    taking Hadamrut capsules and Kabjamrut
                                    Churna.<b> Aartikumari Maharaul</b>
                                </ListItem>
                                <ListItem>
                                    Gastric trouble and constipation - almost
                                    complete relief from symptoms after taking
                                    Hadamrut, Sunthamrut, Godhatri Ghrit and
                                    Nasya.<b> Raja Chawat</b>
                                </ListItem>
                                <ListItem>
                                    Recurring abdominal pain after undergoing
                                    gall bladder operation, along with Charlie
                                    Horse symptoms (muscle spasms). Complete
                                    relief in symptoms after taking Asthi Ghrit,
                                    Asthi Powder, Mahatriphala Ghrit and
                                    Hadamrut.
                                    <b> Dipesh H Shah (USA)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Endocrinal
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    Taking treatment since last year, see 65%
                                    relief in symptoms of gas, acidity and
                                    diabetes. <b>Anshuman Tyagi (Delhi) </b>{" "}
                                </ListItem>
                                <ListItem>
                                    Treatment for hormonal problems, Phala
                                    Ghrit, Kabjamrut, Askamrut. 85% Improvement
                                    in symptoms.
                                    <b> Falak Roghelia (Ahmedabad) </b>
                                </ListItem>
                                <ListItem>
                                    Treated for thyroid problem with various
                                    Gaushala medicines. See 100% improvement in
                                    hand and throat problem.{" "}
                                    <b>Vinodbhai Kakaria (Jamnagar) </b>
                                </ListItem>
                                <ListItem>
                                    Treated for hormonal irregularities, saw
                                    complete recovery.{" "}
                                    <b>Jagrutiben(Ahmedabad) </b>
                                </ListItem>
                                <ListItem>
                                    Physical weakness, hormonal irregularity &
                                    pain, dullness, dark circles around eyes,
                                    lack of sleep, underweight and digestive
                                    issues. Experienced relief from all symptoms
                                    after starting Gauveda medicines. Patient
                                    sleeps well, feels energetic, digestion is
                                    better, there is a shine on her face.
                                    Physical energy has improved and she has
                                    gained weight. <b>Mrs Patel (Shirpur) </b>
                                </ListItem>
                                <ListItem>
                                    Suffering from cardiac, thyroid & blood
                                    pressure. Within 2 months of starting Arjuna
                                    Ghrit, Dhavalamrut, Sunthamrut, 21
                                    Aushadhiya Ark, Nasya, patient is
                                    experiencing significant relief in symptoms
                                    and her reports also came in normal.
                                    <b> Vidyaben Kodiya (Himmatnagar) </b>
                                </ListItem>
                                <ListItem>
                                    Lower stomachache, performed CT scan but
                                    problem could not be diagnosed. After
                                    Ayurvedic diagnosis, took Gauveda medicine
                                    (Shilajit capsule) and within 1 month saw
                                    complete relief in pain.
                                    <b> Sonalben Rathod (Ahmedabad) </b>
                                </ListItem>
                                <ListItem>
                                    Diabetes under control since 1 year with
                                    Gauveda medicines.
                                    <b> Bhavnaben Modi (Mumbai) </b>
                                </ListItem>
                                <ListItem>
                                    Menstrual cycles became regular after taking
                                    Askamrut capsules.{" "}
                                    <b>Shlokaben Joshi (Ahmedabad) </b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    General
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    Using Gir Ahinsak Gau Ghee for last 5 years,
                                    1 spoon before bed. Results - Enhanced
                                    Health, Better Sleep, Improved Throat.
                                    <b> Nilkanthbhai (Surat)</b>
                                </ListItem>
                                <ListItem>
                                    Using Gir Nasya, and see improvement in
                                    general health & well-being.{" "}
                                    <b>Vijay Kotak (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Reduction in problems associated with
                                    throat, legs and stomach. No relief in back
                                    pain.
                                    <b>
                                        {" "}
                                        Pintuben Pankajbhai Patel (Ahmedabad)
                                    </b>
                                </ListItem>
                                <ListItem>
                                    Side effects of anti-biotic medication for
                                    flue - gastritis, hair loss, sleep
                                    disturbance, etc., which did not respond to
                                    allopathic supplements. Complete recovery
                                    within 3 months, with Giloy Gaumutra
                                    capsules, Asthi Ghrit, Nasya and other
                                    capsules.<b> Kajal Radadiya (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Diagnosed with lung cancer, suffering from
                                    tiredness and leg & back pain. Saw 25%
                                    improvement in fatigue and pain symptoms
                                    within 1 month of taking Gauveda medicines.{" "}
                                    <b>Devshibhai Ahir(Jamnagar)</b>
                                </ListItem>
                                <ListItem>
                                    Found relief in Headache, joint pains,
                                    digestive issues and skin allergies by using
                                    Sunthamrut, Kabjamrut, Nasya and other
                                    Gauveda medicines.
                                    <b> K D Parmar (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Vision improved at the age of 85 years after
                                    starting Gir Ahinsak Nasya.{" "}
                                    <b>Hasmukhbhai Patel (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Using Mahatriphala Ghrit since 1 year,
                                    experienced improvement in vision.
                                    <b> Manibhai Patel</b>
                                </ListItem>
                                <ListItem>
                                    Using Gir Go Vita Powder since 1 year,
                                    immunity level has improved.{" "}
                                    <b> Niyatiben Patel (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Complete relief in allergy symptoms with use
                                    of Nishamrut capsules.<b> Ami Masolia</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Neurological
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    Suffering from a neurological disease,
                                    experiencing 50% relief in symptoms, with
                                    lower stress & better sleep even after
                                    stopping allopathic medicines. Taking Asthi
                                    Churna, Nasya, 21 Aushadhiya Ark and
                                    Shilajit.{" "}
                                    <b>Jashwantbhai Prajapati (Mehsana)</b>
                                </ListItem>
                                <ListItem>
                                    Diagnosed with heavy migraine, complete
                                    relief with use of Gayatri Ghrit and Gir
                                    Ahinsak Nasya.
                                    <b> Capt Vishwendra Singh Rajawat</b>
                                </ListItem>
                                <ListItem>
                                    Epilepsy patient, got affected by vertigo
                                    after being injured during an epileptic
                                    attack. Started Gir Ahinsak Nasya, and found
                                    much relief in symptoms of vertigo. Patient
                                    also feels Nasya has helped her epilepsy
                                    symptoms also.
                                    <b> Bhargavi N Bhat(Vadodara)</b>
                                </ListItem>
                                <ListItem>
                                    Patient diagnosed as a possible case of age
                                    related neurological disorder Myosthania
                                    Gravis, as she had difficulty keeping her
                                    eyes open in the evening and difficulty
                                    speaking. Saw 90% reduction in symptoms
                                    within a few days of using Gir Ahinsak Nasya
                                    (morning & night) and is completely normal
                                    after a few months.{" "}
                                    <b> Lataben Pandya(Vadodara)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Orthopedic
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    70 years old taking Asthigir Ghrit, Asthi
                                    Churna and Nasya. I find that results are
                                    good and I have better health as a result.{" "}
                                    <b>Aruna Roghelia (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Started treatment for sciatica & diabetes on
                                    18th Mar 2020, there is 60% reduction in
                                    sciatica pain.{" "}
                                    <b>Nishith Shah(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Started treatment of Aunt on 2nd February
                                    for joint pains - Asthigir Ghrit and Asthi
                                    Churna. Seen significant relief.
                                    <b> Kajalben(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from joint pains, treated since
                                    7th March 2020, with Asthigir Ghrit and
                                    Asthi Churna, see 70% relief in last 1
                                    month. <b>Kalpana Patel(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Started Mother's treatment few weeks back
                                    for joint & back pain. Treated with Asthigir
                                    Ghrit, Asthi Churna, Kabjamrut capsule,
                                    Sunthamrut capsule and Gir Nasya. See
                                    significant relief in join & back pains.{" "}
                                    <b>Ritaben Kanjaria(Botad)</b>
                                </ListItem>
                                <ListItem>
                                    Significant relief in back pain with
                                    Asthigir Ghrit and Asthi Churna.{" "}
                                    <b>Pragya Katiyar(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from gas, acidity and joint pains
                                    since long time and no treatment seemed to
                                    be working. After treated with Sunthamrut,
                                    Hadamrut, Asthi Churna, Nasya, patient has
                                    experienced complete relief.{" "}
                                    <b>Ansuyaben Parmar(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Severe backache (L3, L4, L5) since 13 years,
                                    seen most of the prominent orthopedic
                                    doctors in Rajkot & Ahmedabad, relief was
                                    only until she took the allopathic
                                    medicines. Visited Gaushala in Feb'20 and by
                                    Apr'20 patient saw 60% relief in symptoms,
                                    with greater energy and reduction in stress
                                    levels also. <b>Seemaben Patel(Rajkot)</b>
                                </ListItem>
                                <ListItem>
                                    Joint pains due to damage in cartilage, was
                                    adviced surgery. After a month of taking
                                    Asthi Ghrit and Asthi Churna, patient is
                                    experience significant relief in pain
                                    symptoms and is now able to do her daily
                                    work with less difficulty.
                                    <b> Surekhaben(Vijaywada)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from weakness and pain in legs,
                                    got relief within 1 month of starting
                                    Gauveda medicines.{" "}
                                    <b>Kapil Ratnakar(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Found significant relief in long standing
                                    old age knee pain symptoms, withing 2 months
                                    of taking Asthi Ghrit and Asthi Churna.
                                    Kamlaben <b>Govindbhai Bhatia(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Backache since 10 years, MRI indicated
                                    increased space between final vertibrae,
                                    medical advice was to take lesser stress,
                                    reduce traveling and massage with ointment
                                    every night. 85% relief within 2 months of
                                    treatment with Asthi Ghrit and Kabjamrut
                                    capsules, there is no discomfort even with
                                    daily traveling of over 40 km and no need
                                    for massage at night.{" "}
                                    <b>Vinay Patel(Ahmedabad)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Pediatric
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    13-year old physically less developed son
                                    with low immunity. Started Gir Phalamrut
                                    capsule, Nasya, Drakshavaleh and Go-Vita.
                                    See significant improvement in just few
                                    weeks. <b>Prashant M (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    4-year old son Vivaan Dave had frequent cold
                                    & respiratory infections. After taking
                                    medicines from Bansi Gir Gaushala, his
                                    problem stands resolved.{" "}
                                    <b>Nirmit Dave (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    4 year old son suffering from frequent
                                    colds, seen significant relief with Gir
                                    medicines.{" "}
                                    <b>Praveen Tripathi (Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Regularly use Kamdhenu Asav for 2 daughters
                                    aged 6 & 8 years whenever there catch cold,
                                    see complete relief without the use of any
                                    other medicines.{" "}
                                    <b>Nilam R Patel (Surat)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Renal
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                            borderBottom={"none"}
                        >
                            <UnorderedList>
                                <ListItem>
                                    Kidney disorder, had to do dialysis 5-6
                                    times. After taking Gauveda medicinal Ghrit
                                    my kidney is now normal. I also experience
                                    healthy weight gain and improvement in
                                    overall energy.{" "}
                                    <b>Bhupesh Jaiswal (Ahmedabad)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <h2>
                            <AccordionButton
                                bg={"brand.100"}
                                _hover={{ bg: "brand.100" }}
                            >
                                <AccordionIcon me={3} />
                                <Box
                                    flex="1"
                                    textAlign="left"
                                    fontWeight="600"
                                    color="white"
                                >
                                    Respiratory
                                </Box>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel
                            pb={4}
                            border="1px"
                            borderColor="gray.200"
                        >
                            <UnorderedList>
                                <ListItem>
                                    Using Gir Nasya for sometime, and notice the
                                    following improvements in health - relief in
                                    regular cold & associated pain in throat,
                                    relief in sinus and migraine, better sleep.
                                    <b> Vishalbhai(Surat)</b>
                                </ListItem>
                                <ListItem>
                                    Started treatment for constipation & cold,
                                    experienced significant relief along with
                                    better sleep.{" "}
                                    <b>Darshan Parikh(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Treatment for coughing & cold. Used Kamdhenu
                                    Asav and Gir Nasya. Found significant relief
                                    along with better sleep.{" "}
                                    <b>K D Parikh(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Complete relief in blocked nose within 7-8
                                    minutes of using Gir Ahinsak Nasya.{" "}
                                    <b>Pranav Parikh(USA)</b>
                                </ListItem>
                                <ListItem>
                                    Coughing problem for over 3 months which
                                    couldn't resolve even with anti-biotics.
                                    Started taking Kamdhenu Asav, experienced
                                    complete recovery by the time patient
                                    finished 2 bottles of this medicine.{" "}
                                    <b>Mukesh Kantariya(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Suffering from Bronchitis, Thyroid, high BP
                                    and cardiac problems for 2 years. Patient
                                    experienced significant relief in symptoms,
                                    particularly Bronchitis after taking
                                    Kamdhenu Asav.{" "}
                                    <b>Sharmishtaben Joshi(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Significant improvement in respiratory
                                    infection symptoms after taking Kamdhenu
                                    Asav and Nishamrut.{" "}
                                    <b>Gauriben Vyas(Ahmedabad)</b>
                                </ListItem>
                                <ListItem>
                                    Chronic & repeated throat infections, but
                                    seen complete relief in symptoms along with
                                    improved digestion after taking Sunthamrut
                                    capsules.{" "}
                                    <b>Dineshbhai Hadiya(Bhavnagar)</b>
                                </ListItem>
                                <ListItem>
                                    Nasal pain and watery discharge - complete
                                    relief after being treated with Gir Ahinsak
                                    Nasya.<b> Krunal Thakkar</b>
                                </ListItem>
                                <ListItem>
                                    Significant relief in chronic respiratory /
                                    throat infections after starting Bansi Gir
                                    Gaushala milk & Ghee, Kamdhenu Asav and
                                    Nasya. See 90% reduction in symptoms and
                                    requirement for anti-histamines &
                                    anti-biotics treatment.{" "}
                                    <b>Sandeep Pandya(Ahmedabad)</b>
                                </ListItem>
                            </UnorderedList>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Container>
            <ScrollToTop/>
            <Footer />
        </>
    );
}
