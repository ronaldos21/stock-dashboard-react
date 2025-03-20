import { useState } from "react";
import StockSearch from "../components/StockSearch";
import StockCard from "../components/StockCard";
import StockChart from "../components/StockChart";
import Watchlist from "../components/Watchlist";
import { fetchStockData, fetchStockHistory } from "../api/stockApi";

const Dashboard = () => {
    const [stock, setStock] = useState(null);
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async (symbol) => {
        setLoading(true);
        setError("");
        setStock(null);
        setChartData([]);

        try {
            const stockInfo = await fetchStockData(symbol);
            if (!stockInfo) {
                setError("Stock not found. Please try again.");
                setLoading(false);
                return;
            }
            setStock(stockInfo);

            const history = await fetchStockHistory(symbol);
            console.log("Fetched Stock History Data:", history); // Debugging
            setChartData(history);
        } catch (error) {
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
                {chartData.length > 0 && <StockChart data={chartData} />}
            </div>
        </div>
    );
};

export default Dashboard;
