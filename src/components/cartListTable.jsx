import { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  ButtonGroup,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";

export default function CartListTable({ products }) {
  const [counter, setCounter] = useState(1);
  const toast = useToast();
  const loginInfo = checkLogin();

  function ButtonIncrement(props) {
    return (
      <Button
        onClick={props.onClickFunc}
        color={"white"}
        colorScheme={"brand"}
        _hover={{ bg: "brand.100" }}
        size={"sm"}
        fontSize={"25px"}
        disabled={props.disabled}
      >
        +
      </Button>
    );
  }
  function ButtonDecrement(props) {
    return (
      <Button
        onClick={props.onClickFunc}
        color={"white"}
        colorScheme={"brand"}
        _hover={{ bg: "brand.100" }}
        size={"sm"}
        fontSize={"30px"}
      >
        -
      </Button>
    );
  }
  //   function Display(props) {
  //     return <label size={"lg"}>{props.message}</label>;
  //   }

  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if (counter <= 1) {
    decrementCounter = () => setCounter(1);
  }

  const removeProductFromCart = async (id) => {
    const response = await client.delete(`/cart/${id}`, {
      headers: { Authorization: `token ${loginInfo.token}` },
    });
    if (response.data.status) {
      toast({
        title: "Product removed from cart!",
        status: "success",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    } else
      toast({
        title: response.data.error,
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
  };

  <TableContainer size={"sm"}>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Product </Th>
          <Th> </Th>
          <Th>Quantity</Th>
          <Th>Price</Th>
          <Th> </Th>
        </Tr>
      </Thead>
      <Tbody>
        {products !== []
          ? products?.map((product) => (
              <Tr bg={"gray.100"} key={product.id} m={4}>
                <Td>
                  <Image
                    src={product.product_image}
                    boxSize={100}
                    align={"center"}
                    p={3}
                  />
                </Td>
                <Td
                  color={"brand.900"}
                  fontWeight={"bold"}
                  _hover={{ color: "black" }}
                  cursor={"pointer"}
                >
                  {product.product}
                </Td>
                <Td>
                  <ButtonGroup p={0} alignItems="center">
                    <ButtonDecrement onClickFunc={decrementCounter} />
                    <Input disabled readonly>
                      {counter}
                    </Input>
                    <ButtonIncrement onClickFunc={incrementCounter} />
                  </ButtonGroup>
                </Td>
                <Td>₹{product.selling_price}</Td>
                <Td>
                  <Button
                    color={"white"}
                    bg={"red.500"}
                    _hover={{ bg: "brand.100" }}
                    my={3}
                    size={"sm"}
                    onClick={() => removeProductFromCart(product.id)}
                  >
                    <RiDeleteBin5Line />
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))
          : null}
      </Tbody>
    </Table>
  </TableContainer>;
}
