import {
  Box,
  Flex,
  Image,
  Text,
  IconButton,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useMediaQuery,
  ScaleFade,
  textDecoration,
} from "@chakra-ui/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function StylishCartItem({
  cartItem,
  removeProductFromCart,
  onSubmit,
  defaultValue,
  cartRemoveLoading,
}) {
  const [quantity, setQuantity] = useState(defaultValue ?? 1);
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const bg = useColorModeValue("white", "gray.800");
  const border = useColorModeValue("gray.100", "gray.600");

  const handleUpdate = (value) => {
    setQuantity(value);
    onSubmit(value);
  };

  return (
    <ScaleFade in={true} initialScale={0.95}>
      <Flex
        p={5}
        mb={6}
        borderRadius="2xl"
        borderWidth={1}
        borderColor={border}
        boxShadow="sm"
        bg={bg}
        justify="space-between"
        align={{ base: "start", md: "center" }}
        direction={{ base: "column", md: "row" }}
        gap={4}
        transition="0.2s ease"
        _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
      >
        {/* Left: Image + Name */}
        <Flex align="center" w={{ base: "100%", md: "40%" }} gap={4}>
          <Box
            overflow="hidden"
            borderRadius="xl"
            _hover={{ transform: "scale(1.05)" }}
            transition="0.2s ease"
          >
            <Image
              src={cartItem.product_image}
              boxSize="90px"
              objectFit="cover"
              borderRadius="xl"
              alt={cartItem.product}
            />
          </Box>
          <Box>
            <Text
              as={Link}
              to={`/products/${cartItem.product_id}/${cartItem.product.replace(/\s+/g, "-")}`}
              fontWeight="bold"
              fontSize="md"
              noOfLines={2}
              cursor="pointer"
              _hover={{ textDecoration: "underline", color: "brand.600" }}
            >
              {cartItem.product}
            </Text>
            <Text fontSize="xs" color="gray.500" mt={1}>
              {cartItem.available_quantity?.Quantity || 0} in stock
            </Text>
          </Box>

        </Flex>

        {/* Right: Quantity, Price, Controls */}
        <Flex
          align="center"
          flexWrap="wrap"
          justify="flex-end"
          gap={4}
          w={{ base: "100%", md: "60%" }}
        >
          <NumberInput
            min={1}
            max={cartItem.available_quantity?.Quantity || 20}
            value={quantity}
            onChange={(_, val) => {
              setQuantity(val);
              onSubmit(val);
            }}
            size="sm"
            w="80px"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Text fontWeight="medium" fontSize="sm">
            ₹{Number(cartItem.selling_price).toFixed(2)}
          </Text>

          <Text fontWeight="bold" color="brand.500" fontSize="md">
            ₹{Number(cartItem.total).toFixed(2)}
          </Text>

          <IconButton
            icon={<RiDeleteBin5Line />}
            colorScheme="red"
            variant="ghost"
            size="sm"
            isLoading={cartRemoveLoading === cartItem.id}
            onClick={() => removeProductFromCart(cartItem.id)}
            aria-label="Remove item"
            _hover={{ bg: "red.100" }}
          />
        </Flex>
      </Flex>
    </ScaleFade>
  );
}
