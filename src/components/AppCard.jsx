import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Image, Text } from "@chakra-ui/react";

export default function AppCard({ appObj }) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  function generateURL() {
    let url = "";
    let selectedCompany = JSON.parse(localStorage.getItem("selectedCompany"));

    if (selectedCompany?.length > 0) {
      url = `/${appObj.title
        .split(" ")
        .join("-")
        .toLowerCase()}?cid=${searchParams.get("cid")}`;
    } else {
      url = `/${appObj.title.split(" ").join("-").toLowerCase()}`;
    }
    navigate(url);
  }

  return (
    <span onClick={generateURL}>
      <Box
        width={130}
        height={115}
        align="center"
        p={2}
        boxShadow={"0px 2px 5px #000"}
        backgroundColor="whiteAlpha.600"
        backdropBlur={"5px"}
        display={"grid"}
        placeItems="center"
        borderRadius={"md"}
      >
        <Image
          src={appObj.image}
          alt={appObj.title?.toLowerCase()}
          maxW="70px"
          boxShadow={"-2px 2px 2px #000"}
          borderRadius="md"
        ></Image>
        <Text
          m={0}
          align="center"
          // color="white"
          fontSize="sm"
          fontWeight={"black"}
        >
          {appObj.title}
        </Text>
      </Box>
    </span>
  );
}
