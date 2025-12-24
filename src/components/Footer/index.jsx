// "use client";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from "./style.module.css";
import Link from 'next/link';

function Footer() 
{
    return (
        <footer className={`${styles.footerSection}`}>
            <Container>
                <Row>
                    {/* About Section */}
                    <Col md={3} sm={6} className="mb-4 mx-auto">
                        <h5>About Al-Ra’ad</h5>
                        <p> Al-Raad is an Islamic web platform to explore Tafseer, download PDFs, read books, watch videos, and get daily Ayat guidance </p>
                    </Col>

                    {/* Quick Links */}
                    <Col md={3} sm={6} className="mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li> <Link href={`/`}> Home  </Link> </li>
                            <li> <Link href={`/about`}> About </Link> </li>
                            <li> <Link href={`/contact`}> Contact  </Link></li>
                        </ul>
                    </Col>
                </Row>

                <hr className={`${styles.footerDivider}`} />

                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} Al-Ra’ad. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default React.memo(Footer);