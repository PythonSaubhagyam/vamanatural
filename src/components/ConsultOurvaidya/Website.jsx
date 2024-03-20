import Navbar from "../Navbar";
import Footer from "../Footer";
import {
    Text,
    Flex,
    Box,
    Container,
    Spacer
} from "@chakra-ui/react";

export default function Website() {
  return (
    <>
      <Navbar />
      <Container maxW={"container.lg"}>
        <Flex>
          <Box>
            <Text fontSize={"4xl"}>Schedule an Appointment</Text>
          </Box>
          <Spacer />
        </Flex>
      </Container>
      <Footer />
    </>
  );
}
