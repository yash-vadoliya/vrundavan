import React from "react";
import logo from "./vrundavan-logo.png";
import { Link } from "react-router-dom";
import "../components/style.css";

function Header() {
    return (
        <>
           <header className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between py-3">
    {/* Logo & Title */}
    
    <a href="/" className="d-flex align-items-center text-dark text-decoration-none">
        <img src={logo} alt="Vrundavan" style={{ maxWidth: '80px', height: '80px' }} className="me-2 logo"></img>
        <h1 className="fs-1">Vrundavan DairyFarm</h1>
    </a>        

    {/* Navigation Menu (Single Line on Mobile) */}
    <ul className="nav nav-pills ">
        <li className="nav-item">
            <a href="/" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-house-door fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Home</span>
            </a>
        </li>
        <li className="nav-item ">
            <a href="/Contact" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-telephone fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Contact</span>
            </a>
        </li>
        <li className="nav-item ">
            <a href="/About" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-info-circle fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">About</span>
            </a>
        </li>
        <li className="nav-item ">
            <a href="/Products" className="nav-link d-flex flex-column flex-md-row align-items-center navbar">
                <i className="bi bi-cart fs-3"></i>
                <span className="small d-none d-md-inline ms-md-2">Products</span>
            </a>
        </li>
    </ul>
</header>


        </>
    );
}

export default Header