import { useState, useEffect, useRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux"
import {
  useMediaQuery,
  Box,
  Flex,
  Image,
  Link,
  InputGroup,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useToast,
  Container,
  Text,
  LinkBox,
  LinkOverlay,
  Divider,
  Badge,
  Grid,
  GridItem,
  Button,
  MenuDivider,
  Avatar,
  DrawerFooter,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Drawer,
  HStack,
  InputRightElement,
  IconButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
} from "@chakra-ui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  HamburgerIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Link as ReactRouterLink,
  useNavigate,
  useSearchParams,
  useLocation,
  createSearchParams,
} from "react-router-dom";
import CartAndWishlistButtons from "./CartAndWishlistButtons";
import client from "../setup/axiosClient";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { IoIosArrowDown } from "react-icons/io";
import checkLogin from "../utils/checkLogin";
import { TfiYoutube } from "react-icons/tfi";
import { FaApple, FaFacebookF, FaGooglePlay, FaWhatsapp } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { debounce } from "lodash";
import CartEmitter from "./EventEmitter";
import LoginModal from "./LoginModal";
import { fetchCategories } from "../redux/slices/categoryApi";
import React from "react";

const Links = [
  {
    name: "Elite Membership",
    location: "/subscription-plans",
  },
  {
    name: "Gift Voucher",
    location: "/gift-voucher",
  },
  {
    name: "Consult Our Vaidya",
    location: "/consult-our-vaidya",
  },
  {
    name: "About us",
    location: "/about-us",
  },
  {
    name: "Inspire & Support",
    location: "/inspire-and-support",
  },
  //  {
  //    name: "Organic Living",
  //    location: "/organic-living",
  //  },
  //  {
  //    name: "Exports",
  //    location: "/exports",
  //  },
  //  {
  //    name: "B2B",
  //    location: "/bussiness",
  //  },
  //  {
  //    name: "Franchise",
  //    location: "/franchise",
  //  },
  {
    name: "Store Locator",
    location: "/store-locator",
  },
  {
    name: "Blogs",
    location: "/blogs?page=1",
  },
  {
    name: "Contact Us",
    location: "/contact-us",
  },
  //   // { name: "Natural Products", location: "/shop" },

  //   // {
  //   //   name: "Gifting",
  //   //   location: "/shop?gift=true",
  //   // },
];


