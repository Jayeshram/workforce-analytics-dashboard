import { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './EditEmployee.css'

function EditEmployee(){
    const {id} = useParams();
    const[loading,setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [role, setRole] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getUsers();
    },[id]);
    const getUsers = async () => {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setPhone(data.phone);
        setAge(data.age);
        setRole(data.company.title);
        setLoading(false);
    }

    const handleUpdate = async (event) => {
        event.preventDefault();

        setUpdating(true);

        const updatedEmployee = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        age: Number(age),
        role: role
    };
    try{
    const response = await fetch(`https://dummyjson.com/users/${id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEmployee)
    });
    if(!response.ok){
        throw new error("Failed to update employee");
    }
    const data = await response.json();
    console.log(data);
    alert("Employee update Successfully...");
    navigate(`/employees/${id}`);
}catch(error){
    console.error(error);
    alert("Failed to update Employee");
}
finally{
    setUpdating(false);
}
    if(loading){
        return <h2>Loading...</h2>
    }
}
    return (
  <div className="edit-page">

    <div className="edit-card">

      <div className="edit-header">
        <div>
          <h1>Edit Employee</h1>
          <p>Update employee information</p>
        </div>
      </div>

      <form onSubmit={handleUpdate}>

        <div className="edit-form-grid">

          <div className="edit-form-group">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>

          <div className="edit-form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>

          <div className="edit-form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="edit-form-group">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>

          <div className="edit-form-group">
            <label>Age</label>
            <input
              type="number"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>

          <div className="edit-form-group">
            <label>Job Role</label>
            <input
              type="text"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            />
          </div>

        </div>

        <div className="edit-form-actions">

          <button
            type="submit"
            className="edit-update-button" disabled={updating}
          >
            {updating ? "Updating..." : "Update Employee"}
          </button>

        </div>

      </form>

    </div>

  </div>
);
}


export default EditEmployee;