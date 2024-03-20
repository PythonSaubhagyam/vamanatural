import { Box, Text, Badge, useRadio, chakra } from "@chakra-ui/react";

export default function ShippingAddressSelectionCard(props) {
  const { address, ...radioProps } = props;
  const { state, getInputProps, getCheckboxProps, htmlProps, getLabelProps } =
    useRadio(radioProps);

  return (
    <chakra.label {...htmlProps} cursor="pointer">
      <input {...getInputProps({})} hidden />
      <Box
        {...getCheckboxProps()}
        bg={state.isChecked ? "green.200" : "transparent"}
        w={"full"}
        minW="300px"
        h="175px"
        border="1px"
        p={2}
      >
        <Box {...getLabelProps()}>
          <Text fontSize="md">
            {address.full_name}
            {address.address_tags && (
              <Badge bg="brand.900" color="white" mx={4}>
                {address?.address_tags}
              </Badge>
            )}
          </Text>
          <Text fontSize="xs" mb={4}>
            {address?.mobile}
          </Text>
          <Text fontSize="sm">
            {address?.address_line_1} <br />
            {address?.address_line_2} <br />
            {address?.landmark} <br />
            {address?.city_obj.name}, {address?.state_obj.name},{" "}
            {address?.country_obj.name}
          </Text>
          <Text fontSize="sm">{address?.postal_code}</Text>
        </Box>
      </Box>
    </chakra.label>
  );
}
