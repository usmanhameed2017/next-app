import React from 'react';
import { Modal } from 'react-bootstrap';
import styles from './style.module.css';

function ModalBS({ children, show, handleClose, title }) 
{
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size='lg' className={styles.modal}>
                <Modal.Header closeButton className={styles.modalHeader}>
                    <Modal.Title className="ms-auto"> 
                        <h2 className={styles.modalTitle}> { title || "Modal title" }  </h2>
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body className={styles.modalBody}>
                    { children }
                </Modal.Body>
            </Modal>            
        </>
    );
}

export default ModalBS;