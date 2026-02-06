import Layout from "./Layout";

export default function Dashboard() {
    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Jane" },
    ];

    const bookings = [
        { id: 1, activity: "Hiking", status: "pending" },
        { id: 2, activity: "Kayaking", status: "approved" },
    ];

    return (
        <Layout active="dashboard">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="text-lg font-semibold">Users</h2>
                    <p>Total Users: {users.length}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                    <h2 className="text-lg font-semibold">Bookings</h2>
                    <p>Total Bookings: {bookings.length}</p>
                </div>
            </div>

            <div className="p-4 bg-white rounded shadow">
                <h2 className="text-lg font-semibold mb-2">Recent Bookings</h2>
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-2 py-1">ID</th>
                            <th className="border px-2 py-1">Activity</th>
                            <th className="border px-2 py-1">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b) => (
                            <tr key={b.id}>
                                <td className="border px-2 py-1">{b.id}</td>
                                <td className="border px-2 py-1">{b.activity}</td>
                                <td className="border px-2 py-1">{b.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

