import { useEffect, useState } from "react";
import API from "../api/axios";

function Billing() {

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState([]);

    const [bills, setBills] = useState([]);

    const [billItems, setBillItems] = useState([]);

    const [formData, setFormData] = useState({

        customerName: "",

        product: "",

        productName: "",

        price: "",

        quantity: 1

    });






    const getBills = async () => {

        try {

            const response = await API.get("/bills");

            setBills(response.data.bills);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };



useEffect(() => {
    let isMounted = true;

    const loadBillingData = async () => {
        try {
            const productsResponse = await API.get("/products");
            const billsResponse = await API.get("/bills");

            if (!isMounted) return;

            setProducts(productsResponse.data.products);
            setBills(billsResponse.data.bills);
        } catch (error) {
            console.log(error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    loadBillingData();

    return () => {
        isMounted = false;
    };
}, []);





    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "product") {

            const selected = products.find(

                (p) => p._id === value

            );

            setFormData({

                ...formData,

                product: value,

                productName: selected?.productName || "",

                price: selected?.price || ""

            });

        }

        else {

            setFormData({

                ...formData,

                [name]: value

            });

        }

    };





    const addItem = () => {

        if (

            formData.product === "" ||

            formData.quantity === ""

        ) {

            alert("Select Product");

            return;

        }



        const newItem = {

            product: formData.product,

            productName: formData.productName,

            quantity: Number(formData.quantity),

            price: Number(formData.price)

        };



        setBillItems([

            ...billItems,

            newItem

        ]);



        setFormData({

            ...formData,

            product: "",

            productName: "",

            price: "",

            quantity: 1

        });

    };





    const removeItem = (index) => {

        const updatedItems =

            billItems.filter(

                (_, i) => i !== index

            );



        setBillItems(updatedItems);

    };





    const grandTotal =

        billItems.reduce(

            (total, item) =>

                total +

                item.price *

                item.quantity,

            0

        );





    const createBill = async () => {

        if (!formData.customerName) {

            alert("Enter Customer Name");

            return;

        }



        if (billItems.length === 0) {

            alert("Add Products");

            return;

        }



        try {

            await API.post(

                "/bills",

                {

                    customerName:

                        formData.customerName,



                    items:

                         billItems.map((item) => ({
    product: item.product,
    quantity: item.quantity
}))

                }

            );
                        alert("Bill Created Successfully");

            setFormData({

                customerName: "",

                product: "",

                productName: "",

                price: "",

                quantity: 1

            });

            setBillItems([]);

            getBills();

        }

        catch (error) {

            console.log(error);

            alert(

                error.response?.data?.message ||

                "Failed to Create Bill"

            );

        }

    };



    if (loading) {

        return (

            <h3 className="text-center mt-5">

                Loading Bills...

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
                Billing
            </h2>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:0
                }}
            >
                Create invoices and manage customer billing.
            </p>

        </div>

    </div>





    {/* Create Bill Card */}

    <div className="card-modern mb-4">

        <h4
            style={{
                fontWeight:600,
                marginBottom:"25px"
            }}
        >
            Create Invoice
        </h4>

        <input

            className="form-control modern-input mb-3"

            placeholder="Customer Name"

            name="customerName"

            value={formData.customerName}

            onChange={handleChange}

        />



        <div className="row g-3">

            <div className="col-lg-5">

                <select

                    className="form-control modern-input"

                    name="product"

                    value={formData.product}

                    onChange={handleChange}

                >

                    <option value="">

                        Select Product

                    </option>

                    {

                        products.map(product=>(

                            <option

                                key={product._id}

                                value={product._id}

                            >

                                {product.productName}

                            </option>

                        ))

                    }

                </select>

            </div>



            <div className="col-lg-2">

                <input

                    className="form-control modern-input"

                    value={formData.price}

                    readOnly

                    placeholder="Price"

                />

            </div>



            <div className="col-lg-2">

                <input

                    className="form-control modern-input"

                    type="number"

                    min="1"

                    name="quantity"

                    value={formData.quantity}

                    onChange={handleChange}

                />

            </div>



            <div className="col-lg-3">

                <button

                    className="btn modern-btn-primary w-100"

                    onClick={addItem}

                >

                    Add Item

                </button>

            </div>

        </div>





        {/* Items Table */}

        <div className="mt-4">

    <h5
        style={{
            fontWeight: 600,
            marginBottom: "20px"
        }}
    >
        Added Items
    </h5>

    {
        billItems.length === 0 ?

        (
            <div
                className="card-modern text-center"
                style={{
                    color: "#6B7280"
                }}
            >

                No Items Added

            </div>
        )

        :

        billItems.map((item, index) => (

            <div
                key={index}
                className="card-modern mb-3 d-flex justify-content-between align-items-center"
            >

                <div>

                    <h5
                        style={{
                            marginBottom: "8px",
                            fontWeight: 600
                        }}
                    >
                        📦 {item.productName}
                    </h5>

                    <p
                        style={{
                            margin: 0,
                            color: "#6B7280"
                        }}
                    >
                        Quantity : <b>{item.quantity}</b>
                    </p>

                    <p
                        style={{
                            margin: 0,
                            color: "#6B7280"
                        }}
                    >
                        Price : ₹ {item.price}
                    </p>

                </div>



                <div className="text-end">

                    <h4
                        style={{
                            color: "#4F46E5",
                            fontWeight: 700
                        }}
                    >
                        ₹ {item.price * item.quantity}
                    </h4>

                    <button

                        className="btn btn-outline-danger btn-sm mt-2"

                        onClick={() => removeItem(index)}

                    >

                        Remove

                    </button>

                </div>

            </div>

        ))
    }

</div>





        {/* Grand Total */}

       <div className="d-flex justify-content-between align-items-center mt-4">

    <div
        className="card-modern"
        style={{
            width: "260px",
            padding: "18px 24px",
            background: "linear-gradient(135deg,#4F46E5,#6366F1)",
            color: "white"
        }}
    >

        <p
            style={{
                margin: 0,
                fontSize: "14px",
                opacity: .9
            }}
        >
            Grand Total
        </p>

        <h3
            style={{
                margin: "5px 0 0",
                fontWeight: 700
            }}
        >
            ₹ {grandTotal}
        </h3>

    </div>



    <button

        className="btn modern-btn-success"

        style={{
             width: "260px",
            padding: "18px 24px",
            background: "red",
            color: "white",
            height: "52px",
            fontWeight: 600,
            fontSize: "16px"
        }}

        onClick={createBill}

    >

        Generate Bill

    </button>

</div>

    </div>


<div className="row g-4 mb-4">

    <div className="col-lg-4">

        <div className="dashboard-card">

            <div className="dashboard-icon blue">

                📄

            </div>

            <div>

                <p className="dashboard-title">

                    Total Bills

                </p>

                <h2>

                    {bills.length}

                </h2>

            </div>

        </div>

    </div>





    <div className="col-lg-4">

        <div className="dashboard-card">

            <div className="dashboard-icon green">

                💰

            </div>

            <div>

                <p className="dashboard-title">

                    Revenue

                </p>

                <h2>

                    ₹ {grandTotal}

                </h2>

            </div>

        </div>

    </div>





    <div className="col-lg-4">

        <div className="dashboard-card">

            <div className="dashboard-icon orange">

                📦

            </div>

            <div>

                <p className="dashboard-title">

                    Items

                </p>

                <h2>

                    {billItems.length}

                </h2>

            </div>

        </div>

    </div>

</div>


    {/* Bill History */}

    <h3

        style={{

            fontWeight:600,

            marginBottom:"20px"

        }}

    >

        Recent Bills

    </h3>



    <div className="card-modern">

        <table className="table table-hover align-middle modern-table">

            <thead className="table-light">

                <tr>

                    <th>Invoice</th>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Status</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

                {

                    bills.length===0 ?

                    (

                        <tr>

                            <td
                                colSpan="5"
                                className="text-center text-muted"
                            >

                                No Bills Found

                            </td>

                        </tr>

                    )

                    :

                    bills.map((bill)=>(

                        <tr key={bill._id}>

                            <td>{bill.invoiceNumber}</td>

                            <td>{bill.customerName}</td>

                            <td>₹ {bill.totalAmount}</td>

                            <td>

                                <span
className="badge"
style={{
background:"#DCFCE7",
color:"#166534",
padding:"8px 14px",
fontWeight:600,
borderRadius:"10px"
}}
>

                                    {bill.paymentStatus || "Paid"}

                                </span>

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

    </div>

</div>

);

}

export default Billing;