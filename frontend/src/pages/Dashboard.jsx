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


function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);


    const getDashboard = async () => {

        try {

            const response = await API.get("/dashboard");

            setDashboard(response.data.dashboard);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {
        getDashboard();
    }, []);



    if (loading) {
        return (
            <h3 className="text-center mt-5">
                Loading Dashboard...
            </h3>
        );
    }



    return (

        <div className="container mt-4">


            <h2 className="mb-4">
                SmartStock ERP Dashboard
            </h2>


            <div className="row g-4">


                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Total Products
                        </h5>

                        <h2>
                            {dashboard.totalProducts}
                        </h2>

                    </div>

                </div>



                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Total Bills
                        </h5>

                        <h2>
                            {dashboard.totalBills}
                        </h2>

                    </div>

                </div>




                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Low Stock Items
                        </h5>

                        <h2>
                            {dashboard.lowStockItems}
                        </h2>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Total Stock Value
                        </h5>

                        <h2>
                            ₹ {dashboard.totalStockValue}
                        </h2>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Today's Revenue
                        </h5>

                        <h2>
                            ₹ {dashboard.todayRevenue}
                        </h2>

                    </div>

                </div>





                <div className="col-md-4">

                    <div className="card shadow p-3">

                        <h5>
                            Monthly Revenue
                        </h5>

                        <h2>
                            ₹ {dashboard.monthlyRevenue}
                        </h2>

                    </div>

                </div>

                <div className="row mt-5">


<div className="col-md-6">

<div className="card shadow p-3">

<h4>
Monthly Sales
</h4>


<ResponsiveContainer width="100%" height={300}>

<LineChart data={dashboard.monthlySalesData}>


<CartesianGrid />


<XAxis 
dataKey="_id.month"
/>


<YAxis />


<Tooltip />


<Line
type="monotone"
dataKey="revenue"
/>


</LineChart>

</ResponsiveContainer>


</div>

</div>





<div className="col-md-6">


<div className="card shadow p-3">


<h4>
Top Selling Products
</h4>


<ResponsiveContainer width="100%" height={300}>


<BarChart data={dashboard.topSellingProducts}>


<CartesianGrid />


<XAxis 
dataKey="productName"
/>


<YAxis />


<Tooltip />


<Bar
dataKey="totalSold"
/>


</BarChart>


</ResponsiveContainer>


</div>


</div>


</div>


            </div>


        </div>

    );
    
}


export default Dashboard;