import {
  Box,
  Flex,
  Avatar,
  IconButton,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Link,
  HStack,
  useToast,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { BsGrid3X3GapFill, BsGlobe } from "react-icons/bs";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import CheckOrSetUDID from "../utils/checkOrSetUDID";
import { useEffect, useState } from "react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";

export default function ERPNavbar({
  navbarLinks,
  reportingLinks,
  configLinks,
}) {
  const pageName = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  const toast = useToast();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [companiesOptions, setCompaniesOptions] = useState([]);
  useEffect(() => {
    // setCompaniesOptions(
    //   localStorage.getItem("allow_company_list")
    //     ? JSON.parse(localStorage.getItem("allow_company_list")).map(
    //         (data) => ({
    //           label: data.company_name,
    //           value: data.company_id,
    //         })
    //       )
    //     : []
    // );
    setSelectedOptions(
      localStorage.getItem("selectedCompany")
        ? JSON.parse(localStorage.getItem("selectedCompany"))
        : []
    );
    getCompanyDetails();
  }, []);
  async function getCompanyDetails() {
    try {
      const response = await client.get(
        `/user/companies/?dashboard=dashboard`,
        {
          params: { show_all_orders: true },
          headers: { Authorization: `token ${checkLogin().token}` },
        }
      );
      setCompaniesOptions(
        response.data.companies.map((data) => ({
          label: data.company_name,
          value: data.company_id,
        }))
      );
    } catch (err) {}
  }
  const handleCheckboxChange = (values) => {
    setSelectedOptions(values);
    localStorage.setItem("selectedCompany", JSON.stringify(values));
    const urlParams = "?cid=" + values.join(",");
    const newUrl = window.location.pathname + urlParams;
    navigate(newUrl);
  };

  function Logout() {
    try {
      localStorage.clear();
      toast({
        title: "Logged out successfully!",
        status: "success",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      navigate("/", { replace: true });
      CheckOrSetUDID();
    } catch (error) {
      toast({
        title: "There was an error!",
        description: error,
        status: "error",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      bg={
        window.location.pathname === "/dashboard" ? "transparent" : "brand.900"
      }
      zIndex={999}
    >
      <Flex
        h={"50px"}
        align={"center"}
        justify={"space-between"}
        px={5}
        // borderBottom={"1px"}
        borderColor="whiteAlpha.500"
      >
        <HStack spacing={6}>
          <HStack>
            <Link as={ReactRouterLink} to="/dashboard">
              <IconButton
                icon={<Icon as={BsGrid3X3GapFill} boxSize={6} />}
                bg="transparent"
                color="white"
                _hover={{ bg: "transparent" }}
                _active={{ bg: "transparent" }}
              ></IconButton>
            </Link>
            <Link
              as={ReactRouterLink}
              to={"/" + pageName}
              _hover={{ all: "none" }}
            >
              <Text
                color="white"
                fontWeight="600"
                fontSize={"xl"}
                textTransform={pageName === "crm" ? "uppercase" : "capitalize"}
              >
                {pageName !== "dashboard" ? pageName.replaceAll("-", " ") : ""}
              </Text>
            </Link>
          </HStack>
          <HStack
            display={pageName === "dashboard" ? "none" : "block"}
            color={"white"}
            align="center"
            spacing={6}
          >
            {navbarLinks &&
              navbarLinks.map((link, index) => (
                <Text
                  as={ReactRouterLink}
                  to={link.href}
                  key={index}
                  ml={4}
                  fontSize="sm"
                >
                  {link.title}
                </Text>
              ))}
            {/* {reportingLinks &&
              reportingLinks.map((link, index) => (
                <Text
                  as={ReactRouterLink}
                  to={link.href}
                  key={index}
                  fontSize="sm"
                >
                  {link.title}
                </Text>
              ))} */}
            {reportingLinks && (
              <Menu>
                <MenuButton fontSize="sm" ml={4}>
                  Reporting
                </MenuButton>
                <MenuList zIndex={999}>
                  {reportingLinks.map((reportingLink, index) => (
                    <MenuItem
                      as={ReactRouterLink}
                      color="black"
                      to={reportingLink.href}
                      fontSize="sm"
                      key={index}
                    >
                      {reportingLink.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
            {configLinks && (
              <Menu>
                <MenuButton fontSize="sm" ml={4}>
                  Configuration
                </MenuButton>
                <MenuList zIndex={999}>
                  {configLinks.map((configLink, index) => (
                    <MenuItem
                      as={ReactRouterLink}
                      color="black"
                      to={configLink.href}
                      fontSize="sm"
                      key={index}
                    >
                      {configLink.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            )}
          </HStack>
        </HStack>

        <HStack>
          <Link as={ReactRouterLink} to="/">
            <IconButton
              icon={<Icon as={BsGlobe} boxSize={5} />}
              bg="transparent"
              color="white"
              _hover={{ bg: "transparent" }}
              _active={{ bg: "transparent" }}
            ></IconButton>
          </Link>
          {window.location.pathname === "/dashboard" && (
            <Menu>
              <MenuButton
                as={Flex}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
                me={5}
                alignItems="center"
                color="white"
                fontWeight={600}
                fontSize={14}
                _hover={{ textDecoration: "none" }}
                _active={{ color: "white" }}

                // onClick={handleButtonClick}
              >
                {companiesOptions[0]?.label}
              </MenuButton>

              <MenuList style={{ maxHeight: "60vh", overflowY: "auto" }}>
                <CheckboxGroup
                  value={selectedOptions}
                  onChange={handleCheckboxChange}
                >
                  {companiesOptions?.map((option) => (
                    <MenuItem key={option.value}>
                      <Checkbox value={"" + option.value}>
                        <span style={{ fontSize: "13px" }}>{option.label}</span>
                      </Checkbox>
                    </MenuItem>
                  ))}
                </CheckboxGroup>
              </MenuList>
            </Menu>
          )}

          <Menu>
            <MenuButton
              as={Flex}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
              me={5}
              alignItems="center"
              color="white"
              _hover={{ textDecoration: "none" }}
              _active={{ color: "white" }}
            >
              <Avatar
                name={
                  localStorage.getItem("first_name") +
                    " " +
                    localStorage.getItem("last_name") ?? "Username"
                }
                size="xs"
                me={2}
                src={null}
              />
              <Text as="span" fontWeight={600} me={1}>
                {localStorage.getItem("first_name") +
                  " " +
                  localStorage.getItem("last_name") ?? "Username"}
              </Text>
              <ChevronDownIcon />
            </MenuButton>
            <MenuList zIndex={999}>
              <MenuItem onClick={Logout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}
