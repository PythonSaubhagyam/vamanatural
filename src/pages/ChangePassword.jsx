import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import checkLogin from "../utils/checkLogin";
import checkOrSetUDID from "../utils/checkOrSetUDID";
import client from "../setup/axiosClient";
import LoginModal from "../components/LoginModal";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const toast = useToast();
  const loginInfo = checkLogin();
  const navigate = useNavigate();

  async function changePasswordRequest() {
    try {
      const response = await client.post(
        "/user/change-password/",
        {
          old_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
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
          position: "top-right",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        localStorage.clear();
        setIsLoginModalOpen(true)
        await checkOrSetUDID();
      } else {
        toast({
          title: `${response.data.message}`,
          position: "top-right",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: `${error}`,
        position: "top-right",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePasswordRequest();
  };

  return (
    <>
      <Navbar />
      <Container>
        <form onSubmit={handleSubmit}>
          <Stack spacing={6} p={{ base: 8, sm: 20 }}>
            <FormControl id="current-password">
              <FormLabel>Current Password</FormLabel>
              <Input
                isRequired
                type="password"
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                placeholder="Current Password "
                autoComplete="current-password"
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="new-password">
              <FormLabel>New Password</FormLabel>
              <Input
                isRequired
                type="password"
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                placeholder="New Password"
                autoComplete="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </FormControl>
            <FormControl id="confirm-password">
              <FormLabel>Confirm Password</FormLabel>
              <Input
                isRequired
                type="password"
                variant={"solid"}
                border="1px"
                borderColor={"brand.900"}
                placeholder="New Password"
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </FormControl>
            <Button w={"100%"} colorScheme="brand" type="submit">
              Change Password
            </Button>
          </Stack>
        </form>
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
