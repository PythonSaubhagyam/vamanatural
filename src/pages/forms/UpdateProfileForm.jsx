import { useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  HStack,
  // Avatar,
  // Center,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import client from "../../setup/axiosClient";
import checkLogin from "../../utils/checkLogin";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useDayzed } from "dayzed";

export default function UpdateProfileForm() {
  const location = useLocation();
  const userDetails = location.state !== null ? location.state?.details : null;
  console.log(userDetails.mobile_no)
  const [formData, setFormData] = useState({
    first_name: userDetails?.first_name ?? null,
    last_name: userDetails?.last_name ?? null,
    company: userDetails?.company ?? null,
    email: userDetails?.email ?? null,
    mobile_no: userDetails?.mobile_no ?? null,
  });
  const loginInfo = checkLogin();
  const toast = useToast();
  const navigate = useNavigate();

  // useEffect(() => {
  //   try {
  //     async function getdetails() {
  //       const response = await client.get(`/user/profile/${profileId}`, {
  //         headers: { Authorization: `token ${loginInfo.token}` },
  //       });
  //       if (response.data.status) {
  //         setUserDetails(response.data.data);
  //       } else {
  //         toast({
  //           title: "There was error loading user details",
  //           description: "Please reload the page..",
  //           position: "top-right",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     }
  //     getdetails();
  //     async function updatedetails(data) {
  //       const response = await client.patch(
  //         `/user/profile/${profileId?.id}`,
  //         { ...data },
  //         {
  //           headers: { Authorization: `token ${loginInfo.token}` },
  //         }
  //       );
  //       if (response.data.status) {
  //         toast({
  //           title: "Updated successful!",
  //           position: "top-right",
  //           status: "success",
  //           duration: 2000,
  //           isClosable: true,
  //         });
  //         navigate(`/user/profile`, { replace: true });
  //       } else {
  //         toast({
  //           title: `${response.data.non_field_errors}`,
  //           position: "top-right",
  //           status: "error",
  //           duration: 5000,
  //           isClosable: true,
  //         });
  //       }
  //     }
  //     updatedetails();
  //   } catch (error) {
  //     toast({
  //       title: `${error.response.data[0]}`,
  //       position: "top-right",
  //       status: "error",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   }
  // }, []);
  async function updateDetails(data) {
    try {
      console.log(formData?.mobile_no.length)
      if (formData?.mobile_no.length < 12) {
        toast({
          title: `Please enter valid mobile number`,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return null ;
      }
      const response = await client.patch(
        "/user/profile/",
        { ...data },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (response.data.status) {
        toast({
          title: "Profile updated successfully!",
          position: "top-right",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        localStorage.setItem("first_name", response.data.data.first_name);
        localStorage.setItem("last_name", response.data.data.last_name);
        navigate("/profile", { replace: true });
      } else {
        toast({
          title: `${response.data.non_field_errors}`,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `${error.response.data.message}`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    await updateDetails(formData);
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
          spacing={4}
          w={"full"}
          maxW={"lg"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          border="2px"
          borderColor="gray.200"
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Update Profile
          </Heading>
          <Stack spacing={4}>
            <HStack justify={"space-between"}>
              <Box>
                <FormControl id="firstName">
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    variant={"solid"}
                    border="1px"
                    borderColor={"brand.900"}
                    defaultValue={formData?.first_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        first_name: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    variant={"solid"}
                    border="1px"
                    borderColor={"brand.900"}
                    defaultValue={formData?.last_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        last_name: e.target.value,
                      })
                    }
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="company name">
              <FormLabel>Company Name</FormLabel>
              <Input
                type="text"
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                defaultValue={formData?.company}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    company: e.target.value,
                  })
                }
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                readOnly
                disabled
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                defaultValue={formData?.email}
              />
            </FormControl>
            <FormControl id="mobile">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                type="tel"
                maxLength={13}
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                value={formData?.mobile_no}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    mobile_no: e.target.value,
                  });
                }}
              />
            </FormControl>
          </Stack>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              type="submit"
              bg={"brand.500"}
              color={"white"}
              w="full"
              _hover={{
                bg: "brand.100",
              }}
            >
              Update
            </Button>
            <Button
              bg={"red.500"}
              color={"white"}
              w="full"
              onClick={() => navigate(-1)}
              _hover={{
                bg: "red.700",
              }}
            >
              Discard
            </Button>
          </Stack>
        </Stack>
      </Flex>

      <Footer />
    </>
  );
}
