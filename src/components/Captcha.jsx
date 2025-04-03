import React, { useState } from "react";
import { Button, Input, Box, Text, VStack, useToast, Flex, FormControl, FormLabel, GridItem } from "@chakra-ui/react";
import { Select } from "chakra-react-select";

const Captcha = ({ onVerify }) => {
    const toast = useToast(); // Chakra UI toast hook
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
                description: "You have entered the correct sum.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top right",
            });
            onVerify(true);
        } else {
            toast({
                title: "Incorrect Answer!",
                description: "Please try again with a new CAPTCHA.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top right",
            });
            setNumbers(generateNumbers());
            setInput("");
            onVerify(false);
        }
    };

    return (
        <GridItem mt={3} mb={3}>
            <FormControl
                as={Flex}
                direction={{ base: "column", md: "row" }}
                align={{ md: "center", base: "start" }}
                isRequired
            >
                <FormLabel fontSize="sm" width={"130px"}>
                    Recaptcha
                </FormLabel>
                <Flex gap={2}>
                    <Text mt={1}>
                        {numbers.num1} + {numbers.num2}
                    </Text>
                    <Input
                        size="sm"
                        type="number"
                        variant="filled"
                        focusBorderColor="brand.500"
                        w={{ base: "100%", lg: "50%" }}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        bg="brand.900"
                        color="white"
                        size={"sm"}
                        onClick={handleVerify}>
                        Verify
                    </Button>
                </Flex>
            </FormControl>
        </GridItem>
    );
};

export default Captcha;
