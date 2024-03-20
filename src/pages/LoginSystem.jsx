import { useState } from "react";
import {
  Card,
  CardBody,
  Flex,
  Button,
  Text,
  useDisclosure,
  Tbody,
  Td,
  Tr,
  Modal,
  Table,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  Grid,
  GridItem,
  Box,
  Alert,
  Input,
  AlertTitle,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import checkLogin from "../utils/checkLogin";
// import client from "../setup/axiosClient";

const LoginSystem = () => {
  // { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const {
    isOpen: isOuterModalOpen,
    onOpen: onOuterModalOpen,
    onClose: onOuterModalClose,
  } = useDisclosure();
  const {
    isOpen: isInnerModalOpen,
    onOpen: onInnerModalOpen,
    onClose: onInnerModalClose,
  } = useDisclosure();

  const cashier = JSON.parse(localStorage.getItem("cashier")); // eslint-disable-next-line
  const cashierTitle = localStorage.getItem("cashierTitle"); // eslint-disable-next-line
  const cashierLink = localStorage.getItem("cashierLink"); // eslint-disable-next-line
  const sid = localStorage.getItem("sid");
  // const loginInfo = checkLogin();
  const [pin, setPin] = useState("");
  // const [userId, setUserId] = useState();
  const [err, setErr] = useState();

  const handleDigitClick = (digit) => {
    setErr();
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleClearClick = () => {
    setErr();
    setPin("");
  };

  const handleCloseSession = () => {
    localStorage.removeItem("cashier");
    localStorage.removeItem("cashierTitle");
    localStorage.removeItem("cashierLink");
    localStorage.removeItem("posToken");
    navigate(`/point-of-sale/sessions/close-session/${sid}`);
  };

  useEffect(() => {
    if (!cashier && !cashierLink) {
      navigate("/point-of-sale");
    } // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    setErr();
    e.preventDefault();
    try {
      // const response = await client.post(
      //   "/pos_login/",
      //   {
      //     user_id: userId,
      //     access_pin: parseFloat(pin),
      //   },
      //   {
      //     headers: {
      //       Authorization: `token ${loginInfo.token}`,
      //     },
      //   }
      // );
      localStorage.setItem(
        "posToken",
        [...Array(124)]
          .map(() => (~~(Math.random() * 36)).toString(36))
          .join("")
      );
      navigate(cashierLink.replace(/"/g, ""));
    } catch (err) {
      setErr(err);
    }
  };

  return (
    <div>
      <Card maxW={615} h={200} mx={"auto"} mt={"10%"}>
        <CardBody style={{ textAlign: "center" }}>
          <h1> Log in to {cashierTitle}</h1>
          <Flex align="center" justifyContent="space-around" pt={"7%"}>
            <Button py={10} onClick={onOuterModalOpen}>
              Select Cashier
            </Button>
            <Text>Or</Text>
            <Button py={10} onClick={() => handleCloseSession()}>
              Close Session
            </Button>
          </Flex>
        </CardBody>
      </Card>
      <Modal
        blockScrollOnMount={false}
        //isOpen={isOpen}
        //onClose={() => onClose()}
        isOpen={isOuterModalOpen}
        onClose={onOuterModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center">Change Cashier</ModalHeader>
          <ModalBody>
            <TableContainer>
              <Table size="sm">
                <Tbody>
                  {cashier &&
                    cashier.map((data, index) => (
                      <Tr>
                        <Td
                          cursor={"pointer"}
                          onClick={(e) => [
                            onInnerModalOpen(),
                            // setUserId(data.id),
                          ]}
                        >
                          {data.first_name + "  " + data.last_name}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme={"brand"}
              fontSize={"sm"}
              mr={3}
              onClick={onOuterModalClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal
        blockScrollOnMount={false}
        //isOpen={isOpen}
        //onClose={() => onClose()}
        isOpen={isInnerModalOpen}
        onClose={onInnerModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader align="center">Enter Pin</ModalHeader>
            <ModalBody>
              <Box p={4}>
                {err && (
                  <Alert status="error" mb={3}>
                    <AlertTitle>Invalid Credentials </AlertTitle>
                  </Alert>
                )}

                <Input
                  type="number"
                  value={pin}
                  max={9999}
                  maxLength={4}
                  variant="outline"
                  onChange={(e) => setPin(e.target.value)}
                  fontSize="xl"
                  textAlign="center"
                  mb={2}
                />
                <Grid templateColumns="repeat(3, 1fr)" gap={2}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((digit) => (
                    <GridItem key={digit} colSpan={1}>
                      <Button
                        onClick={() => handleDigitClick(digit)}
                        fontSize="xl"
                        size="md"
                        w="100%"
                      >
                        {digit}
                      </Button>
                    </GridItem>
                  ))}
                  <GridItem colSpan={1}>
                    <Button
                      fontSize="xl"
                      size="md"
                      w="100%"
                      colorScheme="green"
                      type="submit"
                    >
                      OK
                    </Button>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <Button
                      onClick={handleClearClick}
                      fontSize="xl"
                      size="md"
                      w="100%"
                    >
                      Clear
                    </Button>
                  </GridItem>
                </Grid>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme={"brand"}
                fontSize="sm"
                mr={3}
                onClick={onInnerModalClose}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default LoginSystem;
