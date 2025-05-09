import { useRef, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  useToast,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import checkOrSetUDID from "../utils/checkOrSetUDID";
import client from "../setup/axiosClient";
import LoginModal from "../components/LoginModal";
import MetaTags from "../context/MetaTagsContext";
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const loginInfo = checkLogin();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);

  async function changePasswordRequest() {
    setLoading(true);
    try {
      const response = await client.post(
        "/user/change-password/",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );

      if (response.data.status === true) {
        toast({
          title: response.data.message,
          position: "top-right",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/");
        localStorage.clear();
        setIsLoginModalOpen(true);
        await checkOrSetUDID();
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
        title: error.response?.data?.message || "An error occurred",
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
    await changePasswordRequest();
  };

  const pageUrl = "/update-password";

  return (
    <>
      <MetaTags pageUrl={pageUrl} />
      <Navbar />
      <Container maxW="lg" my={12} py={8} px={6} boxShadow="2xl" borderRadius="xl" >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <VStack spacing={6} as="form" onSubmit={handleSubmit}>
            <Heading size="lg" color="#5b5b5b">Change Password</Heading>
            <Text color="gray.500">Ensure your new password is strong and unique.</Text>

            <FormControl isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input
                type="password"
                borderColor="blue.300"
                placeholder="Enter current password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>New Password</FormLabel>
              <Input
                type="password"
                borderColor="blue.300"
                placeholder="Enter new password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input
                type="password"
                borderColor="blue.300"
                placeholder="Confirm new password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>

            <Box align="center" mt={4}>
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.REACT_reCAPTCHA_KEY}
                onChange={() => setVerified(true)}
                onExpired={() => setVerified(false)}
              />
            </Box>

            <Button
              w="100%"
              colorScheme="brand"
              isDisabled={!verified}
              isLoading={loading}
              loadingText="Changing..."
              type="submit"
              mt={4}
            >
              Update Password
            </Button>
          </VStack>
        </motion.div>
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
