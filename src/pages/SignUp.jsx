import { useEffect, useState, useRef } from "react";
import {
  useToast,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  FormErrorMessage,
  Button,
  Link,
  Box,
  Heading,
} from "@chakra-ui/react";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginModal from "../components/LoginModal";
import MetaTags from "../context/MetaTagsContext";
import client from "../setup/axiosClient";
import isPasswordStrong from "../utils/passwordStrengthCheck";
import checkLogin from "../utils/checkLogin";

const SITE_KEY = "your-site-key";

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.email.includes("@")) errs.email = "Invalid email format";
    if (form.mobileNo.length !== 10) errs.mobileNo = "Mobile number must be 10 digits";
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.lastName) errs.lastName = "Last name is required";
    if (!isPasswordStrong(form.password))
      errs.password =
        "Password must be 8+ chars, 1 uppercase, 1 lowercase, 1 number & 1 symbol";
    if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";

    setErrors(errs);
    Object.entries(errs).forEach(([key, msg]) =>
      toast({
        title: `${msg}`,
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    );
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRecaptcha = (token) => {
    if (token) setVerified(true);
  };

  const signUpUser = async () => {
    try {
      const res = await client.post("/user/signup/", {
        email: form.email,
        first_name: form.firstName,
        last_name: form.lastName,
        password: form.password,
        confirm_password: form.confirmPassword,
        mobile_no: "+91" + form.mobileNo,
      });

      if (res.data.status) {
        toast({
          title: "Your account has been created!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        // ✅ Reset form
        setForm({
          email: "",
          mobileNo: "",
          firstName: "",
          lastName: "",
          password: "",
          confirmPassword: "",
        });
        setErrors({});
        setVerified(false);
        recaptchaRef.current.reset();

        setIsLoginModalOpen(true);
      } else {
        throw new Error(res.data.message);
      }
    } catch (err) {
      toast({
        title: "Sign-up failed!",
        description: err.message || "Something went wrong.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    if (!verified) {
      await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();
    } else {
      await signUpUser();
    }
    setLoading(false);
  };

  const pageUrl = "/signup";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="lg" py={10}>
        <Box
          p={8}
          boxShadow="lg"
          borderRadius="xl"
          bg="white"
          border="1px solid"
          borderColor="gray.100"
        >
          <Box textAlign="center" mb={6}>
            <Heading size="lg" color="#5b5b5b">Create Your Account</Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email" isRequired isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl id="mobileNo" isRequired isInvalid={errors.mobileNo}>
                <FormLabel>Mobile Number</FormLabel>
                <InputGroup>
                  <InputLeftAddon
                    children="+91"
                    bg="gray.100"
                    border="1px solid"
                    borderColor="gray.300"
                    borderRadius="md"
                    px={2}
                    py={4}
                  />
                  <Input
                    variant="filled"
                    focusBorderColor="green.500"
                    borderRadius="md"
                    type="tel"
                    name="mobileNo"
                    value={form.mobileNo}
                    onChange={handleChange}
                    maxLength={10}
                  />
                </InputGroup>
                <FormErrorMessage>{errors.mobileNo}</FormErrorMessage>
              </FormControl>

              <FormControl id="firstName" isRequired isInvalid={errors.firstName}>
                <FormLabel>First Name</FormLabel>
                <Input
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>

              <FormControl id="lastName" isRequired isInvalid={errors.lastName}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.lastName}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" isRequired isInvalid={errors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl
                id="confirmPassword"
                isRequired
                isInvalid={errors.confirmPassword}
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Box pt={2}>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // test key
                  onChange={() => setVerified(true)}
                  onExpired={() => setVerified(false)}
                />
              </Box>

              <Button
                mt={4}
                size="lg"
                colorScheme="brand"
                type="submit"
                isLoading={loading}
                isDisabled={!verified}
                borderRadius="full"
              >
                Sign Up
              </Button>

              <Link
                href="/login"
                fontSize="sm"
                color="#5b5b5b"
                textAlign="center"
                _hover={{ textDecoration: "underline" }}
              >
                Already have an account? Log in
              </Link>
            </Stack>
          </form>

        </Box>
      </Container>

      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
      <Footer />
    </>
  );
}
