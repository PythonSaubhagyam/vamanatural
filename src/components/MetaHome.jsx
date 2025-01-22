import React, { useEffect, useState, useCallback } from 'react';
import client from '../setup/axiosClient';
import { Helmet } from 'react-helmet';

const MetaHome = ({ pageUrl }) => {
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const getMeta = useCallback(async () => {
        try {
            const response = await client.get(`/user/meta-tags/?page_url=${pageUrl}`);
            setMeta(response.data);
        } catch (error) {
            console.error('Error fetching meta data:', error);
        } finally {
            setLoading(false);
        }
    }, [pageUrl]);

    useEffect(() => {
        getMeta();
    }, [getMeta]);

    if (loading) {
        return <div>Loading...</div>;
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