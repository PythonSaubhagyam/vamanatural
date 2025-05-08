// File: components/CustomerSubscriptionTab.js
import { Button, Heading, VStack, Skeleton } from "@chakra-ui/react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
// File: components/AnimatedSection.js
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const MotionBox = motion(Box);

export function AnimatedSection({ children, delay = 0, y = 10, scale = 1, ...props }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y, scale: scale !== 1 ? 0.95 : 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      {...props}
    >
      {children}
    </MotionBox>
  );
}
export default function CustomerSubscriptionTab({ eliteData, details, columns, loading }) {
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <VStack spacing={4}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="20px" width="100%" borderRadius="md" />
          ))}
        </VStack>
      ) : (
        <VStack spacing={4} align="stretch">
          {!details?.is_subscribed && eliteData?.length > 0 && (
            <AnimatedSection y={-10}>
              <Button
                bg="brand.500"
                color="white"
                ml={4}
                size="sm"
                _hover={{ bg: "brand.600" }}
                onClick={() => navigate("/subscription-plans")}
              >
                Renew/Buy Subscription
              </Button>
            </AnimatedSection>
          )}

          {eliteData?.length > 0 ? (
            <AnimatedSection y={10}>
              <Table
                columns={columns}
                data={eliteData}
                selectable={false}
                displayExtensions={false}
              />
            </AnimatedSection>
          ) : (
            <AnimatedSection scale={0.95}>
              <Heading size="md" fontWeight={600} align="center" mt={5}>
                Subscription Not Found
              </Heading>
            </AnimatedSection>
          )}
        </VStack>
      )}
    </>
  );
}
