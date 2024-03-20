import {
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Box,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";

export default function accordion({ details }) {
  return (
    <AccordionItem>
      {({ isExpanded }) => (
        <>
          <h2>
            <AccordionButton>
              {isExpanded ? (
                <MinusIcon fontSize="12px" />
              ) : (
                <AddIcon fontSize="12px" />
              )}
              <Box flex="1" textAlign="left" pl="5">
                {details.title}
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>{details.content}</AccordionPanel>
        </>
      )}
    </AccordionItem>
  );
}