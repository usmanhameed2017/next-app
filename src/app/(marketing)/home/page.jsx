import React from 'react';

export const revalidate = 10;

async function Home() 
{
    const { data } = await (await fetch(`http://localhost:8000/api/v1/products?page=1&limit=100`)).json();
    const products = data.docs;
    return (
        <>
            <h2 className='bg-dark text-white text-center py-5 fw-bold'> HOME PAGE </h2>
            <div className="container mt-5">
                <div className="row">
                    {products.map(product => (
                        <div className="col-md-4" key={product._id}>
                            <div className="card shadow m-1">
                                <div className="card-body">
                                    <h4 className='text-center fw-bold'> { product.name } </h4>
                                    <h6 className='text-center text-secondary'> ${ product.price } </h6>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;