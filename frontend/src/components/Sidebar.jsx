import { Link, useNavigate } from "react-router-dom";


function Sidebar(){
    const navigate = useNavigate();


const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/");

};
const role = localStorage.getItem("role");

    return (

        <div className="bg-dark text-white p-3"
             style={{
                width:"250px",
                minHeight:"100vh"
             }}>


            <h3>
                SmartStock
            </h3>


            <hr/>


            <ul className="nav flex-column">


                <li className="nav-item">
                    <Link 
                    className="nav-link text-white"
                    to="/dashboard">
                        Dashboard
                    </Link>
                </li>


                <li>
                    <Link 
                    className="nav-link text-white"
                    to="/products">
                        Products
                    </Link>
                </li>


                <li>
                    <Link 
                    className="nav-link text-white"
                    to="/inventory">
                        Inventory
                    </Link>
                </li>


                <li>
                    <Link 
                    className="nav-link text-white"
                    to="/billing">
                        Billing
                    </Link>
                </li>


                {role === "admin" && (

<>
    <li>

        <Link
            className="nav-link text-white"
            to="/employees">

            Employees

        </Link>

    </li>

    <li>

        <Link
            className="nav-link text-white"
            to="/reports">

            Reports

        </Link>

    </li>

</>

)}

                


            </ul>
            <button
className="btn btn-danger mt-3"
onClick={logout}
>
Logout
</button>
            


        </div>

    );

}


export default Sidebar;