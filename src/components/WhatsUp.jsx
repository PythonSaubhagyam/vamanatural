import { Container, IconButton, Link } from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";



const WhatsUp = () => {
  return (
    <>
      <Container
        maxW={"container.xl"}
        style={{
          position: "sticky",
          overflow: "hidden",
          bottom: "40px",

          zIndex: 9,
        }}
        px={1}
      >
        <IconButton
        as={Link}
          style={{
            position: "fixed",
            right: "100px",
            bottom: "45px",
            zIndex: "100",
            opacity:"0.8"
            
          }}
          boxSize={55}
          isRound={true}
          colorScheme="brand"
          href="https://api.whatsapp.com/send/?phone=7405095969&text&type=phone_number&app_absent=0"
          target="_blank" // Open link in a new window
          rel="noopener noreferrer" // Security measure
         
          icon={< FaWhatsapp size={35}  />}
        />
      
         
      </Container>
    </>
  );
};

export default WhatsUp;