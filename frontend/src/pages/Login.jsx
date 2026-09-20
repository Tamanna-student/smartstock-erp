import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaBoxes
} from "react-icons/fa";


function Login() {
const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post("/auth/login", {
                email,
                password,
            });

            console.log(response.data);

           localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("user");

            localStorage.setItem(
    "token",
    response.data.token
);

localStorage.setItem(
    "role",
    response.data.user.role
);
localStorage.setItem(
    "userName",
    response.data.user.fullName
);



            alert("Login Successful");
            navigate("/dashboard");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login Failed"
            );
        }
    };


    return (

<div className="login-page">

    <div className="login-left">

        <div>

            <div className="login-logo">

                <FaBoxes />

            </div>

            <h1>

                SmartStock ERP

            </h1>

            <p>

                Inventory Management System

            </p>

            <span>

                Manage Products, Billing, Inventory & Employees
                from one powerful dashboard.

            </span>

        </div>

    </div>





    <div className="login-right">

        <form
            className="login-card"
            onSubmit={handleLogin}
        >

            <h2>

                Welcome Back 👋

            </h2>

            <p>

                Login to continue

            </p>





            <div className="input-box">

                <FaEnvelope className="input-icon"/>

                <input

                    type="email"

                    placeholder="Email Address"

                    value={email}

                    onChange={(e)=>

                        setEmail(e.target.value)

                    }

                    required

                />

            </div>





            <div className="input-box">

                <FaLock className="input-icon"/>

                <input

                    type={

                        showPassword

                        ? "text"

                        : "password"

                    }

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>

                        setPassword(e.target.value)

                    }

                    required

                />



                <span

                    className="password-toggle"

                    onClick={()=>

                        setShowPassword(!showPassword)

                    }

                >

                    {

                        showPassword

                        ?

                        <FaEyeSlash/>

                        :

                        <FaEye/>

                    }

                </span>

            </div>





            <button
                type="submit"
                className="login-btn"
            >

                Login

            </button>





            <div className="login-footer">

                <span>

                    New Business Owner?

                </span>

                <button

                    type="button"

                    className="register-link"

                    onClick={()=>

                        navigate("/register")

                    }

                >

                    Create Account

                </button>

            </div>

        </form>

    </div>

</div>

);
}


export default Login;