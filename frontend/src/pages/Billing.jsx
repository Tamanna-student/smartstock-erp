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



    const getProducts = async () => {

        try {

            const response = await API.get("/products");

            setProducts(response.data.products);

        }

        catch (error) {

            console.log(error);

        }

    };



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

        getProducts();

        getBills();

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

                        billItems.map(

                            (item) => ({

                                product:

                                    item.product,

                                quantity:

                                    item.quantity,

                                price:

                                    item.price

                            })

                        )

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

        <div>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Billing Management</h2>

            </div>



            <div className="card shadow p-4 mb-4">

                <h4 className="mb-3">

                    Create New Bill

                </h4>



                <input

                    className="form-control mb-3"

                    placeholder="Customer Name"

                    name="customerName"

                    value={formData.customerName}

                    onChange={handleChange}

                />



                <div className="row">

                    <div className="col-md-5">

                        <select

                            className="form-control"

                            name="product"

                            value={formData.product}

                            onChange={handleChange}

                        >

                            <option value="">

                                Select Product

                            </option>

                            {

                                products.map((product)=>(

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



                    <div className="col-md-2">

                        <input

                            className="form-control"

                            value={formData.price}

                            readOnly

                            placeholder="Price"

                        />

                    </div>



                    <div className="col-md-2">

                        <input

                            className="form-control"

                            type="number"

                            min="1"

                            name="quantity"

                            value={formData.quantity}

                            onChange={handleChange}

                        />

                    </div>



                    <div className="col-md-3">

                        <button

                            className="btn btn-primary w-100"

                            onClick={addItem}

                        >

                            Add Item

                        </button>

                    </div>

                </div>



                <table className="table table-bordered mt-4">

                    <thead className="table-dark">

                        <tr>

                            <th>Product</th>

                            <th>Price</th>

                            <th>Qty</th>

                            <th>Total</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            billItems.length===0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="5"

                                        className="text-center"

                                    >

                                        No Items Added

                                    </td>

                                </tr>

                            )

                            :

                            billItems.map((item,index)=>(

                                <tr key={index}>

                                    <td>

                                        {item.productName}

                                    </td>

                                    <td>

                                        ₹ {item.price}

                                    </td>

                                    <td>

                                        {item.quantity}

                                    </td>

                                    <td>

                                        ₹ {item.price * item.quantity}

                                    </td>

                                    <td>

                                        <button

                                            className="btn btn-danger btn-sm"

                                            onClick={()=>

                                                removeItem(index)

                                            }

                                        >

                                            Remove

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>



                <h4 className="text-end">

                    Grand Total : ₹ {grandTotal}

                </h4>



                <button

                    className="btn btn-success mt-3"

                    onClick={createBill}

                >

                    Generate Bill

                </button>

            </div>



            <h3 className="mb-3">

                Bill History

            </h3>



            <table className="table table-bordered shadow">

                <thead className="table-dark">

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

                                    className="text-center"

                                >

                                    No Bills Found

                                </td>

                            </tr>

                        )

                        :

                        bills.map((bill)=>(

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

                                    <span className="badge bg-success">

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

    );

}

export default Billing;