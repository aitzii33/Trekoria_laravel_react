import React, { useState } from "react";
import { usePage, router } from "@inertiajs/react";
import Layout from "../Layout";
import ActivityForm from "./ActivityForm";
import "./../../../../css/AdminActivities.css"

export default function Index() {
    const { activities } = usePage().props;

    // ✅ All state inside component
    const [showModal, setShowModal] = useState(false);
    const [editingActivity, setEditingActivity] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
     const [search, setSearch] = useState(""); 

    const openCreate = () => {
        setEditingActivity(null);
        setShowModal(true);
    };

    const openEdit = (activity) => {
        setEditingActivity(activity);
        setShowModal(true);
    };

    const handleDelete = () => {
        router.delete(route("admin.activities.destroy", deleteId), {
            onSuccess: () => setDeleteId(null),
        });

    };
     const handleSearch = () => {
        router.get(route("admin.activities.index"), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <Layout>
            <div className="admin-container">

                {/* HEADER */}
                <div className="admin-header">
                    <h1 className="page-title">Activities</h1>
                    <div className="header-actions">
                        {/* Search */}
                        <input
                            type="text"
                            placeholder="Search activities..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="search-input"
                        />

                        {/* Add Activity button */}
                        <button className="btn-primary" onClick={openCreate}>
                            + Add Activity
                        </button>
                    </div>
                </div>

                {/* TABLE CARD */}
                <div className="card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.data.map((a) => (
                                <tr key={a.id}>
                                    <td>{a.name}</td>
                                    <td>
                                        {a.place?.city}, {a.place?.country}
                                    </td>
                                    <td>${a.price}</td>
                                    <td>{new Date(a.date).toLocaleDateString()}</td>  {/* <-- Show date nicely */}
                                    <td>
                                        <span className={
                                            a.is_active
                                                ? "badge-active"
                                                : "badge-inactive"
                                        }>
                                            {a.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            onClick={() => openEdit(a)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn-delete"
                                            onClick={() => setDeleteId(a.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* MODAL */}
                {showModal && (
                    <ActivityForm
                        activity={editingActivity}
                        close={() => setShowModal(false)}
                    />
                )}

                {/* DELETE CONFIRM MODAL */}
                {deleteId && (
                    <div className="modal-overlay">
                        <div className="modal delete-modal">
                            <h3>Delete Activity</h3>
                            <p>
                                Are you sure you want to delete this activity?
                                This action cannot be undone.
                            </p>

                            <div className="form-actions">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setDeleteId(null)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn-delete"
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
