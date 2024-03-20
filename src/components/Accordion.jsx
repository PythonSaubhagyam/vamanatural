import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import dompurify from "dompurify";

export default function accordion({ details }) {
  return (
    <Accordion allowToggle border="none" defaultIndex={0}>
      {details.map((accordionData, index) => (
        <AccordionItem
          border="1px"
          borderBottom={index === details.length - 1 ? "1px" : "none"}
          borderColor={"gray.100"}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton
                  bg="bg.500"
                  color="brand.900"
                  _hover={{ bg: "bg.500" }}
                >
                  {isExpanded ? (
                    <MinusIcon boxSize={2.5} focusable />
                  ) : (
                    <AddIcon boxSize={2.5} focusable />
                  )}
                  <Box flex="1" textAlign="left" pl="5" fontSize="sm">
                    {accordionData.title}
                  </Box>
                </AccordionButton>
              </h2>
              <AccordionPanel
                pb={4}
                px={8}
                fontSize="sm"
                dangerouslySetInnerHTML={{
                  __html: dompurify.sanitize(accordionData.content),
                }}
              ></AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
