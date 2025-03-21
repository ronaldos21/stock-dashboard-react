import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Brush } from "recharts";

const StockChart = ({ stockHistory }) => {
    if (!stockHistory || !Array.isArray(stockHistory) || stockHistory.length === 0) {
        return <p className="text-center text-gray-500 dark:text-gray-300">No historical data available.</p>;
    }

    console.log("Stock History Data:", stockHistory);

    return (
        <div className="bg-white dark:bg-gray-700 p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">Stock Price History</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockHistory}>
                    <XAxis dataKey="date"
                        tick={{ fontSize: 14, fill: "currentcolor" }}
                        tickFormatter={(str) => str}
                        className="text-black dark:text-white"
                    />
                    <YAxis
                        tick={{ fontSize: 14, fill: "#currentcolor" }}
                        className="text-black dark:text-white"
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "5px", color: "black" }}
                        labelStyle={{ fontWeight: "bold", color: "black" }}
                        formatter={(value) => [`$${value.toFixed(2)}`, `Price`]}
                        wrapperStyle={{ backgroundColor: "#1f2937", color: "white" }} // Dark mode support
                    />

                    <CartesianGrid strokeDasharray="3 3" stroke="gray" className="dark:stroke-gray-500" />
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#4F46E5"
                        strokeWidth={2}
                        dot={{ fill: "#4F46E5", r: 4 }}
                        activeDot={{ r: 8, stroke: "#82ca9d", strokeWidth: 2 }}
                    />
                    <Brush dataKey="date"
                        height={30}
                        stroke="#8884d8"
                        fill="white"
                        className="dark:fill-gray-700 dark:stroke-gray-300" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
