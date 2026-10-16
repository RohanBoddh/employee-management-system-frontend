import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addEmployee } from '../services/employeeservice';
import './AddEmployee.css';

const AddEmployee = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    phone: '',
    address: '',
    salary: ''   // ✅ Added Salary
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addEmployee({
        name: form.name,
        email: form.email,
        position: form.department,  // DB column = position
        phone: form.phone,
        address: form.address,
        salary: form.salary || null
      });

      alert("Employee added successfully");
      navigate('/employees');

    } catch (err) {
      console.error("Error adding employee:", err);
    }
  };

  return (
    <div className="add-employee">
      <form onSubmit={handleSubmit}>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) => setForm({ ...form, department: e.target.value })}
          required
        />

        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          placeholder="Salary"
          type="number"
          value={form.salary}
          onChange={(e) => setForm({ ...form, salary: e.target.value })}
        />

        <button type="submit">Add</button>

      </form>
    </div>
  );
};

export default AddEmployee;
