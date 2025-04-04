import React, { useState } from "react";
import { Button, Input, GridItem, Text, Flex, FormControl, FormLabel, Image, useToast, useMediaQuery } from "@chakra-ui/react";

const Captcha = ({ onVerify }) => {
    const toast = useToast();
    const [isMobile] = useMediaQuery("(max-width: 1024px)");
    const generateNumbers = () => ({
        num1: Math.floor(1 + Math.random() * 9),
        num2: Math.floor(1 + Math.random() * 9),
    });

    const [numbers, setNumbers] = useState(generateNumbers());
    const [input, setInput] = useState("");

    const handleVerify = () => {
        if (parseInt(input) === numbers.num1 + numbers.num2) {
            toast({
                title: "Captcha Verified!",
                description: "You have entered the correct reCAPTCHA.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            onVerify(true);
        } else {
            toast({
                title: "Incorrect Answer!",
                description: "Please try again with a new reCAPTCHA.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            setNumbers(generateNumbers());
            setInput("");
            onVerify(false);
        }
    };

    return (
        <GridItem mt={3} mb={3}>
            <FormControl as={Flex} align="center" justifyContent={"start"} gap={2}>
                <FormLabel
                    fontSize="sm"
                    cursor="pointer"
                    onClick={() => setNumbers(generateNumbers())}
                    userSelect="none"
                    _focus={{ outline: "none" }}
                    _active={{ bg: "transparent" }}
                >
                    <Image src="/recaptcha.png" alt="Captcha" w="70px" />
                </FormLabel>

                <Text mt={1} whiteSpace={"nowrap"} ml={isMobile ? "0" : "15%"} >
                    {numbers.num1} + {numbers.num2}
                </Text>
                <Input
                    size="sm"
                    type="number"
                    variant="filled"
                    focusBorderColor="brand.500"
                    w={"120px"}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button bg="brand.900" p={"4"} color="white" size="sm" onClick={handleVerify}>
                    Verify
                </Button>

            </FormControl>
        </GridItem>
    );
};

export default Captcha;
