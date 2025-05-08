// File: components/ProfileDetailsCard.js
import {
    Box,
    Flex,
    Avatar,
    Text,
    Icon,
    Button,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import { BsPatchCheckFill } from "react-icons/bs";
  import { EmailIcon, PhoneIcon } from "@chakra-ui/icons";
  import { useNavigate } from "react-router-dom";
  import { motion } from "framer-motion";
  
  const MotionFlex = motion(Flex);
  
  export default function ProfileDetailsCard({ details, onOpen }) {
    const navigate = useNavigate();
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <MotionFlex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        gap={6}
        py={6}
        px={4}
        bg="white"
        borderRadius="2xl"
        boxShadow="lg"
        transition="all 0.3s ease"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Flex
          align="center"
          gap={{ base: 4, md: 10 }}
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "start" }}
        >
          <Avatar size="2xl" src={details?.profile_pic || undefined} name={details?.first_name} />
          <Box>
            <Flex align="center" fontSize="2xl" fontWeight="bold" gap={2}>
              {[details?.first_name, details?.last_name].join(" ")}
              {details?.is_subscribed && (
                <Icon as={BsPatchCheckFill} color="brand.500" />
              )}
            </Flex>
            <Text fontSize="md" color="gray.600">
              {details.company ?? "Company Name"}
            </Text>
            <Text fontSize="sm" color="gray.500" pt={3}>
              <EmailIcon me={2} />
              {details?.email ?? "Not added"}
            </Text>
            <Text fontSize="sm" color="gray.500" pt={2}>
              <PhoneIcon me={2} />
              {details?.mobile_no || "Not added"}
            </Text>
          </Box>
        </Flex>
        <Flex direction="column" gap={3} w={isMobile ? "100%" : "auto"}>
          <Button
            colorScheme="brand"
            w={isMobile ? "100%" : "auto"}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            onClick={() => navigate("/profile/edit", { replace: true, state: { details } })}
          >
            Update Profile
          </Button>
          <Button
            colorScheme="brand"
            variant="outline"
            w={isMobile ? "100%" : "auto"}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            onClick={() => navigate("/update-password")}
          >
            Change Password
          </Button>
          <Button
            colorScheme="red"
            w={isMobile ? "100%" : "auto"}
            _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
            onClick={onOpen}
          >
            Deactivate Account
          </Button>
        </Flex>
      </MotionFlex>
    );
  }