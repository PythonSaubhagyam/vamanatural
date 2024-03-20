import {
    AbsoluteCenter,
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
} from "@chakra-ui/react";

export default function ErrorPopup({ err }) {
  return (
    <Box position="relative" h="200px" style={{ marginTop: "80px" }}>
      <AbsoluteCenter bg="white" axis="both">
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          width="400px"
          style={{ borderRadius: "8px" }}
        >
          <AlertIcon boxSize="40px" mr={0} />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Something went wrong!
          </AlertTitle>
          <AlertDescription maxWidth="sm">{err}</AlertDescription>
        </Alert>
      </AbsoluteCenter>
    </Box>
  );
}
