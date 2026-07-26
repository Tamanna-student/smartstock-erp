import { NavLink, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaWarehouse,
    FaFileInvoiceDollar,
    FaUsers,
    FaChartBar,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <div>

                <div className="logo">

                    SmartStock

                </div>

                <div className="logo-subtitle">

                    ERP Management

                </div>

                <div className="menu">

                    <NavLink
                        to="/dashboard"
                        className="menu-item"
                    >
                        <FaTachometerAlt />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/products"
                        className="menu-item"
                    >
                        <FaBoxOpen />
                        <span>Products</span>
                    </NavLink>

                    <NavLink
                        to="/inventory"
                        className="menu-item"
                    >
                        <FaWarehouse />
                        <span>Inventory</span>
                    </NavLink>

                    <NavLink
                        to="/billing"
                        className="menu-item"
                    >
                        <FaFileInvoiceDollar />
                        <span>Billing</span>
                    </NavLink>

                    {role === "admin" && (

                        <>

                            <NavLink
                                to="/employees"
                                className="menu-item"
                            >
                                <FaUsers />
                                <span>Employees</span>
                            </NavLink>

                            <NavLink
                                to="/reports"
                                className="menu-item"
                            >
                                <FaChartBar />
                                <span>Reports</span>
                            </NavLink>

                        </>

                    )}

                </div>

            </div>

            <button

                className="logout-btn"

                onClick={logout}

            >

                <FaSignOutAlt />

                Logout

            </button>

        </div>

    );

}

export default Sidebar;