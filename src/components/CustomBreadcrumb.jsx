import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  Spacer,
  Input,
  Button,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
export default function CustomBreadcrumb({
  setSearchQuery,
  search,
  first = "Home",
  second,
  third,
  fourth,
  firstUrl = "/dashboard",
  secondUrl,
  thirdUrl,
  fourthUrl,
  createUrl,
}) {
  const navigate = useNavigate();
  const debouncedSetSearchQuery = debounce((value) => {
    setSearchQuery(value);
  }, 500);

  const handleInputChange = (e) => {
    debouncedSetSearchQuery(e.target.value);
  };

  return (
    <>
      <Flex pl={4} pt={5} pr={4} ml={5} mr={5}>
        <Box style={{ fontWeight: 600 }}>
          <Breadcrumb>
            {first && (
              <BreadcrumbItem>
                <Link to={firstUrl}>{first}</Link>
              </BreadcrumbItem>
            )}
            {second && (
              <BreadcrumbItem>
                <Link to={secondUrl}>{second}</Link>
              </BreadcrumbItem>
            )}
            {third && (
              <BreadcrumbItem>
                <Link to={thirdUrl}>{third}</Link>
              </BreadcrumbItem>
            )}
            {fourth && (
              <BreadcrumbItem>
                <Link to={fourthUrl}>{fourth}</Link>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </Box>
        <Spacer />
        {search && (
          <Box>
            <Input
              size="sm"
              placeholder="🔍︎ Search..."
              type="search"
              variant="outline"
              width={320}
              onChange={handleInputChange}
            />
          </Box>
        )}
      </Flex>
      {createUrl && (
        <Box ml={5} pl={4}>
          <Button
            style={{
              fontSize: "16px",
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
              background: "rgb(44 76 3 / 85%)",
              color: "white",
              width: "125px",
              height: "35px",
              // color: "white",
            }}
            variant="solid"
            onClick={() => {
              navigate(createUrl);
            }}
          >
            Create
          </Button>
        </Box>
      )}
    </>
  );
}
