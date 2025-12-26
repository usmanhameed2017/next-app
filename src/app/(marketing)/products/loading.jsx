import React from 'react'

function Loading() 
{
    return (
        <div style={{ display:'flex', alignItems:'center', justifyContent:"center", minHeight:"100vh" }}>
            <h4 className='fw-bold text-secondary'> Loading Products... </h4>
        </div>
    );
}

export default Loading;