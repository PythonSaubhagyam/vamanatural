import { useState, useEffect, useRef } from "react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import Router from "../routes/routes";
import Loader from "../components/Loader";
import { Center, Box, Text } from "@chakra-ui/react";

function SubscriptionPayment() {
  const txnId = useRef(Date.now().toString());
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  useEffect(() => {
    let intervalId;

    const initiatePayment = async () => {
      try {
        const res = await client.post(
          "/get-subscription-payment-link/",
          { txnid: txnId.current },
          {
            headers: { Authorization: `token ${checkLogin().token}` },
          }
        );

        if (res.data.status) {
          window.open(res.data.payment_url);
          setPaymentInProgress(true);

          intervalId = setInterval(async () => {
            try {
              const response = await client.get(
                `/user/get-subscription-payment/${txnId.current}/`,
                {
                  headers: {
                    Authorization: `token ${checkLogin().token}`,
                  },
                }
              );

              if (response.data.status) {
                clearInterval(intervalId);
                setPaymentInProgress(false);
                Router.navigate("/");
              }
            } catch (err) {
              console.error("Error while checking payment status:", err);
            }
          }, 1000);
        }
      } catch (err) {
        console.error("Error initiating payment:", err);
      }
    };

    initiatePayment();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return (
    <Center h="75vh" flexDirection="column" gap={6}>
      <Loader site />
      <Box textAlign="center">
        <Text fontSize="xl">We are currently processing your payment ...</Text>
        <Text fontSize="md" fontWeight="bold" color="red.500">
          Kindly do not refresh the page while the transaction is in progress
        </Text>
      </Box>
    </Center>
  );
}

export default SubscriptionPayment;
