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
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import client from "../../setup/axiosClient";
import { useNavigate } from "react-router-dom";
import { isEmpty } from "lodash";

export default function ResetPasswordForm() {
    const [loading, setLoading] = useState(false);
    const [newPasswords, setNewPasswords] = useState({
        new_password: null,
        confirm_password: null,
    });
    const toast = useToast();
    const navigate = useNavigate();
    const params = useParams();

    if (isEmpty(params)) {
        navigate("/");
    }

    async function sendResetPasswordResetRequest() {
        try {
            const response = await client.post(
                `/user/reset-password/${params.resetUUID}/`,
                { ...newPasswords }
            );
            if (response.data.status) {
                toast({
                    title: response.data.message,
                    position: "top-right",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/");
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

    const handleChange = (e) => {
        setNewPasswords({
            ...newPasswords,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await sendResetPasswordResetRequest();
    };

    return (
        <>
            <Navbar />
            <Container py={10}>
                <Heading size="lg" color="brand.500" py={4}>
                    Reset your password
                </Heading>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <Stack spacing={6}>
                        <FormControl id="email" isRequired>
                            <FormLabel>New password</FormLabel>
                            <Input
                                type="password"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="New password"
                                autoComplete="new-password"
                                name="new_password"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Confirm password</FormLabel>
                            <Input
                                type="password"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                placeholder="Confirm password"
                                autoComplete="new-password"
                                name="confirm_password"
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            colorScheme="brand"
                            type="submit"
                            isLoading={loading}
                        >
                            Reset password
                        </Button>
                    </Stack>
                </form>
            </Container>
            <Footer />
        </>
    );
}
