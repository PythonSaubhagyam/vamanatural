import { useState, useEffect } from "react";
import checkLogin from "../utils/checkLogin";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Heading,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  FormLabel,
  Flex,
  RadioGroup,
  Radio,
  Select,
  Textarea,
  CheckboxGroup,
  Checkbox,
  Button,
  useToast,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import moment from "moment";
import "moment-timezone";
import formatTime from "../utils/formatTime";
import { AsyncSelect } from "chakra-react-select";

export default function BookAppointment() {
  const initialFormData = Object.freeze({
    event_type: "Appointment",
    category: "Online",
    start_date: "",
    start_time: "",
    name: "",
    country_id: "",
    email: "",
    mobile: "",
    gender: "",
    age_group: "",
    problem_suffering_from: "",
    problem_description: "",
    landmark: "",
    taking_any_medicine: false,
    type_of_medicine_list: [],
  });

  const [formData, setFormData] = useState(initialFormData);
  const [countries, setCountries] = useState([]);
  const [callingCode, setCallingCode] = useState("");
  const [allAppointmentSlots, setAllAppointmentSlots] = useState([]);
  const [availableAppointmentSlots, setAvailableAppointmentSlots] = useState(
    []
  );
  const toast = useToast();
  const loginInfo = checkLogin();

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const promise0 = await client.get("/countries/");
    const promise1 = await client.get("/online_appointment_slots/", {
      // headers: {
      //   Authorization: `token ${localStorage.getItem('token')}`
      // }
    });
    Promise.all([promise0, promise1]).then(function (res) {
      res[0].data.status === true && setCountries(res[0].data.data);
      res[1].data.status === true &&
        setAllAppointmentSlots(res[1].data.online_appointment_slot);
    });
  }

  async function getTimeSlotsByDay(date) {
    const day = new Date(date).getDay();
    let availableTimeSlots = allAppointmentSlots.filter(
      (slot) => slot.week_day_number == day
    );
    console.warn("day ==>", day, availableTimeSlots);
    availableTimeSlots.sort(function (slot1, slot2) {
      return slot1.starting_hour.localeCompare(slot2.starting_hour);
    });
    setAvailableAppointmentSlots(availableTimeSlots);
  }

  // On change date input

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = { ...formData };
    data.start_datetime = data.start_date + "T" + data.start_time;
    delete data.start_date;
    delete data.start_time;
    data.mobile = "+" + callingCode + data.mobile;
    const response = await client.post(
      "/events/",
      { ...data },
      {
        headers: { Authorization: `token ${loginInfo.token}` },
      }
    );
    if (response.data.status === true) {
      toast({
        title: response.data.message,
        position: "top-right",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setFormData(initialFormData);
    } else {
      toast({
        title: response.data.message,
        position: "top-right",
        status: "error",
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
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (countryRes.status) {
        countryRes.data.data?.map((data) =>
          Options.push({
            label: data.country_name,
            value: data.id,
            ...data,
          })
        );
      }
    }
    setCountries(Options);
    return Options;
  };

  return (
    <>
      <Navbar />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Container
          maxW={"100vw"}
          borderRadius="lg"
          my={"11%"}
          mb={{ base: 2, md: 10 }}
          py={{ base: 0, md: 6 }}
          px={{ base: 6, md: 16 }}
        >
          <Heading size="md">Book your appointment</Heading>
          <Divider mt={2} />
          <Flex direction={"column"} w="50vw" my={6} gap={6}>
            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" maxW={"200px"}>
                Appointment Date
              </FormLabel>
              <Input
                type="date"
                variant="filled"
                size="sm"
                focusBorderColor="brand.500"
                w={{ base: "100%", lg: "50%" }}
                value={formData?.start_date}
                min={moment().add(1, "days").format("YYYY-MM-DD")}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    start_date: e.target.value,
                  });
                  getTimeSlotsByDay(e.target.value);
                }}
              />
            </FormControl>

            {formData.start_date !== "" && (
              <FormControl
                as={Flex}
                direction={{ base: "column", md: "row" }}
                justify={"space-between"}
                isRequired
              >
                <FormLabel fontSize="sm" width={"200px"}>
                  Appointment Time
                </FormLabel>
                <Select
                  size="sm"
                  w={{ base: "100%", lg: "50%" }}
                  placeholder="Select time slot"
                  value={formData?.start_time}
                  onChange={(e) => {
                    setFormData({ ...formData, start_time: e.target.value });
                  }}
                >
                  {availableAppointmentSlots.map((slot) => (
                    <option value={slot.starting_hour + "+05:30"}>
                      {formatTime(slot.starting_hour)}
                    </option>
                  ))}
                  {/* <option value={"11:30:00+05:30"}>11:30 AM</option>
                  <option value={"12:30:00+05:30"}>12:00 PM</option>
                  <option value={"12:30:00+05:30"}>12:30 PM</option>
                  <option value={"13:00:00+05:30"}>1:00 PM</option>
                  <option value={"13:30:00+05:30"}>1:30 PM</option>
                  <option value={"14:00:00+05:30"}>2:00 PM</option>
                  <option value={"14:30:00+05:30"}>2:30 PM</option>
                  <option value={"15:00:00+05:30"}>3:00 PM</option>
                  <option value={"15:30:00+05:30"}>3:30 PM</option>
                  <option value={"16:00:00+05:30"}>4:00 PM</option>
                  <option value={"16:30:00+05:30"}>4:30 PM</option>
                  <option value={"17:00:00+05:30"}>5:00 PM</option>
                  <option value={"17:30:00+05:30"}>5:30 PM</option>
                  <option value={"18:00:00+05:30"}>6:00 PM</option>
                  <option value={"18:30:00+05:30"}>6:30 PM</option> */}
                </Select>
              </FormControl>
            )}

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                Your Name
              </FormLabel>
              <Input
                size="sm"
                type="text"
                variant="filled"
                focusBorderColor="brand.500"
                w={{ base: "100%", lg: "50%" }}
                value={formData?.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"400px"}>
                Your Country
              </FormLabel>
              {/* <Select
                w={{ base: "100%", lg: "50%" }}
                placeholder="Select country"
                variant={"outline"}
                value={formData?.country_id}
                onChange={(e) => {
                  setFormData({ ...formData, country_id: e.target.value });
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
                    width: "312px",
                  }),
                }}
                variant={"outline"}
                name="Countries"
                sx={{ padding: "0 10px" }}
                placeholder="Select Country"
                value={formData?.country}
                onChange={(e) => {
                  setFormData({ ...formData, country_id: e.value });
                  const callCode = countries.find(
                    (country) => country.id === parseInt(e.value)
                  )?.calling_code;
                  setCallingCode(callCode ?? "");
                }}
                loadOptions={countryOptions}
              ></AsyncSelect>
            </FormControl>

            {formData.country_id !== "" && (
              <FormControl
                as={Flex}
                direction={{ base: "column", md: "row" }}
                justify={"space-between"}
                isRequired
              >
                <FormLabel fontSize="sm" width={"200px"}>
                  Your Phone
                </FormLabel>
                <InputGroup
                  w={{ base: "100%", lg: "50%" }}
                  value={formData?.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                >
                  <InputLeftAddon
                    children={"+" + callingCode}
                    bg="gray.400"
                    size="sm"
                    px={2}
                    borderLeftRadius={"lg"}
                  />
                  <Input
                    size="sm"
                    type="tel"
                    variant="filled"
                    focusBorderColor="brand.500"
                    minLength={10}
                    maxLength={10}
                  />
                </InputGroup>
              </FormControl>
            )}

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                Your Email
              </FormLabel>
              <Input
                size="sm"
                type="email"
                variant="filled"
                focusBorderColor="brand.500"
                w={{ base: "100%", lg: "50%" }}
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" w="200px">
                Gender
              </FormLabel>
              <RadioGroup
                colorScheme={"brand"}
                value={formData?.gender}
                onChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <Flex justify="space-between" gap="12">
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                  <Radio value="Other">Other</Radio>
                </Flex>
              </RadioGroup>
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                Age Group
              </FormLabel>
              <Select
                size="sm"
                w={{ base: "100%", lg: "50%" }}
                placeholder="Select age group"
                value={formData?.age_group}
                onChange={(e) =>
                  setFormData({ ...formData, age_group: e.target.value })
                }
              >
                <option value="00 to 06">00 to 06</option>
                <option value="06 to 12">06 to 12</option>
                <option value="12 to 18">12 to 18</option>
                <option value="18 to 45">18 to 45</option>
                <option value="45 to 60">45 to 60</option>
                <option value="60+">60+</option>
              </Select>
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                What problem are you suffering from right now ?
              </FormLabel>
              <Select
                size="sm"
                w={{ base: "100%", lg: "50%" }}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problem_suffering_from: e.target.value,
                  })
                }
              >
                <option value="Other">Other</option>
                <option value="Acne & Pimples">Acne & Pimples</option>
                <option value="Athletics/Sports">Athletics/Sports</option>
                <option value="Child Care">Child Care</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Digestive Health">Digestive Health</option>
                <option value="Eye Care">Eye Care</option>
                <option value="Fertility Care">Fertility Care</option>
                <option value="Fever & Immunity">Fever & Immunity</option>
                <option value="Hairfall">Hairfall</option>
                <option value="Head & Body massage">Head & Body massage</option>
                <option value="Heart, BP & Cholestrol">
                  Heart, BP & Cholestrol
                </option>
                <option value="Joint, Muscle & Bone Care">
                  Joint, Muscle & Bone Care
                </option>
                <option value="Kapha relief">Kapha relief</option>
                <option value="Kidney & Liver Care">Kidney & Liver Care</option>
                <option value="Nervous & Stress">Nervous & Stress</option>
                <option value="Pitta relief">Pitta relief</option>
                <option value="Rejuvenation">Rejuvenation</option>
                <option value="Respiratory Health">Respiratory Health</option>
                <option value="Skin Health">Skin Health</option>
                <option value="Vata Relief">Vata Relief</option>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Women's Health">Women's Health</option>
              </Select>
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                Please Describe Your Problems
              </FormLabel>
              <Textarea
                size="sm"
                w={{ base: "100%", lg: "50%" }}
                rows={5}
                value={formData?.problem_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problem_description: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" width={"200px"}>
                Landmark
              </FormLabel>
              <Input
                size="sm"
                type="text"
                variant="filled"
                focusBorderColor="brand.500"
                placeholder="Area, City, State"
                w={{ lg: "50%" }}
                value={formData?.landmark}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    landmark: e.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
              isRequired
            >
              <FormLabel fontSize="sm" w="200px">
                Are you taking any medicine right now?
              </FormLabel>
              <RadioGroup
                colorScheme={"brand"}
                value={formData?.taking_any_medicine}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    taking_any_medicine: value,
                  })
                }
              >
                <Flex justify="space-between" gap="12">
                  <Radio value={"true"}>Yes</Radio>
                  <Radio value={"false"}>No</Radio>
                </Flex>
              </RadioGroup>
            </FormControl>

            <FormControl
              as={Flex}
              direction={{ base: "column", md: "row" }}
              justify={"space-between"}
            >
              <FormLabel fontSize="sm" w="200px">
                Which type of medicine are you currently taking?
              </FormLabel>
              <CheckboxGroup
                colorScheme="brand"
                value={formData?.type_of_medicine_list}
                onChange={(value) =>
                  setFormData({ ...formData, type_of_medicine_list: value })
                }
              >
                <SimpleGrid spacingX={[1, 8]} spacingY={2} columns={[1, 2]}>
                  <Checkbox value="Other">Other</Checkbox>
                  <Checkbox value="Ayurvedic">Ayurvedic</Checkbox>
                  <Checkbox value="Homoeopathic">Homoeopathic</Checkbox>
                  <Checkbox value="Allopathic">Allopathic</Checkbox>
                </SimpleGrid>
              </CheckboxGroup>
            </FormControl>

            <Button
              type="submit"
              bg="brand.900"
              color="white"
              w="50%"
              ms="auto"
              mt={4}
              _hover={{
                bg: "brand.900",
                boxShadow: "0px 3px 2.5px #0007",
              }}
              _active={{
                bg: "brand.500",
              }}
            >
              Book Appointment
              <ArrowForwardIcon ps={1} boxSize={6} />
            </Button>
          </Flex>
        </Container>
      </form>
      <Footer />
    </>
  );
}
