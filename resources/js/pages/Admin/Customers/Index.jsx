import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Layout from "../Layout";
import CustomerForm from "./CustomerForm";
import "./../../../../css/AdminCustomers.css";

export default function Index() {
  const { customers } = usePage().props;

  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

  const openCreate = () => {
    setEditingCustomer(null);
    setShowModal(true);
  };

  const openEdit = (customer) => {
    setEditingCustomer(customer);
    setShowModal(true);
  };

  const handleDelete = () => {
    router.delete(`/admin/customers/${deleteId}`, {
      onSuccess: () => setDeleteId(null),
    });
  };

  const handleSearch = () => {
    router.get("/admin/customers", { search }, { preserveState: true, replace: true });
  };

  return (
    <Layout>
      <div className="admin-container">

        {/* HEADER */}
        <div className="admin-header">
          <h1 className="page-title">Customers</h1>
          <div className="header-actions">
            <input
              type="text"
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="search-input"
            />
            <button className="btn-primary" onClick={openCreate}>
              + Add Customer
            </button>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Registered</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.data.map((c) => (
                <tr key={c.id}>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{new Date(c.created_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btn-edit" onClick={() => openEdit(c)}>Edit</button>
                    <button className="btn-delete" onClick={() => setDeleteId(c.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODALS */}
        {showModal && <CustomerForm customer={editingCustomer} close={() => setShowModal(false)} />}

        {deleteId && (
          <div className="modal-overlay">
            <div className="modal delete-modal">
              <h3>Delete Customer</h3>
              <p>Are you sure you want to delete this customer? This action cannot be undone.</p>
              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setDeleteId(null)}>Cancel</button>
                <button className="btn-delete" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
