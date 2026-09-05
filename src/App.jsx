import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./Pages/Dashboard";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeDetails from "./Pages/EmployeeDetails";
import AddEmployee from "./Pages/AddEmployees";
import EditEmployee from "./Pages/EditEmployee";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/" element={<Dashboard />} />

                <Route path="/employees" element={<EmployeeList />} />

                <Route
                    path="/employees/add"
                    element={<AddEmployee />}
                />

                <Route
                    path="/employees/:id"
                    element={<EmployeeDetails />}
                />

                <Route
                    path="/employees/:id/edit"
                    element={<EditEmployee />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;