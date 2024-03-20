import { useState, useEffect } from "react";
import Table from "../components/Table";
import Loader from "../components/Loader";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import { Center, Container, useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import DataNotFound from "../utils/DataNotFound";

export default function TimesheetTable({ data }) {
  const [timesheetData, setTimesheetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Project",
      selector: (row) => row.project.name,
      sortable: true,
      cell: (row) => (
        <Link to={`/projects/${row.project.id}`}>{row.project.name}</Link>
      ),
    },
    {
      name: "Start time",
      selector: (row) => new Date(row.start_datetime).toLocaleString(),
      sortable: true,
    },
    {
      name: "End time",
      selector: (row) =>
        row.end_datetime ? new Date(row?.end_datetime)?.toLocaleString() : null,
      sortable: true,
    },
    {
      name: "Task",
      selector: (row) => row.task.name,
      sortable: true,
      cell: (row) => (
        <Link to={`/projects/tasks/${row.task.id}`}>{row.task.name}</Link>
      ),
    },
    {
      name: "Duration",
      selector: (row) => row.duration,
      sortable: true,
    },
  ];

  async function getTimesheetData() {
    const response = await client.get(`/projects/timesheet/`, {
      params: { employee_id: data.id },
      headers: { Authorization: `token ${checkLogin().token}` },
    });
    if (response.data.status === true) {
      setTimesheetData(response.data.timesheets);
    } else {
      toast({});
    }
    setLoading(false);
  }

  useEffect(() => {
    getTimesheetData(); // eslint-disable-next-line
  }, []);

  return (
    <Container maxW="100vw" border="2px" borderColor="black.900">
      {loading ? (
        <Center h="100px" w="100%">
          <Loader />
        </Center>
      ) : (
        <>
          <Table
            columns={columns}
            data={timesheetData}
            onRowClicked={null}
            displayExtensions={false}
          ></Table>
          {timesheetData.length === 0 && <DataNotFound />}
        </>
      )}
    </Container>
  );
}
