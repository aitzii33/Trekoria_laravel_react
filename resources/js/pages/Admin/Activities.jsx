import React from "react";
import Layout from "./Layout";

export default function Dashboard({ stats }) {
    return (
        <Layout active="activities">
            <h1>Dashboard activities</h1>
            <p>Total Users: {stats.users}</p>
            <p>Total Bookings: {stats.bookings}</p>
        </Layout>
    );
}
