import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Footer () {
    return (
        <>
            <footer className="py-4 ps-2 footer">
                <div>
                    <div className="row">
                    {/* Brand Section */}
                        <div className="col-md-5 mb-3">
                            <h5 className="text-uppercase">Vrundavan Dairy Farm</h5>
                            <p>Fresh and pure dairy products straight from our farm to your home.</p>
                        </div>
                        {/* Quick Links */}
                        <div className="col-md-3 mb-3">
                            <h5 className="text-uppercase  text-start">Quick Links</h5>
                            <ul className="list-unstyled text-start ms-4">
                                <li>
                                    <a href="/" className="text-dark text-decoration-none">
                                        <i className="bi bi-house-fill me-2"></i> Home
                                    </a>
                                </li>
                                <li>
                                    <a href="/Contact" className="text-dark text-decoration-none">
                                        <i className="bi bi-telephone-fill me-2"></i> Contact
                                    </a>
                                </li>
                                <li>
                                    <a href="/About" className="text-dark text-decoration-none">
                                        <i className="bi bi-info-circle-fill me-2"></i> About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/Products" className="text-dark text-decoration-none">
                                        <i className="bi bi-cart-fill me-2"></i> Products
                                    </a>
                                </li>
                            </ul>


                        </div>
                        {/* Contact Section */}
                        <div className="col-md-3 mb-3">
                            <h5 className="text-uppercase text-start">Contact Us</h5>
                            <ul className="list-unstyled text-start ms-4">
                                <li>
                                    <i className="bi bi-geo-alt-fill me-2"></i>
                                    <a href="https://www.google.com/maps/place/B%2F8,+Shreenath+Nagar,+Junagadh,+Gujarat+362001/@21.5187972,70.4664462,51m/data=!3m1!1e3!4m6!3m5!1s0x3958019006f42747:0x5e26aa171ec57cd4!8m2!3d21.5186881!4d70.4667093!16s%2Fg%2F11f54km384?authuser=0&entry=ttu&g_ep=EgoyMDI1MDMyNC4wIKXMDSoASAFQAw%3D%3D" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-decoration-none text-dark">
                                        Javahar Road, Junagadh
                                    </a>
                                </li>
                                <li>
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <a href="tel:+919876543210" 
                                    className="text-decoration-none text-dark">
                                        +91 98765 43210
                                    </a>
                                </li>
                                <li>
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    <a href="mailto:vrundavandairyfarm@gmail.com" 
                                    className="text-decoration-none text-dark">
                                        vrundavandairyfarm@gmail.com
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="text-center mt-3">
                        <p className="mb-0">
                            <Link className="nav-link active" aria-current="page"  to="/Login">© 2025 Vrundavan Dairy Farm. All rights reserved.</Link>
                        </p>
                </div>
            </footer>
        </>
    );
}

export default Footer;