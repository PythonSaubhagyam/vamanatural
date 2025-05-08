import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Link,
  useToast,
  Box,
  Heading,
} from "@chakra-ui/react";
import checkLogin from "../utils/checkLogin";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import CartEmitter from "../components/EventEmitter";
import MetaTags from "../context/MetaTagsContext";

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const loginInfo = checkLogin();
    if (loginInfo.isLoggedIn) {
      navigate("/");
    } // eslint-disable-next-line
  }, []);

  async function loginUser(credentials) {
    const checkOrSetUDIDInfo = await CheckOrSetUDID();
    try {
      client
        .post(
          "/user/signin/",
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              visitor: checkOrSetUDIDInfo.visitor_id,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          if (response.data.status) {
            toast({
              title: "Login successfully!",
              position: "top-right",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            CartEmitter.emit("updateProductTotal", true);

            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem(
              "first_name",
              response.data.data?.first_name.toString()
            );
            localStorage.setItem(
              "last_name",
              response.data.data?.last_name?.toString() || null
            );
            localStorage.setItem(
              "email",
              response.data.data?.email?.toString() || null
            );
            localStorage.setItem(
              "phone_no",
              response.data.data?.phone_no?.toString() || null
            );
            localStorage.setItem(
              "cart_counter",
              response.data.data?.cart_counter
            );
            localStorage.setItem(
              "product_total",
              response.data.data?.cart_totals?.final_total
            );
            localStorage.setItem(
              "wishlist_counter",
              response.data.data?.wishlist_counter
            );
            localStorage.setItem(
              "allow_company_list",
              JSON.stringify(response.data?.allow_company_list)
            );
            localStorage.setItem(
              "is_sose_elite_user",
              response.data.data?.is_sose_elite_user
            );
            if (
              response.data.data.is_staff ||
              response.data.data.is_superuser
            ) {
              localStorage.setItem("id", response.data.data.id);
              localStorage.setItem("access", true);
              navigate("/shop", { replace: true });
            } else {
              setTimeout(() => {
                navigate("/shop", { replace: true });
              }, 1000);
            }
          } else {
            setLoading(false);
            toast({
              title: `${response.data.non_field_errors}`,
              position: "top-right",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          toast({
            title: error.response.data.message
              ? error.response.data.message
              : "Please try again later!",
            position: "top-right",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    } catch (error) {
      setLoading(false);
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
    setLoading(true);
    e.preventDefault();
    await loginUser({
      email,
      password,
    });
  };
  const pageUrl = "/login";


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
          <Box textAlign="center" mb={6} color="#5b5b5b">
            <Heading size="lg" >Welcome Back</Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <Stack spacing={5}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  variant="filled"
                  borderRadius="md"
                  focusBorderColor="green.500"
                  placeholder="you@example.com"
                  autoComplete="username"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  variant="filled"
                  borderRadius="md"
                  focusBorderColor="green.500"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              

              <Button
                colorScheme="brand"
                type="submit"
                size="lg"
                isLoading={loading}
                loadingText="Logging in..."
                borderRadius="full"
              >
                Login
              </Button>

              <Stack
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                pt={2}
                color="#5b5b5b"
              >
                <Link href="/signup" fontSize="sm" >
                  Don't have an account?
                </Link>
                <Link href="/reset-password" fontSize="sm" >
                  Forgot password?
                </Link>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Container>

      <Footer />
    </>
  );
}
