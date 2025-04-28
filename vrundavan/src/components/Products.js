import axios from "axios";
import React, { useState, useEffect } from "react";
import "./style.css";

function Products() {
    const [records, setRecords] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 6;
    const [selectedCategory, setSelectedCategory] = useState(""); // State for category filter

    const categories = [
        "Peda", "Traditional Barfi", "Traditional Sweet", "Designer Sweet",
        "Dryfruit Sweet", "ShriKhand", "Liquid Sweets", "Milk Products", "others"
    ];

    useEffect(() => {
        axios.get("http://192.168.1.8:5000/vrundavan/product")
            .then(res => {
                // console.log(res.data[0]);
                setRecords(res.data[0]);
            })
            .catch(err => console.log(err));
    }, []);

    // Filter records based on selected category
    const filteredRecords = selectedCategory    
        ? records.filter(product => product.category === selectedCategory)
        : records;

    // Pagination Logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    const nextPage = () => {
        if (currentPage < Math.ceil(filteredRecords.length / recordsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <>
            {/* Header */}
            <div className="row">
                <div className="col-md-9">
                    <div style={{ fontSize: "30px", textAlign: "center" }}>Product List</div>
                </div>
                <div className="col-md-3">
                    <select
                        name="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="select"
                        required
                    >
                        <option value="">All Categories</option> {/* Added default option */}
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <hr />

            {/* Product List */}
            <div className="row">
                {currentRecords.length > 0 ? (
                    currentRecords.map((list) =>
                    list.status === "Enabled" ? (
                        <div className="col-md-4 pd-4 card-group" key={list.id} style={{ maxWidth: '100%' }}>
                        <div className="card m-2">
                            <img
                            src={`http://192.168.1.8:5000/images/${list.image_url}`}
                            className="card-img-top card-image"
                            alt={list.product_name || "Product Image"}
                            style={{ height: '18rem', objectFit: "cover" }}
                            />
                            <div className="card-body">
                            <h5 className="card-title">{list.product_name || "Unnamed Product"}</h5>
                            <p className="card-text">
                                {list.description || "No description available."}
                            </p>
                            <p className="card-text">
                                <strong>Category:</strong> {list.category || "N/A"}
                            </p>
                            <p className="card-text">
                                <strong>Price:</strong> ₹{list.price || "N/A"} per{" "}
                                <b>{list.category === "Liquid Sweets" || list.product_name === "milk" ? "1L" : "1kg"}</b>
                            </p>
                            </div>
                        </div>
                        </div>
                    ) : (
                        <div className="col-md-4 pd-4 card-group" key={list.id} style={{ maxWidth: '100%' }}>
                        <div className="card m-2 card-disabled">
                            <img
                            src={`http://192.168.1.8:5000/images/${list.image_url}`}
                            className="card-img-top"
                            alt={list.product_name || "Product Image"}
                            style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                            <h5 className="card-title">{list.product_name || "Unnamed Product"}</h5>
                            <p className="card-text">
                                {list.description || "No description available."}
                            </p>
                            <p className="card-text">
                                <strong>Category:</strong> {list.category || "N/A"}
                            </p>
                            <p className="card-text">
                                <strong>Price:</strong> ₹{list.price || "N/A"} per{" "}
                                <b>{list.category === "Liquid Sweets" || list.product_name === "milk" ? "1L" : "1kg"}</b>
                            </p>
                            </div>
                        </div>
                        </div>
                    )
                    )
                ) : (
                    <p className="text-center">No products found.</p>
                )}
                </div>


            {/* Pagination */}
            <div className="container pagination justify-content-center mt-3">
                <button className="button" onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span className="mx-3">
                    Page {currentPage} of {Math.ceil(filteredRecords.length / recordsPerPage)}
                </span>
                <button className="button" onClick={nextPage} disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)}>
                    Next
                </button>
            </div>
        </>
    );
}

export default Products;
