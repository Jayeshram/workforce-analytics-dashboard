import { useState, useEffect } from "react";

import AnalyticsCard from "../Components/AnalyticsCard.jsx";
import GenderChart from "../Components/GenderChart.jsx";
import DepartmentChart from "../Components/DepartmentChart.jsx";

import "./Dashboard.css";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getEmployee();
    }, []);

    const getEmployee = async () => {

        try {

            const response = await fetch(
                "https://dummyjson.com/users"
            );

            if (!response.ok) {
                throw new Error("Failed to fetch employees");
            }

            const data = await response.json();

            setEmployees(data.users);

        } catch (error) {

            console.log(error);
            setError("Unable to load employee data.");

        } finally {

            setLoading(false);

        }
    };


    // ---------------- TOTAL AGE ----------------

    const totalAge = employees.reduce(
        (total, employee) => {
            return total + employee.age;
        },
        0
    );


    // ---------------- AVERAGE AGE ----------------

    const avgAge =
        employees.length > 0
            ? totalAge / employees.length
            : 0;


    // ---------------- GENDER COUNT ----------------

    const genderCount = employees.reduce(
        (count, employee) => {

            if (employee.gender === "male") {
                count.male += 1;
            }

            if (employee.gender === "female") {
                count.female += 1;
            }

            return count;

        },
        {
            male: 0,
            female: 0
        }
    );


    // ---------------- DEPARTMENT COUNT ----------------

    const departmentCount = employees.reduce(
        (count, employee) => {

            const department =
                employee.company.department;

            if (count[department]) {

                count[department] += 1;

            } else {

                count[department] = 1;

            }

            return count;

        },
        {}
    );


    // ---------------- COMPANY COUNT ----------------

    const companyCount = employees.reduce(
        (count, employee) => {

            const company =
                employee.company.name;

            if (count[company]) {

                count[company] += 1;

            } else {

                count[company] = 1;

            }

            return count;

        },
        {}
    );


    // ---------------- AGE GROUP COUNT ----------------

    const ageGroupCount = employees.reduce(
        (count, employee) => {

            const age = employee.age;

            let ageGroup;

            if (age >= 20 && age <= 29) {

                ageGroup = "20-29";

            } else if (age >= 30 && age <= 39) {

                ageGroup = "30-39";

            } else if (age >= 40 && age <= 49) {

                ageGroup = "40-49";

            } else {

                ageGroup = "50+";

            }

            if (count[ageGroup]) {

                count[ageGroup] += 1;

            } else {

                count[ageGroup] = 1;

            }

            return count;

        },
        {}
    );


    // ---------------- YOUNGEST EMPLOYEE ----------------

    const youngestEmployee =
        employees.length > 0
            ? employees.reduce(
                (youngest, employee) => {

                    if (employee.age < youngest.age) {
                        return employee;
                    }

                    return youngest;
                },
                employees[0]
            )
            : null;


    // ---------------- OLDEST EMPLOYEE ----------------

    const oldestEmployee =
        employees.length > 0
            ? employees.reduce(
                (oldest, employee) => {

                    if (employee.age > oldest.age) {
                        return employee;
                    }

                    return oldest;
                },
                employees[0]
            )
            : null;


    // ---------------- LARGEST DEPARTMENT ----------------

    const largestDepartment =
        Object.entries(departmentCount).length > 0
            ? Object.entries(departmentCount).reduce(
                (largest, current) => {

                    if (current[1] > largest[1]) {
                        return current;
                    }

                    return largest;
                }
            )
            : null;


    // ---------------- AGE CHART DATA ----------------

    const ageChartData =
        Object.entries(ageGroupCount).map(
            ([ageGroup, count]) => ({
                ageGroup,
                employees: count
            })
        );


    // ---------------- LOADING ----------------

    if (loading) {

        return (
            <div className="loading">
                <h2>Loading Dashboard...</h2>
            </div>
        );

    }


    // ---------------- ERROR ----------------

    if (error) {

        return (
            <div className="error-message">
                <h2>{error}</h2>
            </div>
        );

    }


    return (

        <div className="dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>
                    <h1>Workforce Analytics</h1>

                    <p>
                        Employee Management & Analytics Dashboard
                    </p>
                </div>

                <a
                    href="/employees"
                    className="view-employees-btn"
                >
                    View Employees
                </a>

            </div>


            {/* ANALYTICS CARDS */}

            <div className="analytics-grid">

                <AnalyticsCard
                    title="Total Employees"
                    value={employees.length}
                />

                <AnalyticsCard
                    title="Average Age"
                    value={avgAge.toFixed(1)}
                />

                <AnalyticsCard
                    title="Male Employees"
                    value={genderCount.male}
                />

                <AnalyticsCard
                    title="Female Employees"
                    value={genderCount.female}
                />

            </div>


            {/* CHARTS */}

            <div className="charts-grid">

                <GenderChart
                    genderCount={genderCount}
                />

                <DepartmentChart
                    departmentCount={departmentCount}
                />

            </div>


            {/* AGE DISTRIBUTION */}

            <div className="section-card">

                <h2>Age Distribution</h2>

                <div className="age-list">

                    {ageChartData.map(
                        ({ ageGroup, employees }) => (

                            <div
                                className="age-row"
                                key={ageGroup}
                            >

                                <span className="age-label">
                                    {ageGroup}
                                </span>

                                <div className="age-bar-container">

                                    <div
                                        className="age-bar"
                                        style={{
                                            width: `${employees * 5}%`
                                        }}
                                    />

                                </div>

                                <strong>
                                    {employees}
                                </strong>

                            </div>

                        )
                    )}

                </div>

            </div>


            {/* KEY INSIGHTS */}

            <div className="section-title">

                <h2>Key Insights</h2>

            </div>


            <div className="insights-grid">

                {/* YOUNGEST */}

                {youngestEmployee && (

                    <div className="insight-card">

                        <span className="insight-label">
                            Youngest Employee
                        </span>

                        <h3>
                            {youngestEmployee.firstName}{" "}
                            {youngestEmployee.lastName}
                        </h3>

                        <p>
                            {youngestEmployee.age} years old
                        </p>

                    </div>

                )}


                {/* OLDEST */}

                {oldestEmployee && (

                    <div className="insight-card">

                        <span className="insight-label">
                            Oldest Employee
                        </span>

                        <h3>
                            {oldestEmployee.firstName}{" "}
                            {oldestEmployee.lastName}
                        </h3>

                        <p>
                            {oldestEmployee.age} years old
                        </p>

                    </div>

                )}


                {/* LARGEST DEPARTMENT */}

                {largestDepartment && (

                    <div className="insight-card">

                        <span className="insight-label">
                            Largest Department
                        </span>

                        <h3>
                            {largestDepartment[0]}
                        </h3>

                        <p>
                            {largestDepartment[1]} employees
                        </p>

                    </div>

                )}

            </div>


            {/* COMPANY DISTRIBUTION */}

            <div className="section-card company-section">

                <h2>Company Distribution</h2>

                <div className="company-grid">

                    {Object.entries(companyCount).map(
                        ([company, count]) => (

                            <div
                                className="company-item"
                                key={company}
                            >

                                <span>
                                    {company}
                                </span>

                                <strong>
                                    {count}
                                </strong>

                            </div>

                        )
                    )}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;