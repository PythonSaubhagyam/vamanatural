import { Flex } from "@chakra-ui/react";
import ERPMenuLeft from "./ERPMenuLeft";

export default function ERPMenubar({ displayControls }) {
  return (
    <Flex
      justify={"space-between"}
      pt={2}
      pl={4}
      // borderBlockEnd={"1px"}
      // borderBlockEndColor={"brand.500"}
    >
      <ERPMenuLeft displayControls={displayControls} />
    </Flex>
  );
}
