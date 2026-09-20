import { useEffect, useState } from "react";
import API from "../api/axios";

function Reports() {

    const [loading, setLoading] = useState(true);

    const [sales, setSales] = useState([]);

    const [inventory, setInventory] = useState([]);

    const [productKeyword, setProductKeyword] = useState("");
const [billKeyword, setBillKeyword] = useState("");

const [searchedProducts, setSearchedProducts] = useState([]);
const [searchedBills, setSearchedBills] = useState([]);

    const [revenue, setRevenue] = useState(0);

    const [totalBills, setTotalBills] = useState(0);

    
    const searchProducts = async () => {

    try {

        const response = await API.get(

            `/reports/search/products?keyword=${productKeyword}`

        );

        setSearchedProducts(response.data.products);

    }

    catch (error) {

        console.log(error);

    }

};



const searchBills = async () => {

    try {

        const response = await API.get(

            `/reports/search/bills?keyword=${billKeyword}`

        );

        setSearchedBills(response.data.bills);

    }

    catch (error) {

        console.log(error);

    }

};

   useEffect(() => {
    let isMounted = true;

    const loadReports = async () => {
        try {
            const salesResponse =
                await API.get("/reports/sales");

            const revenueResponse =
                await API.get("/reports/revenue");

            const inventoryResponse =
                await API.get("/reports/inventory");

            if (!isMounted) return;

            setSales(salesResponse.data.bills);

            setRevenue(
                revenueResponse.data.totalRevenue
            );

            setTotalBills(
                revenueResponse.data.totalBills
            );

            setInventory(
                inventoryResponse.data.inventory
            );
        } catch (error) {
            console.log(error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    loadReports();

    return () => {
        isMounted = false;
    };
}, []);

    if (loading) {

        return (

            <h3 className="text-center mt-5">

                Loading Reports...

            </h3>

        );

    }

    return (

<div className="w-100">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2
                style={{
                    fontWeight:700,
                    color:"#111827"
                }}
            >
                Reports Dashboard
            </h2>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:0
                }}
            >
                View sales, inventory and analytics.
            </p>

        </div>

    </div>



    {/* Summary Cards */}

    <div className="row g-4 mb-5">

        <div className="col-lg-6">

            <div className="dashboard-card">

                <div className="dashboard-icon green">

                    ₹

                </div>

                <div>

                    <p className="dashboard-title">

                        Total Revenue

                    </p>

                    <h2>

                        ₹ {revenue}

                    </h2>

                </div>

            </div>

        </div>

        <div className="col-lg-6">

            <div className="dashboard-card">

                <div className="dashboard-icon blue">

                    📄

                </div>

                <div>

                    <p className="dashboard-title">

                        Total Bills

                    </p>

                    <h2>

                        {totalBills}

                    </h2>

                </div>

            </div>

        </div>

    </div>



    {/* Sales Report */}

    <div className="card-modern mb-5">

        <h4 className="mb-4">

            Sales Report

        </h4>

        <table className="table table-hover align-middle">

            <thead>

                <tr>

                    <th>Invoice</th>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

            {

                sales.length===0 ?

                (

                    <tr>

                        <td colSpan="4" className="text-center">

                            No Sales Found

                        </td>

                    </tr>

                )

                :

                sales.map((bill)=>(

                    <tr key={bill._id}>

                        <td>{bill.invoiceNumber}</td>

                        <td>{bill.customerName}</td>

                        <td>₹ {bill.totalAmount}</td>

                        <td>

                            {new Date(bill.createdAt).toLocaleDateString()}

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    </div>



    {/* Inventory */}

    <div className="card-modern mb-5">

        <h4 className="mb-4">

            Inventory Report

        </h4>

        <table className="table table-hover align-middle">

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Minimum</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

            {

                inventory.length===0 ?

                (

                    <tr>

                        <td colSpan="6" className="text-center">

                            No Inventory Found

                        </td>

                    </tr>

                )

                :

                inventory.map((item)=>(

                    <tr key={item._id}>

                        <td>

                            {item.product ?

                            item.product.productName :

                            "Deleted Product"}

                        </td>

                        <td>

                            {item.product ?

                            item.product.category :

                            "-"}

                        </td>

                        <td>

                            ₹ {item.product ?

                            item.product.price :

                            0}

                        </td>

                        <td>

                            {item.currentStock}

                        </td>

                        <td>

                            {item.minimumStock}

                        </td>

                        <td>

                            {

                                item.currentStock<=item.minimumStock ?

                                <span className="badge bg-danger">

                                    Low Stock

                                </span>

                                :

                                <span className="badge bg-success">

                                    In Stock

                                </span>

                            }

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    </div>



    {/* Product Search */}

    <div className="card-modern mb-5">

        <h4 className="mb-4">

            Search Products

        </h4>

        <div className="search-box mb-4">

            <input

                type="text"

                placeholder="Search Product..."

                value={productKeyword}

                onChange={(e)=>setProductKeyword(e.target.value)}

            />

        </div>

        <button

            className="btn btn-primary mb-4"

            onClick={searchProducts}

        >

            Search Product

        </button>

        <table className="table table-hover align-middle">

            <thead>

                <tr>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Unit</th>

                </tr>

            </thead>

            <tbody>

            {

                searchedProducts.length===0 ?

                (

                    <tr>

                        <td colSpan="4" className="text-center">

                            No Product Found

                        </td>

                    </tr>

                )

                :

                searchedProducts.map((product)=>(

                    <tr key={product._id}>

                        <td>{product.productName}</td>

                        <td>{product.category}</td>

                        <td>₹ {product.price}</td>

                        <td>{product.unit}</td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    </div>



    {/* Bill Search */}

    <div className="card-modern">

        <h4 className="mb-4">

            Search Bills

        </h4>

        <div className="search-box mb-4">

            <input

                type="text"

                placeholder="Search Customer..."

                value={billKeyword}

                onChange={(e)=>setBillKeyword(e.target.value)}

            />

        </div>

        <button

            className="btn btn-success mb-4"

            onClick={searchBills}

        >

            Search Bill

        </button>

        <table className="table table-hover align-middle">

            <thead>

                <tr>

                    <th>Invoice</th>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

            {

                searchedBills.length===0 ?

                (

                    <tr>

                        <td colSpan="4" className="text-center">

                            No Bill Found

                        </td>

                    </tr>

                )

                :

                searchedBills.map((bill)=>(

                    <tr key={bill._id}>

                        <td>{bill.invoiceNumber}</td>

                        <td>{bill.customerName}</td>

                        <td>₹ {bill.totalAmount}</td>

                        <td>

                            {new Date(bill.createdAt).toLocaleDateString()}

                        </td>

                    </tr>

                ))

            }

            </tbody>

        </table>

    </div>

</div>

);

}

export default Reports;