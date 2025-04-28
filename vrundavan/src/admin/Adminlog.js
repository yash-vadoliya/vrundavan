import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import "../components/style.css";

function Adminlog() {
    const [records, setRecords] = useState([]);
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate(); // Initialize navigation hook

    // Fetch users from the server
    useEffect(() => {
        axios
            .get("http://192.168.1.8:5000/vrundavan/user")
            .then(res => {
                setRecords(res.data[0]); // Set all records, not just the first element
            })
            .catch(err => console.log(err));
    }, []); 

    // Update input fields
    const handleChange = e => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = e => {
        e.preventDefault(); 
        const userCheck = records.find(
            user => user.username === data.username && user.password === data.password
        );
        if (userCheck) {
            localStorage.setItem('adminToken', 'VrundavanAdminToken112233')
            navigate("/admin/Deshbord"); 
        } else {
            navigate("/Login");
            setData({
                username : '',
                password : ''
            }) 
        }
    };

    return (
        <>
            <h1 className="text-center">Admin Login Page</h1>
            <form className="container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">User Name</label>
                    <input
                        type="text"
                        id="username"
                        name="username" 
                        value={data.username}
                        onChange={handleChange}
                        placeholder="Enter Username"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Enter Password"
                    />
                </div>
                <button type="submit" className="button-submit">Submit</button>
            </form>
        </>
    );
}

export default Adminlog;
