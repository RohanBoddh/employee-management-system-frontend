import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployee, updateEmployee } from "../services/employeeservice";
import "./EditEmployees.css";

const EditEmployees = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    position: "",
    phone: "",
    address: "",
    salary: "",
  });

  // 🔹 Fetch employee by ID
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await getEmployee(id);
        const emp = res.data;

        setForm({
          name: emp.name || "",
          email: emp.email || "",
          position: emp.position || "",
          phone: emp.phone || "",
          address: emp.address || "",
          salary: emp.salary || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        alert("Employee load nahi ho pa raha");
      }
    };

    fetchEmployee();
  }, [id]);

  // 🔹 Submit update (ONLY employees table)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateEmployee(id, {
        name: form.name.trim(),
        email: form.email.trim(),
        position: form.position,   // 🔥 HR/IT/Marketing etc
        phone: form.phone,
        address: form.address,
        salary: form.salary ? Number(form.salary) : null,
      });

      alert("Employee updated successfully ✅");
      navigate("/Employees");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed ❌");
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <div className="edit-employee" style={{ maxWidth: "520px", margin: "50px auto" }}>
      <h2>Edit Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          required
        >
          <option value="">Select Position</option>
          <option value="HR">HR</option>
          <option value="IT">IT</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Sales">Sales</option>
          <option value="Employee">Employee</option>
        </select>

        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button type="submit" style={{ marginTop: "20px" }}>
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default EditEmployees;
