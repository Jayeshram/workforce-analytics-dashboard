import {
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell
} from "recharts";

function GenderChart({ genderCount }) {

    const data = [
        {
            name: "Male",
            value: genderCount.male
        },
        {
            name: "Female",
            value: genderCount.female
        }
    ];

    const COLORS = [
        "#4F46E5",
        "#EC4899"
    ];

    return (

        <div className="chart-card">

            <h2>Gender Distribution</h2>

            <div className="gender-chart">

                <PieChart width={400} height={300}>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={100}
                    >

                        {data.map(
                            (entry, index) => (

                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index]}
                                />

                            )
                        )}

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </div>

        </div>

    );
}

export default GenderChart;