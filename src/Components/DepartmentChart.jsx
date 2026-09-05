import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function DepartmentChart({ departmentCount }) {

    const data = Object.entries(
        departmentCount
    ).map(
        ([department, count]) => ({
            department,
            employees: count
        })
    );

    return (

        <div className="chart-card department-chart">

            <h2>Department Distribution</h2>

            <ResponsiveContainer
                width="100%"
                height={400}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 0,
                        bottom: 80
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                    />

                    <XAxis
                        dataKey="department"
                        angle={-35}
                        textAnchor="end"
                        interval={0}
                    />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="employees"
                        fill="#4F46E5"
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>

    );
}

export default DepartmentChart;