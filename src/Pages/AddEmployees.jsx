import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AddEmployee.css';

function AddEmployee(){
    const[firstName,setFirstName] = useState("");
    const[lastName,setLastName] = useState("");
    const[email,setEmail] = useState("");
    const[phone,setPhone] = useState("");
    const[age,setAge] = useState("");
    const[role,setRole] = useState("");

    const[loading,setLoading] = useState(false);
    const[success,setSuccess] = useState("");
    const[error,setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
            setSuccess("");
            setError("");

        const newEmployee = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            age: Number(age),
            role: role
        };
        try{
        const response = await fetch("https://dummyjson.com/users/add",{
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body : JSON.stringify(newEmployee)
        });
        if(!response.ok){
            throw new error("Failed to Add Employee")
        }
        const data = await response.json();
        console.log(data);
        setSuccess("Employee Added Successfully");

        setTimeout(() => {
            navigate("/employees")
        },1500);
        }
        catch(error){
            setError("Something went wrong. Please try again.")
        }
        finally{
            setLoading(false);
        }
    };
    return(
  <div className="add-page">
    <div className="add-card">

      <div className="add-header">
        <div>
          <h1>Add New Employee</h1>
          <p>Create a new employee record</p>
        </div>

        <button
          type="button"
          className="cancel-button"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </button>
      </div>

      {success && (
        <p className="success-message">
          {success}
        </p>
      )}

      {error && (
        <p className="error-message">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              placeholder="Enter age"
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </div>

          <div className="form-group">
            <label>Job Role</label>
            <input
              type="text"
              placeholder="Enter job role"
              value={role}
              onChange={(event) => {
                setRole(event.target.value);
              }}
            />
          </div>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Adding Employee..." : "Add Employee"}
          </button>

        </div>

      </form>

    </div>
  </div>
    );
}

export default AddEmployee;