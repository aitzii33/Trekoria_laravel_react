import React from "react";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js"; 
import adminAvatar from "./../../img/DefaultUserImage.png";



const MENU = [
    { key: "dashboard", label: "General", route: "admin.dashboard" },
    { key: "bookings", label: "Bookings", route: "admin.bookings" },
    { key: "customers", label: "Customers", route: "admin.customers" },
    { key: "activities", label: "Activities", route: "admin.activities" },
    { key: "analytics", label: "Analytics", route: "admin.analytics" },
];

export default function Layout({ children, active }) {
    return (
        <div className="admin-portal">
            <aside className="sidebar">
                <ul className="sidebar-menu">
                    {MENU.map((item) => (
                        <li key={item.key} className={active === item.key ? "active" : ""}>
                            <Link href={route(item.route)}>{item.label}</Link>
                        </li>
                    ))}
                </ul>

                <div className="sidebar-footer">
                    <img src={adminAvatar} alt="Admin" className="profile-pic" />
                    <div className="admin-info">
                        <span className="admin-name">Administrator</span>
                        <Link href={route("logout")} method="post">
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            <main className="content">{children}</main>
        </div>
    );
}
