import { useForm, Controller } from "react-hook-form";
import {
  Text,
  FormControl,
  FormLabel,
  Flex,
  Input,
  Textarea,
  Container,
  Button,
  Checkbox,
  useToast,
  FormErrorMessage,
} from "@chakra-ui/react";
import BreadCrumbCom from "../components/BreadCrumbCom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";
import client from "../setup/axiosClient";
import { useEffect } from "react";
import CapitalizeLetter from "../utils/CommanFunction";
import checkLogin from "../utils/checkLogin";
import { AsyncSelect, Select } from "chakra-react-select";

export default function Bussiness() {
  const { handleSubmit, control, formState } = useForm();
  const initialData = {
    company_name: "",
    industry_type: "",
    company_size: "",
    website: "",
    annual_revenue: "",
    company_registered: "",
    country: null,
    city: null,
    state: null,
    full_name: "",
    job_title: "",
    email: "",
    phone_no: "",
    specific_requirements: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    question1: "How did you hear about us?",
    question2: "Are you currently using a similar product?",
    question3: "What's your timeframe for implementing this solution?",
    question4: "Any additional information you'd like to share?",
  };
  const [formData, setFormData] = useState(initialData);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isAgree, setIsAgree] = useState(true);
  const loginInfo = checkLogin();

  const toast = useToast();
  const onSubmit = async (e) => {
    e.preventDefault();
    formData.annual_revenue = formData.annual_revenue
      ? formData.annual_revenue.value
      : "";
    formData.company_registered = formData.company_registered
      ? formData.company_registered.value
      : "";
    formData.country = formData.country ? formData.country.value : "";
    formData.state = formData.state.value;
    formData.city = formData.city.value;
    console.log("Form Data:", formData);

    try {
      const response = await client.post("/user/web/b2b/create/", formData);
      setFormData(initialData);
      toast({
        title: "Data Created Successfully",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        toast({
          title: "Something went wrong",
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      } else if (error.request) {
        console.error("No response received");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    try {
      const res = await client.get("/countries/");
      if (res.data.status === true) {
        let Options = [];
        res.data.data?.map((data) =>
          Options.push({
            label: CapitalizeLetter(data.country_name),
            value: data.id,
          })
        );
        setCountries(Options);
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
  async function getStates(country_id) {
    const response = await client.get(`/states/${country_id}/`);
    if (response.data.status === true) {
      let Options = [];
      response.data.data?.map((data) =>
        Options.push({
          label: CapitalizeLetter(data.name),
          value: data.id,
        })
      );
      setStates(Options);
    }
  }

  async function getCities(state_id) {
    const response = await client.get(`/cities/${state_id}`);
    if (response.data.status === true) {
      let Options = [];
      response.data.data?.map((data) =>
        Options.push({
          label: CapitalizeLetter(data.name),
          value: data.id,
        })
      );
      setCities(Options);
    }
  }

  // useEffect(() => {
  //     //getCountries();
  //     if (bussinessData !== null && bussinessData !== undefined) {
  //         getStates(bussinessData?.country_obj?.id);
  //         getCities(bussinessData?.state_obj?.id);
  //     } // eslint-disable-next-line
  // }, []);

  const countryOptions = async (inputValue) => {
    let Options = [];
    if (inputValue.length > 2) {
      const countryRes = await client.get(
        `/countries/?filter_search=${inputValue}`
      );
      if (countryRes.status) {
        countryRes.data.data?.map((data) =>
          Options.push({
            label: CapitalizeLetter(data.country_name),
            value: data.id,
          })
        );
        setCountries(countryRes.data.data);
      }
    }
    return Options;
  };

  const handleCountryChange = (e) => {
    getStates(e.value);
    setFormData({
      ...formData,
      country: e,
      state: "",
      city: "",
    });
  };

  const handleStateChange = (e) => {
    getCities(e.value);
    setFormData({ ...formData, state: e, city: "" });
  };

  const calculateHeight = (content) => {
    const lineHeight = 16; // Adjust this value based on your font size
    const numberOfLines = content.split("\n").length;
    const height = numberOfLines * lineHeight + 20; // Add some padding

    return height + "px";
  };
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <BreadCrumbCom second={"Bussiness"} secondUrl={"/bussiness"} />
      </Container>
      <Container maxW="container.lg" pb={10}>
        <Text
          pb={2}
          size="xl"
          fontSize="4xl"
          fontWeight="medium"
          color="brand.500"
        >
          B2B
        </Text>

        <form onSubmit={onSubmit}>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Company Name*
            </FormLabel>
            <Controller
              name="company_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  required
                  value={formData.company_name}
                  onChange={(e) =>
                    setFormData({ ...formData, company_name: e.target.value })
                  }
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Industry Type*
            </FormLabel>
            <Controller
              name="industry_type"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  required
                  value={formData.industry_type}
                  onChange={(e) =>
                    setFormData({ ...formData, industry_type: e.target.value })
                  }
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Company Size*
            </FormLabel>
            <Controller
              name="company_size"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  required
                  value={formData.company_size}
                  onChange={(e) =>
                    setFormData({ ...formData, company_size: e.target.value })
                  }
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Website
            </FormLabel>
            <Controller
              name="website"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Annual Revenue*
            </FormLabel>
            <Controller
              name="annual_revenue"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  maxW={"lg"}
                  size="sm"
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "375px",
                    }),
                  }}
                  variant="outline"
                  required
                  value={formData?.annual_revenue}
                  onChange={(e) =>
                    setFormData({ ...formData, annual_revenue: e })
                  }
                  options={[
                    {
                      value: "30_lacs_to_1_cr",
                      label: "30 lacs to 1 cr",
                    },
                    {
                      value: "1_to_5_cr",
                      label: "1 to 5 cr",
                    },
                    {
                      value: "5_to_10_cr",
                      label: "5 to 10 cr",
                    },
                    {
                      value: "10_to_25_cr",
                      label: "10 to 25 cr",
                    },
                    {
                      value: "25_to_50_cr",
                      label: "25 to 50 cr",
                    },
                    {
                      value: "50_to_100 cr",
                      label: "50 to 100 cr",
                    },
                    {
                      value: "100_to_200 cr",
                      label: "100 to 200 cr",
                    },

                    {
                      value: "200_to_500_cr",
                      label: "200 to 500 cr",
                    },

                    {
                      value: "500_cr_and_above",
                      label: "500 cr and above",
                    },
                  ]}
                ></Select>
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Company Registered*
            </FormLabel>
            <Controller
              name="company_registered"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  maxW={"md"}
                  chakraStyles={{
                    inputContainer: (provided) => ({
                      ...provided,
                      width: "375px",
                    }),
                  }}
                  size="sm"
                  variant="outline"
                  required
                  value={formData?.company_registered}
                  onChange={(e) =>
                    setFormData({ ...formData, company_registered: e })
                  }
                  _focus={{ borderColor: "brand.500" }}
                  options={[
                    {
                      value: "yes",
                      label: "Yes",
                    },
                    {
                      value: "applied",
                      label: "Applied",
                    },
                    {
                      value: "no",
                      label: "No",
                    },
                  ]}
                ></Select>
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Country
            </FormLabel>

            <AsyncSelect
              isClearable
              size="sm"
              chakraStyles={{
                inputContainer: (provided) => ({
                  ...provided,
                  width: "375px",
                }),
              }}
              variant={"outline"}
              name="Countries"
              sx={{ padding: "0 10px" }}
              placeholder="Select Country"
              value={formData?.country}
              onChange={(e) => handleCountryChange(e)}
              loadOptions={countryOptions}
              defaultOptions={countries}
            ></AsyncSelect>
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              State
            </FormLabel>
            <Select
              isClearable
              size="sm"
              chakraStyles={{
                inputContainer: (provided) => ({
                  ...provided,
                  width: "375px",
                }),
              }}
              value={formData?.state}
              sx={{ padding: "0 10px" }}
              onChange={(e) => handleStateChange(e)}
              disabled={formData.country === null ? true : false}
              placeholder="Select State"
              variant={"outline"}
              options={states}
            ></Select>
            {formData.country === null ? (
              <FormErrorMessage>
                Please select a country first!
              </FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              City
            </FormLabel>
            <Select
              isClearable
              size="sm"
              chakraStyles={{
                inputContainer: (provided) => ({
                  ...provided,
                  width: "375px",
                }),
              }}
              value={formData?.city}
              sx={{ padding: "0 10px" }}
              disabled={formData.state === null ? true : false}
              variant={"outline"}
              onChange={(e) => setFormData({ ...formData, city: e })}
              placeholder="Select City"
              options={cities}
            ></Select>
            {formData.state === null ? (
              <FormErrorMessage>Please select a state first!</FormErrorMessage>
            ) : null}
          </FormControl>
          <Text
            py={2}
            size="xl"
            fontSize="2xl"
            fontWeight="medium"
            color="brand.500"
          >
            Contact Person
          </Text>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Full Name
            </FormLabel>
            <Controller
              name="full_name"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.full_name}
                  onChange={(e) => {
                    setFormData({ ...formData, full_name: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Job Title
            </FormLabel>
            <Controller
              name="job_title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.job_title}
                  onChange={(e) => {
                    setFormData({ ...formData, job_title: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Email Address
            </FormLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Phone Number
            </FormLabel>
            <Controller
              name=" phone_no"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.phone_no}
                  onChange={(e) => {
                    setFormData({ ...formData, phone_no: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <Text
            py={2}
            size="xl"
            fontSize="2xl"
            fontWeight="medium"
            color="brand.500"
          >
            Interested In
          </Text>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb={"5"}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Specific Requirements/Comments
            </FormLabel>
            <Controller
              name="specific_requirements"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.specific_requirements}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      specific_requirements: e.target.value,
                    });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <Text
            py={2}
            size="xl"
            fontSize="2xl"
            fontWeight="medium"
            color="brand.500"
          >
            Additional Information
          </Text>
          <Text
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb="5"
          >
            <Controller
              name="question1"
              defaultValue={formData?.question1}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "0",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            />
          </Text>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb={"5"}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Answer
            </FormLabel>
            <Controller
              name="answer1"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.answer1}
                  onChange={(e) => {
                    setFormData({ ...formData, answer1: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <Text
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb="5"
          >
            <Controller
              name="question2"
              defaultValue={formData?.question2}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "0",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            />
          </Text>

          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb={"5"}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              Answer
            </FormLabel>
            <Controller
              name="answer2"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  value={formData?.answer2}
                  onChange={(e) => {
                    setFormData({ ...formData, answer2: e.target.value });
                  }}
                  _focus={{ borderColor: "brand.500" }}
                />
              )}
            />
          </FormControl>
          <Text
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb="5"
          >
            <Controller
              name="question3"
              control={control}
              defaultValue={formData?.question3}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "0",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            />
          </Text>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb={"5"}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              {" "}
              Answer
            </FormLabel>
            <Controller
              name="answer3"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  _focus={{ borderColor: "brand.500" }}
                  value={formData?.answer3}
                  onChange={(e) => {
                    setFormData({ ...formData, answer3: e.target.value });
                  }}
                />
              )}
            />
          </FormControl>
          <Text
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb="5"
          >
            <Controller
              name="question4"
              control={control}
              defaultValue={formData?.question4}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  readOnly
                  style={{
                    width: "100%",
                    border: "none",
                    outline: "none",
                    padding: "0",
                    backgroundColor: "transparent",
                  }}
                />
              )}
            />
          </Text>
          <FormControl
            as={Flex}
            direction={{ base: "column", md: "row" }}
            align="center"
            mt="5"
            mb={"5"}
            style={{ height: calculateHeight(formData?.answer4) }}
          >
            <FormLabel
              fontSize="sm"
              mb={0}
              width={{ base: "auto", md: "200px" }}
            >
              {" "}
              Answer
            </FormLabel>
            <Controller
              name="answer4"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  maxW={"md"}
                  size="sm"
                  border={"1px"}
                  borderColor="gray.300"
                  variant="outline"
                  _focus={{ borderColor: "brand.500" }}
                  value={formData?.answer4}
                  onChange={(e) => {
                    setFormData({ ...formData, answer4: e.target.value });
                  }}
                />
              )}
            />
          </FormControl>
          <FormControl as={Flex} align="center" mb={4}>
            <Controller
              name=""
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox
                  {...field}
                  size="sm"
                  onChange={() => setIsAgree(!isAgree)}
                >
                  By submitting this form, you agree to our Privacy Policy and
                  consent to being contacted by our team regarding your inquiry.
                </Checkbox>
              )}
            />
          </FormControl>

          <Container maxW={"lg"} p="0">
            <Button type="submit" colorScheme={"brand"} isDisabled={isAgree}>
              Send
            </Button>
          </Container>
        </form>
      </Container>
      <Footer />
    </>
  );
}
