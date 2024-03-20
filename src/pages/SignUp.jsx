import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import client from "../setup/axiosClient";
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
} from "@chakra-ui/react";
import isPasswordStrong from "../utils/passwordStrengthCheck";

export default function SignUp() {
    const [email, setEmail] = useState(null);
    const [mobileNo, setMobileNo] = useState(null);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const navigate = useNavigate();

    const passwordError = password !== confirmPassword;
    const passwordStrengthError = !isPasswordStrong(password);

    async function signUpUser(credentials) {
        client
            .post("/user/signup/", {
                email: credentials.email,
                first_name: credentials.firstName,
                last_name: credentials.lastName,
                password: credentials.password,
                confirm_password: credentials.confirmPassword,
                mobile_no: "+91" + credentials.mobileNo,
            })
            .then((response) => {
                if (response.data.status) {
                    toast({
                        title: "Your account has been created!",
                        position: "top-right",
                        status: "success",
                        duration: 3000,
                        isClosable: true,
                    });
                    navigate("/login", { replace: true });
                } else {
                    toast({
                        title: "Unable to create user account!",
                        description: `${response.data.message}`,
                        position: "top-right",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
            .catch((error) => {
                toast({
                    title: "Unable to create user account!",
                    description: `${error.response.data.message}`,
                    position: "top-right",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (passwordStrengthError) {
            toast({
                title: "The current password is not strong!",
                position: "top-right",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        if (password !== confirmPassword) {
            toast({
                title: "Please enter same password in both password fields",
                position: "top-right",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
            return;
        }
        await signUpUser({
            email,
            firstName,
            lastName,
            password,
            confirmPassword,
            mobileNo,
        });
        setLoading(false);
    };

    return (
        <>
            <Navbar />
            <Container maxW="lg">
                <form onSubmit={handleSubmit}>
                    <Stack
                        spacing={6}
                        px={{ base: 8, sm: 16 }}
                        pt={{ base: 8, sm: 16 }}
                        pb={{ base: 4, sm: 2 }}
                    >
                        <FormControl id="email" autoComplete="off">
                            <FormLabel size={"sm"}>Your email</FormLabel>
                            <Input
                                isRequired
                                type="email"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                autoComplete="none"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="phone" autoComplete="off">
                            <FormLabel size={"sm"}>Your phone number</FormLabel>
                            <InputGroup>
                                <InputLeftAddon
                                    children="+91"
                                    p={1}
                                    border="1px"
                                    bg="gray.300"
                                    borderStartRadius={"md"}
                                />
                                <Input
                                    isRequired
                                    type="tel"
                                    variant={"solid"}
                                    minLength={10}
                                    maxLength={10}
                                    border="1px"
                                    borderColor={"brand.900"}
                                    autoComplete="none"
                                    onChange={(e) =>
                                        setMobileNo(e.target.value)
                                    }
                                />
                            </InputGroup>
                        </FormControl>
                        <FormControl id="first-name">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                isRequired
                                type="text"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                autoComplete="off"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="last-name">
                            <FormLabel>Last Name</FormLabel>
                            <Input
                                isRequired
                                type="text"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                autoComplete="off"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl
                            id="password"
                            isInvalid={passwordStrengthError}
                        >
                            <FormLabel>Password</FormLabel>
                            <Input
                                isRequired
                                type="password"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {!passwordStrengthError ? null : (
                                <FormErrorMessage>
                                    Password should be 8 characters long and
                                    should contain 1 uppercase letter, 1
                                    lowercase letter, 1 number, 1 special
                                    character (!@#$_.~-)
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl
                            id="confirmpassword"
                            isInvalid={passwordError}
                        >
                            <FormLabel>Confirm Password</FormLabel>
                            <Input
                                isRequired
                                type="password"
                                variant={"solid"}
                                border="1px"
                                borderColor={"brand.900"}
                                autoComplete="off"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {!passwordError ? null : (
                                <FormErrorMessage>
                                    Passwords do not match
                                </FormErrorMessage>
                            )}
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="brand"
                            isLoading={loading}
                        >
                            Sign Up
                        </Button>
                    </Stack>
                    <Stack
                        direction={{ base: "column", sm: "row" }}
                        pb={10}
                        align={"start"}
                        justify={"center"}
                    >
                        <Link href="/login" fontSize={"sm"} color={"brand.500"}>
                            Already have an account?
                        </Link>
                    </Stack>
                </form>
            </Container>
            <Footer />
        </>
    );
}
