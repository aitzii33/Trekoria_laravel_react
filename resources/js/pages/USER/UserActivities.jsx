import { useState } from "react"
import { usePage, router } from "@inertiajs/react"

import "./../../../css/UserActivities.css"
import "react-datepicker/dist/react-datepicker.css"

export default function UserActivities() {
    const { activities } = usePage().props; // passed from Laravel
    const [search, setSearch] = useState("");

    // Optional: handle search/filter for users
    const handleSearch = () => {
        router.get(route("activities.index"), { search }, {
            preserveState: true,
            replace: true,
        });
    };

    return (

            <div className="user-container">
                {/* HEADER */}
                <div className="user-header">
                    <h1 className="page-title">Activities</h1>

                    <div className="header-actions">
                        <input
                            type="text"
                            placeholder="Search activities..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            className="search-input"
                        />
                    </div>
                </div>

                {/* ACTIVITIES LIST */}
                <div className="activities-list">
                    {activities.length === 0 ? (
                        <p>No activities found.</p>
                    ) : (
                        activities.map((a) => (
                            <div key={a.id} className="activity-card">
                                <h3>{a.name}</h3>
                                <p>{a.description}</p>
                                <p>
                                    Location: {a.place?.city}, {a.place?.country}
                                </p>
                                <p>Price: ${a.price}</p>
                                <span
                                    className={
                                        a.is_active ? "badge-active" : "badge-inactive"
                                    }
                                >
                                    {a.is_active ? "Active" : "Inactive"}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
    );
}
