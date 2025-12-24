import React from 'react';
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
    // Connect database
    await connectDB();

    // Pagination options
    const { page, limit, search } = await searchParams;
    const options = {
        page: Number(page) || 1,
        limit: Number(limit) || 3,
        lean: true,
        sort:{ _id: -1 }
    };

    // Search filter
    const query = search ? { name:{ $regex:search, $options:"i" } } : {};

    // Execute query
    const products = await Product.paginate(query, options);   

    // Normalize mongodb ID
    const docs = products.docs.map(doc => ({
        ...doc,
        _id: doc._id.toString()
    }));

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
                        pagingCounter={products.pagingCounter}
                        data={docs} 
                        total={products.totalDocs} 
                        limit={products.limit} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Products;