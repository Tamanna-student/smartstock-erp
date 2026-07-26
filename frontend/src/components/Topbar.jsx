import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Topbar() {

    const name = localStorage.getItem("userName") || "Admin";

    return (

        <div className="topbar">

            <div className="search-box">

                <FaSearch className="search-icon" />

                <input
                    type="text"
                    placeholder="Search..."
                />

            </div>

            <div className="topbar-right">

                <button className="notification-btn">

                    <FaBell />

                </button>

                <div className="profile">

                    <FaUserCircle className="profile-icon"/>

                    <div>

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