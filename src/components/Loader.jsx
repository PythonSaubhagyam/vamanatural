import { Spinner, Flex, AspectRatio, CircularProgress } from "@chakra-ui/react";

export default function Loader({ site, size }) {
  if (site === true) {
    return (
      <Flex
        bg="brand.500"
        p="4"
        borderRadius={"2xl"}
        justify={"center"}
        align="center"
      >
        <AspectRatio w="5vh" minW="2.5vh" ratio={1}>
          <Spinner
            color={"brand.500"}
            size={size ?? "lg"}
            thickness="4px"
            speed="0.5s"
            emptyColor="gray.200"
          />  
        </AspectRatio>
      </Flex>
    );
  } else {
    return (
      <CircularProgress
        isIndeterminate
        color="brand.900"
        speed="0.65s"
        emptyColor="gray.200"
      />
    );
  }
}
