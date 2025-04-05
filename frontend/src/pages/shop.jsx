import React, { useState, useEffect } from "react";
import MedicineCard from "../components/medicinecard";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/medicines")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched medicines:", data); // 👈 Add this
        setMedicines(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = () => {
    const result = medicines.filter((med) =>
      med.med_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (result.length === 0) {
      navigate("/requestmedicine");
    } else {
      setFiltered(result);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded w-1/2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          Search
        </button>
        <button
          onClick={() => navigate("/cart")}
          className="ml-auto bg-green-500 text-white px-4 py-2 rounded"
        >
          🛒 Cart
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((med, index) => (
          <MedicineCard key={index} medicine={med} />
        ))}
      </div>
    </div>
  );
};

export default Shop;
