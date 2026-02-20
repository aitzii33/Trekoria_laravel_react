import Layout from "./Layout";
import { Line, Pie } from "react-chartjs-2";
import "../../../css/AdminDashboard.css";
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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const users = [{ id: 1, name: "John" }, { id: 2, name: "Jane" }];
  const bookings = [
    { id: 1, activity: "Hiking", status: "pending" },
    { id: 2, activity: "Kayaking", status: "approved" },
    { id: 3, activity: "City Tour", status: "approved" },
    { id: 4, activity: "Horse Riding", status: "approved" },
  ];

  const lineData = {
    labels: ["Feb 1", "Feb 5", "Feb 10", "Feb 15", "Feb 20"],
    datasets: [
      {
        label: "Bookings",
        data: [1, 2, 3, 2, 4],
        borderColor: "#2796D1",
        backgroundColor: "rgba(39,150,209,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Hiking", "Kayaking", "City Tour", "Horse Riding"],
    datasets: [
      {
        data: [1, 1, 1, 1],
        backgroundColor: ["#2796D1", "#10B981", "#F59E0B", "#EF4444"],
      },
    ],
  };

  const chartOptions = { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" } } };

  return (
    <Layout active="dashboard">
      <div className="dashboard-container">

  <h1>Admin Dashboard</h1>

  <div className="kpi-cards">
    <div className="kpi-card users">
      <p className="label">Total Users</p>
      <p className="value">{users.length}</p>
    </div>
    <div className="kpi-card bookings">
      <p className="label">Total Bookings</p>
      <p className="value">{bookings.length}</p>
    </div>
    <div className="kpi-card approved">
      <p className="label">Approved Bookings</p>
      <p className="value">{bookings.filter(b => b.status === "approved").length}</p>
    </div>
    <div className="kpi-card pending">
      <p className="label">Pending Bookings</p>
      <p className="value">{bookings.filter(b => b.status === "pending").length}</p>
    </div>
  </div>



  {/* Charts */}
  <div className="charts-grid">
    <div className="chart-card">
      <h2>Bookings Trend</h2>
      <div className="chart-wrapper">
        <Line data={lineData} options={chartOptions} />
      </div>
    </div>
    <div className="chart-card">
  <h2>Revenue Over Time</h2>
  <div className="chart-wrapper">
    <Line
      data={{
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // example months
        datasets: [
          {
            label: "Revenue ($)",
            data: [1200, 1500, 1000, 2000, 1800, 2200], // replace with dynamic data
            backgroundColor: "rgba(39, 150, 209, 0.2)", // Trekoria Deep Blue
            borderColor: "#2796D1",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointBackgroundColor: "#2796D1",
          }
        ]
      }}
      options={{
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function(value) {
                return "$" + value;
              }
            }
          }
        }
      }}
    />
  </div>
</div>
  </div>

  {/* Recent Bookings Table */}
  <div className="table-card">
    <h2>Recent Bookings</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Activity</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map(b => (
          <tr key={b.id}>
            <td>{b.id}</td>
            <td>{b.activity}</td>
            <td>
              <span className={`status-badge ${b.status === "approved" ? "status-approved" : "status-pending"}`}>
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