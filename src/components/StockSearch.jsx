import { useState, useEffect } from "react";
import { searchStockSymbols } from "../api/stockApi";


const StockSearch = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [range, setRange] = useState("1mo"); //Default range 1month
    const [suggestions, setSuggestions] = useState([]);

    // Fetch suggestions as the user types
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                return;
            }

            const results = await searchStockSymbols(query);
            setSuggestions(results.slice(0, 5)); // Limit to top 5 suggestions
        };

        fetchSuggestions();
    }, [query]);


    const handleSearch = () => {
        if (query) onSearch(query.toUpperCase(), range); //Passing range to onSearch
    };

    const handleSuggestionClick = (symbol) => {
        setQuery(symbol);
        onSearch(symbol, range);
        setSuggestions([]);
    };

    return (
        <div className="relative p-4 bg-white dark:bg-gray-800 shadow rounded-lg">
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Enter stock symbol (e.g., AAPL)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border p-2 rounded w-full bg-white dark:bg-gray-800 text-black dark:text-white border-gray-300 dark:border-gray-600"
                />
                <select
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                    className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
                >
                    <option value="1mo">1 Month</option>
                    <option value="6mo">6 Months</option>
                    <option value="1y">1 Year</option>
                </select>
                <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Search
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded w-full max-h-60 overflow-y-auto shadow">
                    {suggestions.map((item) => (
                        <li
                            key={item.symbol}
                            onClick={() => handleSuggestionClick(item.symbol)}
                            className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-black dark:text-white"
                        >
                            <img
                                src={`https://logo.clearbit.com/${item.symbol.split("-")[0].toLowerCase()}.com`}
                                alt={`${item.symbol} logo`}
                                className="w-5 h-5 rounded-full"
                                onError={(e) => (e.target.style.display = "none")}
                            />
                            <div>
                                <span className="font-semibold text-black dark:text-white">{item.symbol}</span>{" "}
                                <span className="text-sm text-gray-500 dark:text-gray-400">{item.description}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default StockSearch;
