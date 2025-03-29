
import React, { useState } from "react";
import StockCard from "./StockCard";
import { fetchStockData } from "../api/stockApi";


const CompareStocks = () => {

    const [symbols, setSymbols] = useState(["", ""]);
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (index, value) => {

        const updated = [...symbols];
        updated[index] = value.toUpperCase();
        setSymbols(updated);
    };

    const handleCompare = async () => {
        setLoading(true);
        setError("");
        try {
            const results = await Promise.all(
                symbols.filter(Boolean).map((symbol => fetchStockData(symbol)))
            );
            setStocks(results.filter(Boolean));
        } catch (err) {
            setError("Failed to fetch one or more stocks.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow mt-8">
            <h2 className="text-xl font-semibold text-center mb-4 text-black dark:text-white">📊 Compare Stocks</h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 m-4">

                {symbols.map((symbol, index) => (
                    <input
                        key={index}
                        type="text"
                        value={symbol}
                        placeholder={`Symbol ${index + 1}`}
                        onChange={(e) => handleChange(index, e.target.value)}
                        className="border p-2 rounded bg-white dark:bg gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"

                    />
                ))}
                <button
                    onClick={handleCompare}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Compare
                </button>
            </div>

            {error && <p className="text-center text-red-500 mb-2">{error}</p>}
            {loading && <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>}


            <div className="flex flex-col sm:flex-row gap-4 justify-center items-start">
                {stocks.map((stock) => {
                    const domain = stock?.symbol?.split("-")[0]?.toLowerCase();

                    return (
                        <div key={stock.symbol} className="flex-1">
                            <StockCard stock={stock} domain={domain} />
                        </div>
                    );
                })}
            </div>

        </div>


    );
}

export default CompareStocks;
