import { useState, useEffect, useMemo } from "react";
import Table from "./Table";
import Loader from "./Loader";
import { Container, Center, Text } from "@chakra-ui/react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import DataNotFound from "../utils/DataNotFound";
import { useLocation } from "react-router-dom";
import ERPNavbar from "../components/ERPNavbar";
import { ERPNavbarLinks, ERPConfigLinks } from "../constants/constants";
import CustomBreadcrumb from "../components/CustomBreadcrumb";

export default function SerialNumber({ data }) {
  const [lotNumbers, setLotNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  let query = useQuery();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const product_id = searchParams.get("product_id");
  const [pageNumber, setPageNumber] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(50);

  function useQuery() {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
  }
  const columns = [
    {
      name: "Lot / Serial Numbers",
      selector: (row) => row.serial_no,
      sortable: true,
    },
    {
      name: "Internal Reference",
      selector: (row) => row.internal_reference,
      sortable: true,
    },
    {
      name: "Product",
      selector: (row) => row.product_info.name,
      sortable: true,
    },
    {
      name: "Created on ",
      selector: (row) => row.created_on,
      sortable: true,
      cell: (row) => <Text>{new Date(row.created_on).toLocaleString()}</Text>,
    },
    {
      name: "Company",
      selector: (row) => row.company,
      sortable: true,
    },
  ];

  useEffect(() => {
    async function getLotNumbers(value,key) {
      let response;
      let reqBody = {
        page: key === "page" ? value : pageNumber,
        row_per_page: key === "row" ? value : rowPerPage,
      };
      
      if (query.size === 0) {
      } else {
        response = await client.get(
          `/serial_numbers/?product_id=${product_id}`,
          {
            params: reqBody,
            headers: { Authorization: `token ${checkLogin().token}` },
          }
        );
      }
      if (response.data.status === true) {
        setLotNumbers(response.data.serial_numbers);
      }
      setLoading(false);
    }
    getLotNumbers();
  }, [pageNumber, product_id, query.size, rowPerPage ]);

  const handlePageChange = (page) => {
    setPageNumber(page);
    // getLotNumbers(page, "page");
  };

  const onChangeRowsPerPage = (row) => {
    setRowPerPage(row);
    // getLotNumbers(row, "row");
  };

  return (
    <>
      <ERPNavbar
        navbarLinks={ERPNavbarLinks.Manufacturing}
        configLinks={ERPConfigLinks.Manufacturing}
      />
      <CustomBreadcrumb
        // search={true}
        second={"Manufacturing"}
        secondUrl={"/manufacturing"}
        third={"Serial Number"}
        thirdUrl={"/manufacturing/serial_numbers"}
      />
      <Container maxW="90vw" border="1px" borderColor="gray.500" my={4} p={0}>
        {loading ? (
          <Center h="100px" w="100%">
            <Loader />
          </Center>
        ) : (
          <>
            <Table
              columns={columns}
              data={lotNumbers}
              onRowClicked={null}
              displayExtensions={false}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
            {lotNumbers?.length === 0 && <DataNotFound />}
          </>
        )}
      </Container>
    </>
  );
}
