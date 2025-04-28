import axios from "axios";
import React, { useState } from "react";
import "./style.css";

function Contact() {
    const message_types = ["Comments", "Suggestions for Improvement", "Specific Issue Reports", "Satisfaction Ratings"];

    const [data, setData] = useState({
        name: "",
        email: "",
        message_type: message_types[0],
        message: "",
    });

    const [alert, setAlert] = useState({ message: "", type: "" });

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://192.168.1.8:5000/vrundavan/feedback", data, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200 || response.status === 201) {
                showAlert("Message sent successfully!", "success");
                setData({ name: "", email: "", message_type: message_types[0], message: "" });
            } else {
                showAlert("Error: " + response.data.error, "danger");
            }
        } catch (err) {
            showAlert("Error submitting form. Please check the backend logs.", "danger");
            console.error("Error: ", err);
        }
    };

    // ✅ Function to Show Alerts
    const showAlert = (message, type) => {
        setAlert({ message, type });
        setTimeout(() => setAlert({ message: "", type: "" }), 3000);
    };

    return (
        <div className="container mt-4">
            <h1>Contact Information</h1>

            {/* ✅ Alert Box */}
            {alert.message && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" onClick={() => setAlert({ message: "", type: "" })}></button>
                </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Name</label><br></br>
                    <input type="text" name="name" value={data.name} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                    <label className="form-label">Email</label><br></br>
                    <input type="email" name="email" value={data.email} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                    <label className="form-label">Message Type</label><br></br>
                    <select name="message_type" value={data.message_type} onChange={handleInputChange} className="select" required>
                        {message_types.map((type, index) => (
                            <option key={index} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Message</label><br></br>
                    <textarea name="message" value={data.message} onChange={handleInputChange} className="textarea" required />
                </div>
                <button type="submit" className="button-submit">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;
