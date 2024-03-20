import { useState, useEffect, useRef } from "react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import Router from "../routes/routes";
import Loader from "../components/Loader";
import { Center, Box, Text } from "@chakra-ui/react";

function SubscriptionPayment() {
  const txnId = useRef(new Date().getTime().toString());
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  // const toast = useToast();
  // const didMount = useRef(false);

  useEffect(() => {
    // if (didMount.current === true) {
    getSubscriptionPaymentLink();
    // } else {
    // didMount.current = true;
    // }
  }, []);

  useEffect(() => {
    const checkPayment = setInterval(async function () {
      if (paymentInProgress === true) {
        const res = await getPaymentDetails(txnId.current);
        if (res.data.status === true) {
          setPaymentInProgress(false);
          Router.navigate("/");
          // toast({
          //   title: "Welcome to SOSE Elite!",
          //   status: "success",
          //   position: "top-right",
          //   duration: 5000,
          //   isClosable: true,
          // });
          clearInterval(checkPayment);
        }
      } else {
      }
    }, 1000); // eslint-disable-next-line
  }, [paymentInProgress]);

  async function getPaymentDetails() {
    const res = await client.get(
      `/user/get-subscription-payment/${txnId.current}/`,
      {
        headers: { Authorization: `token ${checkLogin().token}` },
      }
    );
    return res;
  }

  async function getSubscriptionPaymentLink() {
    const res = await client.post(
      "/get-subscription-payment-link/",
      { txnid: txnId.current },
      {
        headers: { Authorization: `token ${checkLogin().token}` },
      }
    );
    if (res.data.status === true) {
      window.open(res.data.payment_url);
      setPaymentInProgress(true);
    }
  }

  return (
    <>
      <Center h="75vh" flexDirection="column" gap={6}>
        <Loader site={true} />
        <Box align="center">
          <Text fontSize="xl">
            We are currently processing your payment ...
          </Text>
          <Text fontSize="md" fontWeight="bold" color="red.500">
            Kindly do not refresh the page while the transaction is in progress
          </Text>
        </Box>
      </Center>
    </>
  );
}

export default SubscriptionPayment;
