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

<div className="w-100">

    {/* Header */}

    <div className="d-flex justify-content-between align-items-center mb-4">

        <div>

            <h2
                style={{
                    fontWeight:700,
                    color:"#111827"
                }}
            >
                Employee Management
            </h2>

            <p
                style={{
                    color:"#6B7280",
                    marginBottom:0
                }}
            >
                Manage your employees and business staff.
            </p>

        </div>

        <button
            className="btn modern-btn-primary"
            onClick={() => setShowForm(!showForm)}
        >
            + Add Employee
        </button>

    </div>



    {/* Statistics */}

    <div className="row g-4 mb-4">

        <div className="col-lg-4">

            <div className="dashboard-card">

                <div className="dashboard-icon blue">
                    👨‍💼
                </div>

                <div>

                    <p className="dashboard-title">
                        Employees
                    </p>

                    <h2>
                        {employees.length}
                    </h2>

                </div>

            </div>

        </div>



        <div className="col-lg-4">

            <div className="dashboard-card">

                <div className="dashboard-icon green">
                    🏢
                </div>

                <div>

                    <p className="dashboard-title">
                        Business
                    </p>

                    <h2>
                        1
                    </h2>

                </div>

            </div>

        </div>



        <div className="col-lg-4">

            <div className="dashboard-card">

                <div className="dashboard-icon orange">
                    ✅
                </div>

                <div>

                    <p className="dashboard-title">
                        Active
                    </p>

                    <h2>
                        {employees.length}
                    </h2>

                </div>

            </div>

        </div>

    </div>



    {/* Search */}

    <div className="search-box mb-4">

        <input

            type="text"

            placeholder="Search Employee..."

        />

    </div>



    {/* Form */}

    {

        showForm && (

            <div className="card-modern mb-4">

                <h4
                    style={{
                        fontWeight:600,
                        marginBottom:"25px"
                    }}
                >
                    {editMode ? "Edit Employee" : "Add Employee"}
                </h4>

                <div className="row g-3">

                    <div className="col-md-6">

                        <input

                            className="form-control modern-input"

                            placeholder="Full Name"

                            name="fullName"

                            value={formData.fullName}

                            onChange={handleChange}

                        />

                    </div>



                    <div className="col-md-6">

                        <input

                            className="form-control modern-input"

                            placeholder="Phone Number"

                            name="phone"

                            value={formData.phone}

                            onChange={handleChange}

                        />

                    </div>



                    <div className="col-md-6">

                        <input

                            className="form-control modern-input"

                            placeholder="Email"

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                        />

                    </div>



                    {

                        !editMode && (

                            <div className="col-md-6">

                                <input

                                    className="form-control modern-input"

                                    placeholder="Password"

                                    type="password"

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                />

                            </div>

                        )

                    }



                    <div className="col-12">

                        <textarea

                            className="form-control modern-input"

                            rows="3"

                            placeholder="Address"

                            name="address"

                            value={formData.address}

                            onChange={handleChange}

                        />

                    </div>

                </div>



                <button

                    className="btn modern-btn-success mt-4"

                    onClick={saveEmployee}

                >

                    {

                        editMode

                        ?

                        "Update Employee"

                        :

                        "Save Employee"

                    }

                </button>

            </div>

        )

    }



    {/* Employee Cards */}

    {

        employees.length===0 ?

        (

            <div className="card-modern text-center">

                <h5
                    style={{
                        color:"#6B7280"
                    }}
                >
                    No Employees Found
                </h5>

            </div>

        )

        :

        <div className="row">

            {

                employees.map((employee)=>(

                    <div
                        className="col-lg-6 mb-4"
                        key={employee._id}
                    >

                        <div className="card-modern h-100">

                            <div className="d-flex justify-content-between">

                                <div>

                                    <h4
                                        style={{
                                            fontWeight:600
                                        }}
                                    >
                                        👤 {employee.fullName}
                                    </h4>

                                    <p
                                        className="text-muted mb-1"
                                    >
                                        📧 {employee.email}
                                    </p>

                                    <p
                                        className="text-muted mb-1"
                                    >
                                        📞 {employee.phone}
                                    </p>

                                    <p
                                        className="text-muted mb-1"
                                    >
                                        🏢 {employee.businessName}
                                    </p>

                                    <p
                                        className="text-muted"
                                    >
                                        📍 {employee.address}
                                    </p>

                                </div>

                            </div>



                            <hr />



                            <div className="d-flex gap-2">

                                <button

                                    className="btn btn-warning"

                                    onClick={() => editEmployee(employee)}

                                >

                                    Edit

                                </button>



                                <button

                                    className="btn btn-danger"

                                    onClick={() => deleteEmployee(employee._id)}

                                >

                                    Delete

                                </button>

                            </div>

                        </div>

                    </div>

                ))

            }

        </div>

    }

</div>

);

}

export default Employees;