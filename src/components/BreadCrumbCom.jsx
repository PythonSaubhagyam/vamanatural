import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    Flex,
    Spacer,

} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
const BreadCrumbCom = ({

    first = "Home",
    second,
    third,
    fourth,
    firstUrl = "/",
    secondUrl,
    thirdUrl,
    fourthUrl,

}) => {

    return (
        <>
            <Flex pt={5} pb={5}>
                <Box style={{ fontWeight: 600 }}>
                    <Breadcrumb>
                        {first && (
                            <BreadcrumbItem
                                fontSize="md"
                                fontWeight="medium"
                                _hover={{ color: "#476436" }}
                                _focus={{ boxShadow: "none" }}
                                marginX="1"
                                position={"relative"}
                                display={"flex"}

                            >
                                <Link to={firstUrl}>{first}</Link>
                            </BreadcrumbItem>
                        )}
                        {second && (
                            <BreadcrumbItem
                                fontSize="md"
                                fontWeight="medium"
                                _hover={{ color: "#476436" }}
                                _focus={{ boxShadow: "none" }}
                            >
                                <Link to={secondUrl}>{second}</Link>
                            </BreadcrumbItem>
                        )}
                        {third && (
                            <BreadcrumbItem
                                fontSize="md"
                                fontWeight="medium"
                                _hover={{ color: "#476436" }}
                                _focus={{ boxShadow: "none" }}
                                marginX="1"
                                position={"relative"}
                                display={"flex"}
                            >
                                <Link to={thirdUrl}>{third}</Link>
                            </BreadcrumbItem>
                        )}
                        {fourth && (
                            <BreadcrumbItem
                                fontSize="md"
                                fontWeight="medium"
                                _hover={{ color: "#476436" }}
                                _focus={{ boxShadow: "none" }}
                                marginX="1"
                                position={"relative"}
                                display={"flex"}
                                alignContent={"flex-start"}>
                                <Link to={fourthUrl}>{fourth}</Link>
                            </BreadcrumbItem>
                        )}
                    </Breadcrumb>
                </Box>
                <Spacer />
            </Flex>
        </>
    );
}

export default BreadCrumbCom;