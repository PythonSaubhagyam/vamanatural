import { Box, Button, Text } from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export default function CategoryTree({ categories }) {
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const [openSections, setOpenSections] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const [openSubSections, setOpenSubSections] = useState([]);
  let { search } = useLocation();
  const category_name = new URLSearchParams(search).get("category_name");

  const [all, setAll] = useState(true);
  const toggleSection = (index, section) => {
    setAll(false);
    if (section.children.length !== 0) {
      if (openSections?.includes(index)) {
        setOpenSections(openSections?.filter((item) => item !== index));
      } else {
        setOpenSections([...openSections, index]);
      }
    }
  };

  const subToggleSection = (index, section) => {
    setAll(false);
    if (section.children.length !== 0) {
      if (openSubSections?.includes(index)) {
        setOpenSubSections(openSubSections?.filter((item) => item !== index));
      } else {
        setOpenSubSections([...openSubSections, index]);
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (isMobileView) {
    return null; // Do not render anything for mobile view
  }

  return (
    <>
      <Accordion width={60}>
        <AccordionItem>
          <AccordionButton
            style={
              all
                ? { background: "#436131", color: "white", borderRadius: 5 }
                : { background: "white", color: "black", borderRadius: 5 }
            }
            onClick={() => [navigate("/shop"), setAll(!all)]}
          >
            <Box as="span" flex="1" textAlign="left">
              All Products
            </Box>
            {/* <AccordionIcon />  */}
          </AccordionButton>
        </AccordionItem>
        {categories?.map((section, index) => (
          <AccordionItem key={index}>
            <AccordionButton
              // _expanded={{ bg: "#436131", color: "white" }}
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                toggleSection(index, section);
                setSearchParams({
                  page: 1,
                  category: section.id,
                  category_name: section.name,
                });
              }}
              background={
                category_name === section?.name ? "brand.500" : "white"
              }
              color={category_name === section?.name ? "white" : "black"}
              borderRadius={6}
              _hover={{ background: "brand.500", color: "white" }}
            >
              <Box
                as="span"
                flex="1"
                textAlign="left"
                textTransform={"capitalize"}
              >
                {section?.name}
              </Box>
              <AccordionIcon
                display={section?.children?.length > 0 ? "" : "none"}
              />
            </AccordionButton>

            <AccordionPanel
              pb={4}
              display={openSections.includes(index) ? "block" : "none"}
            >
              {openSections?.includes(index) ? (
                <>
                  {section?.children.map((subcategory, subIndex) => (
                    <>
                      <Accordion width={60} mr={2}>
                        <AccordionItem key={subIndex}>
                          <AccordionButton
                            // _expanded={{ bg: "#436131", color: "white" }}
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                              navigate(
                                `/shop?page=1&category=${subcategory.id}&category_name=${subcategory?.name}`
                              );
                              subToggleSection(subIndex, subcategory);
                            }}
                            background={
                              category_name === subcategory?.name
                                ? "brand.500"
                                : "white"
                            }
                            color={
                              category_name === subcategory?.name
                                ? "white"
                                : "black"
                            }
                            borderRadius={6}
                            _hover={{ background: "brand.500", color: "white" }}
                          >
                            <Box
                              as="span"
                              flex="1"
                              textAlign="left"
                              fontSize={14}
                            >
                              {subcategory?.name}
                            </Box>
                            <AccordionIcon
                              display={
                                subcategory?.children?.length > 0 ? "" : "none"
                              }
                            />
                          </AccordionButton>

                          <AccordionPanel
                            pb={4}
                            display={
                              openSubSections.includes(subIndex)
                                ? "block"
                                : "none"
                            }
                          >
                            {openSubSections?.includes(subIndex) ? (
                              <>
                                {subcategory?.children.map((children, i) => (
                                  <Text
                                    background={
                                      category_name === children?.name
                                        ? "brand.500"
                                        : "white"
                                    }
                                    color={
                                      category_name === children?.name
                                        ? "white"
                                        : "black"
                                    }
                                    _hover={{
                                      background: "brand.500",
                                      color: "white",
                                    }}
                                    borderRadius={6}
                                    py={1}
                                    px={2}
                                    key={i}
                                    onClick={() => {
                                      navigate(
                                        `/shop?page=1&category=${children.id}&category_name=${encodeURIComponent(children?.name)}`
                                      );
                                      window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                      });
                                    }}
                                    fontSize={13}
                                    cursor={"pointer"}
                                    marginLeft={3}
                                  >
                                    {children?.name}
                                  </Text>
                                ))}
                              </>
                            ) : (
                              <></>
                            )}
                          </AccordionPanel>
                        </AccordionItem>
                      </Accordion>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
      <Box display={{ base: "block", lg: "none" }}></Box>
    </>
  );
}
