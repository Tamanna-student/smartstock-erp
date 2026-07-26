import { useEffect, useState } from "react";
import API from "../api/axios";
import { FaSearch } from "react-icons/fa";


function Products() {

    const role = localStorage.getItem("role");
    const [search,setSearch]=useState("");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    const [showForm, setShowForm] = useState(false);


    const [editMode, setEditMode] = useState(false);

const [editId, setEditId] = useState("");

    const [formData, setFormData] = useState({

        productName: "",
        category: "",
        price: "",
        unit: "",
        description: ""

    });




    const getProducts = async () => {

        try {

            const response = await API.get("/products");

            setProducts(response.data.products);


        } catch(error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };




    useEffect(()=>{

        getProducts();

    },[]);




    const handleChange = (e)=>{


        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });


    };





    const addProduct = async()=>{


        try {


            const response = await API.post(
                "/products",
                formData
            );


            console.log(response.data);



            setShowForm(false);



            setFormData({

                productName:"",
                category:"",
                price:"",
                unit:"",
                description:""

            });



            getProducts();



        } catch(error) {


            console.log(error);


        }


    };
   const deleteProduct = async(id)=>{

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this product?"
    );

    if(!confirmDelete){
        return;
    }

    try{

        await API.delete(`/products/${id}`);

        alert("Product Deleted Successfully");

        getProducts();

    }
    catch(error){

        console.log(error);

        alert("Failed to Delete Product");

    }

};

const editProduct = (product) => {

    setEditMode(true);

    setEditId(product._id);

    setShowForm(true);

    setFormData({

        productName: product.productName,

        category: product.category,

        price: product.price,

        unit: product.unit,

        description: product.description

    });

};
const updateProduct = async () => {

    try {

        await API.put(

            `/products/${editId}`,

            formData

        );

        alert("Product Updated Successfully");

        setEditMode(false);

        setEditId("");

        setShowForm(false);

        setFormData({

            productName: "",

            category: "",

            price: "",

            unit: "",

            description: ""

        });

        getProducts();

    }

    catch (error) {

        console.log(error);

        alert("Failed to Update Product");

    }

};





    if(loading){

        return (

            <h3 className="text-center mt-5">
                Loading Products...
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
                        fontWeight: 700,
                        color: "#111827"
                    }}
                >
                    Products
                </h2>

                <p
                    style={{
                        color: "#6B7280",
                        marginBottom: 0
                    }}
                >
                    Manage your inventory products.
                </p>

            </div>

            {
                role === "admin" && (

                    <button
                        className="btn btn-primary px-4"
                        onClick={() => setShowForm(!showForm)}
                    >
                        + Add Product
                    </button>

                )
            }

        </div>


        {/* Search */}

        <div className="search-box mb-4">

            <FaSearch className="search-icon" />

            <input

                type="text"

                placeholder="Search Products..."

                value={search}

                onChange={(e) => setSearch(e.target.value)}

            />

        </div>


        {/* Add Product Form */}

        {

            role === "admin" && showForm && (

                <div className="card-modern mb-4">

                    <h4 className="mb-3">

                        Add New Product

                    </h4>

                    <input

                        className="form-control mb-3"

                        name="productName"

                        placeholder="Product Name"

                        value={formData.productName}

                        onChange={handleChange}

                    />

                    <input

                        className="form-control mb-3"

                        name="category"

                        placeholder="Category"

                        value={formData.category}

                        onChange={handleChange}

                    />

                    <input

                        className="form-control mb-3"

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={formData.price}

                        onChange={handleChange}

                    />

                    <input

                        className="form-control mb-3"

                        name="unit"

                        placeholder="Unit"

                        value={formData.unit}

                        onChange={handleChange}

                    />

                    <textarea

                        className="form-control mb-3"

                        name="description"

                        placeholder="Description"

                        value={formData.description}

                        onChange={handleChange}

                    />

                    <button

                        className="btn btn-success"

                        onClick={

                            editMode

                                ? updateProduct

                                : addProduct

                        }

                    >

                        {

                            editMode

                                ? "Update Product"

                                : "Save Product"

                        }

                    </button>

                </div>

            )

        }


        {/* Products Table */}

        <div className="card-modern">

            <table className="table table-hover align-middle mb-0">

                <thead
    style={{
        background: "#F9FAFB"
    }}
>

<tr>

<th>Product</th>

<th>Category</th>

<th>Price</th>

<th>Unit</th>

{
role==="admin" &&

<th style={{textAlign:"center"}}>

Actions

</th>

}

</tr>

</thead>

                <tbody>

                    {

                        products

                            .filter((product) =>

                                product.productName

                                    .toLowerCase()

                                    .includes(

                                        search.toLowerCase()

                                    )

                            )

                            .map((product) => (

                                <tr key={product._id}>

                                    <td>

<div
className="d-flex align-items-center gap-3"
>

<div
style={{

width:"42px",

height:"42px",

borderRadius:"12px",

background:"#EEF2FF",

display:"flex",

alignItems:"center",

justifyContent:"center",

fontWeight:700,

color:"#4F46E5"

}}
>

📦

</div>

<div>

<div
style={{

fontWeight:600

}}
>

{product.productName}

</div>

</div>

</div>

</td>

                                    <td>

<span
className="badge bg-primary"
style={{

padding:"8px 14px",

fontWeight:500,

borderRadius:"20px"

}}
>

{product.category}

</span>

</td>

                                   <td>

<span
style={{

fontWeight:700,

color:"#16A34A",

fontSize:"16px"

}}
>

₹ {product.price}

</span>

</td>

                                    <td>

                                        {product.unit}

                                    </td>

                                    {

                                        role === "admin" && (

                                            <td>

                                                <button

className="btn btn-outline-primary btn-sm me-2"

onClick={()=>editProduct(product)}

>

✏ Edit

</button>

<button

className="btn btn-outline-danger btn-sm"

onClick={()=>deleteProduct(product._id)}

>

🗑 Delete

</button>

                                            </td>

                                        )

                                    }

                                </tr>

                            ))

                    }

                </tbody>

            </table>

        </div>

    </div>

);


}



export default Products;