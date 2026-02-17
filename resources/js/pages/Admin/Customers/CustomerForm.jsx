import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function CustomerForm({ customer, close }) {
  const [form, setForm] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (customer) {
      setForm({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        password: "",
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      Inertia.put(`/admin/customers/${form.id}`, form);
    } else {
      Inertia.post(`/admin/customers`, form);
    }
    close();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{form.id ? "Edit Customer" : "Add New Customer"}</h3>

        <div className="form-grid">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password {form.id && "(leave blank to keep current)"}</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={close}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {form.id ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
