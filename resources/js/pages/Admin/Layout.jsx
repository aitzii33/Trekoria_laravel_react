import { Link } from "@inertiajs/react"
import { route } from "ziggy-js"
import './../../../css/adminLayout.css'
import adminAvatar from "./../../img/DefaultUserImage.png"

const MENU = [
    { key: "dashboard", label: "General", route: "admin.dashboard" },
    { key: "bookings", label: "Bookings", route: "admin.bookings" },
    { key: "customers", label: "Customers", route: "admin.customers.index" },
    { key: "activities", label: "Activities", route: "admin.activities.index"},
    { key: "analytics", label: "Analytics", route: "admin.analytics" },
];

export default function Layout({ children }) {
    return (
        <div className="admin-layout">
            {/* SIDEBAR */}
            <aside className="sidebar">
                {/* MENU TOP */}
                <div className="sidebar-menu-wrapper">
                    <ul className="sidebar-menu">
                        {MENU.map((item) => (
                            <li key={item.key}>
                                <Link href={route(item.route)}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* FOOTER BOTTOM */}
                <div className="sidebar-footer">
                    <img src={adminAvatar} alt="Admin" className="profile-pic" />

                    <span className="admin-name">Administrator</span>

                    <Link href={route("logout")} method="post" as="button" className="logout-btn"> Logout </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
