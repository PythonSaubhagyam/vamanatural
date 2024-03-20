import { Box } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

export default function DataNotFound() {
  return (
    <Box textAlign="center" py={20} px={6}>
      <WarningTwoIcon boxSize={"50px"} color={"orange.300"} />
      <Box mt={5} mb={2}>
        <span style={{ fontSize: 22, fontWeight: 600 }}>Data not found !</span>
      </Box>
    </Box>
  );
}