export default function Navbar() {
  let { search } = useLocation();

  const prod_search = new URLSearchParams(search).get("search");
  const [Open, setOpen] = useState(false);

  const handleHover = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openOuterAccordion, setOpenOuterAccordion] = useState(false);
  const [openAccrodion, setOpenAccrodion] = useState(false);
  const [subChildCategories, setSubChildCategories] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const menuButtonRef = useRef();
  const didMount = useRef(false);
  const [openSections, setOpenSections] = useState([]);
  const [openSubSections, setOpenSubSections] = useState([]);
  const [megaCategories, setMegaCategories] = useState([]);
  const [megaSubCategories, setMegaSubCategories] = useState([]);
  const [nestedCategories, setNestedCategories] = useState([]);
  const [all, setAll] = useState(false);
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
    onClose();
  }, [navigate]);
  const [isFlexVisible, setIsFlexVisible] = useState(true);
  const flexRef = useRef(null);
  // const setCategoryFilter = async (categoryId) => {
  //   if (JSON.parse(categoryId !== null)) {
  //     setSearchParams({ category: categoryId });
  //   } else {
  //     setSearchParams({});
  //   }
  // };

  let name = [
    localStorage.getItem("first_name"),
    localStorage.getItem("last_name"),
  ].join(" ");

  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const dispatch = useDispatch()
  const { categories, mergedCategories, hasFetched } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };
    init();
  }, []);
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, hasFetched]);


  useEffect(() => {
    if (didMount.current === true) {
      if (searchQuery !== null && searchQuery !== "") {
        getSearchResults();
      } else {
        setSearchResults(null);
      }
    } else {
      didMount.current = true;
    } // eslint-disable-next-line
  }, [searchQuery]);

  async function getSearchResults() {
    const response = await client.get("/web/products/list/", {
      params: {
        prod_search: searchQuery,
        category_name: searchQuery,
      },
    });
    if (response.data.status === true) {
      setSearchResults(response.data.data.data);
    }
  }

  const debouncedSetSearchQuery = debounce((value) => {
    setSearchQuery(value);
  }, 500);

  const handleInputChange = (e) => {
    setIsFlexVisible(true);
    debouncedSetSearchQuery(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (flexRef.current && !flexRef.current.contains(event.target)) {
        setIsFlexVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Logout = () => {
    const userKeys = [
      "token",
      "first_name",
      "last_name",
      "email",
      "phone_no",
      "wishlist_counter",
      "allow_company_list",
      "is_sose_elite_user",
      "id",
      "access",
      "cart_counter",
    ];
    userKeys.forEach((key) => localStorage.removeItem(key));
    CartEmitter.emit("updateCartCount", 0);
    CartEmitter.emit("updateProductTotal", 0);
    toast({
      title: "Logged out successfully!",
      status: "success",
      position: "top-right",
      duration: 4000,
      isClosable: true,
    });
    navigate("/", { replace: true });
    setTimeout(() => {
      window.location.reload();
    });
  };

  const handleHover1 = () => {
    if (mergedCategories.length > 0) {
      setOpen(true);
    }
  };

  const handleClose1 = () => {
    setOpen(false);
  };
  const handleShow1 = (data) => {
    setMegaSubCategories(data);
  };
  const handleShowSubMenu = (data) => {
    setNestedCategories(data);
  };

  const logoClickHandler = () => {
    navigate("/", { replace: true })
    window.location.reload()
  }

  return (
    <Box position="sticky" top={0} backgroundColor="white" zIndex={999}>
      <Flex justify="center" display={isMobile ? "flex" : "none"}>
        <Link onClick={logoClickHandler}>
          <Image
            p={"1"}
            boxSize="120px"
            objectFit="contain"
            src="/vama_logo.png"
            alt="SOSE Logo"
          />
        </Link>
      </Flex>
      <Container maxW={"container.xl"} my={2} display={isMobile ? "" : "none"}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={{
            base: "space-between",
            md: "space-between",
            xl: "space-between",
          }}
          gap={{ base: 2, xl: 10, "2xl": 20 }}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ lg: "none" }}
            onClick={isOpen ? onClose : onOpen}
            ref={menuButtonRef}
          />

          <HStack spacing={{ base: 4, md: 6 }}>
            <Flex gap={4} align="center">
              <Flex direction="column" position={"relative"}>
                <InputGroup size="sm" width={"auto"} me={6}>
                  <Input
                    w={{ base: "25vw", md: "auto" }}
                    placeholder="Search"
                    focusBorderColor="brand.500"
                    onChange={handleInputChange}
                  />
                  <InputRightElement
                    children={
                      <SearchIcon
                        color="brand.100"
                        h={"100%"}
                        _hover={{
                          color: "brand.900",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigate(`/shop?page=1&search=${searchQuery}`);
                        }}
                        aria-label="Search products"
                      />
                    }
                  />
                </InputGroup>
                {searchResults !== null ? (
                  searchResults.length > 0 ? (
                    <Flex
                      direction="column"
                      zIndex={99}
                      w={{ base: "65vw", lg: "22.5vw" }}
                      position="absolute"
                      top={10}
                    >
                      {searchResults?.slice(0, 4).map((result) => (
                        <LinkBox
                          as={Flex}
                          border="1px"
                          borderColor="gray.400"
                          p={4}
                          justify="space-between"
                          align="center"
                          bg="bg.100"
                          gap={4}
                          onClick={() => setSearchResults(null)}
                        >
                          <Image src={result.image1} boxSize="10" />
                          <Text
                            fontSize={"sm"}
                            fontWeight="700"
                            w={{
                              base: "100%",
                              lg: "75%",
                            }}
                          >
                            <LinkOverlay as={ReactRouterLink} to={`/products/${result.id}/${result.name.replace(/\s+/g, "-")}`}>
                              {result.name}
                            </LinkOverlay>
                          </Text>
                          <Text fontSize="sm" fontWeight="600">
                            ₹{Number(result.product_price || result.base_price || 0).toFixed(2)}

                          </Text>
                        </LinkBox>
                      ))}
                    </Flex>
                  ) : (
                    <Box
                      zIndex={99}
                      w={{ base: "65vw", lg: "22.5vw" }}
                      position="absolute"
                      top={10}
                      p={4}
                      bg="bg.100"
                      border="1px"
                      borderColor="gray.400"
                    >
                      <Text fontSize="sm" fontWeight="600">
                        No products found
                      </Text>
                    </Box>
                  )
                ) : null}
              </Flex>
              <CartAndWishlistButtons />
            </Flex>
            <Menu>
              <MenuButton aria-label="User profile menu">
                <Avatar
                  size="sm"
                  name={name.trim() !== "" ? name : null}
                  src={null}
                  color={"white"}
                  background={"brand.500"}
                />
              </MenuButton>
              {checkLogin().isLoggedIn ? (
                <MenuList zIndex={999}>
                  <MenuItem as={ReactRouterLink} to="/profile">
                    My account
                  </MenuItem>
                  {localStorage.getItem("access") === "true" ? (
                    <MenuItem as={"a"} href="/dashboard">
                      Dashboard
                    </MenuItem>
                  ) : null}
                  <MenuDivider />
                  <MenuItem onClick={() => Logout()}>Logout</MenuItem>
                </MenuList>
              ) : (
                <MenuList zIndex={999}>
                  <MenuItem
                    onClick={() => setIsLoginModalOpen(true)}
                    cursor={"pointer"}
                    _hover={{ textDecoration: "none" }}
                  >
                    Login
                  </MenuItem>
                </MenuList>
              )}
            </Menu>
          </HStack>
        </Flex>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="left"
          finalFocusRef={menuButtonRef}
        >
          <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader as={Flex} justify="center">
              <Link onClick={logoClickHandler}>
                <Image
                  boxSize="120px"
                  objectFit="contain"
                  src="/vama_logo.png"
                  alt="SOSE Logo"
                />
              </Link>
            </DrawerHeader>

            <DrawerBody p={0}>
              <Flex direction="column" gap={2}>
                <Accordion width="100%">
                  <AccordionItem isOpen={Open}>
                    <AccordionButton
                      onClick={() => {
                        handleHover();
                        setOpenOuterAccordion(!openOuterAccordion);
                      }}
                      bg={all ? "#436131" : "white"}
                      color={all ? "white" : "black"}
                      borderRadius={5}
                    >
                      <Box as="span" flex="1" fontSize="md" color="brand.900" textAlign="left">
                        Shop By Category
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    {openOuterAccordion && (
                      <AccordionPanel pb={4}>
                        <Accordion allowMultiple width="100%">
                          {mergedCategories?.map((section, index) => (
                            <AccordionItem key={index} isOpen={!isOpen}>
                              <AccordionButton
                                ml={4}
                                onClick={() => {
                                  toggleSection(index, section);
                                  setSearchParams({ category: section.id });
                                  section?.children?.length > 0
                                    ? setOpenAccrodion()
                                    : navigate(`/shop?page=1&category=${section.id}`);
                                }}
                              >
                                <Box flex="1" textAlign="left" textTransform="capitalize">
                                  {section.name}
                                </Box>
                                {section.children?.length > 0 && <AccordionIcon />}
                              </AccordionButton>

                              {openSections.includes(index) && (
                                <AccordionPanel pb={4}>
                                  {section.children.map((subcategory, subIndex) => (
                                    <Accordion key={subIndex}>
                                      <AccordionItem isOpen={isOpen}>
                                        <AccordionButton
                                          onClick={() => {
                                            subToggleSection(subIndex, subcategory);
                                            subcategory?.children?.length > 0
                                              ? setOpenAccrodion(!openAccrodion)
                                              : navigate(
                                                `/shop?page=1&category=${subcategory.id}&category_name=${encodeURIComponent(subcategory.name)}`
                                              );
                                          }}
                                        >
                                          <Box flex="1" textAlign="left" fontSize="14px">
                                            {subcategory.name}
                                          </Box>
                                          {subcategory.children?.length > 0 && <AccordionIcon />}
                                        </AccordionButton>

                                        {openSubSections.includes(subIndex) && (
                                          <AccordionPanel pb={4}>
                                            {subcategory.children.map((child, i) => (
                                              <Text
                                                key={i}
                                                py={1}
                                                fontSize={13}
                                                ml={3}
                                                cursor="pointer"
                                                onClick={() => {
                                                  navigate(
                                                    `/shop?page=1&category=${child.id}&category_name=${encodeURIComponent(child.name)}`
                                                  );
                                                  onClose();
                                                }}
                                              >
                                                {child.name}
                                              </Text>
                                            ))}
                                          </AccordionPanel>
                                        )}
                                      </AccordionItem>
                                    </Accordion>
                                  ))}
                                </AccordionPanel>
                              )}
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </AccordionPanel>
                    )}
                  </AccordionItem>
                </Accordion>

                {Links.map((link) => (
                  <Fragment key={link.name}>
                    <Link
                      as={ReactRouterLink}
                      to={link.location}
                      color="brand.900"
                      ms={4}
                      _hover={{ textDecoration: "none" }}
                    >
                      {link.name}
                    </Link>
                    <Divider h="1px" bg="gray.200" />
                  </Fragment>
                ))}
              </Flex>


              {/* </Link> */}
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
      <Container
        maxW={"container.xl"}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 1.95px 0px",
          position: "sticky",
          overFlow: "hidden",
          backgroundColor: "white",
          top: 20,
          zIndex: 9,
        }}
        display={isMobile ? "none" : "block"}
      >
        <Grid templateRows="repeat(2, 1fr)" templateColumns={"repeat(12, 1fr)"}>
          <GridItem
            rowSpan={2}
            colSpan={1}
          // style={{ borderBottom: "0.5px solid #b7b7b7" }}
          >
            <Link onClick={logoClickHandler} >
              <Image
                p={"1"}
                boxSize="120px"
                objectFit="contain"
                src="/vama_logo.png"
                alt="SOSE Logo"
              />
            </Link>
          </GridItem>
          <GridItem
            colSpan={7}
            mt={3}
            display={"flex"}
            alignItems={"center"}
          // style={{ borderBottom: "0.5px solid #b7b7b7" }}
          >
            <InputGroup size="sm" width={"100%"}>
              <Input
                variant="outline"
                w={{ base: "25vw", md: "100%" }}
                placeholder="Search for Natural Products "
                defaultValue={prod_search}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(
                      searchQuery.length > 0
                        ? `/shop?page=1&search=${searchQuery}`
                        : `/shop?page=1&`
                    );
                  }
                }}
              />
              {/* <InputRightElement children={<></>} /> */}
              <Button
                size="sm"
                variant={"outline"}
                background={"brand.500"}
                color="white"
                _hover={{
                  background: "brand.400",
                }}
                px={4}
                onClick={() => {
                  searchQuery.length > 0 &&
                    navigate(`/shop?page=1&search=${searchQuery}`);
                }}
              >
                <SearchIcon
                  mr={2}
                  color="white"
                  h={"100%"}
                  _hover={{
                    cursor: "pointer",
                  }}
                  aria-label="Search products"
                />
                Search
              </Button>
            </InputGroup>
            {searchResults !== null ? (
              searchResults.length > 0 ? (
                <Flex
                  ref={flexRef}
                  direction="column"
                  zIndex={99}
                  w={{ base: "65vw", lg: "50.5vw" }}
                  position="absolute"
                  top={24}
                  bg={"white"}
                  borderRadius={6}
                  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                  display={isFlexVisible ? "flex" : "none"}
                >
                  {searchResults?.slice(0, 4).map((result) => (
                    <LinkBox
                      as={Flex}
                      // border="1px"
                      borderColor="gray.400"
                      p={4}
                      justify="space-between"
                      align="center"
                      gap={4}
                      _hover={{
                        bg: "gray.100",
                        borderRadius: 6,
                        cursor: "pointer",
                      }}
                      onClick={() => setSearchResults(null)}
                    >
                      {/* <Image src={result.image1} boxSize="10" /> */}
                      <Text
                        fontSize={"sm"}
                        fontWeight="700"
                        w={{
                          base: "100%",
                          lg: "75%",
                        }}
                      >
                        <LinkOverlay as={ReactRouterLink} to={`/products/${result.id}/${result.name.replace(/\s+/g, "-")}`}>
                          {result.name}
                        </LinkOverlay>
                      </Text>
                      <Text fontSize="sm" fontWeight="600">
                        ₹{Number(result.product_price || result.base_price || 0).toFixed(2)}

                      </Text>
                    </LinkBox>
                  ))}
                </Flex>
              ) : (
                <Box
                  ref={flexRef}
                  zIndex={99}
                  w="50.5vw"
                  position="absolute"
                  top={24}
                  p={4}
                  bg={"white"}
                  borderRadius={6}
                  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}
                  display={isFlexVisible ? "flex" : "none"}
                >
                  <Text fontSize="sm" fontWeight="600">
                    No products found
                  </Text>
                </Box>
              )
            ) : null}
          </GridItem>

          <GridItem
            colSpan={4}
            mt={3}
            display={"flex"}
            // style={{ borderBottom: "0.5px solid #b7b7b7" }}
            justifyContent={"end"}
          >
            <Flex
              as={"nav"}
              gap={{ md: 6, lg: 5 }}
              display={{ base: "flex", lg: "flex" }}
              fontSize={{ xl: 16, lg: 14 }}
              alignItems={"center"}
            >
              <CartAndWishlistButtons />
              {checkLogin().isLoggedIn ? (
                <Menu>
                  <MenuButton aria-label="User profile menu">
                    <Avatar
                      size="sm"
                      name={name.trim() !== "" ? name : null}
                      src={null}
                      color={"white"}
                      background={"brand.500"}
                    />
                  </MenuButton>
                  {checkLogin().isLoggedIn ? (
                    <MenuList zIndex={999}>
                      <MenuItem as={ReactRouterLink} to="/profile">
                        My account
                      </MenuItem>

                      <MenuDivider />
                      <MenuItem onClick={() => Logout()}>Logout</MenuItem>
                    </MenuList>
                  ) : (
                    <></>
                  )}
                </Menu>
              ) : (
                <>
                  <Link
                    className={"new-link"}
                    _hover={{
                      textDecoration: "none",
                      color: "brand.900",
                    }}
                    fontWeight={500}
                    fontSize={{ md: "14px" }}
                    onClick={() => setIsLoginModalOpen(true)}
                  >
                    Login
                  </Link>
                  <Link
                    onClick={() => navigate("/signup")}
                    className={"new-link"}
                    _hover={{
                      textDecoration: "none",
                      color: "brand.900",
                    }}
                    fontWeight={500}
                    fontSize={{ md: "14px" }}
                  >
                    Sign up
                  </Link>
                </>
              )}
            </Flex>
          </GridItem>
          <GridItem
            colSpan={9}
            display={"flex"}
          // style={{ borderBottom: "0.5px solid #b7b7b7" }}
          >
            <Flex
              as="nav"
              gap={{ base: 2, md: 6, lg: 4, xl: 4 }}
              display="flex"
              fontSize={{ base: 12, md: 9, lg: 11, xl: 14 }}
              alignItems="center"
            >
              <Link
                as={ReactRouterLink}
                to="/"
                _hover={{ textDecoration: "none", color: "brand.900" }}
                onMouseEnter={handleClose}
              >
                Home
              </Link>

              <Menu isOpen={Open} onClose={handleClose1}>
                <MenuButton
                  mb={0.5}
                  onMouseEnter={handleHover1}
                  onClick={() => navigate("/shop")}
                >
                  Shop
                </MenuButton>

                <MenuList
                  as={Grid}
                  width={800}
                  templateColumns="repeat(9, 1fr)"
                  onMouseLeave={handleClose1}
                  zIndex={9999}
                >
                  <GridItem colSpan={3} overflow="auto">
                    {mergedCategories?.map((section) => (
                      <React.Fragment key={section.id}>
                        <MenuItem
                          fontSize="14"
                          onMouseEnter={() => handleShow1(section.children)}
                          onClick={() =>
                            navigate(
                              `/shop?category=${section.id}&category_name=${encodeURIComponent(section.name)}`
                            )
                          }
                          _hover={{ backgroundColor: "brand.500", color: "white" }}
                        >
                          {section.name}
                        </MenuItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </GridItem>

                  <GridItem colSpan={3} overflow="auto">
                    {megaSubCategories?.map((item) => (
                      <MenuItem
                        key={item.id}
                        fontSize="14"
                        onMouseEnter={() => handleShowSubMenu(item.children)}
                        onClick={() =>
                          navigate(
                            `/shop?category=${item.id}&category_name=${encodeURIComponent(item.name)}`
                          )
                        }
                        _hover={{ backgroundColor: "brand.500", color: "white" }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </GridItem>

                  <GridItem colSpan={3} overflow="auto">
                    {nestedCategories?.map((item) => (
                      <MenuItem
                        key={item.id}
                        fontSize="14"
                        onClick={() =>
                          navigate(
                            `/shop?category=${item.id}&category_name=${encodeURIComponent(item.name)}`
                          )
                        }
                        _hover={{ backgroundColor: "brand.500", color: "white" }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </GridItem>
                </MenuList>
              </Menu>

              {Links.map((link) => (
                <Link
                  key={link.name}
                  as={ReactRouterLink}
                  to={link.location}
                  className={link.name === "SOSE Elite" ? "new-link" : ""}
                  _hover={{ textDecoration: "none", color: "brand.900" }}
                  onMouseEnter={handleClose}
                >
                  {link.name}
                </Link>
              ))}
            </Flex>

          </GridItem>
          <GridItem
            colSpan={2}
            display={"flex"}
            justifyContent={"end"}
            alignItems={"center"}
            // style={{ borderBottom: "0.5px solid #b7b7b7" }}
            gap={5}
            fontSize={15}
          >
            <Link
              isExternal={true}
              _hover={{ color: "text.500" }}
              as={ReactRouterLink}
              to={"https://www.facebook.com/vamaherbal"}
            >
              <FaFacebookF fontSize={20} />
            </Link>
            <Link
              _hover={{ color: "text.500" }}
              isExternal={true}
              as={ReactRouterLink}
              to={"https://www.instagram.com/vamaherbal/"}
            >
              <FiInstagram fontSize={20} />
            </Link>
            <Link
              _hover={{ color: "text.500" }}
              isExternal={true}
              as={ReactRouterLink}
              to={
                "https://api.whatsapp.com/send/?phone=7405095969&text&type=phone_number&app_absent=0"
              }
            >
              <FaWhatsapp fontSize={20} />
            </Link>
            <Link
              _hover={{ color: "text.500" }}
              isExternal={true}
              as={ReactRouterLink}
              to={"https://www.youtube.com/@vamanatural"}
            >
              <TfiYoutube fontSize={20} />
            </Link>
            <Link
              _hover={{ color: "text.500" }}
              isExternal={true}
              as={ReactRouterLink}
              to={"https://play.google.com/store/apps/details?id=com.sose.vama"}
            >
              <FaGooglePlay fontSize={20} />
            </Link>
            <Link
              _hover={{ color: "text.500" }}
              isExternal={true}
              as={ReactRouterLink}
              to={"https://apps.apple.com/in/app/vama/id6477996113"}
            >
              <FaApple fontSize={22} />
            </Link>
          </GridItem>
        </Grid>
      </Container>
      {!checkLogin().isLoggedIn && (
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />
      )}
    </Box>
  );
}