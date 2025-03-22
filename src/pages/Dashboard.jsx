import { useState } from "react";
import StockSearch from "../components/StockSearch";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import { fetchStockHistory, fetchStockData } from "../api/stockApi";

const Dashboard = () => {
    const [stock, setStock] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [range, setRange] = useState("1mo"); // Default range to 1 month

    const handleSearch = async (symbol) => {
        setLoading(true);
        setError("");
        setStock(null);
        setChartData([]);

        try {
            // Fetch Stock Info
            const stockInfo = await fetchStockData(symbol);
            console.log("Fetched Stock Info:", stockInfo);

            if (!stockInfo || !stockInfo.symbol) {
                setError("Stock not found. Please try again.");
                setLoading(false);
                return;
            }

            setStock(stockInfo);

            // Fetch Stock History (With Selected Range)
            const history = await fetchStockHistory(symbol, range);
            console.log("Fetched Stock History Data:", history);

            if (!history || history.length === 0) {
                setError("No historical data available.");
                setLoading(false);
                return;
            }

            setChartData(history);
        } catch (error) {
            console.error("Error in handleSearch:", error);
            setError("Failed to fetch stock data. Try again later.");
        }

        setLoading(false);
    };

    return (
        //<div className="min-h-screen bg-gray-100 p-6">
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            <div className="max-w-4xl mx-auto space-y-6">
                <StockSearch onSearch={handleSearch} />

                {/* 📅 Date Range Selector */}
                <div className="flex justify-center space-x-4">
                    <button onClick={() => setRange("1mo")} className={`px-4 py-2 rounded ${range === "1mo" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>1 Month</button>
                    <button onClick={() => setRange("6mo")} className={`px-4 py-2 rounded ${range === "6mo" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>6 Months</button>
                    <button onClick={() => setRange("1y")} className={`px-4 py-2 rounded ${range === "1y" ? "bg-blue-600 text-white" : "bg-gray-300"}`}>1 Year</button>
                </div>

                <Watchlist />
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {stock && <StockCard stock={stock} />}
                {chartData.length > 0 && <StockChart stockHistory={chartData} />}
            </div>
        </div>
    );
};

export default Dashboard;
