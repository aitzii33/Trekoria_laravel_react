import React from "react";
import Layout from "./Layout";

export default function Dashboard({ stats }) {
    return (
        <Layout active="customers">
            <h1>Dashboard Customers</h1>
            <p>Total Users: {stats.users}</p>
            <p>Total Bookings: {stats.bookings}</p>
        </Layout>
    );
}
