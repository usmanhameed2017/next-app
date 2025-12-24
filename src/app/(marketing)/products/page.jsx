import React, { Suspense } from 'react';
import AddProduct from './AddProduct';
import { connectDB } from '@/database/connection';
import Product from '@/models/products';
import ProductsTable from './ProductsTable';

export const metadata = {
    title:"Products"
};

export const dynamic = "force-dynamic";

async function Products({ searchParams }) 
{
    // Pagination options
    const { page = 1, limit = 10, search = "" } = await searchParams;
    const response = await fetch(`${process.env.API_URL}/products?page=${page}&limit=${limit}&search=${search}`, { next:{ revalidate:120 } });
    const data = await response.json();
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
                        <ProductsTable 
                        pagingCounter={data.data.pagingCounter}
                        data={data.data.docs} 
                        total={data.data.totalDocs} 
                        limit={data.data.limit} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;