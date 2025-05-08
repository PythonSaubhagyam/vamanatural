import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import client from "../setup/axiosClient";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import LoginModal from "../components/LoginModal";
import MetaTags from "../context/MetaTagsContext";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  async function sendResetPasswordRequest() {
    try {
      const response = await client.post("/user/reset-password/", {
        email: email,
      });
      if (response.data.status) {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        setEmail(""); // ✅ Clear the field
        setIsLoginModalOpen(true);
      } else {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: error.response?.data?.message || "Something went wrong",
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await sendResetPasswordRequest();
  };

  const pageUrl = "/reset-password";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="md" py={10}>
        <Box
          p={8}
          boxShadow="lg"
          borderRadius="xl"
          bg="white"
          border="1px solid"
          borderColor="gray.100"
        >
          <Box textAlign="center" mb={6}>
            <Heading size="lg" color="#5b5b5b">
              Forgot Password
            </Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email" isRequired>
                <FormLabel>Registered Email Address</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  focusBorderColor="green.500"
                  borderRadius="md"
                  placeholder="you@example.com"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button
                colorScheme="brand"
                type="submit"
                isLoading={loading}
                loadingText="Sending..."
                borderRadius="full"
              >
                Send Reset Code
              </Button>
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
