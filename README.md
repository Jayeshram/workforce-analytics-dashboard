# Workforce Analytics Dashboard

A responsive employee management and workforce analytics dashboard built with **React.js**.  
The application fetches employee data from a REST API and transforms it into meaningful workforce insights using reusable React components and interactive charts.

## 🚀 Live Demo

> Add your deployed application link here after deploying the project.

**GitHub Repository:**  
https://github.com/Jayeshram/workforce-analytics-dashboard

---

## 📌 Project Overview

The **Workforce Analytics Dashboard** is a frontend application designed to manage and analyze employee information.

The application demonstrates how raw employee data from a REST API can be transformed into useful business insights such as:

- Total number of employees
- Average employee age
- Gender distribution
- Department-wise employee distribution
- Company-wise employee distribution
- Age-group distribution
- Youngest employee
- Oldest employee
- Largest department

The project also includes employee management pages for viewing, adding, editing, and viewing employee details.

---

## ✨ Features

### 📊 Workforce Analytics

- Total employee count
- Average employee age calculation
- Male and female employee statistics
- Department-wise employee distribution
- Company-wise employee distribution
- Age-group analysis
- Youngest employee identification
- Oldest employee identification
- Largest department identification

### 📈 Data Visualization

- Interactive gender distribution chart
- Department distribution chart
- Data-driven charts using **Recharts**
- Dynamic chart data generated from API responses

### 👨‍💼 Employee Management

- Employee listing
- Employee details view
- Add employee interface
- Edit employee interface
- Structured employee information display

### ⚡ API Integration

- Fetches employee data from the DummyJSON REST API
- Uses asynchronous JavaScript with `async/await`
- Handles API response and converts JSON data into application state
- Displays a loading state while data is being fetched

### 🧩 Component-Based Architecture

The application is divided into reusable React components such as:

- `AnalyticsCard`
- `GenderChart`
- `DepartmentChart`
- Dashboard
- Employee List
- Employee Details
- Add Employee
- Edit Employee

---

## 🛠️ Technologies Used

### Frontend

- **React.js**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**

### Libraries

- **Recharts** – Data visualization and charts

### API

- **DummyJSON REST API**

### Development Tools

- **Vite**
- **npm**
- **Git**
- **GitHub**
- **Visual Studio Code**

---

## 🧠 React Concepts Demonstrated

This project demonstrates practical usage of several important React concepts:

- Functional Components
- JSX
- `useState`
- `useEffect`
- Props
- Component Reusability
- Conditional Rendering
- List Rendering
- Event Handling
- API Integration
- State Management
- Dynamic Data Visualization

---

## 💻 JavaScript Concepts Demonstrated

The project also uses modern JavaScript concepts including:

- Array `reduce()`
- Array `map()`
- `Object.entries()`
- Destructuring
- Arrow Functions
- Template Literals
- Conditional Statements
- Async/Await
- Fetch API
- Objects and Arrays
- Dynamic Object Properties

For example, employee data is processed using `reduce()` to calculate department, company, gender, and age-group statistics.

---

## 📂 Project Structure

```text
employee-management-dashboard/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── Components/
│   │   ├── AnalyticsCard.jsx
│   │   ├── DepartmentChart.jsx
│   │   └── GenderChart.jsx
│   │
│   ├── Pages/
│   │   ├── Dashboard.jsx
│   │   ├── Dashboard.css
│   │   ├── EmployeeList.jsx
│   │   ├── EmployeeList.css
│   │   ├── EmployeeDetails.jsx
│   │   ├── EmployeeDetails.css
│   │   ├── AddEmployees.jsx
│   │   ├── AddEmployee.css
│   │   ├── EditEmployee.jsx
│   │   └── EditEmployee.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
