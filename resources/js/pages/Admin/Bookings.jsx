import React, { useState } from "react";
import Layout from "./Layout";
import "./../../../css/AdminBookings.css";

export default function BookingsPage() {
    const [bookings] = useState([
        { id: 1, user: "John Doe", guide: "Alice Smith", people: 3, total_price: 150, status: "Confirmed", date: "2026-02-18" },
        { id: 2, user: "Jane Roe", guide: "Bob Johnson", people: 2, total_price: 100, status: "Pending", date: "2026-02-19" },
        { id: 3, user: "Mark Twain", guide: "Charlie Brown", people: 5, total_price: 250, status: "Cancelled", date: "2026-02-20" },
        { id: 4, user: "Sarah Connor", guide: "David Lee", people: 4, total_price: 200, status: "Confirmed", date: "2026-02-21" },
        { id: 5, user: "Tom Hanks", guide: "Eve Martin", people: 1, total_price: 80, status: "Pending", date: "2026-02-22" },
        { id: 6, user: "Emma Watson", guide: "Frank Clark", people: 2, total_price: 120, status: "Confirmed", date: "2026-02-23" },
        { id: 7, user: "Chris Evans", guide: "Grace Hall", people: 3, total_price: 150, status: "Cancelled", date: "2026-02-24" },
        { id: 8, user: "Natalie Portman", guide: "Harry White", people: 2, total_price: 100, status: "Confirmed", date: "2026-02-25" },
    ]);

    const [search, setSearch] = useState("");

    const filteredBookings = bookings.filter(
        b =>
            b.user.toLowerCase().includes(search.toLowerCase()) ||
            b.guide.toLowerCase().includes(search.toLowerCase()) ||
            b.status.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Layout active="bookings">
            <div className="admin-container">
                <div className="admin-header">
                    <h1 className="page-title">Bookings</h1>
                    <div className="header-actions">
                        <input
                            type="text"
                            placeholder="Search bookings..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="search-input"
                        />
                    </div>
                </div>

                <div className="card">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Guide</th>
                                <th>People</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map(b => (
                                    <tr key={b.id}>
                                        <td>{b.user}</td>
                                        <td>{b.guide}</td>
                                        <td>{b.people}</td>
                                        <td>${b.total_price}</td>
                                        <td>{new Date(b.date).toLocaleDateString()}</td>
                                        <td>
                                            <span className={
                                                b.status === "Confirmed" ? "badge-active" :
                                                b.status === "Pending" ? "badge-pending" :
                                                "badge-cancelled"
                                            }>
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                                        No bookings found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}