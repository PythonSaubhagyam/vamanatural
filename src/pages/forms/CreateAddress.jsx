import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  Flex,
  Stack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Button,
  useToast,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../../utils/checkLogin";
import client from "../../setup/axiosClient";
import { AsyncSelect, Select } from "chakra-react-select";
import CapitalizeLetter from "../../utils/CommanFunction";

export default function CreateAddress() {
  const location = useLocation();

  const existingAddress =
    location.state !== undefined ? location.state?.address : null; // eslint-disable-next-line
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [callingCode, setCallingCode] = useState("+91");
  const [formData, setFormData] = useState({
    full_name: existingAddress?.full_name ?? null,
    mobile: existingAddress?.mobile_without_ext ?? null,
    another_mobile: existingAddress?.another_mobile_without_ext ?? null,
    address_line_1: existingAddress?.address_line_1 ?? null,
    address_line_2: existingAddress?.address_line_2 ?? null,
    landmark: existingAddress?.landmark ?? null,
    city: {
      value: existingAddress?.city_obj.id ?? 117,
      label: existingAddress?.city_obj.name ?? "Ahmedabad",
    },
    state: {
      value: existingAddress?.state_obj.id ?? 1198,
      label: existingAddress?.state_obj.name ?? "Gujarat",
    },
    postal_code: existingAddress?.postal_code ?? null,
    country: {
      value: existingAddress?.country_obj.id ?? 104,
      label: existingAddress?.country_obj.name ?? "India",
    },
  });

  const toast = useToast();

  const navigate = useNavigate();
  const loginInfo = checkLogin();
  const searchParams = new URLSearchParams(location.search);
  const add_id = searchParams.get("id");
  const contact_id = searchParams.get("contact_id");

  async function getCountries() {
    const response = await client.get("/countries");
    if (response.data.status) {
      let Options = [];
      response.data.data?.map((data) =>
        Options.push({
          label: CapitalizeLetter(data.country_name),
          value: data.id,
          ...data,
        })
      );
      setCountries(Options);
    }
  }

  // async function getStates(country_id) {
  //   const response = await client.get(`/states/${country_id}/`);
  //   if (response.data.status === true) {
  //     setStates(response.data.data);
  //   }
  // }

  // async function getCities(state_id) {
  //   const response = await client.get(`/cities/${state_id}`);
  //   if (response.data.status === true) {
  //     setCities(response.data.data);
  //   }
  // }

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
  useEffect(() => {
    getCountries();
    if (existingAddress !== null || existingAddress === undefined) {
      getStates(formData.country.value);
      getCities(formData.state.value);
    } // eslint-disable-next-line
  }, []);

  const countryOptions = async (inputValue) => {
    let Options = [];
    if (inputValue.length > 2) {
      const countryRes = await client.get(
        `/countries/?filter_search=${inputValue}`,
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (countryRes.status) {
        countryRes.data.data?.map((data) =>
          Options.push({
            label: CapitalizeLetter(data.country_name),
            value: data.id,
            ...data,
          })
        );
        setCountries(Options);
      }
    }
    return Options;
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    formData.country = formData.country?.value;
    formData.state = formData.state?.value;
    formData.city = formData.city?.value;
    if (existingAddress !== null && existingAddress !== undefined) {
      try {
        const response = await client.patch(
          `/user/address/${existingAddress.id}/`,
          {
            ...formData,
            mobile: callingCode + formData.mobile,
            another_mobile: formData.another_mobile
              ? callingCode + formData.another_mobile
              : null,
          },
          {
            headers: { Authorization: `token ${loginInfo.token}` },
          }
        );
        if (response.data.status === true) {
          toast({
            title: response.data.message,
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
          navigate(-1);
        } else {
          toast({
            title: response.data.message,
            status: "error",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error) {}
    } else {
      try {
        let redBody = formData;
        if (add_id) {
          redBody.add_id = add_id;
        }
        if (contact_id) {
          const response = await client.patch(
            `/user/address/?contact_id=${contact_id}`,
            {
              ...redBody,
              mobile: callingCode + formData.mobile,
              another_mobile: formData.another_mobile
                ? callingCode + formData.another_mobile
                : null,
            },
            {
              headers: {
                Authorization: `token ${loginInfo.token}`,
              },
            }
          );
          if (response.data.status === true) {
            toast({
              title: response.data.message,
              status: "success",
              position: "top-right",
              duration: 4000,
              isClosable: true,
            });
            navigate(-1);
          } else {
            toast({
              title: response.data.message,
              status: "error",
              position: "top-right",
              duration: 4000,
              isClosable: true,
            });
          }
        } else {
          const response = await client.post(
            `/user/address/`,
            { ...redBody },
            {
              headers: {
                Authorization: `token ${loginInfo.token}`,
              },
            }
          );
          if (response.data.status === true) {
            toast({
              title: response.data.message,
              status: "success",
              position: "top-right",
              duration: 4000,
              isClosable: true,
            });
            navigate(-1);
          } else {
            toast({
              title: response.data.message,
              status: "error",
              position: "top-right",
              duration: 4000,
              isClosable: true,
            });
          }
        }
      } catch (error) {}
    }
  };

  const handleCountryChange = (e) => {
    if (e) {
      getStates(e.value);
      setFormData({
        ...formData,
        country: e,
        state: "",
        city: "",
      });
      setCallingCode(
        "+" +
          countries.find((country) => country.id === parseInt(e.value))
            .calling_code
      );
    } else {
      setFormData({
        ...formData,
        country: null,
        state: "",
        city: "",
      });
    }
  };

  const handleStateChange = (e) => {
    if (e) {
      getCities(e.value);
      setFormData({ ...formData, state: e, city: "" });
    } else {
      setFormData({ ...formData, state: null, city: "" });
    }
  };

  return (
    <>
      <Navbar />
      <Flex
        as={"form"}
        onSubmit={handleSubmit}
        minH={"60vh"}
        align={"center"}
        justify={"center"}
      >
        <Stack
          spacing={8}
          w="full"
          maxW={"container.lg"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          border="2px"
          borderColor="gray.200"
        >
          <RadioGroup
            onChange={(e) => setFormData({ ...formData, address_tags: e })}
            defaultValue={existingAddress?.address_tags}
          >
            <Flex
              direction={{ base: "column", lg: "row" }}
              justify={"center"}
              gap={{ base: 4, lg: 16 }}
            >
              <FormLabel>Address tag:</FormLabel>
              <Radio colorScheme="brand" value="">
                No tag
              </Radio>
              <Radio colorScheme="brand" value="Home">
                Home
              </Radio>
              <Radio colorScheme="brand" value="Office">
                Office
              </Radio>
              <Radio colorScheme="brand" value="Other">
                Other
              </Radio>
            </Flex>
          </RadioGroup>
          <Stack direction={["column", "row"]} spacing={10}>
            <FormControl id="full-name" isRequired>
              <FormLabel fontSize="sm">Full name</FormLabel>
              <Input
                type="text"
                variant={"outline"}
                size={"sm"}
                border="1px"
                borderColor={"gray.300"}
                defaultValue={formData?.full_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    full_name: e.target.value,
                  })
                }
              />
            </FormControl>
          </Stack>

          <Stack direction={["column", "row"]} spacing={10}>
            <FormControl id="street1" isRequired>
              <FormLabel fontSize="sm">Street 1</FormLabel>
              <Input
                type="text"
                variant={"outline"}
                size={"sm"}
                border="1px"
                borderColor={"gray.300"}
                defaultValue={formData?.address_line_1}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address_line_1: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl id="street2" isRequired>
              <FormLabel fontSize="sm">Street 2</FormLabel>
              <Input
                type="text"
                variant={"outline"}
                size={"sm"}
                border="1px"
                borderColor={"gray.300"}
                defaultValue={formData?.address_line_2}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    address_line_2: e.target.value,
                  })
                }
              />
            </FormControl>
          </Stack>
          <Stack direction={["column", "row"]} spacing={10}>
            <FormControl id="country" isRequired>
              <FormLabel fontSize="sm">Country</FormLabel>
              {/* <Select
                value={formData?.country}
                size="sm"
                variant="outline"
                onChange={(e) => handleCountryChange(e)}
                placeholder="Select country"
              >
                {countries.length > 0 &&
                  countries?.map((country) => (
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
                    width: "415px",
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
            <FormControl id="state" isRequired>
              <FormLabel fontSize="sm">State</FormLabel>
              {/* <Select
                value={formData?.state}
                size="sm"
                onChange={(e) => handleStateChange(e)}
                disabled={formData.country === null ? true : false}
                placeholder="Select state"
              >
                {states?.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </Select> */}
              <Select
                isClearable
                size="sm"
                chakraStyles={{
                  inputContainer: (provided) => ({
                    ...provided,
                    width: "415px",
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
          </Stack>
          <Stack direction={["column", "row"]} spacing={10}>
            <FormControl id="city" isRequired>
              <FormLabel fontSize="sm">City</FormLabel>
              {/* <Select
                value={formData?.city}
                size="sm"
                disabled={formData.state === null ? true : false}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                placeholder="Select city"
              >
                {cities?.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select> */}
              <Select
                isClearable
                size="sm"
                chakraStyles={{
                  inputContainer: (provided) => ({
                    ...provided,
                    width: "415px",
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
                <FormErrorMessage>
                  Please select a state first!
                </FormErrorMessage>
              ) : null}
            </FormControl>
            <FormControl id="postal-code" isRequired>
              <FormLabel fontSize="sm">ZIP Code</FormLabel>
              <Input
                type="number"
                variant={"outline"}
                size={"sm"}
                border="1px"
                borderColor={"gray.300"}
                defaultValue={formData?.postal_code}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    postal_code: e.target.value,
                  })
                }
              />
            </FormControl>
          </Stack>
          <Stack direction={["column", "row"]} spacing={10}>
            <FormControl id="mobile" isRequired>
              <FormLabel fontSize="sm">Mobile number</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon
                  children={callingCode}
                  border="1px"
                  borderColor={"gray.300"}
                  bg={"gray.300"}
                  p={1}
                  borderStartRadius="md"
                />
                <Input
                  type="tel"
                  maxLength={10}
                  minLength={10}
                  variant={"outline"}
                  size={"sm"}
                  border="1px"
                  borderColor={"gray.300"}
                  defaultValue={formData?.mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mobile: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl id="mobile2">
              <FormLabel fontSize="sm">Alternate Mobile number</FormLabel>
              <InputGroup size="sm">
                <InputLeftAddon
                  children={callingCode}
                  border="1px"
                  borderColor={"gray.300"}
                  bg={"gray.300"}
                  p={1}
                  borderStartRadius="md"
                />
                <Input
                  type="tel"
                  maxLength={10}
                  minLength={10}
                  variant={"outline"}
                  size={"sm"}
                  border="1px"
                  borderColor={"gray.300"}
                  defaultValue={formData?.another_mobile}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      another_mobile: e.target.value,
                    })
                  }
                />
              </InputGroup>
            </FormControl>
          </Stack>
          <Flex justify={"left"} mt={8} gap={3}>
            <Button type="submit" colorScheme={"brand"} width={"100px"}>
              Save
            </Button>
            <Button
              colorScheme="red"
              type="button"
              width={"100px"}
              onClick={() => navigate(-1)}
            >
              Discard
            </Button>
          </Flex>
        </Stack>
      </Flex>

      <Footer />
    </>
  );
}
