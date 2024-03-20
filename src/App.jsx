import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import Router from "./routes/routes";
import "@fontsource/open-sans";
import moment from "moment";
import { theme } from "./theme/theme";
import { useEffect } from "react";
import client from "./setup/axiosClient";

export default function App() {
  moment.tz.setDefault("Asia/Kolkata");

  useEffect(() => {
    // eslint-disable-next-line
    const response = client.post("/visit-counter/");
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={Router}></RouterProvider>
    </ChakraProvider>
  );
}
