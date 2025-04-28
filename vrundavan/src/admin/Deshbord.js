import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../components/style.css";

function Deshbord() {
    const [records, setRecords] = useState([]);
    const [filteredRecords, setFilteredRecords] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productToDelete, setProductToDelete] = useState(null);
    const [status, setStatus] = useState("All");
    const recordsPerPage = 10;
    const navigate = useNavigate();
    const statusOptions = ["All","Enabled", "Disabled"];

    useEffect(() => {
        axios.get("http://192.168.1.8:5000/vrundavan/product")
            .then((res) => {
                setRecords(res.data[0]);
                filterProducts(res.data[0], status);
            })
            .catch((err) => console.error("Error fetching data:", err));
    }, []);

    useEffect(() => {
        filterProducts(records, status);
    }, [status, records]);

    const filterProducts = (records, status) => {
        if (status === "All") {
            setFilteredRecords(records);
        } else {
            const filtered = records.filter(product => product.status === status);
            setFilteredRecords(filtered);
        }
    };

    const confirmDelete = () => {
        if (productToDelete) {
            axios.delete(`http://192.168.1.8:5000/vrundavan/product/${productToDelete}`)
                .then(() => {
                    const updatedRecords = records.filter(record => record.id !== productToDelete);
                    setRecords(updatedRecords);
                    setProductToDelete(null);
                    alert("Product deleted successfully!");
                })
                .catch(err => console.error("Error deleting product:", err));
        }
    };

    const confirmUpdate = (id) => {
        navigate(`/admin/product/${id}`);
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredRecords(records.filter(product =>
            product.product_name.toLowerCase().includes(value)
        ));
        setCurrentPage(1);
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

    return (
        <div>
            <div className="row my-3">
                <div className="col-md-6 text-center">
                    <h1>All Products</h1>
                </div>
                <div className="col-md-3">
                    <input
                        type="text"
                        className="form"
                        placeholder="Search by product name"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label">Filter by Status:</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="form-select"
                    >
                        {statusOptions.map((status, index) => (
                            <option key={index} value={status}>{status}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table-container">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.length > 0 ? (
                            currentRecords.map((list) => (
                                <tr key={list.id}>
                                    <td>{list.product_name}</td>
                                    <td>{list.description}</td>
                                    <td>{list.category}</td>
                                    <td>{list.price}</td>
                                    <td>{list.stock} {list.category === "Liquid Sweets" || list.product_name === "milk" ? "L" : "kg"}</td>
                                    <td>{list.status}</td>
                                    <td>
                                        <img
                                            src={`http://192.168.1.8:5000/images/${list.image_url}`}
                                            alt={list.product_name || "Product Image"}
                                            style={{ height: "50px", objectFit: "cover" }}
                                        />
                                    </td>
                                    <td>
                                        <button className="button_Update" onClick={() => confirmUpdate(list.id)}>Update</button>
                                        <button className="button_Delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => setProductToDelete(list.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center">No products found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this product?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={confirmDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
                <button className="button me-3" onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {Math.ceil(filteredRecords.length / recordsPerPage)}</span>
                <button className="button ms-3" onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= Math.ceil(filteredRecords.length / recordsPerPage)}>Next</button>
            </div>
        </div>
    );
}

export default Deshbord;
