import { useState } from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Topbar() {

    const [showNotifications, setShowNotifications] = useState(false);

    const name = localStorage.getItem("userName") || "Admin";

    return (
        <div className="topbar">

            <div className="topbar-spacer"></div>

            <div className="topbar-right">

                {/* Notifications */}
                <div className="topbar-dropdown-wrapper">

                    <button
                        className="notification-btn"
                        onClick={() =>
                            setShowNotifications(!showNotifications)
                        }
                        title="Notifications"
                    >
                        <FaBell />
                    </button>

                    {showNotifications && (
                        <div className="topbar-dropdown notification-dropdown">

                            <div className="dropdown-title">
                                Notifications
                            </div>

                            <div className="notification-empty">
                                <FaBell />
                                <p>No new notifications</p>
                            </div>

                        </div>
                    )}

                </div>

                {/* Profile - Display Only */}
                <div className="profile">

                    <FaUserCircle className="profile-icon" />

                    <div className="profile-info">
                        <div className="welcome">
                            Welcome
                        </div>

                        <div className="username">
                            {name}
                        </div>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Topbar;