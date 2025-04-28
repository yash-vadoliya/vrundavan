import axios from "axios";
import React, { useEffect, useState } from "react";
import "../components/style.css";

function Feedback() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("http://192.168.1.8:5000/vrundavan/feedback")
            .then((res) => {
                console.log("Fetched Data:", res.data); // Debugging
                setData(res.data[0]);  // ✅ Corrected state update
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    return (
        <>
            <h1>Feedback</h1>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Message Type</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((list, index) => (  
                            <tr key={index}>
                                <td>{list.id}</td>
                                <td>{list.name}</td>
                                <td>{list.email}</td>
                                <td>{list.message_type}</td>
                                <td>{list.message}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No feedback found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default Feedback;
