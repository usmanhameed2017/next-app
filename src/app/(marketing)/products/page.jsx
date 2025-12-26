"use client";
import { useEffect, useMemo, useState } from 'react';
import Animation from '@/components/Animation';
import api from '@/service/axios';
import ReactDataTable from '@/components/DataTable';
import ModalBS from '@/components/Modal';

function Products() 
{
    // States   
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0); 
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);  
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");        

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(price);
    };

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
            <h2 className='bg-dark text-white text-center py-5 fw-bold'> PRODUCTS PAGE </h2>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <button className='btn btn-primary float-end' onClick={handleShow}> Add new </button>
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-md-8 mx-auto">
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
                    </div>
                </div>
            </div>

            {/* Add Modal */}
            <ModalBS show={show} handleClose={handleClose} title={`Add Product`}>
                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name"> Product Name </label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Product Name'
                        value={name} onChange={ (e) => setName(e.target.value) } />
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="price"> Product Price </label>
                        <input type="number" name='price' className='form-control' placeholder='Enter Product Price'
                        value={price} onChange={ (e) => setPrice(e.target.value) } />
                    </div>  

                    {/* Save */}
                    <div className="form-group d-flex gap-2">
                        <button type='submit' className='btn btn-info'> Save </button>
                        <button type='button' className='btn btn-danger' onClick={handleClose}> Cancel </button>
                    </div>
                </form>
            </ModalBS>            
        </>
    );
}

export default Products;