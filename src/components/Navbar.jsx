import { useState, useEffect, useRef, Fragment } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/slices/categoryApi";
import { BsTornado } from "react-icons/bs";

const Links = [
  {
    id: 1,
    name: "Consult Our Vaidya",
    location: "/consult-our-vaidya",
  },
  {
    id: 2,
    name: "Elite Membership",
    location: "/subscription-plans",
  },
  {
    id: 3,
    name: "Gift Voucher",
    location: "/gift-voucher",
  },
  {
    id: 4,
    name: "About us",
    location: "/about-us",
  },
  {
    id: 5,
    name: "Inspire & Support",
    location: "/inspire-and-support",
  },
  {
    id: 6,
    name: "Organic Living",
    location: "/organic-living",
  },
  {
    id: 7,
    name: "Exports",
    location: "/exports",
  },
  {
    id: 8,
    name: "B2B",
    location: "/bussiness",
  },
  {
    id: 9,
    name: "Franchise",
    location: "/franchise",
  },
  {
    id: 13,
    name: "Blogs",
    location: "/blogs",
  },
  // {
  //   name: "Our Videos",
  //   location: "/our-videos",
  // },
  {
    id: 10,
    name: "Store Locator",
    location: "/store-locator",
  },
  {
    id: 11,
    name: "Contact Us",
    location: "/contact-us",
  },
  {
    id: 12,
    name: "Events",
    location: "/event",
  },
  // {
  //   id: 13,
  //   name: "Subscription",
  //   location: "/subscription",
  // },
  // {
  //   id: 14,
  //   name: "Coin",
  //   location: "/coin",
  // },

  // { name: "Natural Products", location: "/shop" },

  // {
  //   name: "Gifting",
  //   location: "/shop?gift=true",
  // },
];


