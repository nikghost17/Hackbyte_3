// Dashboard Component (Admin Dashboard View)
// src/components/AdminDashboard.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./adminStyle.css"; // Import the CSS file

const AdminDashboard = () => {
  const [medicines, setMedicines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    med_name: "",
    med_desc: "",
    side_effects: "",
    med_price: "",
    med_quantity: "",
  });

  // Fetch medicines from API
  const fetchMedicines = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:5000/api/medicines");
      // Make sure response.data is an array
      const medicinesData = Array.isArray(response.data) ? response.data : [];
      console.log("Fetched medicines:", medicinesData); // Add this for debugging
      setMedicines(medicinesData);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to fetch medicines");
      setIsLoading(false);
      console.error("Error fetching medicines:", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "med_price" || name === "med_quantity" ? Number(value) : value,
    });
  };

  // Open form to add a new medicine
  const handleAddNew = () => {
    setFormData({
      med_name: "",
      med_desc: "",
      side_effects: "",
      med_price: "",
      med_quantity: "",
    });
    setEditingMedicine(null);
    setShowForm(true);
  };

  // Open form to edit an existing medicine
  const handleEdit = (medicine) => {
    setFormData({
      med_name: medicine.med_name,
      med_desc: medicine.med_desc || "",
      side_effects: medicine.side_effects || "",
      med_price: medicine.med_price || 0,
      med_quantity: medicine.med_quantity || 0,
    });
    setEditingMedicine(medicine._id);
    setShowForm(true);
  };

  // Handle form submission (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMedicine) {
        // Update existing medicine
        await axios.put(
          `http://localhost:5000/api/medicines/${editingMedicine}`,
          formData
        );
      } else {
        // Create new medicine
        await axios.post("/api/medicines", formData);
      }

      // Refresh the medicine list
      fetchMedicines();
      setShowForm(false);
      setEditingMedicine(null);
    } catch (err) {
      setError(
        editingMedicine ? "Failed to update medicine" : "Failed to add medicine"
      );
      console.error("Error saving medicine:", err);
    }
  };

  // Handle medicine deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await axios.delete(`http://localhost:5000/api/medicines/${id}`);
        fetchMedicines();
      } catch (err) {
        setError("Failed to delete medicine");
        console.error("Error deleting medicine:", err);
      }
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Medicine Admin Dashboard</h1>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-header">
        <h2>Medicine Inventory</h2>
        <button className="btn btn-primary" onClick={handleAddNew}>
          Add New Medicine
        </button>
      </div>

      {isLoading ? (
        <p>Loading medicines...</p>
      ) : (
        <div className="table-container">
          <table className="medicines-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <tr key={medicine._id}>
                    <td>{medicine.med_name}</td>
                    <td>{medicine.med_desc || "N/A"}</td>
                    <td>${medicine.med_price || 0}</td>
                    <td>{medicine.med_quantity || 0}</td>
                    <td>
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(medicine)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(medicine._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No medicines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{editingMedicine ? "Edit Medicine" : "Add New Medicine"}</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Medicine Name</label>
                <input
                  type="text"
                  name="med_name"
                  value={formData.med_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="med_desc"
                  value={formData.med_desc}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Side Effects</label>
                <textarea
                  name="side_effects"
                  value={formData.side_effects}
                  onChange={handleInputChange}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="med_price"
                  value={formData.med_price}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label>Quantity</label>
                <input
                  type="number"
                  name="med_quantity"
                  value={formData.med_quantity}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-buttons">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-submit">
                  {editingMedicine ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;