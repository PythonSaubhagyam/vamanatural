import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
//import { FaArrowUp } from "react-icons/fa6";
import { RiArrowUpSLine } from "react-icons/ri";


const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTopClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Button is displayed after scrolling for 500 pixels
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible === true && (
        <div style={{ display: "flex" }}>
          <IconButton
            style={{ position: "fixed", right: "50px", bottom: "50px", zIndex: "100", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;"}}
            colorScheme="brand"
            size={"lg"}
            onClick={scrollToTopClick}
            //icon={<FaArrowUp size={24}/>}
            icon={<RiArrowUpSLine size={45}/>}
          />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;