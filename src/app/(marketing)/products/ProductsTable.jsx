"use client";
import ReactDataTable from '@/components/DataTable';
import api from '@/service/axios';
import React, { useEffect, useMemo, useState } from 'react';

function ProductsTable() 
{
    // States
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);  
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Debounce technique
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [search]); 

    // Fetch data on page load and on search
    useEffect(() => {
        api.get({ url:`/products?page=${currentPage}&limit=${limit}&search=${debouncedSearch}` })
        .then(response => setData(response.data))
        .catch(error => {
            console.log(error.message);
            setData({ docs: [], totalDocs: 0, pagingCounter: 1 });
        })
    }, [currentPage, limit, debouncedSearch]);    

    // Columns
    const columns = useMemo(() => [
        {
            name: "SR.NO",
            cell: (row, index) => (data.pagingCounter || 0) + index,
            sortable: true,
            width: "120px",
        },
        {
            name: "Product Name",
            selector: row => row.name,
            sortable: true,
        },
        {
            name: "Product Price",
            selector: row => row.price,
        }
    ], [data.pagingCounter]);

    return (
        <>
            <ReactDataTable
            title={`Products`}
            columns={columns}
            docs={data.docs}
            totalDocs={data.totalDocs}
            setCurrentPage={setCurrentPage}
            limit={limit} 
            setLimit={setLimit}
            search={search}
            setSearch={setSearch}
            />
        </>
    );
}

export default ProductsTable;