import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar
} from "recharts";
import {
    FaBoxes,
    FaFileInvoiceDollar,
    FaExclamationTriangle,
    FaRupeeSign
} from "react-icons/fa";

import {
    MdTrendingUp
} from "react-icons/md";


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);


   


   useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
        try {
            const response = await API.get("/dashboard");

            if (!isMounted) return;

            setDashboard(response.data.dashboard);
        } catch (error) {
            console.log(error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    loadDashboard();

    return () => {
        isMounted = false;
    };
}, []);



    if (loading) {
        return (
            <h3 className="text-center mt-5">
                Loading Dashboard...
            </h3>
        );
    }



    return (

    <div className="w-100">

        <div className="d-flex justify-content-between align-items-center mb-4">

            <div>

                <h2
                    style={{
                        fontWeight: 700,
                        color: "#111827"
                    }}
                >
                    Dashboard
                </h2>

                <p
                    style={{
                        color: "#6B7280",
                        marginBottom: 0
                    }}
                >
                    Welcome back 👋 Manage your inventory efficiently.
                </p>

            </div>

        </div>

        {/* Cards */}

        <div className="row g-4 mb-5">

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon blue">
                        <FaBoxes />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Total Products
                        </p>

                        <h2>{dashboard.totalProducts}</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon green">
                        <FaFileInvoiceDollar />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Total Bills
                        </p>

                        <h2>{dashboard.totalBills}</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon red">
                        <FaExclamationTriangle />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Low Stock
                        </p>

                        <h2>{dashboard.lowStockItems}</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon purple">
                        <FaRupeeSign />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Stock Value
                        </p>

                        <h2>₹ {dashboard.totalStockValue}</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon orange">
                        <MdTrendingUp />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Today's Revenue
                        </p>

                        <h2>₹ {dashboard.todayRevenue}</h2>

                    </div>

                </div>

            </div>

            <div className="col-lg-4 col-md-6">

                <div className="dashboard-card">

                    <div className="dashboard-icon cyan">
                        <MdTrendingUp />
                    </div>

                    <div>

                        <p className="dashboard-title">
                            Monthly Revenue
                        </p>

                        <h2>₹ {dashboard.monthlyRevenue}</h2>

                    </div>

                </div>

            </div>

        </div>

        {/* Charts */}

        <div className="row g-4">

            <div className="col-lg-6">

                <div className="card-modern">

                    <h4 className="mb-4">
                        Monthly Sales
                    </h4>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <LineChart
                            data={dashboard.monthlySalesData}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="_id.month" />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#4F46E5"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="col-lg-6">

                <div className="card-modern">

                    <h4 className="mb-4">
                        Top Selling Products
                    </h4>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >

                        <BarChart
                            data={dashboard.topSellingProducts}
                        >

                            <CartesianGrid strokeDasharray="3 3" />

                            <XAxis dataKey="productName" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="totalSold"
                                fill="#4F46E5"
                                radius={[8, 8, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>

        </div>

    </div>

);
    
}


export default Dashboard;