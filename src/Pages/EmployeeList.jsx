import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './EmployeeList.css';
function EmployeeList(){
  const navigate = useNavigate();
    const[employee,setEmployees] = useState([]);
  const[loading,setLoading] = useState(true);
  const[search,setSearch] = useState("");
  const[sortBy,setSortBy] = useState("");
  const[role,setRole] = useState("");
  const[currentPage,setCurrentPage] = useState(1);

  const employeesPerPage = 10;

  useEffect(() => {
    getUsers();
  },[])
  const getUsers = async() => {
    const response = await fetch("https://dummyjson.com/users");
    const users = await response.json();
    setEmployees(users.users);
    setLoading(false);
  }
  useEffect(() => {
    setCurrentPage(1);
  },[search,role,sortBy]);
  const filteredEmployees = employee.filter((emp) =>{
    return(
      emp.firstName.toLowerCase().includes(search.toLowerCase()) && (role === "" || emp.company.title === role)
    )
  })
  const roles = employee.map((emp) => {
    return emp.company.title;
  })
  const uniqueRoles = [...new Set(roles)];
  const sortedEmployees = [...filteredEmployees]
  if(sortBy === "name-asc"){
      sortedEmployees.sort((a,b) => {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;
        return nameA.localeCompare(nameB);
      });
    }
    if(sortBy === "name-desc"){
      sortedEmployees.sort((a,b) => {
        const nameA = `${a.firstName} ${a.lastName}`;
        const nameB = `${b.firstName} ${b.lastName}`;
        return nameB.localeCompare(nameA);
      })
    }
    if(sortBy === "id-asc"){
      sortedEmployees.sort((a,b) => {
        return a.id - b.id;
      })
    }
    if(sortBy === "id-desc"){
      sortedEmployees.sort((a,b) => {
        return b.id - a.id;
      })
    }
    const startIndex = (currentPage -1) * employeesPerPage;
    const endIndex = startIndex + employeesPerPage;
    const currentEmployees = sortedEmployees.slice(startIndex,endIndex);
    const totalPages = Math.ceil(sortedEmployees.length / employeesPerPage);
  if(loading){
    return(
      <h2>Loading</h2>
    );
  }
  return(
    <div className="employee-page">
      <div className="employee-container">
        <div className="employee-header">
          <div>
            <h1>Employees</h1>
            <p>Manage and view all employees</p>
          </div>
          <button className="add-employee-btn" onClick={(() => {navigate("/employees/add")})}>+ Add Employee</button>
        </div>
        <div className="employee-controls">
    <input type="search" placeholder='Search Employee...' value={search} onChange={(event) => {setSearch(event.target.value);}}></input>
    <select value={sortBy} onChange={(event) => {setSortBy(event.target.value); }}>
        <option value="">Sort By</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="id-asc">ID Low to High</option>
        <option value="id-desc">ID High to Low</option>
      </select>
      <select value={role} onChange={(event) => { setRole(event.target.value); }}>
        <option value="">All Roles</option>
        {uniqueRoles.map((roleName) => {
          return (
            <option key={roleName} value={roleName}>{roleName}</option>
          )
        })}
      </select>
      </div>
      <div className="employee-table-wrapper">
    <table className="employee-table">
      <thead>
      <tr>
      <th>ID</th>
      <th>Name</th>
      <th>Email</th>
      <th>Company</th>
      </tr>
      </thead>
      <tbody>
        {currentEmployees.map((emp) =>{
          return(
          <tr key={emp.id}>
            <td>{emp.id}</td>
            <td className="employee-name" onClick={() => {navigate(`/employees/${emp.id}`);}}>{emp.firstName} {emp.lastName}</td>
            <td>{emp.email}</td>
            <td><span className="role-badge">{emp.company.title}</span></td>
          </tr>
          );
        })}

      </tbody>
      </table>
      </div>
      <div className="pagination">
        <button onClick={() => { setCurrentPage(currentPage-1);}} disabled={currentPage === 1}>Previous</button>
        {Array.from({length: totalPages}, (__,index) => index+1).map((pageNumber) => {
          return (
            <button key={pageNumber} className={currentPage === pageNumber ? "active-page" : ""} onClick={() => {setCurrentPage(pageNumber);}}>{pageNumber}</button>
          )
        })}
        <button onClick={() => { setCurrentPage(currentPage+1);}} disabled={currentPage===totalPages}>Next</button>
      </div>
      </div>
      </div>
    )
}

export default EmployeeList;