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
} from "@chakra-ui/react";
import checkLogin from "../utils/checkLogin";
import CheckOrSetUDID from "../utils/checkOrSetUDID";

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
                            visitor: CheckOrSetUDID().visitor_id,
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
                        });
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
                            navigate("/", { replace: true });
                        } else {
                            setTimeout(() => {
                                navigate("/", { replace: true });
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

    return (
        <>
            <Navbar />
            <Container>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={6} p={{ base: 8, sm: 20 }}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                isRequired
                                type="email"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="Email"
                                autoComplete="username"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                isRequired
                                type="password"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="Password"
                                autoComplete="current-password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            isLoading={loading}
                            loadingText="Logging..."
                            type="submit"
                            colorScheme="brand"
                        >
                            Login
                        </Button>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Link
                                    href="/signup"
                                    fontSize={"sm"}
                                    color={"brand.500"}
                                >
                                    Don't have an account?
                                </Link>
                                <Link
                                    href="/reset-password"
                                    fontSize={"sm"}
                                    color={"brand.500"}
                                >
                                    Forgot password?
                                </Link>
                            </Stack>
                        </Stack>
                    </Stack>
                </form>
            </Container>
            <Footer />
        </>
    );
}
