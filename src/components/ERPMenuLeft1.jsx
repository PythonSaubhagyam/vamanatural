import {
    Box,
    Text,
    Flex,
    LinkBox,
    LinkOverlay,
    Button,
} from "@chakra-ui/react";
// import NavBreadcrumb from './NavBreadcrumb'

export default function ERPMenuLeft({ displayControls = true }) {
  const path = window.location.pathname;
  const pathList = path.split("/");
  const pageName =
    pathList[pathList.length - 1] === "" ||
    isNaN(parseInt(pathList[pathList.length - 1])) === false
      ? pathList[pathList.length - 2]
      : pathList[pathList.length - 1];

  return (
    <Box px={6} py={2}>
      <Box pb={2}>
        <Text
          fontWeight="600"
          fontSize={"lg"}
          textTransform={
            pageName === "crm" || path.endsWith("/crm/create/")
              ? "uppercase"
              : "capitalize"
          }
        >
          {pageName === "create" || pageName === "edit"
            ? pathList[pathList.length - 3]
            : pageName === "configurations"
            ? "brands"
            : pageName.replaceAll("-", " ")}
        </Text>
      </Box>
      <Flex gap={2} visibility={displayControls ? "visible" : "hidden"}>
        <Box>
          <LinkBox
            as={Button}
            bg={"brand.500"}
            color={"white"}
            _hover={{ bg: "brand.500", color: "white" }}
          >
            <LinkOverlay
              href={`${
                pageName === "configurations"
                  ? "configurations/brands"
                  : path.endsWith("/")
                  ? path.slice(0, -1)
                  : path
              }/create/`}
            >
              Create
            </LinkOverlay>
          </LinkBox>
        </Box>
        {/* <Box>
          <LinkBox
            as={Button}
            bg={"gray.200"}
            color={"black"}
            _hover={{ bg: "gray.200", color: "black" }}
          >
            <LinkOverlay href={`${window.location.pathname}/import/`}>
              Import
            </LinkOverlay>
          </LinkBox>
        </Box> */}
      </Flex>
    </Box>
  );
}
