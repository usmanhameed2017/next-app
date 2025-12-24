"use client";
import { addProduct } from '@/actions/products';
import ModalBS from '@/components/Modal';
import { showSuccess } from '@/utils/toasterMessage';
import React, { useActionState, useEffect, useState } from 'react';

function AddProduct() 
{
    // States
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    // Initial State
    const initialState = {
        success:false,
        errors:{}
    };

    // Action state
    const [state, formAction, pending] = useActionState(addProduct, initialState);

    useEffect(() => {
        if(state.success) 
        {
            showSuccess("Product added");
            handleClose();
            state.success = false;
        }
    }, [state.success]);
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
                <form action={formAction}>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name"> Product Name </label>
                        <input type="text" name='name' className='form-control' placeholder='Enter Product Name' />
                        { state.errors.name && <span className='text-danger mt-1'> *{ state.errors.name } </span> }
                    </div>

                    {/* Price */}
                    <div className="form-group">
                        <label htmlFor="name"> Product Price </label>
                        <input type="number" name='price' className='form-control' placeholder='Enter Product Price' />
                        { state.errors.price && <span className='text-danger mt-1'> *{ state.errors.price } </span> }
                    </div>  

                    {/* Save */}
                    <div className="form-group d-flex gap-2">
                        <button type='submit' className='btn btn-info' disabled={pending}> Save </button>
                        <button type='button' className='btn btn-danger' onClick={handleClose}> Cancel </button>
                    </div>
                </form>
            </ModalBS>
        </>
    );
}

export default AddProduct;