import client from "../setup/axiosClient";

async function getVisitorId() {
  const response = await client.get("/user/visitor/");
  if (response.data.status === true) {
    localStorage.setItem("visitor_id", response.data.visitor_id);
    return { visitor_id: response.data.visitor_id };
  }
}
export default function CheckOrSetUDID() {
  try {
    const visitor_id = localStorage.getItem("visitor_id");
    if (visitor_id === undefined || visitor_id === null) {
      const resp = getVisitorId();
      return resp;
    } else {
      return { visitor_id: visitor_id };
    }
  } catch (error) {}
}
