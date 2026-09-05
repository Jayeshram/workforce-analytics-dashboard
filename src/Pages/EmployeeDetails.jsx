import { useState,useEffect } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import './EmployeeDetails.css';


function EmployeeDetails() {
    const {id} = useParams();
    const navigate = useNavigate();

    const[employee,setEmployee] = useState(null);
    const[loading,setLoading] = useState(true);

    useEffect(() => {
        getEmployee();
    },[id]);

    const getEmployee = async () => {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        const data = await response.json();
        setEmployee(data);
        setLoading(false);
    }
        const handleDelete = async (event) => {
            const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
            if(!confirmDelete){
                return;
            }
  const response = await fetch(`https://dummyjson.com/users/${id}`,
    {
      method: "DELETE"
    }
  );

  const data = await response.json();

  console.log(data);
  navigate(`/employees`);
};
    if(loading){
        return <h2>Loading...</h2>
    }
    return(
        <div className="details-page">
            <div className="details-card">
                <button className="back-button" onClick= {() => {navigate('/employees');}}>← Back to Employees</button>
                <div className="profile-header">
                    <div className="profile-avatar">
                        {employee.firstName.charAt(0)}
                        {employee.lastName.charAt(0)}
                    </div>
                    <div>
                        <h1>{employee.firstName} {employee.lastName}</h1>
                        <p>Company: {employee.company.title}</p>
                         <button
      className="edit-button"
      onClick={() => {
        navigate(`/employees/${id}/edit`);
      }}
    >
      Edit Employee
    </button>
    <button onClick={handleDelete} className="delete-btn">Delete Employee</button>
                    </div>
                </div>
                <div className="details-grid">
                    <div className="detail-item">
                    <p><span>Email:</span> <strong>{employee.email}</strong></p>
                    </div>
                    <div className="detail-item">
                    <p><span>Phone:</span> <strong>{employee.phone}</strong></p>
                    </div>
                    <div className="detail-item">
                    <p><span>Age:</span> <strong>{employee.age}</strong></p>
                    </div>
                    <div className="detail-item">
                        <p><span>Employee Id:</span> <strong>{employee.id}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeDetails;