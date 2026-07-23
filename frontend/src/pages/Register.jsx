import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";


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
    const [otherBusiness,setOtherBusiness] = useState("");


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



    return(

        <div className="container mt-5">

            <h2>
                SmartStock ERP - Business Registration
            </h2>


            <form onSubmit={handleRegister}>


                <input
                className="form-control mb-2"
                name="fullName"
                placeholder="Owner Name"
                onChange={handleChange}
                />


                <input
                className="form-control mb-2"
                name="businessName"
                placeholder="Business Name"
                onChange={handleChange}
                />


                <select
className="form-control mb-2"
name="businessType"
value={formData.businessType}
onChange={handleChange}
>

<option value="">
Select Business Type
</option>

<option value="Retail">
Retail
</option>

<option value="Wholesale">
Wholesale
</option>

<option value="Manufacturing">
Manufacturing
</option>

<option value="Restaurant">
Restaurant
</option>

<option value="Pharmacy">
Pharmacy
</option>

<option value="Service">
Service
</option>

<option value="Other">
Other
</option>

</select>
{
formData.businessType === "Other" && (

<input

className="form-control mb-2"

placeholder="Enter Business Type"

value={otherBusiness}

onChange={(e)=>setOtherBusiness(e.target.value)}

/>

)
}

                <input
                className="form-control mb-2"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
                />


                <input
                className="form-control mb-2"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                />


                <input
                className="form-control mb-2"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                />


                <textarea
                className="form-control mb-2"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                />


                <input
                className="form-control mb-2"
                name="gstNumber"
                placeholder="GST Number (Optional)"
                onChange={handleChange}
                />


                <button className="btn btn-success">

                    Create Account

                </button>


            </form>

        </div>

    );

}


export default Register;