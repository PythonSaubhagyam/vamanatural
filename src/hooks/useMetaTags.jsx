import { useState, useEffect } from "react";
import client from "../setup/axiosClient";

const useMetaTags = (pageUrl) => {
  const [metaTags, setMetaTags] = useState({
    title: "",
    description: "",
    keywords: "",
    robots: "index,follow",
  });

  useEffect(() => {
    const fetchMetaTags = async () => {
      try {
        const response = await client.get(
          `/user/meta-tags/?page_url=${pageUrl}`
        );
        const data = await response.data;
        setMetaTags(data);
      } catch (error) {
        console.error("Error fetching meta tags:", error);
      }
    };

    fetchMetaTags();
  }, [pageUrl]);

  return metaTags;
};

export default useMetaTags;
