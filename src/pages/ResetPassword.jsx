import {
    Container,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import client from "../setup/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

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
                navigate("/login");
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
                title: `${error.response.data.message}`,
                position: "top-right",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendResetPasswordRequest();
    };

    return (
        <>
            <Navbar />
            <Container py={10}>
                <Heading size="lg" color="brand.500" py={4}>
                    Forgot Password
                </Heading>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Stack spacing={6}>
                        <FormControl id="email" isRequired>
                            <FormLabel>
                                Enter your registered email address
                            </FormLabel>
                            <Input
                                type="email"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="Email"
                                autoComplete="username"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Button
                            isLoading={loading}
                            colorScheme="brand"
                            type="submit"
                        >
                            Send Reset Code
                        </Button>
                    </Stack>
                </form>
            </Container>
            <Footer />
        </>
    );
}
