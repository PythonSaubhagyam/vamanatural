// components/AmountTable.js
import {
    Box,
    Heading,
    Divider,
    Table,
    Tbody,
    Tr,
    Td,
    FormControl,
    FormLabel,
    Input,
    Button,
    ButtonGroup,
    Flex,
    useToast,
  } from "@chakra-ui/react";
  import { EditIcon } from "@chakra-ui/icons";
  import { RiDeleteBin5Line } from "react-icons/ri";
  import { useRef } from "react";
  
  export default function AmountTable({
    cartItems,
    total,
    taxes,
    discount,
    grandTotal,
    isMobile,
    voucherCode,
    setVoucherCode,
    voucherApplied,
    setVoucherApplied,
    checkVoucherCodeAvailability,
    checkingVoucherCode,
    getCart
  }) {
    const voucherCodeRef = useRef(null);
    const toast = useToast();
  
    return cartItems.length > 0 ? (
      <Box
        w={{ md: "25%", base: "320px" }}
        border="1px"
        borderColor="gray.100"
        py={{ base: 4, md: 10 }}
        mt={8}
        mr={{ md: 13, base: 6 }}
        h="fit-content"
        ms={isMobile ? "auto" : "0"}
      >
        <Heading fontWeight="normal" size="md" pb={4} ps={{ base: 2, md: 6 }}>
          Order Total
        </Heading>
        <Divider orientation="horizontal" />
        <Table w="100%" size={{ base: "sm", md: "md" }}>
          <Tbody>
            <Tr>
              <Td fontSize="sm">Subtotal:</Td>
              <Td isNumeric>₹{total.toFixed(2)}</Td>
            </Tr>
            <Tr>
              <Td fontSize="sm">Taxes:</Td>
              <Td isNumeric>₹{taxes.toFixed(2)}</Td>
            </Tr>
            {discount > 0.0 && (
              <Tr>
                <Td fontWeight="bold">Discount:</Td>
                <Td fontWeight="bold" color="red.500" isNumeric>
                  - ₹{discount.toFixed(2)}
                </Td>
              </Tr>
            )}
            <Tr bg="gray.100">
              <Td fontWeight="bold">Total:</Td>
              <Td fontWeight="bold" isNumeric>
                ₹{grandTotal.toFixed(2)}
              </Td>
            </Tr>
          </Tbody>
        </Table>
        {localStorage.getItem("token") && (
          <form onSubmit={checkVoucherCodeAvailability}>
            <FormControl as={Flex} direction="column" my={6} px={4}>
              <FormLabel fontSize="sm" fontWeight={600}>
                Have a voucher code?
              </FormLabel>
              <Input
                size="sm"
                ref={voucherCodeRef}
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                variant="outline"
                placeholder="SOSEXXXXXXXXXXXXXXXXXX"
                borderColor="gray.300"
                borderRadius="md"
                _invalid={{ borderColor: "red.600" }}
                _focusVisible={{ borderColor: "gray.600" }}
                _placeholder={{ color: "gray.300" }}
                isDisabled={voucherApplied}
              />
              {voucherApplied ? (
                <ButtonGroup size="sm" justify="center" mt={2}>
                  <Button
                    colorScheme="brand"
                    onClick={() => {
                      setVoucherApplied(false);
                      voucherCodeRef.current?.focus();
                    }}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setVoucherCode("");
                      setVoucherApplied(false);
                      getCart();
                    }}
                  >
                    <RiDeleteBin5Line />
                  </Button>
                </ButtonGroup>
              ) : (
                <Button
                  type="submit"
                  isLoading={checkingVoucherCode}
                  size="sm"
                  colorScheme="brand"
                  mt={2}
                >
                  Apply code
                </Button>
              )}
            </FormControl>
          </form>
        )}
      </Box>
    ) : null;
  }
  