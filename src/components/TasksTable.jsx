import { useState, useEffect } from "react";
import client from "../setup/axiosClient";
import checkLogin from "../utils/checkLogin";
import Loader from "./Loader";
import Table from "./Table";
import TimerButton from "./TimerButton";
import { Center, Container, Checkbox, useToast } from "@chakra-ui/react";
import DataNotFound from "../utils/DataNotFound";

export default function TasksTable({ data }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();
  const loginInfo = checkLogin();

  const columns = [
    {
      name: "",
      selector: (row) => row.important,
      sortable: true,
      cell: (row) => <Checkbox></Checkbox>,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.task_status,
      sortable: true,
    },
    {
      name: "Assigned to",
      selector: (row) => row.assigned_to_obj.name,
      sortable: true,
    },
    {
      name: "Deadline",
      selector: (row) => new Date(row.deadline).toLocaleString(),
      sortable: true,
    },
    {
      name: "",
      selector: (row) => row.running_task,
      cell: (row) => (
        <TimerButton
          row={row}
          handleTimerToggle={() => handleTimerToggle(row)}
        />
      ),
    },
  ];

  useEffect(() => {
    getTasks(); // eslint-disable-next-line
  }, [data.id]);

  async function handleTimerToggle(row) {
    const loginInfo = checkLogin();
    if (row.running_task.running === true) {
      const response = await client.patch(
        `/projects/timesheet/${row.running_task?.timesheet_id}/`,
        { end_datetime: new Date() },
        {
          headers: { Authorization: `token ${loginInfo.token}` },
        }
      );
      if (response.data.status === true) {
        getTasks();
        toast({
          title: "Timer stopped!",
          status: "info",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    } else {
      try {
        const response = await client.post(
          "/projects/timesheet/",
          {
            project_id: data.id,
            task_id: row.id,
            start_datetime: new Date(),
          },
          {
            headers: { Authorization: `token ${loginInfo.token}` },
          }
        );
        if (response.data.status === true) {
          getTasks();
          toast({
            title: "Timer started!",
            status: "success",
            position: "top-right",
            duration: 4000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: error.response.data.message,
          status: "error",
          position: "top-right",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  }

  async function getTasks() {
    const response = await client.get("/projects/task", {
      params: { project_id: data.id },
      headers: { Authorization: `token ${loginInfo.token}` },
    });
    response.data.status === true ? setTasks(response.data.tasks) : toast({});
    setLoading(false);
  }

  return (
    <Container maxW="90vw" border="1px" borderColor="gray.500" my={4} p={0}>
      {loading ? (
        <Center h="100px" w="100%">
          <Loader />
        </Center>
      ) : (
        <>
          <Table
            columns={columns}
            data={tasks}
            onRowClicked={null}
            displayExtensions={false}
          ></Table>
          {tasks.length === 0 && <DataNotFound />}
        </>
      )}
    </Container>
  );
}
