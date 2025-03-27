import React, { useEffect, useState } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const Sparkline = ({ symbol }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`http://localhost:5004/api/stock-history/${symbol}/1mo`);
                const history = await response.json();
                const cleaned = history.map((point) => ({
                    close: point.close,
                }));
                setData(cleaned);
            } catch (error) {
                console.error(`Failed to fetch sparkline for ${symbol}`, error);
            }
        };

        fetchHistory();
    }, [symbol]);

    if (!data.length) return null;

    return (
        <div className="h-10 w-28 mt-1">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <Line
                        type="monotone"
                        dataKey="close"
                        stroke="#4F46E5"
                        strokeWidth={1}
                        dot={false}
                        isAnimationActive={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Sparkline;
