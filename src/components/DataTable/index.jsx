"use client";
import DataTable, { createTheme } from "react-data-table-component";
import styles from "./style.module.css";
import { Row, Col } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ReactDataTable({ title, entity, columns, data, total, limit }) 
{
    // State
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // Data table theme
    createTheme("next", {
        text: { primary: "#e5e7eb", secondary: "#cbd5e1" },
        background: { default: "#070911ff" },
        context: { background: "#00bcd4", text: "#070911ff" },
        divider: { default: "#070911ff" },
        action: { button: "#00bcd4", hover: "#00bcd4", disabled: "rgba(255,255,255,0.3)" },
    }, "dark");   

    // Custom datatable style
    const customStyles = {
        headCells: {
            style: {
                fontSize: "16px",
                fontWeight: "700",
                color: "#ffffff",
                backgroundColor: "#070911ff",
                paddingTop:"20px",
                paddingBottom:"20px",
            },
        },        
        cells: {
            style: { paddingTop: "8px", paddingBottom: "8px" }
        },
        rows: {
            style: { backgroundColor: "#070911ff", borderRadius:"2px" }, 
            stripedStyle: { backgroundColor: "#141729ff" },
        }
    };

    // Router instance
    const router = useRouter();

    // Handle page change
    const handlePageChange = (page) => router.push(`/${entity}?page=${page}&limit=${limit}`);

    // Handle per row limit change
    const handlePerRowsChange = (newLimit, page) => router.push(`/${entity}?page=${page}&limit=${newLimit}`);

    // Handle Search
    const handleSearch = (e) => setDebouncedSearch(e.target.value);

    useEffect(() => {
       const timeout = setTimeout(() => {
            router.push(`/${entity}?page=1&limit=3&search=${debouncedSearch}`);
        }, 400);   
        return () => clearTimeout(timeout);
    },[debouncedSearch]);

    return (
        <>
            {/* Search Field */}
            <Row>
                <Col xl="2" lg="4" md="6" sm="12" xs="12" className='ms-auto'>
                    <input type="search" placeholder="Search" className="form-control"
                    onChange={handleSearch} />
                </Col>
            </Row>
            
            {/* Data Table */}
            <Row className="mt-3">
                <Col>
                    <div className={styles.dataTableContainer}>
                        <DataTable
                        title={ <div className={styles.tableTitle}> {title}</div> }
                        theme="next"
                        customStyles={customStyles}
                        columns={columns}
                        data={data}
                        pagination
                        paginationServer
                        paginationPerPage={limit}
                        paginationRowsPerPageOptions={[3, 25, 50, 100]}
                        paginationTotalRows={total}
                        paginationDefaultPage={1}
                        onChangePage={handlePageChange}
                        onChangeRowsPerPage={handlePerRowsChange}
                        highlightOnHover
                        striped 
                        persistTableHead />
                    </div>
                </Col>
            </Row>            
        </>
    );
}

export default ReactDataTable;