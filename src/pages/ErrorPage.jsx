import { useRouteError, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Center, Heading, Box, Text, Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  console.error(error);

  return (
    <>
      <Navbar />
      <Center gap={6} h="calc(100vh - 250px)" flexDirection={"column"}>
        <Heading size="lg" color="brand.500">
          Oops!
        </Heading>
        <Box textAlign={"center"}>
          <Text fontSize="lg" mb={2}>
            Sorry, an unexpected error has occurred.
          </Text>
          <Text fontStyle={"italic"} fontSize="md" color="gray.500">
            {window.location.pathname === "/page-not-found"
              ? "Page not found"
              : error.statusText || error.message}
          </Text>
        </Box>
        <Button colorScheme={"brand"} onClick={() => navigate(-1)}>
          <ArrowBackIcon me={2} />
          Back to previous page
        </Button>
      </Center>
    </>
  );
}
