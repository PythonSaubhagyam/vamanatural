import { useState, useEffect } from "react";
import Table from "./Table";
import Loader from "./Loader";
import { Container, Center, Text } from "@chakra-ui/react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import DataNotFound from "../utils/DataNotFound";

export default function LotNumberTable({ data }) {
  const [lotNumbers, setLotNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
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
    async function getLotNumbers() {
      const response = await client.get("/serial_numbers/", { 
        params: { product_id: data.id },
        headers: { Authorization: `token ${checkLogin().token}` },
      });
      if (response.data.status === true) {
        setLotNumbers(response.data.serial_numbers);
      }
      setLoading(false);
    }
    getLotNumbers();
  }, [data.id]);

  return (
    <Container maxW="90vw" border="1px" borderColor="gray.500" my={4} p={0}>
      {loading ? (
        <Center h="100px" w="100%">
          <Loader />
        </Center>
      ) : (
        <>
          {" "}
          {lotNumbers?.length === 0 && <DataNotFound />}
          <Table
            columns={columns}
            data={lotNumbers}
            onRowClicked={null}
            displayExtensions={false}
          ></Table>
        </>
      )}
    </Container>
  );
}
