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

// File: components/CustomerOrdersTab.js
import { Heading, VStack, Skeleton } from "@chakra-ui/react";
import Table from "./Table";
import { useNavigate } from "react-router-dom";

export default function CustomerOrdersTab({ orderData, columns, loading }) {
  const navigate = useNavigate();
  return (
    <>
      {loading ? (
        <VStack spacing={4}>
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} height="20px" width="100%" borderRadius="md" />
          ))}
        </VStack>
      ) : orderData?.length > 0 ? (
        <AnimatedSection y={20}>
          <Table
            columns={columns}
            data={orderData}
            selectable={false}
            onRowClick={(row) => navigate(`/orders/${row.id}`)}
            displayExtensions={false}
          />
        </AnimatedSection>
      ) : (
        <AnimatedSection scale={0.95}>
          <Heading size="md" fontWeight={600} align="center" mt={5}>
            Order Not Found
          </Heading>
        </AnimatedSection>
      )}
    </>
  );
}