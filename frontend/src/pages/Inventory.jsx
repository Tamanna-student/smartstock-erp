import { useEffect, useState } from "react";
import API from "../api/axios";

function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

    const getInventory = async () => {

        try {

            const response = await API.get("/inventory");

            setInventory(response.data.inventory);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        getInventory();

    }, []);

    if (loading) {

        return <h3>Loading Inventory...</h3>;

    }

    return (

        <div>

            <h2 className="mb-4">
                Inventory Management
            </h2>

            <table className="table table-bordered shadow">

                <thead className="table-dark">

                    <tr>

                        <th>Product</th>
                        <th>Current Stock</th>
                        <th>Minimum Stock</th>
                        <th>Status</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        inventory.length === 0 ? (

                            <tr>

                                <td colSpan="4" className="text-center">
                                    No Inventory Found
                                </td>

                            </tr>

                        ) : (

                            inventory.map((item) => (

                                <tr key={item._id}>

                                    <td>
                                        {item.product
                                            ? item.product.productName
                                            : "Deleted Product"}
                                    </td>

                                    <td>
                                        {item.currentStock}
                                    </td>

                                    <td>
                                        {item.minimumStock}
                                    </td>

                                    <td>

                                        {
                                            item.currentStock <= item.minimumStock ? (

                                                <span className="badge bg-danger">
                                                    Low Stock
                                                </span>

                                            ) : (

                                                <span className="badge bg-success">
                                                    In Stock
                                                </span>

                                            )
                                        }

                                    </td>

                                </tr>

                            ))

                        )
                    }

                </tbody>

            </table>

        </div>

    );

}

export default Inventory;