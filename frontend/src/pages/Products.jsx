import { useEffect, useState } from "react";
import API from "../api/axios";


function Products() {

    const role = localStorage.getItem("role");


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





    return(


        <div>



            <div className="d-flex justify-content-between mb-3">


                <h2>
                    Products Management
                </h2>



               {
    role === "admin" && (

        <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
        >

            Add Product

        </button>

    )
}


            </div>





{
    role === "admin" && showForm && (


                <div className="card shadow p-3 mb-4">


                    <h4>
                        Add New Product
                    </h4>



                    <input

                    className="form-control mb-2"

                    name="productName"

                    placeholder="Product Name"

                    value={formData.productName}

                    onChange={handleChange}

                    />




                    <input

                    className="form-control mb-2"

                    name="category"

                    placeholder="Category"

                    value={formData.category}

                    onChange={handleChange}

                    />





                    <input

                    className="form-control mb-2"

                    name="price"

                    type="number"

                    placeholder="Price"

                    value={formData.price}

                    onChange={handleChange}

                    />





                    <input

                    className="form-control mb-2"

                    name="unit"

                    placeholder="Unit"

                    value={formData.unit}

                    onChange={handleChange}

                    />





                    <textarea

                    className="form-control mb-2"

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

            <table className="table table-bordered shadow">


                <thead className="table-dark">


                    <tr>


                        <th>
                            Product Name
                        </th>


                        <th>
                            Category
                        </th>


                        <th>
                            Price
                        </th>


                        <th>
                            Unit
                        </th>

                        <th>
                            Action
                            </th>


                    </tr>


                </thead>





                <tbody>


                {

                    products.map((product)=>(


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
          <td>

{
    role === "admin" && (
        <>
            <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editProduct(product)}
            >
                Edit
            </button>

            <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteProduct(product._id)}
            >
                Delete
            </button>
        </>
    )
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



export default Products;