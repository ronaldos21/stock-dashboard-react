import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Brush } from "recharts";



const StockChart = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No chart data available.</p>;
    }

    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4">Stock Price History</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#f5f5f5', borderRadius: '5px' }}
                        labelStyle={{ fontWeight: 'bold' }}
                        formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#8884d8"
                        activeDot={{ r: 8, stroke: '#82ca9d', strokeWidth: 2 }}
                    />
                    <Brush dataKey="date" height={30} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
