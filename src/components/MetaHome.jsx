import React, { useEffect, useState, useCallback } from 'react';
import client from '../setup/axiosClient';
import { Helmet } from 'react-helmet';

const MetaHome = ({ pageUrl }) => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const getMeta = useCallback(async () => {
        try {
          const storedMetaData = JSON.parse(localStorage.getItem("metaDataStore")) || {};
          
          if (storedMetaData[pageUrl]) {
            setMeta(storedMetaData[pageUrl]);
            setLoading(false);
          } else {
            const response = await client.get(`/user/meta-tags/?page_url=${pageUrl}`);
            const fetchedMeta = response.data;
    
            setMeta(fetchedMeta);
    
            const updatedMetaData = {
              ...storedMetaData,
              [pageUrl]: fetchedMeta,
            };
            localStorage.setItem("metaDataStore", JSON.stringify(updatedMetaData));
    
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching meta data:", error);
          setLoading(false);
        }
      }, [pageUrl]);
    
      useEffect(() => {
        getMeta();
      }, [getMeta]);

    if (loading) {
        return null;
    }

    return (
        <Helmet>
            <title>{meta?.title || 'Vama | Home'}</title>
            <meta name="description" content={meta?.description} />
            <meta name="keywords" content={meta?.keywords} />

        </Helmet>
    );
};

export default MetaHome;