import React from "react";
import "../components/style.css";
import { useNavigate } from "react-router-dom";


function AdminFooter() {
    const navigate = useNavigate();
    
    const handleLogout =  () => {
        localStorage.removeItem('adminToken');

        navigate('/login');
    }
    return (
        <>
            <footer className="text-center">
                <p>© 2025 Vrundavan Dairy Farm. All rights reserved.</p>
                <button className="button_Delete" onClick={handleLogout}>LOGOUT</button>
            </footer>
        </>
    );
}

export default AdminFooter