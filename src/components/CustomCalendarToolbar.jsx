import { Navigate as navigate } from "react-big-calendar";
import { Flex, Button, Text } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function CustomCalendarToolbar({ onNavigate, label }) {
  const goToToday = () => onNavigate(navigate.TODAY);
  const goToNext = () => onNavigate(navigate.NEXT);
  const goToPrev = () => onNavigate(navigate.PREVIOUS);

  return (
    <Flex w="50vw" mb={6}>
      <Flex me="auto" gap={2}>
        <Button
          onClick={() => goToPrev()}
          bg="brand.900"
          color="white"
          _hover={{ bg: "brand.500" }}
          border="1px"
          borderColor={"brand.900"}
        >
          <ChevronLeftIcon />
          Previous
        </Button>
        <Button
          onClick={() => goToToday()}
          bg="brand.900"
          color="white"
          _hover={{ bg: "brand.500" }}
          border="1px"
          borderColor={"brand.500"}
          boxShadow="2px 2px 2px #0007"
        >
          Today
        </Button>
        <Button
          onClick={() => goToNext()}
          bg="brand.900"
          color="white"
          _hover={{ bg: "brand.500" }}
          border={"1px"}
          borderColor="brand.900"
        >
          Next
          <ChevronRightIcon />
        </Button>
      </Flex>
      <Text>{label}</Text>
    </Flex>
  );
}

export default CustomCalendarToolbar;
