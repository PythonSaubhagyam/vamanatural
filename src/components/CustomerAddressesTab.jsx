// File: components/CustomerAddressesTab.js
import { Box, Button, Flex, Text, VStack, Icon, ScaleFade } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import CustomerAddressRow from "./CustomerAddressRow";
import { MdLocationOn } from "react-icons/md";

const MotionBox = motion(Box);

export default function CustomerAddressesTab({ addresses, getDetails }) {
  return (
    <VStack spacing={6} align="stretch" w="full">
      <Flex justify="flex-end">
        <Button
          as={ReactRouterLink}
          to="/profile/addresses/add"
          colorScheme="brand"
          size="md"
          leftIcon={<AddIcon boxSize={3} />}
          px={6}
          borderRadius="xl"
          boxShadow="sm"
          transition="all 0.2s"
          _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
        >
          Add Address
        </Button>
      </Flex>

      {addresses?.length > 0 ? (
        <ScaleFade initialScale={0.9} in={true}>
          <VStack spacing={4} w="full">
            {addresses.map((address, index) => (
              <MotionBox
                key={address.id}
                minH="120px"
                w="full"
                p={5}
                border="1px"
                borderColor="gray.200"
                borderRadius="xl"
                bg="white"
                boxShadow="base"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                <CustomerAddressRow address={address} getDetails={getDetails} />
              </MotionBox>
            ))}
          </VStack>
        </ScaleFade>
      ) : (
        <Flex
          align="center"
          justify="center"
          direction="column"
          py={8}
          border="2px dashed"
          borderColor="gray.300"
          borderRadius="xl"
          as={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Icon as={MdLocationOn} w={10} h={10} color="gray.400" mb={3} />
          <Text fontSize="md" color="gray.600">
            No addresses added yet.
          </Text>
        </Flex>
      )}
    </VStack>
  );
}