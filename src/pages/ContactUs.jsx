import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
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
  useBreakpointValue
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import { AsyncSelect } from "chakra-react-select";
import checkLogin from "../utils/checkLogin";
import BreadCrumbCom from "../components/BreadCrumbCom";

export default function ContactUs() {
  const initialFormData = Object.freeze({
    company: "",
    name: "",
    country: "",
    phone: "",
    email: "",
    subject: "",
    inquiry_description: "",
    age_group: "00 to 06",
  });

  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [callingCode, setCallingCode] = useState("");
  const toast = useToast();
  const loginInfo = checkLogin();
  const width = useBreakpointValue({md:"340px",base:"300px"})
  useEffect(() => {
    getCountries(); // eslint-disable-next-line
  }, []);

  async function getCountries() {
    try {
      const res = await client.get("/countries/");
      if (res.data.status === true) {
        setCountries(res.data.data);
      }
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please try again later!",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData.country = formData.country.value;
      const response = await client.post("/inquiries/", {
        ...formData,
        phone: "+" + callingCode + formData.phone,
      });
      if (response.data.status === true) {
        toast({
          title: response.data.message,
          status: "success",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
        setFormData(initialFormData);
      } else {
        toast({
          title: response.data.message,
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  const countryOptions = async (inputValue) => {
    let Options = [];
    if (inputValue.length > 2) {
      const countryRes = await client.get(
        `/countries/?filter_search=${inputValue}`,
        // {
        //   headers: { Authorization: `token ${loginInfo.token}` },
        // }
      );
      if (countryRes.status) {
        countryRes.data.data?.map((data) =>
          Options.push({
            label: data.country_name,
            value: data.id,
            ...data,
          })
        );
        setCountries(Options);
      }
    }
    return Options;
  };
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"Contact Us"} secondUrl={"/contact-us"} />
      </Container>
      <Container maxW={"container.xl"} py={8} px={0} position="relative">
        <Image src="https://forntend-bucket.s3.ap-south-1.amazonaws.com/sose/images/organic-living/contact.jpg" />

        <Text
          pb={2}
          color={"brand.100"}
          textAlign={"center"}
          fontSize={{ lg: "7xl", md: "4xl", base: "2xl" }}
          fontWeight="600"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex="1"
          // Optional: Add background to improve text readability
        >
          Contact  Us
        </Text>
      </Container>
      <Container maxW="container.lg" pb={10}>
        <Text pb={2}>
          Contact us about anything related to our company or services.
        </Text>
        <Text pb={8}>
          We'll do our best to get back to you as soon as possible.
        </Text>

        <form onSubmit={handleSubmit}>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Your Company
            </FormLabel>
            <Input
              type="text"
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              _focus={{ borderColor: "brand.500" }}
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
            />
          </FormControl>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Your Name
            </FormLabel>
            <Input
              type="text"
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              _focus={{ borderColor: "brand.500" }}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </FormControl>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Your country
            </FormLabel>
            {/* <Select
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              placeholder="Select country"
              _focus={{ borderColor: "brand.500" }}
              value={formData.country}
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
                const callCode = countries.find(
                  (country) => country.id === parseInt(e.target.value)
                )?.calling_code;
                setCallingCode(callCode ?? "");
              }}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.country_name}
                </option>
              ))}
            </Select> */}
            <AsyncSelect
              isClearable
              size="sm"
              chakraStyles={{
                inputContainer: (provided) => ({
                  ...provided,
                  maxWidth: width,
                  minWidth: width,
                }),
              }}
              variant={"outline"}
              name="Countries"
              sx={{ padding: "0 10px" }}
              placeholder="Select Country"
              value={formData?.country}
              onChange={(e) => {
                setFormData({ ...formData, country: e });
                const callCode = countries.find(
                  (country) => country.id === parseInt(e?.value)
                )?.calling_code;
                setCallingCode(callCode ?? "");
              }}
              loadOptions={countryOptions}
            ></AsyncSelect>
          </FormControl>

          {formData.country !== "" && (
            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              align={{md:"center",base:"flex-start"}}
              isRequired
              mt="5"
            >
              <FormLabel
                fontSize="sm"
                mb={0}
                width={{ base: "auto", md: "200px" }}
              >
                Phone Number
              </FormLabel>
              <InputGroup maxW={"md"} size="sm">
                <InputLeftAddon
                  border={"1px"}
                  borderColor="gray.300"
                  px={1}
                  children={"+" + callingCode}
                />
                <Input
                  type="tel"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="filled"
                  _focus={{ borderColor: "brand.500" }}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </InputGroup>
            </FormControl>
          )}

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Email
            </FormLabel>
            <Input
              type="email"
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              _focus={{ borderColor: "brand.500" }}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </FormControl>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Subject
            </FormLabel>
            <Input
              type="text"
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              _focus={{ borderColor: "brand.500" }}
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
            />
          </FormControl>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align={{md:"center",base:"flex-start"}}
            isRequired
            mt="5"
            mb={"5"}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Your Queries
            </FormLabel>
            <Textarea
              maxW={"md"}
              size="sm"
              border={"1px"}
              borderColor="gray.300"
              variant="filled"
              _focus={{ borderColor: "brand.500" }}
              value={formData.inquiry_description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  inquiry_description: e.target.value,
                })
              }
            />
          </FormControl>
          <Container maxW={"lg"} p="0">
            <Button type="submit" colorScheme={"brand"}>
              Send
            </Button>
          </Container>
        </form>

      </Container>
      <Footer />
    </>
  );
}
