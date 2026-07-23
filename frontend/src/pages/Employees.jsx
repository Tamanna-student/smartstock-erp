import { useEffect, useState } from "react";
import API from "../api/axios";

function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
const [editId, setEditId] = useState(null);

const [formData, setFormData] = useState({

    fullName: "",

    businessName: "",

    phone: "",

    email: "",

    password: "",

    address: ""

});
const resetForm = () => {

    setFormData({

        fullName: "",
        businessName: "",
        phone: "",
        email: "",
        password: "",
        address: ""

    });

}; 

    const getEmployees = async () => {

    try {

        const response = await API.get("/employees");

        setEmployees(response.data.employees);

    }

    catch (error) {

        console.log(error);

    }

    finally {

        setLoading(false);

    }

};



useEffect(() => {

    getEmployees();

}, []);




const handleChange = (e) => {

    setFormData({

        ...formData,

        [e.target.name]: e.target.value

    });

};




const saveEmployee = async () => {

    try {


        if(editMode){

            await API.put(
                `/employees/${editId}`,
                formData
            );

            alert("Employee Updated Successfully");


        }
        else{

            await API.post(
                "/employees",
                formData
            );

            alert("Employee Added Successfully");

        }


        setShowForm(false);

        setEditMode(false);

        setEditId(null);

        resetForm();

        getEmployees();


    }

    catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ||
            "Operation Failed"
        );

    }

};
const editEmployee = (employee) => {

    setEditMode(true);

    setEditId(employee._id);

    setFormData({

        fullName: employee.fullName,
        businessName: employee.businessName,
        phone: employee.phone,
        email: employee.email,
        password: "",
        address: employee.address

    });

    setShowForm(true);

};



const deleteEmployee = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this employee?"
    );

    if(!confirmDelete){
        return;
    }

    try {

        await API.delete(`/employees/${id}`);

        alert("Employee Deleted Successfully");

        getEmployees();

    }

    catch (error) {

        console.log(error);

        alert("Failed to Delete Employee");

    }

};




if (loading) {

    return (

        <h3 className="text-center mt-5">

            Loading Employees...

        </h3>

    );

}

    return (

    <div>

        <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>

                Employee Management

            </h2>

            <button

                className="btn btn-primary"

                onClick={() => setShowForm(!showForm)}

            >

                Add Employee

            </button>

        </div>



        {

            showForm && (

                <div className="card shadow p-4 mb-4">

                    <h4 className="mb-3">

                        Add Employee

                    </h4>



                    <input

                        className="form-control mb-3"

                        placeholder="Full Name"

                        name="fullName"

                        value={formData.fullName}

                        onChange={handleChange}

                    />



                    <input

                        className="form-control mb-3"

                        placeholder="Phone Number"

                        name="phone"

                        value={formData.phone}

                        onChange={handleChange}

                    />



                    <input

                        className="form-control mb-3"

                        placeholder="Email"

                        name="email"

                        type="email"

                        value={formData.email}

                        onChange={handleChange}

                    />



                    <input

                        className="form-control mb-3"

                        placeholder="Password"

                        name="password"

                        type="password"

                        value={formData.password}

                        onChange={handleChange}

                    />



                    <textarea

                        className="form-control mb-3"

                        placeholder="Address"

                        name="address"

                        value={formData.address}

                        onChange={handleChange}

                    />



                    <button

                        className="btn btn-success"

                        onClick={saveEmployee}

                    >

                        {editMode ? "Update Employee" : "Save Employee"}

                    </button>

                </div>

            )

        }



        <table className="table table-bordered table-hover shadow">

            <thead className="table-dark">

                <tr>

                    <th>Name</th>

                    <th>Business</th>

                    <th>Phone</th>

                    <th>Email</th>

                    <th>Address</th>

                    <th>Action</th>

                </tr>

            </thead>

            <tbody>
                {
    employees.length === 0 ?

    (

        <tr>

            <td
                colSpan="6"
                className="text-center"
            >

                No Employees Found

            </td>

        </tr>

    )

    :

    employees.map((employee) => (

        <tr key={employee._id}>

            <td>

                {employee.fullName}

            </td>

            <td>

                {employee.businessName}

            </td>

            <td>

                {employee.phone}

            </td>

            <td>

                {employee.email}

            </td>

            <td>

                {employee.address}

            </td>

            <td>

<button

className="btn btn-warning btn-sm me-2"

onClick={() => editEmployee(employee)}

>

Edit

</button>


<button

className="btn btn-danger btn-sm"

onClick={() => deleteEmployee(employee._id)}

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

export default Employees;