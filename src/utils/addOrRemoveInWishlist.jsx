import client from "../setup/axiosClient";
import checkLogin from "./checkLogin";
import { createStandaloneToast } from "@chakra-ui/react";
import CheckOrSetUDID from "./checkOrSetUDID";
import Router from "../routes/routes";

export default async function AddOrRemoveInWishlist(product_id) {
  const { ToastContainer, toast } = createStandaloneToast();

  const loginInfo = checkLogin();
  const checkOrSetUDIDInfo = CheckOrSetUDID();
  let headers = { visitor: checkOrSetUDIDInfo.visitor_id };
  if (loginInfo.isLoggedIn === true) {
    headers = { Authorization: `Token ${loginInfo.token}` };
  }

  if (
    checkOrSetUDIDInfo.visitor_id !== undefined ||
    loginInfo.isLoggedIn === true
  ) {
    try {
      const response = await client.post(
        "/wishlist/",
        { pid: product_id },
        { headers: headers }
      );
      if (response.data.status) {
        if (response.data.message === "Added in wishlist") {
          toast({
            title: "Product added to wishlist!",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          localStorage.setItem(
            "wishlist_counter",
            response.data.wishlist_counter
          );
          // Router.navigate("/wishlist");
          return { status: true, code: "Added" };
        } else if (response.data.message === "Removed from wishlist") {
          toast({
            title: "Product removed from wishlist!",
            status: "success",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          localStorage.setItem(
            "wishlist_counter",
            response.data.wishlist_counter
          );
          return { status: true, code: "Removed" };
        } else {
          toast({
            title: response.data.message,
            status: "error",
            position: "top-right",
            duration: 3000,
            isClosable: true,
          });
          return { status: false };
        }
      } else {
        toast({
          description:
            "There was an error adding your product to wishlist! Please try again!",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        return { status: false };
      }
    } catch (error) {
      toast({
        title: error.response.message,
        status: "warning",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return { status: false, code: "error" };
    }
  } else {
    toast({
      title: "There was an error updating your wishlist!",
      description: "Please reload the page and try again!",
      status: "error",
      position: "top-right",
      duration: 5000,
      isClosable: true,
    });
  }

  return <ToastContainer />;
}
