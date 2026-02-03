import React, { useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import Layout from "./Layout";

export default function Users({ users }) {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [editId, setEditId] = useState(null);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            // Update
            Inertia.put(`/admin/users/${editId}`, form);
        } else {
            // Create
            Inertia.post("/admin/users", form);
        }
        setForm({ name: "", email: "", password: "" });
        setEditId(null);
    };

    const handleEdit = (user) => {
        setForm({ name: user.name, email: user.email, password: "" });
        setEditId(user.id);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.delete(`/admin/users/${id}`);
        }
    };

    return (
        <Layout active="users">
            <h1>Users / Customers</h1>

            {/* User Form */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder={editId ? "New Password (optional)" : "Password"}
                    value={form.password}
                    onChange={handleChange}
                    required={!editId}
                />
                <button type="submit">{editId ? "Update" : "Add"} User</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setForm({ name: "", email: "", password: "" }); }}>Cancel</button>}
            </form>

            {/* Users Table */}
            <table border="1" cellPadding="8" style={{ width: "100%" }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    {customers && customers.length > 0 ? (
        customers.map((c) => (
            <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>
                    <button onClick={() => handleEdit(c)}>Edit</button>
                    <button onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4">No customers found</td>
        </tr>
    )}
</tbody>

            </table>
        </Layout>
    );
}
