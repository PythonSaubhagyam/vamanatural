import {
  Box, Flex,
  LinkBox, Button,
  Breadcrumb,
  BreadcrumbItem
} from "@chakra-ui/react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
// import NavBreadcrumb from './NavBreadcrumb'
import CapitalizeLetter from "../utils/CommanFunction";
export default function ERPMenuLeft({ displayControls = true }) {
  const path = window.location.pathname;
  const pathList = path.split("/");
  const pageName =
    pathList.at(-1) === "" || isNaN(parseInt(pathList.at(-1))) === false
      ? pathList[pathList.length - 2]
      : pathList[pathList.length - 1];

  return (
    <Box px={6} py={2}>
      <Box pb={3}>
        <Breadcrumb fontSize="lg" fontWeight={600}>
          <BreadcrumbItem>
            <Link to="/dashboard">
              <AiFillHome />
            </Link>
          </BreadcrumbItem>
          {pathList.slice(0, 3).map(
            (item, idx) =>
              idx > 0 && (
                <BreadcrumbItem key={idx}>
                  <Link
                    to={
                      pathList.at(-1) === "" ||
                      isNaN(parseInt(pathList[pathList.length - 1])) === true
                        ? pathList.slice(0, idx - 2).join("/")
                        : pathList.slice(0, idx - 1).join("/")
                    }
                  >
                    {CapitalizeLetter(item.replaceAll("-", " "))}
                  </Link>
                </BreadcrumbItem>
              )
          )}
        </Breadcrumb>
      </Box>
      <Flex gap={2} visibility={displayControls ? "visible" : "hidden"}>
        <Box>
          <Link
            to={`${
              pageName === "configurations"
                ? "configurations/brands"
                : path.endsWith("/")
                ? path.slice(0, -1)
                : path
            }/create/`}
          >
            {path.includes("create") ? (
              <></>
            ) : path.includes("details") ? (
              <></>
            ) : path.includes("edit") ? (
              <></>
            ) : (
              <LinkBox
                as={Button}
                bg={"brand.500"}
                color={"white"}
                _hover={{ bg: "brand.500", color: "white" }}
              >
                Create
              </LinkBox>
            )}
          </Link>
        </Box>
      </Flex>
    </Box>
  );
}
