import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Actions from "./Actions";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import { FaUser } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";

export default function CustomerAddressRow({ address, getDetails }) {
  const navigate = useNavigate();

  function onEditClick() {
    navigate(`/profile/addresses/${address.id}/edit`, {
      state: { address: address },
    });
  }
  console.log("address", address);
  async function onDeleteClick() {
    const loginInfo = checkLogin();
    const response = await client.delete(`user/address/${address.id}/`, {
      headers: { Authorization: `token ${loginInfo.token}` },
    });
    if (response.data.status === true) {
      getDetails();
    }
  }

  return (
    <Box
      key={address.id}
      w="100%"
      boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 12px"}
      my={2}
      p={3}
      borderRadius={8}
    >
      <Flex justify="space-between">
        <Flex
          direction={{ base: "column-reverse", lg: "row" }}
          gap={2}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Text>
            <Text
              as="span"
              fontWeight="bold"
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              gap={2}
            >
              <FaUser /> {address?.full_name ? `${address?.full_name}` : null}
            </Text>
            <Box>
              {address?.mobile && (
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  gap={2}
                >
                  <IoCall />
                  {address.mobile}
                </Box>
              )}
              {(address?.address_line_1 ||
                address?.address_line_2 ||
                address?.landmark) && (
                <Box
                  display={"flex"}
                  justifyContent={"start"}
                  alignItems={"center"}
                  gap={2}
                >
                  <FaLocationDot />
                  {`${address.address_line_1 || ""} ${
                    address.address_line_2 || ""
                  } ${address.landmark || ""}`}
                  {(address?.city_obj ||
                    address?.state_obj ||
                    address?.postal_code) && (
                    <Box>
                      {`${address.city_obj?.name || ""}, ${
                        address.state_obj?.name || ""
                      } - ${address.postal_code || ""}`}
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Text>
        </Flex>
        <Actions
          borderDisplay={false}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </Flex>
    </Box>
  );
}
