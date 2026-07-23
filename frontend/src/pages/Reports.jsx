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

    const getReports = async () => {

        try {

            const salesResponse =
                await API.get("/reports/sales");

            const revenueResponse =
                await API.get("/reports/revenue");

            const inventoryResponse =
                await API.get("/reports/inventory");

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

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };
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

        getReports();

    }, []);

    if (loading) {

        return (

            <h3 className="text-center mt-5">

                Loading Reports...

            </h3>

        );

    }

    return (

        <div className="container">

            <h2 className="mb-4">

                Reports Dashboard

            </h2>

            <div className="row g-3">

                <div className="col-md-6">

                    <div className="card shadow p-3">

                        <h5>

                            Total Revenue

                        </h5>

                        <h2>

                            ₹ {revenue}

                        </h2>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow p-3">

                        <h5>

                            Total Bills

                        </h5>

                        <h2>

                            {totalBills}

                        </h2>

                    </div>

                </div>

            </div>

            <hr className="my-4"/>

            <h4>

                Sales Report

            </h4>

            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>Invoice</th>

                        <th>Customer</th>

                        <th>Total</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>
                    {
    sales.length === 0 ?

    (

        <tr>

            <td
                colSpan="4"
                className="text-center"
            >

                No Sales Found

            </td>

        </tr>

    )

    :

    sales.map((bill) => (

        <tr key={bill._id}>

            <td>

                {bill.invoiceNumber}

            </td>

            <td>

                {bill.customerName}

            </td>

            <td>

                ₹ {bill.totalAmount}

            </td>

            <td>

                {

                    new Date(

                        bill.createdAt

                    ).toLocaleDateString()

                }

            </td>

        </tr>

    ))

}

                </tbody>

            </table>



            <h4 className="mt-5 mb-3">

                Inventory Report

            </h4>



            <table className="table table-bordered table-hover shadow">

                <thead className="table-dark">

                    <tr>

                        <th>

                            Product

                        </th>

                        <th>

                            Category

                        </th>

                        <th>

                            Price

                        </th>

                        <th>

                            Current Stock

                        </th>

                        <th>

                            Minimum Stock

                        </th>

                        <th>

                            Status

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        inventory.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center"
                                >

                                    No Inventory Found

                                </td>

                            </tr>

                        )

                        :

                        inventory.map((item) => (

                            <tr key={item._id}>

                                <td>

                                    {

                                        item.product

                                        ?

                                        item.product.productName

                                        :

                                        "Deleted Product"

                                    }

                                </td>

                                <td>

                                    {

                                        item.product

                                        ?

                                        item.product.category

                                        :

                                        "-"

                                    }

                                </td>

                                <td>

                                    ₹ {

                                        item.product

                                        ?

                                        item.product.price

                                        :

                                        0

                                    }

                                </td>

                                <td>

                                    {item.currentStock}

                                </td>

                                <td>

                                    {item.minimumStock}

                                </td>

                                <td>

                                    {

                                        item.currentStock <= item.minimumStock ?

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

            <hr className="my-5" />

<h4>Search Products</h4>

<div className="input-group mb-3">

    <input
        type="text"
        className="form-control"
        placeholder="Enter Product Name"
        value={productKeyword}
        onChange={(e) =>
            setProductKeyword(e.target.value)
        }
    />

    <button
        className="btn btn-primary"
        onClick={searchProducts}
    >
        Search
    </button>

</div>

<table className="table table-bordered table-hover shadow mb-5">

    <thead className="table-dark">

        <tr>

            <th>Product</th>

            <th>Category</th>

            <th>Price</th>

            <th>Unit</th>

        </tr>

    </thead>

    <tbody>

        {

            searchedProducts.length === 0 ?

                <tr>

                    <td
                        colSpan="4"
                        className="text-center"
                    >

                        No Product Found

                    </td>

                </tr>

                :

                searchedProducts.map((product) => (

                    <tr key={product._id}>

                        <td>
                            {product.productName}
                        </td>

                        <td>
                            {product.category}
                        </td>

                        <td>
                            ₹ {product.price}
                        </td>

                        <td>
                            {product.unit}
                        </td>

                    </tr>

                ))

        }

    </tbody>

</table>



<h4>Search Bills</h4>

<div className="input-group mb-3">

    <input
        type="text"
        className="form-control"
        placeholder="Enter Customer Name"
        value={billKeyword}
        onChange={(e) =>
            setBillKeyword(e.target.value)
        }
    />

    <button
        className="btn btn-success"
        onClick={searchBills}
    >
        Search
    </button>

</div>

<table className="table table-bordered table-hover shadow">

    <thead className="table-dark">

        <tr>

            <th>Invoice</th>

            <th>Customer</th>

            <th>Total</th>

            <th>Date</th>

        </tr>

    </thead>

    <tbody>

        {

            searchedBills.length === 0 ?

                <tr>

                    <td
                        colSpan="4"
                        className="text-center"
                    >

                        No Bill Found

                    </td>

                </tr>

                :

                searchedBills.map((bill) => (

                    <tr key={bill._id}>

                        <td>
                            {bill.invoiceNumber}
                        </td>

                        <td>
                            {bill.customerName}
                        </td>

                        <td>
                            ₹ {bill.totalAmount}
                        </td>

                        <td>
                            {new Date(
                                bill.createdAt
                            ).toLocaleDateString()}
                        </td>

                    </tr>

                ))

        }

    </tbody>

</table>

        </div>

    );

}

export default Reports;