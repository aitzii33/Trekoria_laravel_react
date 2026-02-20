import React, { useState } from "react";
import Layout from "./Layout";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/Statistics.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function AdminAnalytics() {
  // Only essential data
  const [recentBookings] = useState([
    { id: 1, user: "John Doe", guide: "Alice Smith", people: 3, total_price: 150, status: "Confirmed", date: "2026-02-18" },
    { id: 2, user: "Jane Roe", guide: "Bob Johnson", people: 2, total_price: 100, status: "Pending", date: "2026-02-19" },
    { id: 3, user: "Mark Twain", guide: "Charlie Brown", people: 5, total_price: 250, status: "Cancelled", date: "2026-02-20" },
  ]);

  // Charts data
  const lineData = {
    labels: ["Feb 1", "Feb 5", "Feb 10", "Feb 15", "Feb 20", "Feb 25"],
    datasets: [
      {
        label: "Bookings Over Time",
        data: [5, 8, 12, 15, 20, 30],
        borderColor: "#2796D1",
        backgroundColor: "rgba(39, 150, 209,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Ride a Horses", "City Tour", "Kayaking", "Hiking"],
    datasets: [
      {
        label: "Activity Distribution",
        data: [12, 8, 5, 10],
        backgroundColor: ["#2796D1", "#1E7FB0", "#FFC107", "#DC2626"],
      },
    ],
  };

  return (
    <Layout>
      <div className="container py-5">
        {/* Charts Section */}
        <div className="row mb-5">
          <div className="col-md-8 mb-4">
            <div className="card p-4 shadow h-100">
              <h4 className="mb-3">Bookings Over Time</h4>
              <Line data={lineData} />
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 shadow h-100">
              <h4 className="mb-3">Activity Distribution</h4>
              <Pie data={pieData} />
            </div>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="card p-4 shadow">
          <h4 className="mb-4">Recent Bookings</h4>
          <table className="table table-hover">
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
              {recentBookings.map(b => (
                <tr key={b.id}>
                  <td>{b.user}</td>
                  <td>{b.guide}</td>
                  <td>{b.people}</td>
                  <td>${b.total_price}</td>
                  <td>{new Date(b.date).toLocaleDateString()}</td>
                  <td>
                    <span className={
                      b.status === "Confirmed" ? "badge bg-success" :
                      b.status === "Pending" ? "badge bg-warning text-dark" :
                      "badge bg-danger"
                    }>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}