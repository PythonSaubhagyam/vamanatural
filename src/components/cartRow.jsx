import { useState } from "react";
import {
  Tr,
  Td,
  Text,
  Image,
  Button,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { EditIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function CartRow({
  cartItem,
  removeProductFromCart,
  defaultValue,
  onSubmit,
  cartRemoveLoading,
  index,
}) {
  const [quantity, setQuantity] = useState(defaultValue ?? 1);
  const handleInputChange = (newValue) => {
    // Check if the new value has 4 or fewer characters before updating the state
    // if (newValue <= cartItem.quantity) {
    setQuantity(newValue);
    // }
  };
  return (
    // <Tr bg={"gray.100"} m={4}>
    //   <Td>
    //     <Link to={`/products/${cartItem.product_id}`}>
    //       <Image
    //         src={cartItem.product_image}
    //         boxSize={{ base: "75px", md: "100px" }}
    //         objectFit="contain"
    //         align={"center"}
    //       />
    //     </Link>
    //   </Td>
    //   <Td color={"brand.900"} fontWeight={"bold"} _hover={{ color: "black" }}>
    //     <Text
    //       as={Link}
    //       to={`/products/${cartItem.product_id}`}
    //       noOfLines={{ base: 3, md: 5 }}
    //     >
    //       {cartItem.product}
    //     </Text>
    //   </Td>
    //   <Td>
    //     <Popover>
    //       {({ isOpen, onClose }) => (
    //         <>
    //           <PopoverTrigger>
    //             <Flex align="center">
    //               {defaultValue} <IconButton icon={<EditIcon />} />
    //             </Flex>
    //           </PopoverTrigger>
    //           <PopoverContent>
    //             <PopoverArrow />
    //             <PopoverBody
    //               as={"form"}
    //               gap={2}
    //               display="flex"
    //               onSubmit={(e) => {
    //                 e.preventDefault();
    //                 onSubmit(quantity);
    //                 onClose();
    //               }}
    //             >
    //               <NumberInput
    //                 w="50%"
    //                 max={
    //                   cartItem.available_quantity
    //                     ? cartItem.available_quantity.Quantity
    //                     : 0
    //                 }
    //                 min={1}
    //                 defaultValue={quantity}
    //                 onChange={(_, newQuantity) => {
    //                   handleInputChange(newQuantity);
    //                 }}
    //               >
    //                 <NumberInputField />
    //                 <NumberInputStepper>
    //                   <NumberIncrementStepper />
    //                   <NumberDecrementStepper />
    //                 </NumberInputStepper>
    //               </NumberInput>
    //               <IconButton as={Button} type="submit" icon={<CheckIcon />} />
    //               <IconButton
    //                 as={Button}
    //                 icon={<CloseIcon />}
    //                 onClick={() => onClose()}
    //               />
    //             </PopoverBody>
    //           </PopoverContent>
    //         </>
    //       )}
    //     </Popover>
    //   </Td>
    //   <Td>₹{cartItem.selling_price}</Td>
    //   <Td>₹{cartItem.total}</Td>
    //   <Td>
    //     <Button
    //       color={"white"}
    //       bg={"red.500"}
    //       _hover={{ bg: "brand.100" }}
    //       my={3}
    //       size={"sm"}
    //       onClick={() => removeProductFromCart(cartItem.id)}
    //     >
    //       <RiDeleteBin5Line />
    //       Remove
    //     </Button>
    //   </Td>
    // </Tr>
    <Flex
      alignItems={"center"}
      flexDirection={{ base: "column", md: "row" }}
      m={5}
      p={5}
      boxShadow={"md"}
      borderRadius={"8px"}
    >
      {/* <Text
        ml={10}
        as={Link}
        to={`/products/${cartItem.product_id}`}
        noOfLines={{ base: 3, md: 5 }}
      >
        {index}
      </Text> */}
      <Link to={`/products/${cartItem.product_id}`}>
        <Image
          src={cartItem.product_image}
          boxSize={{ base: "75px", md: "100px" }}
          objectFit="contain"
          align={"center"}
        />
      </Link>

      <Text
        ml={10}
        as={Link}
        to={`/products/${cartItem.product_id}`}
        noOfLines={{ base: 3, md: 5 }}
      >
        {cartItem.product}
      </Text>

      <Flex ml={{ md: "auto" }} w={{ md: 250 }} mt={{ base: 4 }} gap={10}>
        <Popover>
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <Button pb={4} bgColor={"white"} rightIcon={<EditIcon />}>
                  {defaultValue}
                </Button>
                {/* <Flex>
                  {defaultValue} <IconButton bgColor={"white"} icon={<EditIcon />} />
                </Flex> */}
              </PopoverTrigger>
              <PopoverContent maxW={"70%"} mx="auto">
                <PopoverArrow />
                <PopoverBody
                  as={"form"}
                  gap={2}
                  display="flex"
                  justifyContent={"center"}
                  onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(quantity);
                    onClose();
                  }}
                >
                  <NumberInput
                    max={
                      cartItem.available_quantity
                        ? cartItem.available_quantity.Quantity
                        : 0
                    }
                    min={1}
                    defaultValue={quantity}
                    onChange={(_, newQuantity) => {
                      handleInputChange(newQuantity);
                    }}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <IconButton as={Button} type="submit" icon={<CheckIcon />} />
                  <IconButton
                    as={Button}
                    icon={<CloseIcon />}
                    onClick={() => onClose()}
                  />
                </PopoverBody>
              </PopoverContent>
            </>
          )}
        </Popover>
        <Text>₹{cartItem.selling_price?.toFixed(2)}</Text>

        <Text>₹{cartItem.total?.toFixed(2)}</Text>
      </Flex>

      <Button
        isLoading={cartItem.id === cartRemoveLoading}
        color={"white"}
        bg={"red.500"}
        leftIcon={<RiDeleteBin5Line />}
        _hover={{ bg: "brand.100" }}
        size={"sm"}
        ml={8}
        onClick={() => removeProductFromCart(cartItem.id)}
      >
        Remove
      </Button>
    </Flex>
  );
}
