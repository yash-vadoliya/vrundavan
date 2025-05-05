import React, { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from '../components/vrundavan-logo.png';

function Billing() {
  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);

  const statusOptions = ["Pending", "Paid", "Partially Paid"];

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  const removeProduct = (index) => {
    const filtered = products.filter((_, i) => i !== index);
    setProducts(filtered);
  };

  const totalPrice = products.reduce(
    (sum, p) => sum + (parseFloat(p.quantity) || 0) * (parseFloat(p.price) || 0),
    0
  );

  const generateAndSendPDF = async () => {
    setLoading(true);
    const doc = new jsPDF();

    // Add logo and header
    doc.addImage(logo, "PNG", 10, 10, 25, 25);
    doc.setFontSize(18);
    doc.text("Vrundavan Dairy Farm", 105, 20, { align: "center" });

    //Draw a horizontal line after the header
    doc.setDrawColor(0);  
    doc.setLineWidth(0.5); 
    doc.line(10, 30, 200, 30); 

    // Customer info
    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 20, 45);
    doc.text(`Date: ${orderDate}`, 20, 52);
    doc.text(`Mobile: ${mobileNumber}`, 20, 59);
    doc.text(`Status: ${paymentStatus}`, 20, 66);

    // Product table
    autoTable(doc, {
      startY: 75,
      head: [["Product", "Qty", "Price", "Total"]],
      body: products.map(p => [ 
        p.name,
        p.quantity.toString(),
        `₹${parseInt(p.price).toFixed(2)}`,
        `₹${(parseInt(p.quantity) * parseInt(p.price)).toFixed(2)}`
      ])
    });

    // Totals
    const finalY = doc.lastAutoTable.finalY || 100;
    doc.text(`Total: ₹${totalPrice}`, 150, finalY + 10);

    const footerY = 280; // Position the footer below the total
    doc.setFontSize(10);
    doc.text("Email: vrundavandairyfarm@gmail.com", 10, footerY);
    doc.text("Phone: +91 88491 30080", 10, footerY + 5)

    // Generate filename
    const filename = `${customerName.replace(/\s+/g, "_")}_bill.pdf`;

    doc.save(filename);

    // Get base64 string (without prefix)
    const pdfBase64 = doc.output("dataurlstring").split(",")[1];

    try {
      const res = await fetch("http://192.168.1.8:5000/vrundavan/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfBase64,
          filename,
          customerName,
          mobileNumber,
          orderDate
        }),
      });

      if (res.data.success) {
        // setDownloadLink(res.data.downloadLink);
        alert("Bill saved successfully!");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error saving bill.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-4">
      <h2>Billing</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-3">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Order Date</label>
          <input
            type="date"
            className="form-control"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Mobile Number</label>
          <input
            type="tel"
            className="form-control"
            pattern="[0-9]{10}"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Payment Status</label>
          <select
            className="form-control"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
          >
            <option value="">Select status</option>
            {statusOptions.map((status, i) => (
              <option key={i} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <h5>Products</h5>
        {products.map((product, index) => (
          <div className="row mb-2" key={index}>
            <div className="col">
              <input
                type="text"
                placeholder="Product Name"
                className="form-control"
                value={product.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                placeholder="Qty"
                className="form-control"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="number"
                placeholder="Price"
                className="form-control"
                value={product.price}
                onChange={(e) => handleProductChange(index, "price", e.target.value)}
                required
              />
            </div>
            <div className="col-auto">
              {index > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeProduct(index)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addProduct}>
          Add Product
        </button>

        <h5>Total Price: ₹{totalPrice.toFixed(2)}</h5>

        <button
          type="button"
          className="btn btn-info"
          onClick={generateAndSendPDF}
          disabled={loading}
        >
          {loading ? "Sending..." : "Generate & Send Bill"}
        </button>
      </form>
    </div>
  );
}

export default Billing;
