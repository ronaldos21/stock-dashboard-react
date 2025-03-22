import { useState } from "react";

const StockSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [range, setRange] = useState("1mo"); //Default range 1month

    const handleSearch = () => {
        if (query) onSearch(query.toUpperCase(), range); //Passing range to onSearch
    };

    return (
        <div className="flex space-x-2 p-4 bg-white shadow rounded-lg">
            <input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 rounded w-full bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
            />
            {/*Data Range Selector*/}
            <select
                value={range}
                onChange={(e) => setRange(e.target.value)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            >
                <option value="1mo">1 Month</option>
                <option value="6mo">6 Months</option>
                <option value="1Y">1 Year</option>
            </select>
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search
            </button>
        </div>
    );
};

export default StockSearch;
