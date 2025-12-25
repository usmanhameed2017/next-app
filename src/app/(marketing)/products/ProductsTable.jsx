"use client";
import ReactDataTable from '@/components/DataTable';
import React, { useEffect, useState } from 'react'

function ProductsTable() 
{
    // States
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(10);  
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
        
    }, [currentPage, limit, debouncedSearch]);    

    // Columns
    const columns = [
        { name: "SR.NO", cell: (row, index) => (pagingCounter || 0) + index, sortable: true, width: "120px" },
        { name: "Product Name", selector: row => row.name, sortable: true },
        { name: "Product Price", selector: row => row.price }
    ]; 

    return (
        <>
            <ReactDataTable
            title={`Products`}
            columns={columns}
            docs={data}
            totalDocs={total}
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