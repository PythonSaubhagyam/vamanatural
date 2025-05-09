import { useState, useEffect, useRef } from "react";
import {
  Text,
  FormControl,
  FormLabel,
  Flex,
  InputGroup,
  Input,
  InputLeftAddon,
  Textarea,
  Container,
  Button,
  useToast,
  Box,
  Image,
  useBreakpointValue,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { AsyncSelect } from "chakra-react-select";
import { useLocation } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BreadCrumbCom from "../components/BreadCrumbCom";
import client from "../setup/axiosClient";
import MetaTags from "../context/MetaTagsContext";

// ✅ Initial form values outside component to reuse
const initialFormData = {
  company: "",
  name: "",
  country: "",
  phone: "",
  email: "",
  subject: "",
  inquiry_description: "",
  age_group: "00 to 06",
};

export default function ContactUs() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const IsMobileView = searchParams.get("mobile") ?? "false";

  const width = useBreakpointValue({ md: "340px", base: "300px" });
  const toast = useToast();
  const recaptchaRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [callingCode, setCallingCode] = useState("");
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.get("/countries/");
        if (res.data.status) setCountries(res.data.data);
      } catch {
        toast({
          title: "Something went wrong",
          description: "Unable to load countries",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      }
    })();
  }, []);

  const countryOptions = async (inputValue) => {
    if (inputValue.length <= 2) return [];
    const res = await client.get(`/countries/?filter_search=${inputValue}`);
    const options = res.data.data?.map((c) => ({
      label: c.country_name,
      value: c.id,
      ...c,
    }));
    setCountries(options);
    return options;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verified) {
      toast({
        title: "reCAPTCHA verification failed",
        status: "error",
        position: "top",
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        country: formData.country?.value,
        phone: "+" + callingCode + formData.phone,
      };

      const res = await client.post("/inquiries/", payload);
      toast({
        title: res.data.message,
        status: res.data.status ? "success" : "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });

      if (res.data.status) {
        setFormData(initialFormData);
        recaptchaRef.current.reset();
        setVerified(false);
      }
    } catch (err) {
      toast({
        title: err.response?.data?.message || "Failed to send inquiry",
        status: "error",
        position: "top-right",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const pageUrl = "/contact-us";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      {!IsMobileView && <Navbar />}
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second="Contact Us" secondUrl="/contact-us" />
      </Container>

      {/* Banner */}
      <Container maxW="container.xl" py={1} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/contact.jpg" />
        <Text
          color="brand.100"
          fontWeight="600"
          fontSize={{ lg: "7xl", md: "4xl", base: "2xl" }}
          textAlign="center"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
        >
          Contact Us
        </Text>
      </Container>

      <Container maxW="container.md" py={10} px={{ base: 4, md: 10 }}>
        <Box
          p={{ base: 6, md: 10 }}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          border="1px solid"
          borderColor="gray.200"
        >
          <Heading fontSize="2xl" textAlign="center" color="#5b5b5b" mb={6}>
            Contact Us
          </Heading>

          <Text fontSize="sm" textAlign="center" mb={4}>
            Contact us about anything related to our company or services.
            <br />
            We'll do our best to get back to you as soon as possible.
          </Text>

          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              {/* Company */}
              <FormControl isRequired>
                <FormLabel>Your Company</FormLabel>
                <Input
                  variant="filled"
                  borderRadius="md"
                  name="company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                />
              </FormControl>

              {/* Name */}
              <FormControl isRequired>
                <FormLabel>Your Name</FormLabel>
                <Input
                  variant="filled"
                  borderRadius="md"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </FormControl>

              {/* Email */}
              <FormControl isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  borderRadius="md"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </FormControl>

              {/* Subject */}
              <FormControl isRequired>
                <FormLabel>Subject</FormLabel>
                <Input
                  variant="filled"
                  borderRadius="md"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </FormControl>

              {/* Country Selector */}
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <AsyncSelect
                  isClearable
                  size="sm"
                  chakraStyles={{
                    inputContainer: (base) => ({
                      ...base,
                      borderRadius: "md",
                      borderColor: "gray.300",
                    }),
                  }}
                  value={formData.country}
                  onChange={(e) => {
                    setFormData({ ...formData, country: e });
                    const callCode = countries.find(
                      (c) => c.id === parseInt(e?.value)
                    )?.calling_code;
                    setCallingCode(callCode ?? "");
                  }}
                  loadOptions={countryOptions}
                  placeholder="Select country..."
                />
              </FormControl>

              {/* Phone */}
              {formData.country && (
                <FormControl isRequired>
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftAddon children={`+${callingCode}`} />
                    <Input
                      variant="filled"
                      borderRadius="md"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        /^\d*$/.test(e.target.value) &&
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </InputGroup>
                </FormControl>
              )}

              {/* Description */}
              <FormControl isRequired>
                <FormLabel>Your Queries</FormLabel>
                <Textarea
                  variant="filled"
                  borderRadius="md"
                  name="inquiry_description"
                  rows={5}
                  value={formData.inquiry_description}
                  onChange={(e) =>
                    setFormData({ ...formData, inquiry_description: e.target.value })
                  }
                />
              </FormControl>

              {/* reCAPTCHA */}
              <Box align="center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={process.env.REACT_reCAPTCHA_KEY}
                  onChange={() => setVerified(true)}
                  onExpired={() => setVerified(false)}
                />
              </Box>

              {/* Submit */}
              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                borderRadius="full"
                isDisabled={!verified}
                isLoading={loading}
              >
                Submit Inquiry
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>


      {IsMobileView && <Footer />}
    </>
  );
}
