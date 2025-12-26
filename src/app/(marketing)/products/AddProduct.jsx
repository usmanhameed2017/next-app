"use client";
import ModalBS from '@/components/Modal';
import { showSuccess } from '@/utils/toasterMessage';
import React, { useState } from 'react';

function AddProduct() 
{
    // States
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name);
        console.log(price);
    };

    return (
        <>
            <div className="container-fluid mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <button className='btn btn-primary float-end' onClick={handleShow}> Add new </button>
                    </div>
                </div>
            </div>

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

export default AddProduct;