export default function Navbar() {
  let { search } = useLocation();

  const prod_search = new URLSearchParams(search).get("search");
  const [Open, setOpen] = useState(false);
  const [openCategory, setOpenCategory] = useState();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const menuRef = useRef(null);
  const handleScroll = (direction) => {
    const menu = menuRef.current;
    const scrollAmount = 100; // Adjust this value based on how much you want to scroll

    if (direction === "left") {
      menu.scrollLeft -= scrollAmount;
    } else if (direction === "right") {
      menu.scrollLeft += scrollAmount;
    }
    setScrollPosition(menu.scrollLeft);
  };

  const handleHover = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleHoverCategory = (index) => {
    setOpenCategory(index);
  };
  const handleCloseCategory = (index) => {
    setOpenCategory();
  };
  const [categoriesLastIndex, setCategoriesLastIndex] = useState(0);
  const [subCategories, setSubCategories] = useState([]);
  const [openOuterAccordion, setOpenOuterAccordion] = useState(false);
  const [openAccrodion, setOpenAccrodion] = useState(false);
  const [subCategoriesLastIndex, setSubCategoriesLastIndex] = useState([]);
  const [subChildCategories, setSubChildCategories] = useState([]);
  let [searchParams, setSearchParams] = useSearchParams();
  const [accordion, setAccordion] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const menuButtonRef = useRef();
  const didMount = useRef(false);
  const [openSections, setOpenSections] = useState([]);
  const [openSubSections, setOpenSubSections] = useState([]);
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


  let name = [
    localStorage.getItem("first_name"),
    localStorage.getItem("last_name"),
  ].join(" ");

  const [isMobile] = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const init = async () => {
      await CheckOrSetUDID();
    };
    init();
  }, []);

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

  const dispatch = useDispatch();
  const { categories, mergedCategories, hasFetched } = useSelector((state) => state.category);
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchCategories());
    }
  }, [dispatch, hasFetched]);





  async function getSearchResults() {
    const response = await client.get("/web/products/list/", {
      params: {
        prod_search: searchQuery,
        category_name: searchQuery,
        // filter_by: "",
        // min_price: "",
        // max_price: "",
      },
    });
    if (response.data.status === true) {
      setSearchResults(response.data.data.data);
    }
  }

  const handleClick = (data) => {
    const baseUrl = "/shop?page=1&";
    let params = "";
    if (data?.categoryId) {
      params = createSearchParams({
        category: data?.categoryId,
        category_name: data?.name,
      });
    }
    navigate(baseUrl + params);
  };

  const handleShow = (data, index) => {
    setSubCategories(data);
    setCategoriesLastIndex(index);
    setSubCategoriesLastIndex(0);
  };

  const handleShowSub = (data, index) => {
    setSubChildCategories(data);
    setSubCategoriesLastIndex(index);
  };

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

    document.addEventListener("touchmove", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Logout = () => {
    // localStorage.clear();
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

  return (
    <>
      <Box position="sticky" top={0} pt={0} backgroundColor="white" zIndex={999}>
        <Flex justify="center" display={isMobile ? "flex" : "none"}>
          <Link as={ReactRouterLink} to="/">
            <Image
              // width="100px"
              // height="50px"
              boxSize="120px"
              objectFit="contain"
              src="/vama_logo.png"
              alt="SOSE Logo"
            />
          </Link>
        </Flex>
        <Container
          maxW={"container.xl"}
          my={2}
          display={isMobile ? "" : "none"}
        >
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
                    {/* <MenuItem
                    as={Link}
                    bg={{ base: "none", md: "brand.500" }}
                    href="/login"
                    cursor={"pointer"}
                    color={{ base: "black", md: "white" }}
                    fontWeight={{ base: 400, md: 600 }}
                    py={{ base: 0, md: 2 }}
                    px={{ base: 0, md: 5 }}
                    borderRadius={{ base: 0, md: "md" }}
                    _hover={{ bg: "brand.500" }}
                  > */}
                    <MenuItem
                      onClick={() => {
                        setIsLoginModalOpen(true);
                      }}
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
          <Drawer isOpen={isOpen} onClose={onClose} placement="left" finalFocusRef={menuButtonRef}>
            <DrawerOverlay backdropFilter="auto" backdropBlur="2px" />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader as={Flex} justify="center">
                <Link as={ReactRouterLink} to="/">
                  <Image boxSize="120px" objectFit="contain" src="/vama_logo.png" alt="SOSE Logo" />
                </Link>
              </DrawerHeader>

              <DrawerBody p={0}>
                <Accordion allowMultiple width="100%">
                  <AccordionItem isOpen={Open}>
                    <AccordionButton
                      onClick={() => {
                        handleHover();
                        setOpenOuterAccordion(!openOuterAccordion);
                      }}
                      bg={openOuterAccordion ? "brand.500" : "white"}
                      color={openOuterAccordion ? "white" : "brand.500"}
                      borderRadius={5}
                    >
                      <Box flex="1" fontSize="md" textAlign="left">
                        Shop By Category
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>

                    <AccordionPanel pb={4} display={openOuterAccordion ? "block" : "none"}>
                      <Accordion allowMultiple width="100%">
                        {categories?.map((section, index) => (
                          <AccordionItem key={index}>
                            <AccordionButton
                              onClick={() => {
                                toggleSection(index, section);
                                setSearchParams({ category: section.id });
                                if (section?.children?.length > 0) {
                                  setOpenAccrodion();
                                } else {
                                  navigate(`/shop?page=1&category=${section.id}&category_name=${encodeURIComponent(section.name)}`);
                                  setAccordion(false);
                                  onClose();
                                }
                              }}
                              ml={4}
                            >
                              <Box flex="1" textAlign="left" textTransform="capitalize">
                                {section.name}
                              </Box>
                              <AccordionIcon display={section?.children?.length > 0 ? "inline" : "none"} />
                            </AccordionButton>

                            <AccordionPanel pb={4} display={openSections.includes(index) ? "block" : "none"}>
                              {section?.children?.map((subcategory, subIndex) => (
                                <Accordion key={subIndex} allowMultiple>
                                  <AccordionItem>
                                    <AccordionButton
                                      onClick={() => {
                                        subToggleSection(subIndex, subcategory);
                                        if (subcategory?.children?.length > 0) {
                                          setOpenAccrodion(!openAccrodion);
                                          setOpen(Open);
                                        } else {
                                          navigate(`/shop?page=1&category=${subcategory.id}&category_name=${encodeURIComponent(subcategory.name)}`);
                                          setAccordion(false);
                                          onClose();
                                        }
                                      }}
                                    >
                                      <Box flex="1" textAlign="left" fontSize={14}>
                                        {subcategory.name}
                                      </Box>
                                      <AccordionIcon display={subcategory?.children?.length > 0 ? "inline" : "none"} />
                                    </AccordionButton>

                                    <AccordionPanel pb={4} display={openSubSections.includes(subIndex) ? "block" : "none"}>
                                      {subcategory?.children?.map((child, i) => (
                                        <Text
                                          key={i}
                                          py={1}
                                          fontSize={13}
                                          cursor="pointer"
                                          ml={3}
                                          onClick={() => {
                                            navigate(`/shop?page=1&category=${child.id}&category_name=${encodeURIComponent(child.name)}`);
                                            onClose();
                                          }}
                                        >
                                          {child.name}
                                        </Text>
                                      ))}
                                    </AccordionPanel>
                                  </AccordionItem>
                                </Accordion>
                              ))}
                            </AccordionPanel>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>

                <Flex direction="column" gap={2} p={4}>
                  {Links.map((link) => (
                    <Fragment key={link.id}>
                      <Link
                        as={ReactRouterLink}
                        to={link.location}
                        color="brand.500"
                        _hover={{ textDecoration: "none" }}
                      >
                        {link.name}
                      </Link>
                      <Divider h="1px" bg="gray.200" />
                    </Fragment>
                  ))}
                </Flex>
              </DrawerBody>

              <DrawerFooter />
            </DrawerContent>
          </Drawer>
        </Container>

        {/* Desktop View */}
        <Container maxW="container.xl" px={2} py={2} display={isMobile ? "none" : "block"}>
          <Grid
            templateRows={{ base: "auto", md: "repeat(2, 1fr)" }}
            templateColumns={{ base: "1fr", xl: "repeat(12, 1fr)" }}
            gap={2}
            alignItems="center"
          >

            {/* Desktop Logo */}
            <GridItem rowSpan={4} colSpan={1} display="flex" alignItems="center" justifyContent="center">
              <Link as={ReactRouterLink} to="/" aria-label="Home">
                <Image
                  p={2}
                  boxSize="120px"
                  objectFit="contain"
                  src="/vama_logo.png"
                  alt="SOSE Logo"
                  loading="lazy"
                />
              </Link>
            </GridItem>

            {/* upper links */}
            <GridItem
              colSpan={9}
              rowSpan={1}
              display="flex"
              alignItems="center"
              sx={{ whiteSpace: "nowrap" }}
            >
              <Flex
                as="nav"
                gap={3}
                fontSize={{ base: 10, md: 11, lg: 12, xl: 13 }}
                align="center"
              >
                {Links.map((link) => (
                  <Link
                    as={ReactRouterLink}
                    to={link.location}
                    key={link.id}
                    className={link.name === "SOSE Elite" ? "new-link" : ""}
                    fontWeight="medium"
                    position="relative"
                    sx={{
                      textDecoration: "none",
                      _after: {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        bottom: "-2px",
                        height: "2px",
                        width: "0%",
                        backgroundColor: "brand.500",
                        transition: "width 0.3s ease-in-out",
                      },
                      _hover: {
                        color: "brand.500",
                        _after: {
                          width: "100%",
                        },
                      },
                    }}

                    onMouseEnter={handleClose}
                    aria-label={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
              </Flex>
            </GridItem>

            {/* Login Signup */}
            <GridItem
              colSpan={2}
              rowSpan={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Flex
                as="nav"
                gap={3}
                fontSize={{ lg: 14, xl: 16 }}
                alignItems="center"
              >
                <CartAndWishlistButtons />

                {checkLogin().isLoggedIn ? (
                  <Menu>
                    <MenuButton aria-label="User profile menu">
                      <Avatar
                        size="sm"
                        name={name?.trim() || undefined}
                        src={null}
                        bg="brand.500"
                        color="white"
                      />
                    </MenuButton>
                    <MenuList zIndex={999}>
                      <MenuItem as={ReactRouterLink} to="/profile">
                        My account
                      </MenuItem>
                      <MenuDivider />
                      <MenuItem onClick={Logout}>
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <>
                    <Link
                      className="new-link"
                      fontWeight={500}
                      fontSize={{ md: "14px" }}
                      _hover={{ textDecoration: "none", color: "brand.900" }}
                      onClick={() => setIsLoginModalOpen(true)}
                    >
                      Login
                    </Link>
                    <Link
                      className="new-link"
                      fontWeight={500}
                      fontSize={{ md: "14px" }}
                      _hover={{ textDecoration: "none", color: "brand.900" }}
                      onClick={() => navigate("/signup")}
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </Flex>
            </GridItem>

            {/* Search Bar */}
            <GridItem
              colSpan={7}
              rowSpan={2}
              display="flex"
              alignItems="center"
              position="relative"
            >
              <InputGroup size="sm" w="100%">
                <Input
                  variant="outline"
                  w={{ base: "25vw", md: "100%" }}
                  placeholder="Search for Natural Products"
                  defaultValue={prod_search}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      navigate(
                        searchQuery.trim()
                          ? `/shop?page=1&search=${searchQuery}`
                          : `/shop?page=1`
                      );
                    }
                  }}
                  aria-label="Search input"
                />
                <Button
                  size="sm"
                  variant="outline"
                  bg="brand.500"
                  color="white"
                  _hover={{ bg: "brand.400" }}
                  px={4}
                  onClick={() => {
                    if (searchQuery.trim()) {
                      navigate(`/shop?page=1&search=${searchQuery}`);
                    }
                  }}
                  aria-label="Search button"
                >
                  <SearchIcon mr={2} />
                  Search
                </Button>
              </InputGroup>

              {searchResults !== null && (
                <Box
                  ref={flexRef}
                  zIndex={99}
                  w={{ base: "65vw", lg: "50.5vw" }}
                  position="absolute"
                  top="100%"
                  mt={2}
                  bg="white"
                  borderRadius="md"
                  boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  display={isFlexVisible ? "flex" : "none"}
                  flexDirection="column"
                  maxH="280px"
                  overflowY="auto"
                >
                  {searchResults.length > 0 ? (
                    searchResults.slice(0, 4).map((result) => (
                      <LinkBox
                        as={Flex}
                        key={result.id}
                        p={4}
                        justify="space-between"
                        align="center"
                        gap={4}
                        _hover={{
                          bg: "gray.100",
                          borderRadius: "md",
                          cursor: "pointer",
                        }}
                        onClick={() => setSearchResults(null)}
                      >
                        <Text
                          fontSize="sm"
                          fontWeight="700"
                          w={{ base: "100%", lg: "75%" }}
                        >
                          <LinkOverlay
                            as={ReactRouterLink}
                            to={`/products/${result.id}/${result.name.replace(/\s+/g, "-")}`}
                          >
                            {result.name}
                          </LinkOverlay>
                        </Text>
                        <Text fontSize="sm" fontWeight="600">
                          ₹{Number(result.product_price || result.base_price || 0).toFixed(2)}
                        </Text>
                      </LinkBox>
                    ))
                  ) : (
                    <Box p={4}>
                      <Text fontSize="sm" fontWeight="600">
                        No products found
                      </Text>
                    </Box>
                  )}
                </Box>
              )}
            </GridItem>

            {/* Social Links */}
            <GridItem
              colSpan={4}
              rowSpan={2}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              gap={6}
              fontSize={20}
            >
              <Link
                isExternal={true}
                as={ReactRouterLink}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
                to={"https://www.facebook.com/vamaherbal"}
              >
                <FaFacebookF fontSize={20} />
              </Link>
              <Link
                isExternal={true}
                as={ReactRouterLink}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
                to={"https://www.instagram.com/vamaherbal/"}
              >
                <FiInstagram fontSize={20} />
              </Link>
              <Link
                isExternal={true}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
                as={ReactRouterLink}
                to={
                  "https://api.whatsapp.com/send/?phone=7405095969&text&type=phone_number&app_absent=0"
                }
              >
                <FaWhatsapp fontSize={20} />
              </Link>
              <Link
                isExternal={true}
                as={ReactRouterLink}
                to={"https://www.youtube.com/@vamanatural"}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
              >
                <TfiYoutube fontSize={20} />
              </Link>
              <Link
                isExternal={true}
                as={ReactRouterLink}
                to={"https://play.google.com/store/apps/details?id=com.sose.vama"}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
              >
                <FaGooglePlay fontSize={20} />
              </Link>
              <Link
                isExternal={true}
                as={ReactRouterLink}
                to={"https://apps.apple.com/in/app/vama/id6477996113"}
                _hover={{ color: "brand.500", transform: "scale(1.1)" }}
                transition="all 0.2s ease"
              >
                <FaApple fontSize={22} />
              </Link>
            </GridItem>

            {/* Desktop Menu */}
            <GridItem
              colSpan={7}
              display="flex"
              alignItems="center"
              overflowX="auto"
              fontSize="15px"
            >
              <Flex
                gap={2}
                align="start"
                wrap="nowrap"
                whiteSpace="nowrap"
                w="max-content"
              >
                {categories?.map((category, catIdx) => (
                  <Menu
                    isOpen={openCategory === catIdx}
                    onClose={handleCloseCategory}
                    key={catIdx}
                  >
                    <MenuButton
                      onMouseEnter={() => handleHoverCategory(catIdx)}
                      onClick={() => {
                        handleHoverCategory(catIdx);
                        navigate(
                          `/shop?page=1&category=${category.id}&category_name=${encodeURIComponent(category.name)}`
                        );
                      }}
                      variant="ghost"
                      px={2}
                      fontSize="13px"
                      cursor="pointer"
                      _hover={{ color: "brand.500" }}
                      _active={{ bg: "transparent" }}
                      _focusVisible={{ outline: "none" }}
                      sx={{
                        position: "relative",
                        display: "inline-block",  // ✅ IMPORTANT
                        _after: {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          height: "2px",
                          width: "0%",
                          backgroundColor: "brand.500",
                          transition: "width 0.3s ease-in-out",
                        },
                        ":hover::after": {
                          width: "100%",
                        },
                      }}

                    >
                      <Flex align="center" gap={1}>
                        {category.name}
                        {category.children?.length > 0 && <IoIosArrowDown />}
                      </Flex>
                    </MenuButton>


                    {category.children?.length > 0 && (
                      <MenuList
                        as={Flex}
                        direction="column"
                        wrap="wrap"
                        maxH="70vh"
                        onMouseEnter={() => handleHoverCategory(catIdx)}
                        onMouseLeave={handleCloseCategory}
                        zIndex={9999}
                        p={2}
                        boxShadow="lg"

                      >
                        {category.children.map((child, childIdx) => (
                          <Box key={childIdx} p={2}>
                            <Text
                              as="b"
                              fontSize="13px"
                              cursor="pointer"
                              _hover={{ color: "brand.500" }}
                              onClick={() => {
                                handleCloseCategory();
                                navigate(
                                  `/shop?page=1&category=${child.id}&category_name=${encodeURIComponent(child.name)}`
                                );
                              }}
                              sx={{
                                position: "relative",
                                display: "inline-block",  // ✅ REQUIRED for underline to show
                                _after: {
                                  content: '""',
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  height: "2px",
                                  width: "0%",
                                  backgroundColor: "brand.500",
                                  transition: "width 0.3s ease-in-out",
                                },
                                ":hover::after": {
                                  width: "100%",
                                },
                              }}

                            >
                              {child.name}
                            </Text>

                            {child.children?.map((subchild, subIdx) => (
                              <Text
                                key={subIdx}
                                fontSize="13px"
                                cursor="pointer"
                                _hover={{ color: "brand.500" }}
                                onClick={() => {
                                  handleCloseCategory();
                                  navigate(
                                    `/shop?page=1&category=${subchild.id}&category_name=${encodeURIComponent(subchild.name)}`
                                  );
                                }}
                              >
                                {subchild.name}
                              </Text>
                            ))}
                          </Box>
                        ))}
                      </MenuList>
                    )}
                  </Menu>
                ))}
              </Flex>
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
    </>
  );
}
