import { useEffect, useState } from "react";
import API from "../api/axios";


function Products() {


    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);


    const [showForm, setShowForm] = useState(false);


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

    try{

        await API.delete(`/products/${id}`);

        getProducts();

    }
    catch(error){

        console.log(error);

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



                <button

                className="btn btn-primary"

                onClick={()=>setShowForm(!showForm)}

                >

                    Add Product

                </button>


            </div>






            {
                showForm && (


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

                    onClick={addProduct}

                    >

                    Save Product

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

                                <button
                                className="btn btn-danger btn-sm"
                                onClick={()=>deleteProduct(product._id)}
                                >
                                Delete
                                </button>

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