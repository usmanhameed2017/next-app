import React, { Suspense } from 'react';
import AddProduct from './AddProduct';
import { connectDB } from '@/database/connection';
import Product from '@/models/products';
import ProductsTable from './ProductsTable';

export const metadata = {
    title:"Products"
};

async function Products() 
{
    return (
        <>
            <h2 className='bg-dark text-white text-center py-5 fw-bold'> PRODUCTS PAGE </h2>
            <div className="container-fluid mt-5">
                <div className="row mb-3">
                    <div className="col-md-12">
                        <AddProduct />
                    </div>
                </div>
                <div className="row mb-1">
                    <div className="col-md-12">
                        <ProductsTable />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;