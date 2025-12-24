import React from 'react'
import { handleLogout } from '@/actions/auth';

async function LogoutButton({ children, className, style }) 
{
    return (
        <button className={className} style={style} onClick={handleLogout}>
            { children }
        </button>
    );
}

export default LogoutButton;