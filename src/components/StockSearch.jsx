import { useState } from "react";

const StockSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        if (query) onSearch(query.toUpperCase());
    };

    return (
        <div className="flex space-x-2 p-4 bg-white shadow rounded-lg">
            <input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border p-2 rounded w-full"
            />
            <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Search
            </button>
        </div>
    );
};

export default StockSearch;
