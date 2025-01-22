import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import client from "../setup/axiosClient";

const MetaTags = ({ pageUrl }) => {
  const [metaData, setMetaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedMetaData =
      JSON.parse(localStorage.getItem("metaDataStore")) || {};

    if (storedMetaData[pageUrl]) {
      setMetaData(storedMetaData[pageUrl]);
      setIsLoading(false);
    } else {
      const fetchMetaData = async () => {
        try {
          const response = await client.get(
            `/user/meta-tags/?page_url=${pageUrl}`
          );
          const data = response.data;

          setMetaData(data);

          const updatedMetaData = {
            ...storedMetaData,
            [pageUrl]: data,
          };
          localStorage.setItem(
            "metaDataStore",
            JSON.stringify(updatedMetaData)
          );

          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching meta data:", error);
          setIsLoading(false);
        }
      };
      fetchMetaData();
    }
  }, [pageUrl]);

  if (isLoading) {
    return null;
  }

  if (metaData) {
    return (
      <Helmet>
        <title>{metaData.title || "VAMA"}</title>
        <meta name="description" content={metaData.description} />
        <meta name="keywords" content={metaData.keywords} />
      </Helmet>
    );
  }

  return (
    <Helmet>
      <title>Vama</title>
      <meta
        name="description"
        content="Herbal beauty care products 
        designed to rejuvenate your skin and promote natural, chemical-free skin health and wellness."
      />
    </Helmet>
  );
};

export default MetaTags;
