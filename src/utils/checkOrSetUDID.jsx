// import client from "../setup/axiosClient";

// async function getVisitorId() {
//   const response = await client.get("/user/visitor/");
//   if (response.data.status === true) {
//     localStorage.setItem("visitor_id", response.data.visitor_id);
//     return { visitor_id: response.data.visitor_id };
//   }
// }
// export default function CheckOrSetUDID() {
//   try {
//     const visitor_id = localStorage.getItem("visitor_id");
//     if (visitor_id === undefined || visitor_id === null) {
//       const resp = getVisitorId();
//       return resp;
//     } else {
//       return { visitor_id: visitor_id };
//     }
//   } catch (error) {}
// }
import client from "../setup/axiosClient";

let visitorIdPromise = null; 

async function getVisitorId() {
  if (!visitorIdPromise) {
    visitorIdPromise = client.get("/user/visitor/")
      .then(response => {
        if (response.data.status === true) {
          localStorage.setItem("visitor_id", response.data.visitor_id);
          return { visitor_id: response.data.visitor_id };
        } else {
          throw new Error("Failed to fetch visitor ID");
        }
      })
      .catch(error => {
        console.error("Error fetching visitor ID:", error);
        return { visitor_id: null }; 
      })
      .finally(() => {
        visitorIdPromise = null; 
      });
  }
  return visitorIdPromise;
}

export default async function CheckOrSetUDID() {
  try {
    const visitor_id = localStorage.getItem("visitor_id");
    if (!visitor_id) {
      const resp = await getVisitorId();
      return resp;
    } else {
      return { visitor_id: visitor_id };
    }
  } catch (error) {
    console.error("Error in CheckOrSetUDID:", error);
    return { visitor_id: null }; // Handle error gracefully
  }
}