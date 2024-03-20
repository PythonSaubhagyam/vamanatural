import React from "react";
import Slider from "react-slick";
import { FaQuoteRight } from "react-icons/fa";
import { FaQuoteLeft } from "react-icons/fa";
import {
  Box,
  Container,
  Avatar,
  Heading,
  Text,
  Flex,
  Card,
} from "@chakra-ui/react";

const testimonialsData = {
  testimonials: [
    {
      quoteIconColor: "#436131",
      quote:
        "SOSE ORGANICS has been my destination to healthy and fresh produce. They deal in with a variety of products ranging from nutritious fruits, vegetables , cereals , pulses , oil , ghee and what not . One looking for an healthier alternative can have an visit at their store and be amazed by the quality and variety of offerings the store has. “Health and happiness is what all we need to have an well balanced life.” Thank you for making it a little more simpler and accessible.",
      author: "Jaimin Tarak",
      location: "Mumbai",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Sose Organic has been my go to place for every product whether for the kitchen or beauty or health and wellness. Highly recommended and trustworthy, I have endorsed the brand proudly among all my friends and acquaintances. Having spoken to Gopalbhai personally, I know the amount of effort and genuineness that is put behind every single product here. I’m a very happy customer and will remain so forever. The staff at the store are also friendly, and guide you beautifully. Overall it’s a lovely experience right from when you walk in to after you have consumed/used the product. You will keep going back. It’s time we support such brands that believe in sustainability and let the local brands come forth with more.",
      author: "Tanvi Joshi",
      location: "Ahmedabad",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "All products are 100% pure and organic. Edible oils, medicines,medicated ghee for nasya, vegetables and fruits I buy regularly from SOSE and I am fully satisfied with these organic products.",
      author: "Usha Acharya",
      location: "Surat",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "SOSE is the pure nature n best store .. it's Beard oil is best product n it's a Aayurvedic beard oil which made in organic ingredients.",
      author: "Karan Chaudhari",
      location: "Bhavnagar",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Treated for gas, acidity and pain in hands & legs since last few weeks. Seen significant relief with Sunthamrut capsule, Drakshavaleh, Kabjamrut Churna and Asthi Churna",
      author: "Bharti Ben",
      location: "Ahmedabad",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Started Mother's treatment few weeks back for joint & back pain. Treated with Asthigir Ghrit, Asthi Churna, Kabjamrut capsule, Sunthamrut capsule and Gir Nasya. See significant relief in join & back pains.",
      author: "Rita Ben",
      location: "Ahmedabad",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Suffered from serious left ventricle dysfunction and injection projection, was admitted to ICU and adviced 3 months rest thereafter. Started Gauveda medicines Arjun Ghrit, Dhavalamrut, Arjun Chai and Phalamrut with daily Pranayam. Experience significant relief and improvement in 2D echo report.",
      author: "Akash Dave",
      location: "Rajkot",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Suffering from a neurological disease, experiencing 50% relief in symptoms, with lower stress & better sleep even after stopping allopathic medicines. Taking Asthi Churna, Nasya, 21 Aushadhiya Ark and Shilajit.",
      author: "Jashwantbhai Prajapati",
      location: "Rajkot",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "13-year old physically less developed son with low immunity. Started Gir Phalamrut capsule, Nasya, Drakshavaleh and Go-Vita. See significant improvement in just few weeks",
      author: "Prashant M",
      location: "Mumbai",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "Regularly use Kamdhenu Asav for 2 daughters aged 6 & 8 years whenever there catch cold, see complete relief without the use of any other medicines.",
      author: "Nilam R Patel",
      location: "Mumbai",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "I have been using nasya from last 6 months and it really effects on my migraine problem , And I’m aslo using gir pranda churan and it has solved my constipation problem form root.all products are best and effective and reasonable too",
      author: "Smit Chauhan",
      location: "Ahmedabad",
    },
    {
      quoteIconColor: "#436131",
      quote:
        "I am extremely happy with the quality of milk they are providing. I have tried many brands and milk types of Gir cows but was not satisfied like this ever before they are genuinely serving the society by providing authentic milk.",
      author: "Namrata Singh",
      location: "Ahmedabad",
    },
  ],
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#436131",
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,

        background: "#436131",
        borderRadius: 20,
      }}
      onClick={onClick}
    />
  );
}
const Testimonials = () => {
  var settings = {
    dots: false,
    infinite: true,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 3,

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Container maxW={"container.xl"} pt={3}>
        <Box
          w="100%"
          backgroundImage={"https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/HomePage/line.png"}
          backgroundSize="100%"
          backgroundPosition="50% 100%"
          backgroundRepeat={"no-repeat"}
        >
          <Heading
            color="brand.500"
            size="lg"
            mx="auto"
            align={"center"}
            mt={3}
            pb={"10px"}
          >
            TESTIMONIALS
          </Heading>
        </Box>
        <Box px={10} maxW={"100%"} h={"100%"}>
          <Slider {...settings}>
            {testimonialsData?.testimonials.map((testimonial, index) => (
              <Box
                boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}
                maxW={{ md: "100%", base: "100%" }}
                minH={{ md: "10vw", base: "25vw" }}
                my={20}
                mx={{ md: 10, base: 4 }}
                px={5}
                pb={5}
              >
                <Flex
                  flexDirection={"column"}
                  gap={"3"}
                  textAlign={"center"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  maxW={{ md: "100%", base: "100%" }}
                  minH={{ md: "10vw", base: "25vw" }}
                >
                  <Avatar
                    boxSize={75}
                    boxShadow="0px 0px 15px rgba(0, 0, 0, 0.48)"
                    marginTop={"-35px"}
                    name="Dan Abrahmov"
                    src="/vama_logo.jpeg"
                  />
                  <Text
                    display={"inline-block"}
                    fontSize={"15px"}
                    fontWeight={600}
                  >
                    <span
                      style={{
                        fontSize: "1rem",
                        color: "#436131",
                        fontWeight: 900,
                      }}
                    >
                      &#8220;
                    </span>{" "}
                    {testimonial.quote.slice(0, 150)}...
                    <span
                      style={{
                        color: "#436131",
                        fontSize: "1rem",
                        fontWeight: 900,
                      }}
                    >
                      &#8221;
                    </span>
                  </Text>

                  <Text color={"brand.500"} height={"100%"} fontWeight={600}>
                    -{testimonial.author}
                  </Text>

                </Flex>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </>
  );
};

export default Testimonials;
// <Flex h={{ base: 380, ml: 350 }} key={index}>
//   <Flex justifyContent={index % 2 !== 0 ? "start" : "end"} mt={6}>
//     {index % 2 === 0 && (
//       <Box
//         sx={{
//           background: "#436131",
//           color: "white",
//           height: "35px",
//           marginTop: "4px",
//           padding: "10px",
//           marginRight: -1,
//         }}
//       >
//         <FaQuoteLeft />
//       </Box>
//     )}

//     <Box
//       style={{
//         opacity: "0.9",
//         border: "1px solid #799a4e",
//         padding: 15,
//         marginTop: 5,
//         marginBottom: 5,
//         margin: 3,
//       }}
//       fontSize={{ base: 12, xl: 15 }}
//       h={{ base: 650, xl: 350 }}
//       w={{ base: 550, xl: 550 }}
//     >
//       <i>{testimonial.quote}</i>
//       <footer>
//         <i>
//           — {testimonial.author},&nbsp;
//           <b>{testimonial.location}</b>
//         </i>
//       </footer>
//     </Box>
//   </Flex>
// </Flex>
