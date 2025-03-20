import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Brush } from "recharts";

const StockChart = ({ stockHistory }) => {
    if (!stockHistory || stockHistory.history.length === 0) {
        return <p className="text-center text-gray-500">No historical data available.</p>;
    }

    console.log("Stock History Data:", stockHistory);

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Stock Price History</h2>

            {/* Display Latest Closing Price */}
            <p className="text-center text-lg font-medium text-gray-700">
                Latest Closing Price: <span className="text-green-600 font-bold">${stockHistory.latestPrice}</span>
            </p>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stockHistory.history}>
                    <XAxis dataKey="date" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }}
                        labelStyle={{ fontWeight: 'bold' }} formatter={(value) => [`$${value.toFixed(2)}`, `Price`]} />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Line type="monotone" dataKey="close" stroke="#4F46E5" strokeWidth={2} dot={{ fill: "#4F46E5", r: 4 }} activeDot={{ r: 8, stroke: '#82ca9d', strokeWidth: 2 }} />
                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
