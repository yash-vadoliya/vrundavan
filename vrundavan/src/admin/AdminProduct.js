import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../components/style.css";

function AdminProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = ["Peda", "Traditional Barfi", "Traditional Sweet", "Designer Sweet", "Dryfruit Sweet", "ShriKhand", "Liquid Sweets", "Milk Products", "Others"];
    const status = ["Enabled", "Disabled"];

    const [data, setData] = useState({
        product_name: "",
        description: "",
        category: categories[0],
        price: "",
        stock: "",
        status: status[0],
        image: null,
        existingImage: "",
    });

    const [alertMessage, setAlertMessage] = useState("");  // ✅ Stores alert message
    const [alertType, setAlertType] = useState("");  // ✅ "success" or "danger"

    useEffect(() => {
        if (id) {
            axios.get(`http://192.168.1.8:5000/vrundavan/product/${id}`)
                .then((res) => {
                    const product = res.data;   
                    setData({
                        product_name: product.product_name || "",
                        description: product.description || "",
                        category: product.category || "",
                        price: product.price || 0,
                        stock: product.stock || 0,
                        status: product.status || status[0],
                        existingImage: product.image_url || "",
                        image: null,
                    });
                })
                .catch((err) => {
                    showAlert("Error fetching product data!", "danger");
                    console.error("Error fetching data:", err);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setData({ ...data, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product_name", data.product_name);
        formData.append("description", data.description);
        formData.append("category", data.category);
        formData.append("price", data.price);
        formData.append("stock", data.stock);   
        formData.append("status", data.status);
        formData.append("image", data.image);

        try {
            let response;
            if (id) {
                response = await axios.put(`http://192.168.1.8:5000/vrundavan/product/${id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                response = await axios.post("http://192.168.1.8:5000/vrundavan/product", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            if (response.status === 200 || response.status === 201) {
                showAlert(`Product ${id ? "updated" : "added"} successfully!`, "success");
                setTimeout(() => navigate("/admin/deshbord"), 1000); // Redirect after 2s
            } else {
                showAlert("Error: " + response.data.error, "danger");
            }
        } catch (error) {
            showAlert("Error submitting form! Please try again.", "danger");
            console.error("Error submitting form:", error);
        }
    };

    // ✅ Function to show alerts
    const showAlert = (message, type) => {
        setAlertMessage(message);
        setAlertType(type);
        setTimeout(() => {
            setAlertMessage(""); // Hide alert after 3 seconds
        }, 3000);
    };

    return (
        <div className="container mt-4">
            <h1>{id ? "Update" : "Add"} Product</h1>

            {/* ✅ Alert Box for Success/Error Messages */}
            {alertMessage && (
                <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
                    {alertMessage}
                    <button type="button" className="btn-close" onClick={() => setAlertMessage("")}></button>
                </div>
            )}

            <form className="form" onSubmit={handleSubmit}>
                <div>
                    <label className="form-label">Product Name</label>
                    <input type="text" name="product_name" value={data.product_name || ""} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                    <label className="form-label">Description</label>
                    <textarea name="description" value={data.description || ""} onChange={handleInputChange} className="textarea" required />
                </div>
                <div>
                    <label className="form-label">Category</label>
                    <select name="category" value={data.category || ""} onChange={handleInputChange} className="select" required>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Price</label>
                    <input type="number" name="price" value={data.price || ""} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                    <label className="form-label">Stock</label>
                    <input type="number" name="stock" value={data.stock || ""} onChange={handleInputChange} className="input" required />
                </div>
                <div>
                    <label className="form-label">Status</label>
                    <select name="status" value={data.status || ""} onChange={handleInputChange} className="select" required>
                        {status.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="form-label">Product Image</label>
                    <input type="file" name="image" onChange={handleImageChange} className="input" accept="image/*" />
                </div>
                {id ? (
                    <button type="submit" className="button_Update">
                        Update Product
                    </button>
                ) : (
                    <button type="submit" className="button-submit">
                        Add Product
                    </button>
                )}
            </form>
        </div>
    );
}

export default AdminProduct;
