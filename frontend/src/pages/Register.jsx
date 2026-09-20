import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

import {
    FaBoxes,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaLock,
    FaBuilding,
    FaMapMarkerAlt,
    FaFileInvoice,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";


function Register(){

    const navigate = useNavigate();
    

    const [formData,setFormData] = useState({

        fullName:"",
        businessName:"",
        businessType:"",
        phone:"",
        email:"",
        password:"",
        address:"",
        gstNumber:""

    });
   const [otherBusiness] = useState("");
    const [showPassword, setShowPassword] = useState(false);


    const handleChange = (e)=>{

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };


    const handleRegister = async(e)=>{

    e.preventDefault();

    try{

        const data = {

            ...formData,

            businessType:
            formData.businessType === "Other"
            ?
            otherBusiness
            :
            formData.businessType

        };


        await API.post(
            "/auth/register",
            data
        );


        alert("Business Registered Successfully");


        navigate("/");


    }
    catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Registration Failed"
        );

    }

};



   return (

<div className="login-page">

<div className="login-left">

<div>

<div className="login-logo">

<FaBoxes/>

</div>

<h1>

SmartStock ERP

</h1>

<p>

Create Your Business Account

</p>

<span>

Register your business and start managing
products, inventory, billing and employees
from one dashboard.

</span>

</div>

</div>





<div className="login-right">

<form
className="login-card"
onSubmit={handleRegister}
>

<h2>

Create Account 🚀

</h2>

<p>

Start your SmartStock journey

</p>



<div className="input-box">

<FaUser className="input-icon"/>

<input
type="text"
placeholder="Owner Name"
name="fullName"
value={formData.fullName}
onChange={handleChange}
required
/>

</div>





<div className="input-box">

<FaBuilding className="input-icon"/>

<input
type="text"
placeholder="Business Name"
name="businessName"
value={formData.businessName}
onChange={handleChange}
required
/>

</div>





<div className="input-box">

<FaBuilding className="input-icon"/>

<select
name="businessType"
value={formData.businessType}
onChange={handleChange}
required
>

<option value="">

Business Type

</option>

<option>

Retail Shop

</option>

<option>

Wholesale

</option>

<option>

Medical Store

</option>

<option>

Electronics

</option>

<option>

Clothing

</option>

<option>

Grocery

</option>

<option>

Other

</option>

</select>

</div>





<div className="input-box">

<FaPhone className="input-icon"/>

<input
type="text"
placeholder="Phone Number"
name="phone"
value={formData.phone}
onChange={handleChange}
required
/>

</div>





<div className="input-box">

<FaEnvelope className="input-icon"/>

<input
type="email"
placeholder="Email Address"
name="email"
value={formData.email}
onChange={handleChange}
required
/>

</div>





<div className="input-box">

<FaLock className="input-icon"/>

<input
type={showPassword ? "text" : "password"}
placeholder="Password"
name="password"
value={formData.password}
onChange={handleChange}
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





<div className="input-box">

<FaMapMarkerAlt className="input-icon"/>

<input
type="text"
placeholder="Address"
name="address"
value={formData.address}
onChange={handleChange}
/>

</div>





<div className="input-box">

<FaFileInvoice className="input-icon"/>

<input
type="text"
placeholder="GST Number (Optional)"
name="gstNumber"
value={formData.gstNumber}
onChange={handleChange}
/>

</div>





<button
className="login-btn"
type="submit"
>

Create Account

</button>





<div className="login-footer">

<span>

Already have an account?

</span>

<button

type="button"

className="register-link"

onClick={()=>

navigate("/")

}

>

Login

</button>

</div>

</form>

</div>

</div>

);

}


export default Register;