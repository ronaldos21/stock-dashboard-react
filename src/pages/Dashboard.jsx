import { useState } from "react";
import StockSearch from "../components/StockSearch";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import { fetchStockHistory, fetchStockData } from "../api/stockApi";

const Dashboard = () => {
    const [stock, setStock] = useState(null);
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (symbol) => {
        setLoading(true);
        setError("");
        setStock(null);
        setChartData(null);

        try {
            // Fetch Stock Info
            const stockInfo = await fetchStockData(symbol);
            console.log("Fetched Stock Info:", stockInfo); // Debugging

            if (!stockInfo || !stockInfo.symbol) {  // Check if valid response
                setError("Stock not found. Please try again.");
                setLoading(false);
                return;
            }

            setStock(stockInfo); // ✅ Save stock details

            // Fetch Stock History (For Chart)
            const history = await fetchStockHistory(symbol);
            console.log("Fetched Stock History Data:", history); // Debugging

            if (!history || !history.history || history.history.length === 0) {
                setError("No historical data available.");
                setLoading(false);
                return;
            }

            setChartData(history); // ✅ Save stock history for chart
        } catch (error) {
            console.error("Error in handleSearch:", error);
            setError("Failed to fetch stock data. Try again later.");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <StockSearch onSearch={handleSearch} />
                <Watchlist />
                {loading && <p className="text-center text-gray-500">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {stock && <StockCard stock={stock} />}
                {chartData && <StockChart stockHistory={chartData} />}
            </div>
        </div>
    );
};

export default Dashboard;
