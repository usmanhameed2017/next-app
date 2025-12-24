"use client";
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { handleLogout } from '@/actions/auth';

function NavbarBS() 
{
    return (
        <Navbar expand="lg" variant='dark' className="bg-dark">
            <Container fluid>
                <Navbar.Brand>Next App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link href={`/home`}> Home </Link> 
                    <Link href={`/users`}> Users </Link>
                    <Link href={`/products`}> Products </Link>

                    <NavDropdown title="User" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarBS;