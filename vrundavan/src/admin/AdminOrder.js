import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../components/style.css";

function AdminOrder() {
    const [showForm, setShowForm] = useState(false);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [orderDate, setOrderDate] = useState(new Date().toISOString().split("T")[0]);
    const [mobile, setMobile] = useState("");
    const [products, setProducts] = useState([{ name: "", quantity: "", price: "" }]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [orders, setOrders] = useState([]);
    const [searchDate, setSearchDate] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("All");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const [showFilter, setShowFilter] = useState(false);
    const navigate = useNavigate();
    const [filteredRecords, setFilteredRecords] = useState([]);
    const statusOptions = ["All", "Paid", "Unpaid"];

    useEffect(() => {
        let url = searchDate 
            ? `http://192.168.1.8:5000/vrundavan/orders?date=${searchDate}` 
            : `http://192.168.1.8:5000/vrundavan/orders`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                // console.log("Fetched data:", data);
                setOrders(data); 
            })
            .catch((err) => console.log("Error Fetching Orders:", err));
    }, [searchDate]);

    useEffect(() => {
        if (paymentStatus === "All") {
            setFilteredRecords(orders);
        } else {
            const filtered = orders.filter((order) => order.payment_status === paymentStatus);
            setFilteredRecords(filtered);
        }
    }, [orders, paymentStatus]);

    const handleDateChange = (value) => {
        setSearchDate(value);
        setCurrentPage(1); // Reset page on filter
    };

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus(e.target.value);
        setCurrentPage(1); // Reset page on filter
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProducts = [...products];
        updatedProducts[index][name] = value;
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    const addProduct = () => {
        setProducts([...products, { name: "", quantity: "", price: "" }]);
    };

    const removeProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        calculateTotal(updatedProducts);
    };

    // const calculateTotal = (productList) => {
    //     const total = productList.reduce((acc, item) => acc + (parseFloat(item.price) || 0), 0);
    //     setTotalPrice(total);
    // };

    const calculateTotal = (productList) => {
        const total = productList.reduce((acc, item) => {
            const quantity = parseFloat(item.quantity) || 0;
            const price = parseFloat(item.price) || 0;
            return acc + (quantity * price);
        }, 0);
        setTotalPrice(total);
    };
    

    const handleEdit = (id) => {
        const orderToEdit = orders.find((order) => order.id === id);
        if (orderToEdit) {
            setEditingOrderId(id);
            setCustomerName(orderToEdit.customer_name);
            setOrderDate(orderToEdit.order_date);
            setMobile(orderToEdit.mobile);
            const formattedProducts = orderToEdit.products.map((product) => ({
                name: product.product_name || product.name,
                quantity: product.quantity,
                price: product.price
            }));
            setProducts(formattedProducts);
            setTotalPrice(orderToEdit.total_price);
            setPaymentStatus(orderToEdit.payment_status || "Paid");
            setShowForm(true);
        }
    };

    const handleDelete = (id) => {
        if (confirmDelete) {
            fetch(`http://192.168.1.8:5000/vrundavan/orders/${id}`, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then(() => {
                    alert("Order deleted successfully!");
                    setOrders(orders.filter((order) => order.id !== id));
                })
                .catch((err) => console.error("Error deleting order:", err));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderDetails = { customerName, orderDate, mobile, products, totalPrice, paymentStatus };

        try {
            let response;
            if (editingOrderId) {
                response = await fetch(`http://192.168.1.8:5000/vrundavan/orders/${editingOrderId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderDetails),
                });
            } else {
                response = await fetch(`http://192.168.1.8:5000/vrundavan/orders`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderDetails),
                });
            }

            if (!response.ok) throw new Error("Failed to process order.");

            alert(editingOrderId ? "Order updated successfully!" : "Order submitted successfully!");

            setShowForm(false);
            setEditingOrderId(null);
            setCustomerName("");
            setOrderDate(new Date().toISOString().split("T")[0]);
            setMobile("");
            setPaymentStatus("Paid");
            setProducts([{ name: "", quantity: "", price: "" }]);
            setTotalPrice(0);
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    };

    const fetchOrdersBeforeThreeDays = () => {
        const today = new Date();
        today.setDate(today.getDate() + 3);
        const formattedDate = today.toISOString().split("T")[0];

        fetch(`http://192.168.1.8:5000/vrundavan/orders?date=${formattedDate}`)
            .then((res) => res.json())
            .then((data) => setOrders(data))
            .catch((err) => console.error("Error fetching orders:", err));
    };

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = Array.isArray(filteredRecords)
        ? filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord)
        : [];

    const nextPage = () => {
        if (indexOfLastRecord < filteredRecords.length) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleFilterClose = () => {
        setSearchDate("");
        setPaymentStatus("All");
        setShowFilter(false);
        setCurrentPage(1);
        navigate("/admin/order");
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ textDecoration: "underline" }}>Order Management</h2>

            <button className="button-submit" onClick={() => {
                setShowForm(!showForm);
                if (!showForm) setEditingOrderId(null);
            }}>
                {showForm ? "Cancel" : "Add Order"}
            </button>

            {showForm && (
                <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Customer Name</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label>Order Date</label>
                        <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label>Mobile Number</label>
                        <input type="number" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
                    </div>

                    <div className="mb-3">
                        <label>Payment Status</label>
                        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)} required>
                            {statusOptions.map((status, index) => (
                                <option key={index} value={status.toLowerCase()}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price (₹)</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td><input type="text" name="name" value={product.name} onChange={(e) => handleInputChange(index, e)} required /></td>
                                    <td><input type="number" name="quantity" value={product.quantity} onChange={(e) => handleInputChange(index, e)} required /></td>
                                    <td><input type="number" name="price" value={product.price} onChange={(e) => handleInputChange(index, e)} required /></td>
                                    <td>{index > 0 && <button type="button" className="button_Delete" onClick={() => removeProduct(index)}>Remove</button>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button type="button" className="btn btn-primary me-2" onClick={addProduct}>Add Product</button>
                    <h4 className="mt-3">Total Price: ₹{totalPrice}</h4>
                    <button type="submit" className="btn btn-success mt-3">{editingOrderId ? "Update Order" : "Submit Order"}</button>
                </form>
            )}

            <div className="mt-4">
                <div className="row">
                    <div className="col-md-10 text-center">
                        <h2>Order List</h2>
                    </div>
                    <div className="col-md-2">
                        <button className="button-submit" onClick={() => setShowFilter(!showFilter)}>Filter Records</button>
                    </div>
                </div>

                {showFilter && (
                    <div className="row mt-2">
                        <div className="col-md-4">
                            <input type="date" value={searchDate} onChange={(e) => handleDateChange(e.target.value)} placeholder="Search by date" />
                        </div>
                        <div className="col-md-4">
                            <select value={paymentStatus} onChange={handlePaymentStatusChange}>
                                {statusOptions.map((status, index) => (
                                    <option key={index} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2">
                            <button className="button-submit" onClick={fetchOrdersBeforeThreeDays}>Fetch Data</button>
                        </div>
                        <div className="col-md-2">
                            <button className="button_Delete" onClick={handleFilterClose}>Close</button>
                        </div>
                    </div>
                )}

                {filteredRecords?.length === 0 ? <p>No orders found.</p> : (
                    <table className="table-container mt-3">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Order Date</th>
                                <th>Mobile</th>
                                <th>Total Price (₹)</th>
                                <th>Payment Status</th>
                                <th>Products</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.customer_name}</td>
                                    <td>{order.order_date}</td>
                                    <td>{order.mobile}</td>
                                    <td>₹{order.total_price}</td>
                                    <td>{order.payment_status}</td>
                                    <td>
                                        <ul>
                                            {order.products.map((p, i) => (
                                                <li key={i}>{p.product_name || p.name} (x{p.quantity}) - ₹{p.price}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td>
                                        <button className="button_Update" onClick={() => handleEdit(order.id)}>Update</button>&nbsp;
                                        <button className="button_Delete" data-bs-toggle="modal" data-bs-target="#deleteModal" onClick={() => handleDelete(order.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className="pagination justify-content-center mt-3">
                    <button className="button" onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                    <span className="mx-3">
                        Page {currentPage} of {Math.ceil((filteredRecords?.length || 0) / recordsPerPage)}
                    </span>
                    <button className="button" onClick={nextPage} disabled={currentPage === Math.ceil((filteredRecords?.length || 0) / recordsPerPage)}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default AdminOrder;
