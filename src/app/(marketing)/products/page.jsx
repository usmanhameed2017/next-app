"use client";
import { useCallback, useEffect, useMemo, useState } from 'react';
import api from '@/service/axios';
import ReactDataTable from '@/components/DataTable';
import ModalBS from '@/components/Modal';

function Products() 
{
    // States   
    const [data, setData] = useState({ docs: [], totalDocs: 0, pagingCounter: 1 });
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(3);  
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");     
    const [loading, setLoading] = useState(false);  
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Fetch
    const fetchData = useCallback(async () => {
        try
        {
            const response = await api.get({ url:`/products?page=${currentPage}&limit=${limit}&search=${debouncedSearch}` });
            setData(response.data);
        }
        catch(error)
        {
            onsole.log(error.message);
            setData({ docs: [], totalDocs: 0, pagingCounter: 1 });
        }      
    },[currentPage, limit, debouncedSearch]);

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
        fetchData();
    }, [fetchData]);

    // Handle submit
    const handleSubmit = useCallback(async(formData) => {
        setLoading(true);
        try 
        {
            const name = formData.get("name");
            const price = formData.get("price");

            await api.post({ url:"/products", payload:{ name, price } });
            handleClose();
            fetchData();
        } 
        catch(error) 
        {
            console.log(error.message);
        }
        finally
        {
            setLoading(false);
        }
    });    

    // Columns
    const columns = useMemo(() => [
        { name: "SR.NO", cell: (row, index) => (data.pagingCounter || 0) + index, sortable: true, width: "120px" },
        { name: "Product Name", selector: row => row.name, sortable: true },
        { name: "Product Price", selector: row => row.price }
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
                <form action={handleSubmit}>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name"> Product Name </label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Product Name' />
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="price"> Product Price </label>
                        <input type="number" name='price' className='form-control' placeholder='Enter Product Price' />
                    </div>  

                    {/* Save */}
                    <div className="form-group d-flex gap-2">
                        <button type='submit' className='btn btn-info' disabled={loading}> Save </button>
                        <button type='button' className='btn btn-danger' onClick={handleClose}> Cancel </button>
                    </div>
                </form>
            </ModalBS>            
        </>
    );
}

export default Products;