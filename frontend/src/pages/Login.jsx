import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await API.post("/auth/login", {
                email,
                password,
            });

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
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
        <div>

            <h2>
                SmartStock ERP Login
            </h2>


            <form onSubmit={handleLogin}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />


                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />


                <button type="submit">
                    Login
                </button>


            </form>


        </div>
    );
}


export default Login;