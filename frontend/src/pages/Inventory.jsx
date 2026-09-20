import { useEffect, useState } from "react";
import API from "../api/axios";
import {
    FaBoxes,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

function Inventory() {

    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);

   

  useEffect(() => {
    let isMounted = true;

    const loadInventory = async () => {
        try {
            const response = await API.get("/inventory");

            if (!isMounted) return;

            setInventory(response.data.inventory);
        } catch (error) {
            console.log(error);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    loadInventory();

    return () => {
        isMounted = false;
    };
}, []);

    if (loading) {

        return <h3>Loading Inventory...</h3>;

    }

    return (

<div className="w-100">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2
                style={{
                    fontWeight:700,
                    color:"#111827"
                }}
            >
                Inventory
            </h2>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:0
                }}
            >
                Monitor your stock levels in real time.
            </p>

        </div>

    </div>

    <div className="row g-4">

        {

            inventory.length===0 ?

            (

                <div className="col-12">

                    <div className="card-modern text-center">

                        No Inventory Found

                    </div>

                </div>

            )

            :

            inventory.map((item)=>{

                const stockPercent=Math.min(

                    (item.currentStock/

                    (item.minimumStock*2))*100,

                    100

                );

                const lowStock=

                    item.currentStock<=item.minimumStock;

                return(

                    <div
                        className="col-lg-4 col-md-6"
                        key={item._id}
                    >

                        <div className="card-modern">

                            <div className="d-flex align-items-center justify-content-between mb-3">

                                <div
                                    className="d-flex align-items-center gap-3"
                                >

                                    <div
                                        style={{

                                            width:"55px",

                                            height:"55px",

                                            borderRadius:"14px",

                                            background:"#EEF2FF",

                                            display:"flex",

                                            alignItems:"center",

                                            justifyContent:"center",

                                            color:"#4F46E5",

                                            fontSize:"22px"

                                        }}
                                    >

                                        <FaBoxes/>

                                    </div>

                                    <div>

                                        <h5
                                            style={{
                                                marginBottom:4
                                            }}
                                        >

                                            {

                                                item.product ?

                                                item.product.productName

                                                :

                                                "Deleted Product"

                                            }

                                        </h5>

                                        <small
                                            style={{
                                                color:"#6B7280"
                                            }}
                                        >

                                            Inventory Item

                                        </small>

                                    </div>

                                </div>

                            </div>

                            <div className="mb-3">

                                <div
                                    className="d-flex justify-content-between"
                                >

                                    <span>

                                        Current Stock

                                    </span>

                                    <strong>

                                        {item.currentStock}

                                    </strong>

                                </div>

                                <div
                                    className="progress mt-2"
                                    style={{
                                        height:"10px",
                                        borderRadius:"20px"
                                    }}
                                >

                                    <div

                                        className={`progress-bar ${
                                            lowStock
                                            ?
                                            "bg-danger"
                                            :
                                            "bg-success"
                                        }`}

                                        style={{
                                            width:`${stockPercent}%`
                                        }}

                                    >

                                    </div>

                                </div>

                            </div>

                            <div className="d-flex justify-content-between mb-3">

                                <span>

                                    Minimum Stock

                                </span>

                                <strong>

                                    {item.minimumStock}

                                </strong>

                            </div>

                            {

                                lowStock ?

                                <span
                                    className="badge bg-danger p-2"
                                >

                                    <FaExclamationTriangle className="me-2"/>

                                    Low Stock

                                </span>

                                :

                                <span
                                    className="badge bg-success p-2"
                                >

                                    <FaCheckCircle className="me-2"/>

                                    Healthy Stock

                                </span>

                            }

                        </div>

                    </div>

                )

            })

        }

    </div>

</div>

);

}

export default Inventory;