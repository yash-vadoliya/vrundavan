import React from "react";
import logo from "../components/vrundavan-logo.png";
import { Link } from "react-router-dom";
import "../components/style.css";

function AdminHeader() {
    return (
        <>
            <header className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between py-3">
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
        {/* Increased Logo Size */}
        <img src={logo} alt="Vrundavan" style={{ width: '80px', height: '80px' }} className="me-3 logo"></img>
        <span className="fs-1" style={{textShadow: "0px 1px 0.5px teal"}}>Vrundavan DairyFarm</span>
    </a>

    <ul className="nav nav-pills">
        <li className="nav-item">
            <a href="/admin/deshbord" className="nav-link d-flex flex-column flex-md-row align-items-center navbar navbar">
                <i className="bi bi-speedometer2 fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Dashboard</span>
            </a>
        </li>
        <li className="nav-item">
            <a href="/admin/product" className="nav-link d-flex flex-column flex-md-row align-items-center navbar navbar">
                <i className="bi bi-grid fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Product</span>
            </a>
        </li>
        <li className="nav-item">
            <Link to="/admin/feedback" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-chat-left-text fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Feedback</span>
            </Link>
        </li>
        <li className="nav-item">
            <Link to="/admin/order" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-receipt fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Order</span>
            </Link>
        </li>
        <li className="nav-item">
            <a href="/" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-box-arrow-right fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">GO SIDE</span>
            </a>
        </li>
    </ul>
</header>

        </>
    );
}

export default AdminHeader

