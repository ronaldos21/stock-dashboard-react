// src/components/TrendingStocks.jsx
import React, { useEffect, useState } from 'react';

const TrendingStocks = ({ onSearch }) => {
    const [trendingStocks, setTrendingStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrendingStocks = async () => {
            try {
                const response = await fetch("http://localhost:5004/api/trending-stocks");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                setTrendingStocks(data);
            } catch (error) {
                console.error("Error fetching trending stocks:", error);
                setError("Failed to load trending stocks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingStocks();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500 dark:text-gray-300">Loading trending stocks...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return (
        <div className="bg-white dark:bg-gray-700 p-4 shadow rounded-lg">
            <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">🔥 Trending Stocks</h2>
            <ul>
                {trendingStocks.map((stock) => (
                    <li
                        key={stock.symbol}
                        onClick={() => onSearch(stock.symbol, "1mo")}
                        className="flex justify-between py-2 border-b border-gray-400 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition rounded"
                    >
                        <div className="flex items-center space-x-2">
                            <img
                                src={`https://logo.clearbit.com/${stock.symbol.split("-")[0].toLowerCase()}.com`}
                                alt={`${stock.symbol} logo`}
                                className="w-6 h-6 rounded-full"
                                onError={(e) => (e.target.style.display = "none")}
                            />
                            <span className="text-black dark:text-white">{stock.symbol}</span>
                        </div>

                        <div className="flex flex-col text-right">
                            {/* Price */}
                            <div className="text-green-500 dark:text-green-400 font-medium">
                                ${stock.regularMarketPrice?.toFixed(2) || "N/A"}
                            </div>

                            {/* Trend Indicator */}
                            {typeof stock.regularMarketChangePercent === "number" && (
                                <div
                                    className={`text-sm ${stock.regularMarketChangePercent > 0
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {stock.regularMarketChangePercent > 0 ? "▲" : "▼"}{" "}
                                    {Math.abs(stock.regularMarketChangePercent).toFixed(2)}%
                                </div>
                            )}
                        </div>
                    </li>

                ))}
            </ul>
        </div>
    );
};

export default TrendingStocks;
