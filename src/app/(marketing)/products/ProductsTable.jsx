"use client";
import ReactDataTable from '@/components/DataTable';
import React from 'react'

function ProductsTable({ pagingCounter, data, total, limit }) 
{
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
            entity={`products`}
            columns={columns}
            data={data}
            total={total}
            limit={limit} />
        </>
    );
}

export default ProductsTable;