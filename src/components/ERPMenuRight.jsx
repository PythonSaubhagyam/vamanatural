import { Spacer, VStack } from "@chakra-ui/react";
import {
    Box,
    Flex,
    HStack,
    Button,
    InputGroup,
    Input,
    InputRightElement,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
} from "@chakra-ui/react";
import { FaFilter, FaSearchMinus } from "react-icons/fa";
import { HiOutlineMenu } from "react-icons/hi";
import {
    AiFillStar,
    AiFillAppstore,
    AiOutlineUnorderedList,
} from "react-icons/ai";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { WiTime8 } from "react-icons/wi";

function ERPMenuright({ displayControls = true }) {
  return (
    <>
      <Box
        p={"2"}
        color={"gray"}
        visibility={displayControls ? "visible" : "hidden"}
      >
        <VStack>
          <InputGroup size="sm" width={"600px"} me={4}>
            <Input
              variant="outline"
              htmlSize={30}
              placeholder="Search..."
              focusBorderColor="black"
            />
            <InputRightElement
              children={
                <FaSearchMinus
                  color="gray"
                  h={"100%"}
                  _hover={{
                    color: "gray",
                    cursor: "pointer",
                  }}
                  aria-label="Search products"
                />
              }
            />
          </InputGroup>
          <Flex gap={"60px"} maxW={"650px"}>
            <HStack>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdOutlineArrowDropDown />}
                  leftIcon={<FaFilter />}
                  size={"sm"}
                  borderRadius={"1px"}
                  bgColor={"white"}
                  _hover={{
                    border: "1px",
                    bgColor: "white",
                    borderColor: "teal",
                  }}
                  _expanded={{ border: "1px", bgColor: "white" }}
                  _active={{ bgColor: "white" }}
                >
                  Filter
                </MenuButton>
                <MenuList style={{ zIndex: 999 }}>
                  <MenuItem maxH={"20px"}>Unread Messages</MenuItem>
                  <MenuDivider />
                  <MenuItem maxH={"20px"}>Archived</MenuItem>
                  <MenuDivider />
                  <MenuItem maxH={"20px"}>Add Custom Filter</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdOutlineArrowDropDown />}
                  leftIcon={<HiOutlineMenu />}
                  size={"sm"}
                  borderRadius={"1px"}
                  bgColor={"white"}
                  _hover={{
                    border: "1px",
                    bgColor: "white",
                    borderColor: "teal",
                  }}
                  _expanded={{ border: "1px", bgColor: "white" }}
                  _active={{ bgColor: "white" }}
                >
                  Group
                </MenuButton>
                <MenuList style={{ zIndex: 999 }}>
                  <MenuItem maxH={"40px"}>Manager</MenuItem>
                  <MenuItem maxH={"40px"}>Department</MenuItem>
                  <MenuItem maxH={"40px"}>Job</MenuItem>
                  <MenuDivider />
                  <MenuItem maxH={"20px"}>Add Custom Group</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  rightIcon={<MdOutlineArrowDropDown />}
                  leftIcon={<AiFillStar />}
                  size={"sm"}
                  borderRadius={"1px"}
                  bgColor={"white"}
                  _hover={{
                    border: "1px",
                    bgColor: "white",
                    borderColor: "teal",
                  }}
                  _expanded={{ border: "1px", bgColor: "white" }}
                  _active={{ bgColor: "white" }}
                >
                  Favorites
                </MenuButton>
                <MenuList style={{ zIndex: 999 }}>
                  <MenuItem maxH={"40px"}>Save Current Search</MenuItem>
                  <MenuItem maxH={"40px"}>Add to my Dashboard</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Spacer />
            <HStack>
              <Button size={"sm"} bg={"white"}>
                <AiFillAppstore />
              </Button>
              <Button size={"sm"} bg={"white"}>
                <AiOutlineUnorderedList />
              </Button>
              <Button size={"sm"} bg={"white"}>
                <WiTime8 />
              </Button>
            </HStack>
          </Flex>
        </VStack>
      </Box>
    </>
  );
}

export default ERPMenuright;
